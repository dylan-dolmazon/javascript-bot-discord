import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

const Trigger = require('../models/TriggerSchema');
const TriggerConteur = require('../Models/TriggerConteurSchema'); 

const builder = new SlashCommandBuilder()
.setName('inspecttrigger')
.setDescription('Add a trigger')
.addStringOption(option=>
    option.setName("trigger")
    .setDescription("le trigger à inspecter")
    .setRequired(true))


export const command: Command ={
    name: "inspecttrigger",
    builder: builder as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {
        
        const triggerName: string = interaction.options.get('trigger')?.value as string;
        let trigger: any = null;
        
        await Trigger.findOne({name: triggerName}).then((element: any) => {
            trigger = element;
        });
        
        let triggerConteurtab: any[] = [];
        await TriggerConteur.find({trigger_name: trigger.name}).then((values: any) => {
            triggerConteurtab = values;
        })

        let count: number = 0;

        for (let i = 0; i < triggerConteurtab.length;i++){
            count += triggerConteurtab[i].nb_use;
        }

        await triggerConteurtab.sort((a, b) => (a.nb_use < b.nb_use) ? 1 : -1);

        let embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Les trigger ${triggerName}`)
            .setTimestamp()
            .setDescription(`Trigger Phrase: ${triggerName} \n Trigger: ${trigger.response} \n Utilisations total: ${count} `);
            for (let i = 0; i < triggerConteurtab.length; i++) {
                embed.addFields({ name: "Trigger", value: '<@'+triggerConteurtab[i].user_id+ "> " +triggerConteurtab[i].nb_use+ " utilisations"})
            }
            interaction.reply({
                 embeds: [embed],
                 ephemeral: true
        })        
    }
}

