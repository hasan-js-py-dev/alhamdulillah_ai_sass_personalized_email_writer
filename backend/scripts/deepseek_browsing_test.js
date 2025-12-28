/*
  DeepSeek browsing capability smoke test.
  NOTE: The DeepSeek API (as used in this project) does NOT have web-browsing tools.
  This script checks whether the model claims it can browse, and forces it to answer
  "CAN_BROWSE: yes|no".

  Run:
    Set-Location "c:\Users\Hassan\OneDrive\Documents\ai_email_writer\backend";
    node scripts/deepseek_browsing_test.js
*/

require('dotenv').config();

const { callDeepSeek } = require('../src/ai/deepseek');

async function main() {
	const prompt = [
		'You must be honest about your capabilities.',
		'',
		'Task:',
		'1) Can you browse the web in real time from this chat completion API call?',
		'2) Answer in JSON only with these keys:',
		'{',
		'  "can_browse": true|false,',
		'  "explanation": "one short sentence"',
		'}',
		'',
		'Rules:',
		'- If you cannot browse, set can_browse=false.',
		'- Do not claim you visited any website unless you truly can.',
	].join('\n');

	const result = await callDeepSeek({ prompt, requestId: 'deepseek_browsing_test' });
	// Print raw object returned by our JSON extractor
	// eslint-disable-next-line no-console
	console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
	// eslint-disable-next-line no-console
	console.error('Test failed:', err);
	process.exit(1);
});
