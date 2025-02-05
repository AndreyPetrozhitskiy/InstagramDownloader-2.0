import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const pkg = require('./nayan-media-downloader/src/index.js')

import determineFileExtension from './fetchMedia.js'

// Деструктуризация для получения функции ndown
const { ndown } = pkg

const download = async link => {
	try {
		const result = await ndown(link)
		console.log(result)

		if (result.status && result.data.length > 0) {
			const uniqueUrls = new Set() // Используем Set для хранения уникальных URL
			const urlListWithExtensions = []

			for (const item of result.data) {
				const url = item.url
				if (!uniqueUrls.has(url)) {
					uniqueUrls.add(url) // Добавляем URL в Set, если его там ещё нет
					const extension = await determineFileExtension(url)
					urlListWithExtensions.push({ url, extension }) // Создаем объект с URL и расширением
				}
			}

			return {
				status: result.status,
				url_list: urlListWithExtensions,
			}
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export const downloadInstagram = async link => {
	const result = await download(link)
	return result
}
