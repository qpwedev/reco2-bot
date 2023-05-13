import dotenv from 'dotenv'
dotenv.config()

import TelegramBot from 'node-telegram-bot-api';

import express from 'express';
import cors from 'cors';
import { startHandler } from './bot-handlers/commands';
import { webCallbackHandler } from './bot-handlers/web-callback';
import { completeOrderHandler } from './web-handlers/complete-order';

const token = process.env.BOT_TOKEN!;
const webAppUrl = 'https://ornate-selkie-c27577.netlify.app';

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());


bot.onText(/\/start/, async (msg) => {
    startHandler(bot, msg);
});

bot.on('message', async (msg) => {
    if (msg?.web_app_data?.data) {
        webCallbackHandler(bot, msg);
    }
});

app.post('/web-data', completeOrderHandler)

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))