import express from "express";
import morgan from "morgan";
import TelegramBot from "node-telegram-bot-api";
import { token } from "./token.js";

const PORT = 9000;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

// console.log(token);

// 创建一个 Bot 实例
const bot = new TelegramBot(token, { polling: true });
// const bot = new TelegramBot(process.env.TELEGRAM_BOT_KEY);

bot.on("message", (msg) => {
    const chatId = msg.chat.id; // 获取聊天 ID
    console.log(msg);
});

// // 获取更新的函数
// async function fetchUpdates() {
//     try {
//         const updates = await bot.getUpdates({
//             limit: 10, // 获取最多 10 个更新
//             offset: 0, // 从更新 ID 0 开始
//             timeout: 10000, // 轮询的超时时间为 1 秒
//         });
//         console.log("Updates:", updates);
//         // console.log(updates.chat);
//     } catch (error) {
//         console.error("Error fetching updates:", error);
//     }
// }
// fetchUpdates();

// {
//     "chatId": 7431329263,
//     "text" : "hallo, only test"
// }

app.post("/message", (req, res) => {
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

    // res.status(200).json({ message: "Message received!" });
});

app.all("/message", (req, res) => {
    return res.status(405).json({ error: "Method not allowed!" });
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}... 🐒`);
});
