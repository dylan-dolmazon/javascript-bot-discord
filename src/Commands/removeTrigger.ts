import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

const Trigger = require('../models/TriggerSchema');

const builder = new SlashCommandBuilder()
.setName('rmtrigger')
.setDescription('Add a trigger')
.addStringOption(option=>
                option.setName("trigger")
                .setDescription("les élements qui vont faire réagir le bot")
                .setRequired(true))

export const command: Command ={
    name: "rmtrigger",
    builder: builder as SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => {
        
        const triggerName: string = interaction.options.get('trigger')?.value as string; 
        
        Trigger.findOne({name: triggerName})
        .then((trigger : any) => {
            if(trigger === null){
                let embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`Trigger ${triggerName} n'éxiste pas`)
                .setTimestamp();

                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }else {
                trigger.delete();
                let embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`Trigger ${triggerName} à bien été supprimé`)
                .setTimestamp();

                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }
        })
    }
}



