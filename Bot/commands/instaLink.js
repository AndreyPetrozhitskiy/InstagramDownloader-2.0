import fs from 'fs/promises'
import { Composer, InputFile } from 'grammy'
import fetch from 'node-fetch'
import path from 'path'
import { fileURLToPath } from 'url'
import { downloadInstagram } from '../../Function/DownloadInst.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const contentDirectory = path.join(__dirname, '../../Content')
const instagramLinkHandler = new Composer()
const instagramLinkRegex =
	/(https:\/\/www\.instagram\.com\/(?:[^\s/]+\/)?(p|reel|tv|stories)\/[^\s/]+)/

instagramLinkHandler.hears(instagramLinkRegex, async ctx => {
	const link = ctx.match[0]
	let tempMessage = await ctx.reply('⌛️')

	try {
		const fetchLink = await downloadInstagram(link)

		// Проверяем, что объект fetchLink и его свойство status существуют
		if (fetchLink && fetchLink.status) {
			try {
				await fs.access(contentDirectory)
			} catch {
				await fs.mkdir(contentDirectory, { recursive: true })
			}

			const mediaGroup = []
			for (const item of fetchLink.url_list.filter(i =>
				['.mp4', '.jpeg'].includes(i.extension)
			)) {
				const response = await fetch(item.url)
				if (!response.ok) {
					console.error(`Failed to fetch ${item.url}`)
					continue // Пропускаем текущий элемент и продолжаем
				}
				const buffer = Buffer.from(await response.arrayBuffer())
				const filename = path.join(
					contentDirectory,
					`tempfile${Date.now()}${item.extension}`
				)
				await fs.writeFile(filename, buffer)
				const mediaType = item.extension === '.mp4' ? 'video' : 'photo'
				const inputFile = new InputFile(filename)
				mediaGroup.push({
					type: mediaType,
					media: inputFile,
					fileName: filename,
				})
			}

			if (mediaGroup.length > 0) {
				try {
					await ctx.replyWithMediaGroup(
						mediaGroup.map(item => ({ type: item.type, media: item.media }))
					)
					await Promise.all(mediaGroup.map(item => fs.unlink(item.fileName)))
				} catch (error) {
					console.error('Ошибка при отправке медиагруппы:', error)
					await ctx.reply('Не удалось отправить медиафайлы.')
				}
			} else {
				await ctx.reply('Нет медиафайлов для отправки.')
			}

			await ctx.api.deleteMessage(ctx.chat.id, tempMessage.message_id)
		} else {
			throw new Error('Failed to fetch content from Instagram.')
		}
	} catch (error) {
		console.error('Произошла ошибка:', error)
		await ctx.api.deleteMessage(ctx.chat.id, tempMessage.message_id)
		await ctx.reply(
			'Произошла ошибка при загрузке данных. Попробуйте еще раз позже.'
		)
	}
})

export default instagramLinkHandler
