"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    partials: [
        discord_js_1.Partials.Message,
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.Reaction,
    ],
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.DirectMessageReactions
    ]
});
if (!process.env.DISCORD_TOKEN)
    console.log("Please provide a discord app token in your .env file.");
else
    client.login(process.env.DISCORD_TOKEN)
        .then(() => { console.log("Bot connected ! "); })
        .catch((error) => { console.log(error); });
exports.default = client;
