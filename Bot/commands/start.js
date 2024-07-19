import { startText } from '../text/exportText.js'

export async function startCommand(ctx) {
	const user = ctx.from.first_name
	const language = ctx.state.language || ctx.from.language_code

	const messageFunction = startText[language] || startText['en']
	await ctx.reply(messageFunction(user), { parse_mode: 'Markdown' })
}
