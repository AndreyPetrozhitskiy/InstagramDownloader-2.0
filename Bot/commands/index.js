import instagramLinkHandler from './instaLink.js'
import { startCommand } from './start.js'

export function setupCommands(bot) {
	bot.command('start', startCommand)
	bot.use(instagramLinkHandler)
}
