require("dotenv").config({ path: `${__dirname}/.env` });
const TelegramBot = require('node-telegram-bot-api');

const token = ''

const bot = new TelegramBot(token, { polling: true });

const reactions = [
    'Да.',
    'Нет.',
    'Xорошо.',
    'Плохо.',
    'Очень хорошо.',
    'Очень плохо.',
    'Смешно.',
    'Не смешно.',
    'Очень cмешно.',
    'Бoян.',
    'Не все видели.',
    "Урбана ответ.",
    'Очень не смешно.'
];

function shouldISendMessage(msg) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const isFresh = currentTimestamp - msg.date < (1 * 60);
    const messageHasPhoto = Boolean(msg.photo)

    return isFresh && (messageHasPhoto);
    // return isFresh && (messageHasPhoto || msg.from.username === 'urbanlich');
}

bot.on('message', function (msg) {
    const chatId = msg.chat.id;

    if (shouldISendMessage(msg)) {
        const message = reactions[Math.floor(Math.random() * reactions.length)];

        setTimeout(function () {
            bot.sendMessage(chatId, message);
        }, 2000);
    }
});