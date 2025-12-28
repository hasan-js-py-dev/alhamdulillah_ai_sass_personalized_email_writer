class HttpError extends Error {
	constructor(statusCode, message, { expose = true, details } = {}) {
		super(message);
		this.statusCode = statusCode;
		this.expose = expose;
		this.details = details;
	}
}

module.exports = { HttpError };
