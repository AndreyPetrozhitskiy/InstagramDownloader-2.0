import axios from 'axios'

/**
 * Определяет расширение файла по URL, используя заголовок content-type из ответа HTTP.
 * @param {string} url URL файла для определения его типа.
 * @returns {Promise<string|null>} Промис, возвращающий расширение файла (например, ".mp4" или ".jpg"), или null при ошибке.
 */
async function determineFileExtension(url) {
	try {
		// Пытаемся выполнить запрос HEAD
		const response = await axios.head(url, {
			timeout: 5000,
		})
		return extractExtensionFromContentType(response.headers['content-type'])
	} catch (error) {
		if (error.response | (error.response.status === 405)) {
			// Если метод HEAD не поддерживается, делаем запрос GET
			try {
				const response = await axios.get(url, {
					timeout: 5000,
					responseType: 'stream', // Получаем ответ в виде потока, чтобы избежать загрузки всего контента
				})
				return extractExtensionFromContentType(response.headers['content-type'])
			} catch (error) {
				console.error(
					'Error determining file extension with GET:',
					error.message
				)
				return null
			}
		} else {
			console.error('Error determining file extension:', error.message)
			return null
		}
	}
}

function extractExtensionFromContentType(contentType) {
	if (!contentType) {
		console.error('Content-Type header is missing')
		return null
	}
	if (contentType.startsWith('application/octet-stream')) {
		return '.mp4'
	} else if (contentType.startsWith('image/')) {
		return '.jpeg'
	} else {
		console.error('Unsupported content type:', contentType)
		return null
	}
}

export default determineFileExtension
