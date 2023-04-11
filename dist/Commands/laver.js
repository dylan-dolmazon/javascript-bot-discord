"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const builder = new discord_js_1.SlashCommandBuilder()
    .setName("laver")
    .setDescription("clear Message from the current channel.")
    .addNumberOption(option => option
    .setName("numbermessage")
    .setDescription("Number message delete")
    .setRequired(true)
    .setMinValue(1)
    .setMaxValue(100))
    .addBooleanOption(option => option
    .setName("silent")
    .setDescription("choose if messages clear everyone see the command")
    .setRequired(false));
exports.command = {
    name: "laver",
    builder: builder,
    execute: (interaction) => {
        const nbmessage = interaction.options.get("numbermessage")?.value;
        const silent = interaction.options.get("silent")?.value;
        if (!nbmessage) {
            return interaction.reply("Mettez un nombre !!!!");
        }
        else {
            let channel = interaction.channel;
            channel.bulkDelete(nbmessage);
        }
        interaction.reply({
            content: `Suuuuuuuupresion des messages`,
            ephemeral: silent
        });
    }
};
