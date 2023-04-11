"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const Trigger = require('../models/TriggerSchema');
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('trigger')
    .setDescription('Add a trigger')
    .addStringOption(option => option.setName("trigger")
    .setDescription("les élements qui vont faire réagir le bot")
    .setRequired(true))
    .addStringOption(option => option.setName("response")
    .setDescription("la réponse du bot")
    .setRequired(true))
    .addStringOption(option => option.setName("image")
    .setDescription("l'image que peut afficher le bot'")
    .setRequired(false));
exports.command = {
    name: "trigger",
    builder: builder,
    execute: (interaction) => {
        const triggerName = interaction.options.get('trigger')?.value;
        const reponse = interaction.options.get('response')?.value;
        const image = interaction.options.get('image')?.value ? interaction.options.get('image')?.value : null;
        Trigger.findOne({ name: triggerName })
            .then((trigger) => {
            if (trigger === null) {
                const newTrigger = new Trigger({
                    name: triggerName,
                    response: reponse,
                    image: image
                });
                newTrigger.save();
                let embed = new discord_js_1.EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`Trigger ${triggerName} à été crée avec succés`)
                    .setTimestamp();
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
            else {
                let embed = new discord_js_1.EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`Trigger ${triggerName} exists déjà`)
                    .setTimestamp();
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
        });
    }
};
