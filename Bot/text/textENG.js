const EngMessageStart = user => {
	return `Hello, ${user}!
This bot allows you to download content from  *Instagram*!
To download, send a link.
`
}
const EngLimitMessage = `Try it in 30 seconds.`
const EngError = 'An error has occurred. Repeat later.'
const EngError2 = 'Send a link or a command.'
export { EngError, EngError2, EngLimitMessage, EngMessageStart }
