const PQueue = require('p-queue').default;

const { config } = require('../config');
const { getDb } = require('../db');
const { scrapeWebsite } = require('../scrape/scrapeWebsite');
const { buildDeepSeekPrompt } = require('../ai/prompt');
const { callDeepSeek } = require('../ai/deepseek');
const { normalizeWebsiteInput } = require('../util/website');

let queue;
let started = false;

function getQueue() {
	if (!queue) {
		queue = new PQueue({ concurrency: config.workerConcurrency });
	}
	return queue;
}

async function processProspectRow(prospectId) {
	const db = await getDb();
	const prospect = await db.get('SELECT * FROM prospects WHERE id = ?', prospectId);
	if (!prospect) return;
	if (prospect.status === 'completed') return;

	await db.run(
		"UPDATE prospects SET status = 'running', error = NULL, updated_at = datetime('now') WHERE id = ?",
		prospectId
	);

	try {
		const websiteInput = String(prospect.website || '').trim();
		const normalized = normalizeWebsiteInput(websiteInput);
		const homepageUrl = normalized.ok ? normalized.homepageUrl : '';

		let scraped = '';
		// Scraping is best-effort. If it fails or returns empty, continue with no-insights.
		if (homepageUrl) {
			try {
				scraped = await scrapeWebsite(homepageUrl);
			} catch {
				scraped = '';
			}
		}

		const prompt = buildDeepSeekPrompt({
			firstName: prospect.first_name,
			lastName: prospect.last_name,
			company: prospect.company,
			website: homepageUrl || websiteInput,
			scrapedContent: scraped,
			serviceFocus: prospect.our_services,
		});

		const ai = await callDeepSeek({ prompt, requestId: `job_${prospect.job_id}_row_${prospect.row_index}` });

		const subject = String(ai.subject || '').trim();
		let openingLine = String(ai.opening_line || '').trim();
		let emailBody = String(ai.email_body || '').trim();
		const cta = String(ai.cta || '').trim();

		const firstName = String(prospect.first_name || '').trim();
		if (firstName) {
			const lower = openingLine.toLowerCase();
			const target1 = `${firstName.toLowerCase()},`;
			const target2 = `${firstName.toLowerCase()} `;
			if (!(lower.startsWith(target1) || lower.startsWith(target2))) {
				openingLine = `${firstName}, ${openingLine}`.trim();
			}
		}

		if (cta) {
			const escaped = cta.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			const re = new RegExp(`\\n?\\s*${escaped}\\s*\\n?`, 'gi');
			emailBody = emailBody.replace(re, '\n').trim();
		}

		await db.run(
			"UPDATE prospects SET status='completed', error=NULL, scraped_content=?, subject=?, opening_line=?, email_body=?, cta=?, updated_at=datetime('now') WHERE id=?",
			scraped,
			subject,
			openingLine,
			emailBody,
			cta,
			prospectId
		);

		await db.run(
			"UPDATE jobs SET processed_rows = processed_rows + 1 WHERE id = ?",
			prospect.job_id
		);
	} catch (err) {
		await db.run(
			"UPDATE prospects SET status='failed', error=?, updated_at=datetime('now') WHERE id=?",
			String(err.message || err),
			prospectId
		);
		await db.run(
			"UPDATE jobs SET processed_rows = processed_rows + 1, error_count = error_count + 1 WHERE id = ?",
			prospect.job_id
		);
	}

	// Finalize job if done
	const row = await db.get('SELECT total_rows, processed_rows FROM jobs WHERE id = ?', prospect.job_id);
	if (row && row.total_rows > 0 && row.processed_rows >= row.total_rows) {
		await db.run(
			"UPDATE jobs SET status='completed', finished_at=datetime('now') WHERE id=? AND status <> 'completed'",
			prospect.job_id
		);
	}
}

async function enqueueJob(jobId) {
	const db = await getDb();
	const job = await db.get('SELECT * FROM jobs WHERE id = ?', jobId);
	if (!job) return;

	await db.run(
		"UPDATE jobs SET status='running', started_at=COALESCE(started_at, datetime('now')) WHERE id=? AND status IN ('queued','running')",
		jobId
	);

	const pending = await db.all(
		"SELECT id FROM prospects WHERE job_id = ? AND status IN ('queued','running') ORDER BY row_index ASC",
		jobId
	);

	const q = getQueue();
	for (const p of pending) {
		q.add(() => processProspectRow(p.id));
	}
}

async function startJobWorker() {
	if (started) return;
	started = true;

	getQueue();

	const db = await getDb();
	const activeJobs = await db.all("SELECT id FROM jobs WHERE status IN ('queued','running')");
	for (const j of activeJobs) {
		enqueueJob(j.id);
	}
}

module.exports = { startJobWorker, enqueueJob };
