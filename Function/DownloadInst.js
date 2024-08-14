import pkg from 'nayan-media-downloader'
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
					// Проверяем, есть ли URL уже в Set
					uniqueUrls.add(url) // Добавляем URL в Set, если его там нет
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
