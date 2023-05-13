import { mainMenuText, webAppStartBtnText } from '../message-text/constants'


const startHandler = async (bot: any, msg: any) => {
    const chatId = msg.chat.id;

    await bot.sendMessage(chatId, mainMenuText, {
        reply_markup: {
            inline_keyboard: [
                [{ text: webAppStartBtnText, web_app: { url: 'https://google.com' } }]
            ]
        },
        parse_mode: 'HTML'
    })
}

export {
    startHandler,
}
