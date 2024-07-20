import instagramLinkHandler from './instaLink.js'
import { startCommand } from './start.js'

/**
 * Настройка команд для бота
 * @param {Object} bot - экземпляр бота
 */
export function setupCommands(bot) {
	/**
	 * Установка команды 'start'
	 * @param {Object} bot - экземпляр бота
	 */
	bot.command('start', startCommand)
	/**
	 * Обработчик команды 'instagramLinkHandler'
	 * @param {Object} bot - экземпляр бота
	 */
	bot.use(instagramLinkHandler)
}
