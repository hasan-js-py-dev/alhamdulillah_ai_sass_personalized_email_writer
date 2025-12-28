require('dotenv').config();

const { createApp } = require('../server');
const { initDb } = require('./db');
const { startJobWorker } = require('./jobs/worker');
const { config } = require('./config');

async function main() {
	await initDb();

	const app = createApp();
	startJobWorker();

	app.listen(config.port, () => {
		// eslint-disable-next-line no-console
		console.log(`Backend listening on http://localhost:${config.port}`);
	});
}

main().catch((err) => {
	// eslint-disable-next-line no-console
	console.error(err);
	process.exit(1);
});

