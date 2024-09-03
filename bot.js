import TelegramBot from "node-telegram-bot-api";
import { token } from "./token.js";

// 创建一个 Bot 实例
const bot = new TelegramBot(token, { polling: true });
// const bot = new TelegramBot(process.env.TELEGRAM_BOT_KEY);

// console.log(token);

bot.on("message", (msg) => {
    const chatId = msg.chat.id; // 获取聊天 ID
    console.log(msg);
});

//用POST请求触发bot发送请求的消息
export const sendMessage = (req, res) => {
    const { chatId, text } = req.body;

    // 使用 Telegram Bot 发送消息
    bot.sendMessage(chatId, text)
        .then(() => {
            res.status(200).json({ message: "Message sent successfully!" });
        })
        .catch((error) => {
            console.error("Error sending message:", error);
            res.status(500).json({ error: "Failed to send message." });
        });
    //重复发送消息会报错
    // res.status(200).json({ message: "Message received!" });
};
