import { EasyBot } from "@easybotjs/core";
import pino, { P } from "pino";

export function logger(options?: P.LoggerOptions, bot?: EasyBot): P.Logger {

    if (!options) {
        options = {
            level: "info",
            base: undefined
        };
    }

    console.log(options);

    const Logger = pino(options);

    process.on("unhandledRejection", (reason, promise) => {
        Logger.fatal(`Unhandled Rejection at: ${promise} reason: ${reason}`);
    });

    process.on("uncaughtException", (error) => {
        Logger.fatal(error);
    });

    if(!bot) {
        Logger.warn("Logger is not attached to any bot");
        return Logger;
    }

    bot.once("ready", () => {
        Logger.info(`Ready to serve ${bot.guilds.cache.size} guilds as ${bot.user?.tag}`);
    });

    bot.on("debug", (info) => {
        Logger.debug(info);
    });

    bot.on("warn", (info) => {
        Logger.warn(info);
    });

    bot.on("error", (info) => {
        Logger.fatal(info);
    });

    return Logger;
}