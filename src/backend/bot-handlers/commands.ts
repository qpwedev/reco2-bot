const startHandler = async (bot: any, msg: any) => {
    const chatId = msg.chat.id;

    await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Сделать заказ', web_app: { url: 'https://google.com' } }]
            ]
        }
    })
}

export {
    startHandler,
}
