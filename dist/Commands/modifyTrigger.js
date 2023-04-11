"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const Trigger = require('../models/TriggerSchema');
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('modifytrigger')
    .setDescription('Add a trigger')
    .addStringOption(option => option.setName("trigger")
    .setDescription("le trigger qui va être modifié")
    .setRequired(true))
    .addStringOption(option => option.setName("triggercontent")
    .setDescription("lecontenu du trigger")
    .setRequired(false))
    .addStringOption(option => option.setName("triggerimage")
    .setDescription("l'image du trigger")
    .setRequired(false));
exports.command = {
    name: "modifytrigger",
    builder: builder,
    execute: (interaction) => {
        const triggerName = interaction.options.get('trigger')?.value;
        const triggerContent = interaction.options.get('triggercontent')?.value ? interaction.options.get('triggercontent')?.value : null;
        const triggerimage = interaction.options.get('image')?.value ? interaction.options.get('image')?.value : null;
        Trigger.findOneAndUpdate({ name: triggerName }, { name: triggerName, response: triggerContent, image: triggerimage })
            .then((trigger) => {
            let embed = new discord_js_1.EmbedBuilder()
                .setColor("Random")
                .setTitle(`Trigger ${triggerName} à bien été mis à jours`)
                .setTimestamp();
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }).catch(() => {
            let embed = new discord_js_1.EmbedBuilder()
                .setColor("Random")
                .setTitle(`Trigger ${triggerName} n'éxiste pas`)
                .setTimestamp();
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        });
    }
};
