import { EngLimitMessage, EngMessageStart } from './textENG.js'
import { RuLimitMessage, RuMessageStart } from './textRU.js'

// Стартовое сообщение
const startText = {
	en: EngMessageStart,
	ru: RuMessageStart,
}
// Сообщение при спаме
const limitText = {
	en: EngLimitMessage,
	ru: RuLimitMessage,
}
export { limitText, startText }
