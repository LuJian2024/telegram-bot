import express from "express";
import morgan from "morgan";
import { sendMessage } from "./bot.js";

const PORT = 9000;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.post("/message", sendMessage);

app.all("/message", (req, res) => {
    return res.status(405).json({ error: "Method not allowed!" });
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}... 🐒`);
});
