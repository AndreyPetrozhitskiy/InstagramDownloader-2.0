import { startText } from '../text/exportText.js'

/**
 * Обработчик команды 'start'
 * @param {Object} ctx - контекст команды
 */
export async function startCommand(ctx) {
	/** @type {string} */
	const user = ctx.from.first_name
	/** @type {string} */
	const language = ctx.state.language || ctx.from.language_code

	/** @type {Function} */
	const messageFunction = startText[language] || startText['en']
	await ctx.reply(messageFunction(user), { parse_mode: 'Markdown' })
}
