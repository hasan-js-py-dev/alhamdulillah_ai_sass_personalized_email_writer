function errorHandler(err, _req, res, _next) {
	// Always log full error server-side for debugging.
	// eslint-disable-next-line no-console
	console.error(err);

	const status = err.statusCode || 500;
	const message = err.expose ? err.message : 'Internal server error';

	const isProd = String(process.env.NODE_ENV || '').toLowerCase() === 'production';
	const payload = { error: message };
	// In dev, include structured details for exposed errors.
	if (!isProd && err && err.expose && err.details) {
		payload.details = err.details;
	}

	res.status(status).json(payload);
}

module.exports = { errorHandler };
