import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Получение текущего файла
 * @type {string}
 */
const __filename = fileURLToPath(import.meta.url)
/**
 * Получение текущей директории
 * @type {string}
 */
const __dirname = path.dirname(__filename)

/**
 * Путь к каталогу с содержимым
 * @type {string}
 */
export const contentDirectory = path.join(__dirname, '../Content')
