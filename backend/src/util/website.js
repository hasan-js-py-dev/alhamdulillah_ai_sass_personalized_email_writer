function safeTrim(v) {
	return String(v || '').trim();
}

function normalizeWebsiteInput(input) {
	const raw = safeTrim(input);
	if (!raw) {
		return { ok: false, reason: 'empty', inputRaw: '', homepageUrl: null, origin: null, domainKey: null };
	}

	// Disallow non-web schemes
	if (/^(mailto:|tel:|javascript:|data:)/i.test(raw)) {
		return { ok: false, reason: 'unsupported_scheme', inputRaw: raw, homepageUrl: null, origin: null, domainKey: null };
	}

	// Add scheme if missing so URL parsing works.
	const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

	let url;
	try {
		url = new URL(withScheme);
	} catch {
		return { ok: false, reason: 'invalid_url', inputRaw: raw, homepageUrl: null, origin: null, domainKey: null };
	}

	// Only http(s)
	if (!(url.protocol === 'http:' || url.protocol === 'https:')) {
		return { ok: false, reason: 'unsupported_protocol', inputRaw: raw, homepageUrl: null, origin: null, domainKey: null };
	}

	// Normalize host key for caching/identity.
	const hostname = String(url.hostname || '').toLowerCase().replace(/^www\./, '');
	if (!hostname) {
		return { ok: false, reason: 'missing_hostname', inputRaw: raw, homepageUrl: null, origin: null, domainKey: null };
	}

	const origin = url.origin;
	const homepageUrl = `${origin}/`;

	return {
		ok: true,
		reason: null,
		inputRaw: raw,
		homepageUrl,
		origin,
		domainKey: hostname,
	};
}

module.exports = { normalizeWebsiteInput };
