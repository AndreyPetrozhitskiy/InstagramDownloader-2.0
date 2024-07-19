const RuMessageStart = user => {
	return `Привет, ${user}!
Данный бот позволяет скачивать контент из *Instagram*!
Для скачивания отправь ссылку.
`
}
const RuLimitMessage = `Попробуйте через 30 секунд.`
export { RuLimitMessage, RuMessageStart }
