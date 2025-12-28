// Backend-only tone guidance used for AI prompting.
// Keep this detailed; the frontend UI shows a shorter helper text.

const TONE_PROMPT_GUIDE = {
	'Professional/Respectful/Formal':
		'Formal and polished. Use proper grammar, no slang, and a respectful, businesslike voice. Keep it clear, concise, and credible.',
	'Friendly & Conversational':
		'Warm and personable, like a real human email. Use simple language, light contractions, and a natural flow. Friendly but still professional (B2B-appropriate).',
	Casual:
		'Relaxed and informal. Short sentences and simple wording. Only use very light casual phrasing; avoid sounding unprofessional or overly familiar with strangers.',
	'Humorous/Playful/Funny':
		'Light, tasteful humor that fits the audience. Keep it subtle (a small wink), never sarcastic or risky. If the industry feels formal, keep humor minimal.',
	'Empathetic/Supportive/Sympathetic':
		'Lead with understanding. Acknowledge challenges gently and offer help without pressure. Keep wording considerate and calm (no hype).',
	'Casual-Respectful':
		'Approachable and polite. Friendly wording while maintaining courtesy and professionalism—good for first-time outreach to someone you don\'t know.',
	'Concise/Direct':
		'Very clear and brief. Remove filler, keep the message skimmable, and get to value + CTA quickly. Use straightforward, neutral language.',
	'Decisive/Authoritative':
		'Confident and directive without arrogance. Use clear recommendations/next steps and firm wording. Stay respectful and helpful.',
	'Cheerful/Enthusiastic/Joyful':
		'Upbeat and positive. Show genuine excitement, but keep it controlled (no excessive exclamation). Make the energy feel sincere and professional.',
	'Encouraging/Inspiring':
		'Motivational and supportive. Emphasize progress and possibility. Use positive, steady language that nudges action without pressure.',
	Persuasive:
		'Convincing but not pushy. Focus on benefits, proof/credibility, and a clear CTA. Avoid hype, exaggeration, and spammy urgency.',
	Informative:
		'Objective and clear. Explain the key facts and next step simply. Prioritize clarity over persuasion; avoid buzzwords.',
	'Warm & Welcoming':
		'Inviting and appreciative. Make the reader feel valued and comfortable. Friendly tone, simple wording, and a gentle CTA.',
	Optimistic:
		'Positive and forward-looking. Emphasize opportunity and outcomes realistically. Keep it grounded, not overly rosy.',
	Authoritative:
		'Expert and credible. Confident voice, strong clarity, and professional language. No slang; communicate competence and trust.',
	Conversational:
		'Natural, human, and dialogue-like. Use simple phrasing and occasional questions to create a back-and-forth feel. Avoid sounding scripted.',
	Urgent:
		'Time-sensitive and action-oriented. Create immediacy only when there is a real deadline or limited window. Avoid spammy pressure language.',
};

function getToneGuidance(tone) {
	const key = String(tone || '').trim();
	return TONE_PROMPT_GUIDE[key] || 'Match the selected tone consistently and keep it B2B-appropriate.';
}

module.exports = {
	TONE_PROMPT_GUIDE,
	getToneGuidance,
};
