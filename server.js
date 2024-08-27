import express from "express";
import morgan from "morgan";
import TelegramBot from "node-telegram-bot-api";

const PORT = 9000;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

const token = "7468433802";
// 创建一个 Bot 实例
const bot = new TelegramBot(token, { polling: true });

app.post("/message", (req, res) => {
    res.status().json();
});

app.all("/message", (req, res) => {
    return res.status(405).json({ error: "Method not allowed!" });
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}... 🐒`);
});
