import {
	EngError,
	EngError2,
	EngLimitMessage,
	EngMessageStart,
} from './textENG.js'
import { RuError, RuError2, RuLimitMessage, RuMessageStart } from './textRU.js'

/**
 * Текст для команды 'start'
 * @type {{en: Function, ru: Function}}
 */
const startText = {
	en: EngMessageStart,
	ru: RuMessageStart,
}
/**
 * Текст при спаме
 * @type {{en: Function, ru: Function}}
 */
const limitText = {
	en: EngLimitMessage,
	ru: RuLimitMessage,
}
/**
 * Текст ошибок
 * @type {{en: Function, ru: Function}}
 */
const errorText = {
	en: EngError,
	ru: RuError,
}
/**
 * Текст ошибок 2
 * @type {{en: Function, ru: Function}}
 */
const errorText2 = {
	en: EngError2,
	ru: RuError2,
}
export { errorText, errorText2, limitText, startText }
