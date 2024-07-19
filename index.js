import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import { sequelize } from "./Database/sequlize.js";
import { downloadInstagram } from "./Function/DownloadInst.js";
import { createBot } from "./Bot/bot.js";
dotenv.config();
const { PORT, BOT_TOKEN } = process.env;

const app = express();
const bot = createBot(BOT_TOKEN);

app.use(cors());
app.use(express.json());

async function startBot() {
  try {
    await bot.start();
    console.log("Бот успешно запущен и ожидает сообщений.");
  } catch (error) {
    console.error("Ошибка при запуске бота:", error);
  }
}

startBot();

// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/домен.com/privkey.pem",
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/домен.com/fullchain.pem",
//   "utf8"
// );

// const credentials = { key: privateKey, cert: certificate };
// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(PORT, async () => {
//     console.log(`HTTPS Server running on port ${PORT}`);
// try {
//   await sequelize.authenticate();
//   console.log("Подключение к базе данных успешно");
// } catch (error) {
//   console.error("Не получилось подключиться к базе данных:", error);
// }
//   });

// Версия для разработки

app.listen(PORT, async () => {
  console.log(`HTTP Server running on port ${PORT}`);
  try {
    // подключение к бд
    await sequelize.authenticate();
    console.log("Подключение к базе данных успешно");
  } catch (error) {
    console.error("Не получилось подключиться к базе данных:", error);
  }
});
