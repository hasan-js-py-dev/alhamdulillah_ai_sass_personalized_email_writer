function normalizeHeader(header) {
	return String(header || '')
		.trim()
		.toLowerCase()
		.replace(/\s+/g, ' ');
}

function findColumn(headers, candidates) {
	const normalized = headers.map((h) => ({ raw: h, norm: normalizeHeader(h) }));
	for (const candidate of candidates) {
		const candidateNorm = normalizeHeader(candidate);
		const exact = normalized.find((h) => h.norm === candidateNorm);
		if (exact) return exact.raw;
	}

	// loose contains match
	for (const candidate of candidates) {
		const candidateNorm = normalizeHeader(candidate);
		const hit = normalized.find((h) => h.norm.includes(candidateNorm) || candidateNorm.includes(h.norm));
		if (hit) return hit.raw;
	}

	return null;
}

function deriveColumnMap(headers) {
	const firstName = findColumn(headers, ['first name', 'firstname', 'first']);
	const lastName = findColumn(headers, ['last name', 'lastname', 'last']);
	const email = findColumn(headers, ['email', 'email address']);
	const company = findColumn(headers, ['company', 'company name', 'organization', 'business']);
	const website = findColumn(headers, ['website', 'website url', 'url', 'site', 'domain']);
	const ourServices = findColumn(headers, ['our services', 'services', 'service focus', 'service_focus']);

	return {
		firstName,
		lastName,
		email,
		company,
		website,
		ourServices,
	};
}

function validateRequiredColumns(columnMap) {
	const missing = [];
	for (const key of ['firstName', 'lastName', 'email', 'company', 'website']) {
		if (!columnMap[key]) missing.push(key);
	}
	return missing;
}

module.exports = { deriveColumnMap, validateRequiredColumns };
