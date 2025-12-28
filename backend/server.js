const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { config } = require('./src/config');
const { errorHandler } = require('./src/util/error-handler');

const { filesRouter } = require('./src/routes/files');
const { jobsRouter } = require('./src/routes/jobs');
const { singleRouter } = require('./src/routes/single');

function createApp() {
	const app = express();

	app.use(helmet());
	app.use(
		cors({
			origin: config.corsOrigin,
			credentials: true,
		})
	);
	app.use(express.json({ limit: '1mb' }));

	app.get('/api/health', (_req, res) => res.json({ ok: true }));

	app.use('/api/files', filesRouter);
	app.use('/api/jobs', jobsRouter);
	app.use('/api/single', singleRouter);

	app.use(errorHandler);
	return app;
}

module.exports = { createApp };
