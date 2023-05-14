import { Database } from '../db/database';
import { mainMenuText, webAppStartBtnText } from '../message-text/constants'


const startHandler = async (bot: any, msg: any) => {
    const chatId = msg.chat.id;


    const db = new Database('database');

    db.addUser(chatId, msg.chat.username)

    await bot.sendMessage(chatId, mainMenuText, {
        reply_markup: {
            inline_keyboard: [
                [{ text: webAppStartBtnText, web_app: { url: process.env.WEBAPP_URL } }]
            ]
        },
        parse_mode: 'HTML'
    })
}

export {
    startHandler,
}
