import TelegramBot from 'node-telegram-bot-api';
import { Message } from 'node-telegram-bot-api';

const webCallbackHandler = async (bot: TelegramBot, msg: Message) => {
    const chatId = msg.chat.id;

    try {
        const data = JSON.parse(msg?.web_app_data?.data ?? "{}")
        console.log(data)
        await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
        await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
        await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

        setTimeout(async () => {
            await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
        }, 3000)
    } catch (e) {
        console.log(e);
    }
}


export {
    webCallbackHandler,
}