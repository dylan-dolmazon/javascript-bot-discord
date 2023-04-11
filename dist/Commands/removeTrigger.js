"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const Trigger = require('../models/TriggerSchema');
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('rmtrigger')
    .setDescription('Add a trigger')
    .addStringOption(option => option.setName("trigger")
    .setDescription("les élements qui vont faire réagir le bot")
    .setRequired(true));
exports.command = {
    name: "rmtrigger",
    builder: builder,
    execute: (interaction) => {
        const triggerName = interaction.options.get('trigger')?.value;
        Trigger.findOne({ name: triggerName })
            .then((trigger) => {
            if (trigger === null) {
                let embed = new discord_js_1.EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`Trigger ${triggerName} n'éxiste pas`)
                    .setTimestamp();
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
            else {
                trigger.delete();
                let embed = new discord_js_1.EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`Trigger ${triggerName} à bien été supprimé`)
                    .setTimestamp();
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
        });
    }
};
