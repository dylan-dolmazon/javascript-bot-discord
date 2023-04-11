"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const Trigger = require('../models/TriggerSchema');
const TriggerConteur = require('../Models/TriggerConteurSchema');
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('listtrigger')
    .setDescription('list of triggers');
exports.command = {
    name: "listtrigger",
    builder: builder,
    execute: async (interaction) => {
        const triggersName = [];
        const triggers = [];
        await Trigger.find().then((trigger) => {
            trigger.forEach(element => {
                triggersName.push(element.name);
                triggers.push(element);
            });
        });
        const triggerConteurtab = [];
        for (let i = 0; i < triggers.length; i++) {
            await TriggerConteur.find({ trigger_name: triggers[i].name }).then((values) => {
                triggerConteurtab.push(values);
            });
        }
        const triggerConteurtabSorted = [];
        for (let i = 0; i < triggerConteurtab.length; i++) {
            triggerConteurtabSorted[i] = { nb_use: triggerConteurtab[i][0].nb_use, user_name: triggerConteurtab[i][0].user_id };
            for (let j = 0; j < triggerConteurtab[i].length; j++) {
                if (triggerConteurtab[i][j].nb_use > triggerConteurtabSorted[i]) {
                    triggerConteurtabSorted[i] = { nb_use: triggerConteurtab[i][j].nb_use, user_name: triggerConteurtab[i][j].user_id };
                }
            }
        }
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle(`Les trigger disponibles sont:`)
            .setTimestamp();
        for (let i = 0; i < triggersName.length; i++) {
            embed.addFields({ name: "Trigger", value: triggersName[i] + " <@" + triggerConteurtabSorted[i].user_name + "> Premier avec " + triggerConteurtabSorted[i].nb_use + " utilisations." });
        }
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
