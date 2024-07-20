import fs from 'fs/promises'
import { Composer, InputFile } from 'grammy'
import fetch from 'node-fetch'
import path from 'path'
import { downloadInstagram } from '../../Function/DownloadInst.js'
import { contentDirectory } from '../../Function/JunkFunc.js'
import { errorText, errorText2 } from '../text/exportText.js'

/**
 * Обработчик команды 'instagramLinkHandler'
 * @param {Object} ctx - контекст
 */
const instagramLinkHandler = new Composer()

/**
 * Регулярное выражение для проверки ссылки на Instagram
 * @type {RegExp}
 */
const instagramLinkRegex =
	/(https:\/\/www\.instagram\.com\/(p|reel|stories)\/[^\s]+)/

/**
 * Слушатель для обработки сообщений с ссылками на Instagram
 */
instagramLinkHandler.hears(
	instagramLinkRegex,
	/**
	 * Обработчик контекста
	 * @param {Object} ctx - контекст
	 */
	async ctx => {
		/** @type {string} */
		const language = ctx.state.language || ctx.from.language_code

		// Проверка пользователя
		// ...........................................
		// Если все хорошо
		// получение ссылки их контекста
		/** @type {string} */
		const link = ctx.match[0]
		// язык

		// сообщение ошибки
		/** @type {string} */
		const errorTextMess = errorText[language] || errorText['en']

		// Сообщение ожидания
		/** @type {Object} */
		let tempMessage = await ctx.reply('⌛️')
		// Отправляем ссылки
		/** @type {Object} */
		const fetchLink = await downloadInstagram(link)

		if (fetchLink?.status) {
			/** @type {Array<Object>} */
			const mediaGroup = []

			for (const item of fetchLink.url_list.filter(i =>
				['.mp4', '.jpeg'].includes(i.extension)
			)) {
				const response = await fetch(item.url)
				if (!response.ok) {
					console.error(`Failed to fetch ${item.url}`)
					continue // Пропускаем текущий элемент и продолжаем с следующим
				}
				const buffer = Buffer.from(await response.arrayBuffer())

				const filename = path.join(
					contentDirectory,
					`tempfile${Date.now()}${item.extension}`
				)
				await fs.writeFile(filename, buffer)
				const mediaType = item.extension === '.mp4' ? 'video' : 'photo'
				const inputFile = new InputFile(filename)
				mediaGroup.push({ type: mediaType, media: inputFile, filename }) // Сохраняем объект с путем к файлу
			}

			if (mediaGroup.length > 0) {
				try {
					await ctx.replyWithMediaGroup(
						mediaGroup.map(item => ({ type: item.type, media: item.media }))
					)
					await Promise.all(mediaGroup.map(item => fs.unlink(item.filename))) // Удаление всех файлов
				} catch (error) {
					console.error('Ошибка при отправке медиагруппы:', error)
					await ctx.reply(errorTextMess)
				}
			} else {
				await ctx.reply(errorTextMess)
			}
			await ctx.api.deleteMessage(ctx.chat.id, tempMessage.message_id)
		} else {
			await ctx.api.deleteMessage(ctx.chat.id, tempMessage.message_id)
			await ctx.reply(errorTextMess)
		}
	}
)

/**
 * Слушатель для обработки сообщений, которые не являются ссылками на Instagram
 */
instagramLinkHandler.on('message', async ctx => {
	const language = ctx.state.language || ctx.from.language_code
	const notALinkMessage = errorText2[language] || errorText['en']

	await ctx.reply(notALinkMessage)
})
export default instagramLinkHandler
