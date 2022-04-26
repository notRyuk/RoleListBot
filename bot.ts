import {Client, Intents, Options} from 'discord.js';
import { config as envConfig} from 'dotenv';
import { join as joinPath} from 'path'
import WOKCommands  from 'wokcommands'

envConfig();

const TOKEN = String(process.env.TOKEN) || ""

const bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    makeCache: Options.cacheEverything()
})


bot.on("ready", () => {
    console.log("Starting the bot...")
    const CommandHandler = new WOKCommands(bot, {
        commandDir: joinPath(__dirname, "commands"),
        typeScript: true
    })
    CommandHandler.setDefaultPrefix("$")
})

bot.login(TOKEN)