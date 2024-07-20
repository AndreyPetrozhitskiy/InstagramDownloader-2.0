/**
 * Текст для команды 'start' на русском языке
 * @param {string} user - имя пользователя
 * @returns {string}
 */
const RuMessageStart = user => {
	return `Привет, ${user}!
Данный бот позволяет скачивать контент из *Instagram*!
Для скачивания отправь ссылку.
`
}
/**
 * Текст при спаме на русском языке
 * @type {string}
 */
const RuLimitMessage = `Попробуйте через 30 секунд.`
/**
 * Текст ошибки на русском языке
 * @type {string}
 */
const RuError = 'Произошла ошибка. Повторите позже.'
/**
 * Текст ошибки 2 на русском языке
 * @type {string}
 */
const RuError2 = 'Пришлите ссылку или команду.'
export { RuError, RuError2, RuLimitMessage, RuMessageStart }
