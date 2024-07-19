import { limit } from '@grammyjs/ratelimiter';
import { Bot } from 'grammy'
import { setupCommands } from './commands/index.js'
import { limitConfig } from './config.js'

export const createBot = token => {
	const bot = new Bot(token)

	// Middleware для получения ctx и настройки языка
	bot.use(async (ctx, next) => {
		const language = ctx.from.language_code;
		// Инициализация ctx.state, если он не определен
		if (!ctx.state) {
		  ctx.state = {};
		}
		// Сохранение языка пользователя в контексте (ctx)
		ctx.state.language = language;
		await next(); // Продолжить обработку
	  });

	  bot.use(limit(limitConfig())); // Применение конфигурации с лимитом
	setupCommands(bot)

	return bot
}
