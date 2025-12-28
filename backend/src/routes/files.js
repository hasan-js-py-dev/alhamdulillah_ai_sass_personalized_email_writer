const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const express = require('express');
const multer = require('multer');

const { asyncHandler } = require('../util/async-handler');
const { HttpError } = require('../util/http-error');
const { getDb } = require('../db');
const { config } = require('../config');
const { deriveColumnMap, validateRequiredColumns } = require('../csv/columns');

const csvParser = require('csv-parser');

const filesRouter = express.Router();

const DEFAULT_USER_ID = 1;

function ensureDir(dir) {
	fs.mkdirSync(dir, { recursive: true });
}

function safeFileNamePart(name) {
	return String(name || '')
		.replace(/[^a-zA-Z0-9._-]+/g, '_')
		.slice(0, 120);
}

function createStorage() {
	return multer.diskStorage({
		destination: (req, _file, cb) => {
			const userDir = path.join(config.uploadDir, String(DEFAULT_USER_ID));
			ensureDir(userDir);
			cb(null, userDir);
		},
		filename: (_req, file, cb) => {
			const ext = path.extname(file.originalname || '').toLowerCase() || '.csv';
			const id = crypto.randomBytes(8).toString('hex');
			cb(null, `upload_${Date.now()}_${id}${ext}`);
		},
	});
}

const upload = multer({
	storage: createStorage(),
	limits: { fileSize: config.maxUploadBytes },
	fileFilter: (_req, file, cb) => {
		const ok =
			(file.mimetype && file.mimetype.includes('csv')) ||
			String(file.originalname || '').toLowerCase().endsWith('.csv');
		if (!ok) return cb(new HttpError(400, 'Only CSV uploads are supported'));
		return cb(null, true);
	},
});

async function parseCsvPreview(filePath, maxRows = 20) {
	return new Promise((resolve, reject) => {
		const rows = [];
		let headers = null;

		fs.createReadStream(filePath)
			.pipe(csvParser())
			.on('headers', (h) => {
				headers = h;
			})
			.on('data', (row) => {
				if (rows.length < maxRows) rows.push(row);
			})
			.on('error', (err) => reject(err))
			.on('end', () => resolve({ headers: headers || [], rows }));
	});
}

filesRouter.post(
	'/upload',
	upload.single('file'),
	asyncHandler(async (req, res) => {
		if (!req.file) throw new HttpError(400, 'Missing file');

		const { headers, rows } = await parseCsvPreview(req.file.path, 20);
		if (!headers.length) {
			fs.unlinkSync(req.file.path);
			throw new HttpError(400, 'CSV appears to have no header row');
		}

		const columnMap = deriveColumnMap(headers);
		const missing = validateRequiredColumns(columnMap);
		if (missing.length) {
			fs.unlinkSync(req.file.path);
			throw new HttpError(
				400,
				`Missing required columns: ${missing.join(', ')}. Expected headers like First Name, Last Name, Email, Company, Website.`,
				{ expose: true }
			);
		}

		const db = await getDb();
		const result = await db.run(
			'INSERT INTO files (user_id, original_filename, stored_path, header_json, column_map_json) VALUES (?, ?, ?, ?, ?)',
			DEFAULT_USER_ID,
			safeFileNamePart(req.file.originalname),
			req.file.path,
			JSON.stringify(headers),
			JSON.stringify(columnMap)
		);

		res.json({
			file: {
				id: result.lastID,
				originalFilename: req.file.originalname,
				headers,
				columnMap,
			},
			preview: rows,
		});
	})
);

filesRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const db = await getDb();
		const files = await db.all(
			'SELECT id, original_filename, created_at FROM files WHERE user_id = ? ORDER BY id DESC LIMIT 50',
			DEFAULT_USER_ID
		);
		res.json({ files });
	})
);

module.exports = { filesRouter };
