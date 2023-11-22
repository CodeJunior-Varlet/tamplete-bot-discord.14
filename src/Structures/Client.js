import { Client, Collection } from 'discord.js';
import 'dotenv/config';
import eventHandler from './Handlers/commandHandler.js';
import commandHandler from './Handlers/eventHandler.js';

export default class MyClient extends Client {
    constructor({ debug = true, ...options }) {
        super({ intents: 131071, ...options });

        this.debug = debug;
        this._token = process.env.DISCORD_BOT_TOKEN;
        this.slashCommands = new Collection();

        if (!this._token) {
            throw new Error("DISCORD_BOT_TOKEN is not defined in your environment.");
        }
    }

    async run() {
        eventHandler(this);
        commandHandler(this);

        this.login(this._token);
    }
}