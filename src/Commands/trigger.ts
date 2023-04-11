import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

const Trigger = require('../models/TriggerSchema');

const builder = new SlashCommandBuilder()
.setName('trigger')
.setDescription('Add a trigger')
.addStringOption(option=>
                option.setName("trigger")
                .setDescription("les élements qui vont faire réagir le bot")
                .setRequired(true))
.addStringOption(option=>
                  option.setName("response")
                  .setDescription("la réponse du bot")
                  .setRequired(true))
.addStringOption(option=>
                    option.setName("image")
                    .setDescription("l'image que peut afficher le bot'")
                    .setRequired(false));
export const command: Command ={
    name: "trigger",
    builder: builder as SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => {
        
        const triggerName: string = interaction.options.get('trigger')?.value as string; 
        const reponse: string = interaction.options.get('response')?.value as string; 
        const image: string|null = interaction.options.get('image')?.value ? interaction.options.get('image')?.value as string : null ; 
        
        Trigger.findOne({name: triggerName})
        .then((trigger : any) => {
            if(trigger === null){
                const newTrigger = new Trigger({
                    name: triggerName,
                    response: reponse,
                    image: image
                })
                newTrigger.save();
                let embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`Trigger ${triggerName} à été crée avec succés`)
                .setTimestamp();

                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }else {
                let embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`Trigger ${triggerName} exists déjà`)
                .setTimestamp();

                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }
        })
    }
}



