import cors from 'cors';
import dotenv from 'dotenv'
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import { startHandler } from './bot-handlers/commands';
import { webCallbackHandler } from './bot-handlers/web-callback';
import { completeOrderHandler, connectHandler } from './web-handlers/complete-order';

dotenv.config()

// Asserting that BOT_TOKEN is defined
if (!process.env.BOT_TOKEN || !process.env.WEBAPP_URL) {
    throw new Error(
        'env vars must be defined in the .env file'
    );
}

const bot = new TelegramBot(
    process.env.BOT_TOKEN,
    { polling: true }
);

const app = express();

// Middleware
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

// web app data
app.post('/web-data/complete-order', completeOrderHandler)

// connector
app.post('/connector/connect', connectHandler)
app.post('/connector/disconnect', completeOrderHandler)

const PORT = 8000;

app.listen(
    PORT,
    () => console.log('server started on PORT ' + PORT)
)