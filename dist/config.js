"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const rest = new discord_js_1.REST({ version: '10' });
rest.setToken(process.env.DISCORD_TOKEN);
let commandDir = __dirname + "/Commands";
let commandJson = [];
const commandsFiles = fs_1.default.readdirSync(commandDir);
for (const commandsFile of commandsFiles) {
    const command = require(`${commandDir}/${commandsFile}`).command;
    commandJson.push(command.builder.toJSON());
}
rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), { body: commandJson })
    .then(() => console.log("Slash commands reloaded."))
    .catch((error) => console.log("Error while puting slash commands: \n", error));
