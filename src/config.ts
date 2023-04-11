import { REST, Routes } from "discord.js";
import dotenv from 'dotenv';
import { Command } from "./types";
import fs from 'fs';

dotenv.config();

const rest = new REST({version: '10'});

rest.setToken(process.env.DISCORD_TOKEN);
let commandDir = __dirname + "/Commands";

let commandJson: any[] = [];
const commandsFiles = fs.readdirSync(commandDir);
for (const commandsFile of commandsFiles){
    const command: Command = require(`${commandDir}/${commandsFile}`).command;
    commandJson.push(command.builder.toJSON());
}


rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: commandJson})
        .then(() => console.log("Slash commands reloaded."))
        .catch((error)  => console.log("Error while puting slash commands: \n", error));