function normalizeHeader(header) {
	return String(header || '')
		.replace(/^\uFEFF/, '') // strip BOM if present
		.trim()
		.toLowerCase()
		.replace(/[_\s]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
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
	const company = findColumn(headers, ['company', 'company name', 'organization', 'business']);
	const website = findColumn(headers, [
		'website / activity url',
		'website or activity url',
		'website',
		'website url',
		'url',
		'site',
		'domain',
	]);
	const activityContext = findColumn(headers, ['activity context', 'context', 'activity', 'notes', 'personalization context']);
	const email = findColumn(headers, ['email', 'email address']);
	const jobTitle = findColumn(headers, ['job title', 'job_title', 'title', 'role', 'position']);
	const ourServices = findColumn(headers, ['our services', 'services', 'service focus', 'service_focus']);

	return {
		firstName,
		lastName,
		company,
		website,
		activityContext,
		email,
		jobTitle,
		ourServices,
	};
}

function validateRequiredColumns(columnMap) {
	const missing = [];
	// Names are optional (we can fall back to "Hi,"), but Company is required.
	if (!columnMap.company) missing.push('company');

	// At least one of these columns must exist.
	if (!columnMap.website && !columnMap.activityContext) {
		missing.push('websiteOrActivityContext');
	}
	return missing;
}

module.exports = { deriveColumnMap, validateRequiredColumns };
