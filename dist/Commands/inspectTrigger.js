"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const Trigger = require('../models/TriggerSchema');
const TriggerConteur = require('../Models/TriggerConteurSchema');
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('inspecttrigger')
    .setDescription('Add a trigger')
    .addStringOption(option => option.setName("trigger")
    .setDescription("le trigger à inspecter")
    .setRequired(true));
exports.command = {
    name: "inspecttrigger",
    builder: builder,
    execute: async (interaction) => {
        const triggerName = interaction.options.get('trigger')?.value;
        let trigger = null;
        await Trigger.findOne({ name: triggerName }).then((element) => {
            trigger = element;
        });
        let triggerConteurtab = [];
        await TriggerConteur.find({ trigger_name: trigger.name }).then((values) => {
            triggerConteurtab = values;
        });
        let count = 0;
        for (let i = 0; i < triggerConteurtab.length; i++) {
            count += triggerConteurtab[i].nb_use;
        }
        await triggerConteurtab.sort((a, b) => (a.nb_use < b.nb_use) ? 1 : -1);
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle(`Les trigger ${triggerName}`)
            .setTimestamp()
            .setDescription(`Trigger Phrase: ${triggerName} \n Trigger: ${trigger.response} \n Utilisations total: ${count} `);
        for (let i = 0; i < triggerConteurtab.length; i++) {
            embed.addFields({ name: "Trigger", value: '<@' + triggerConteurtab[i].user_id + "> " + triggerConteurtab[i].nb_use + " utilisations" });
        }
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
