import winston from "winston";
import TelegramBot from "node-telegram-bot-api";
import TransportStream from "winston-transport";

// const bot = new TelegramBot(process.env.TELEGRAM_BOT_API, { polling: false });

// class TelegramTransport extends TransportStream {
//   constructor(options) {
//     super(options);
//     this.level = options.level || "info";
//     this.chatId = options.chatId;
//   }

//   public log(info: any, callback) {
//     setImmediate(() => {
//       this.emit("logged", info);
//     });

//     // Send log message to Telegram
//     const message = ` ${new Date().toISOString()} - [${info.level.toUpperCase()}] ${
//       info.message
//     }`;
//     bot.sendMessage(this.chatId, message);

//     callback();
//   }
// }

const logger = winston.createLogger({
  transports: [
    // new TelegramTransport({ level: "info", chatId: process.env.CHAT_ID }),
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

export default logger;
