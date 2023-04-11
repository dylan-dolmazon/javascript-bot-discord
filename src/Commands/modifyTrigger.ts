import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../types";

const Trigger = require('../models/TriggerSchema');

const builder = new SlashCommandBuilder()
.setName('modifytrigger')
.setDescription('Add a trigger')
.addStringOption(option=>
                option.setName("trigger")
                .setDescription("le trigger qui va être modifié")
                .setRequired(true))
.addStringOption(option=>
     option.setName("triggercontent")
    .setDescription("lecontenu du trigger")
    .setRequired(false))
.addStringOption(option=>
    option.setName("triggerimage")
    .setDescription("l'image du trigger")
    .setRequired(false))


export const command: Command ={
    name: "modifytrigger",
    builder: builder as SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => {
        
        const triggerName: string = interaction.options.get('trigger')?.value as string; 
        const triggerContent: string|null = interaction.options.get('triggercontent')?.value ? interaction.options.get('triggercontent')?.value as string : null; 
        const triggerimage: string|null = interaction.options.get('image')?.value ? interaction.options.get('image')?.value as string : null; 

        Trigger.findOneAndUpdate({name: triggerName},{name: triggerName,response: triggerContent,image: triggerimage})
        .then((trigger : any) => {
                let embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`Trigger ${triggerName} à bien été mis à jours`)
                .setTimestamp();
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
        }).catch(() => {
            let embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Trigger ${triggerName} n'éxiste pas`)
            .setTimestamp();

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
    })
    }
}



