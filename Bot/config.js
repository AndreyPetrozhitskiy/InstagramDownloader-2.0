import { limitText } from './text/exportText.js'

const limitConfig = () => ({
    timeFrame: 60000, // 60 секунд
    limit: 5, // одно сообщение
    onLimitExceeded: (ctx) => {
        const language = ctx.state.language || ctx.from.language_code;
        const messageFunction = limitText[language] || limitText['en'];
        ctx.reply(messageFunction);
    },
});

// Более продвинутый вариант, но надо доделывать
// const userBlockList = new Map();
// const limitConfig = () => ({
//     timeFrame: 30000, // 30 секунд
//     limit: 1, // одно сообщение
//     onLimitExceeded: (ctx) => {
//         const userId = ctx.from.id;
//         const language = ctx.state.language || ctx.from.language_code;
//         const messageFunction = limitText[language] || limitText['en'];
        
//         // Проверка на наличие блокировки пользователя
//         if (!userBlockList.has(userId)) {
//             userBlockList.set(userId, Date.now());
//             ctx.reply(messageFunction);
//         } else {
//             const blockTime = 60000; // 1 минута блокировки
//             const firstViolationTime = userBlockList.get(userId);
            
//             if (Date.now() - firstViolationTime > blockTime) {
//                 userBlockList.delete(userId); // Удаляем блокировку после истечения времени
//             } else {
//                 ctx.reply('Вы заблокированы за спам. Пожалуйста, подождите.');
//             }
//         }
//     },
// });
export { limitConfig }
