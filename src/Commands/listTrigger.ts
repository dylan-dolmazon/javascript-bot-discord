import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../types";

const Trigger = require('../models/TriggerSchema');
const TriggerConteur = require('../Models/TriggerConteurSchema'); 

const builder = new SlashCommandBuilder()
.setName('listtrigger')
.setDescription('list of triggers')

export const command: Command ={
    name: "listtrigger",
    builder: builder as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {
        
        const triggersName: string[] = []; 
        const triggers: any [] = [];
        
        await Trigger.find().then((trigger: any[]) => {
            trigger.forEach(element => {
                triggersName.push(element.name);
                triggers.push(element);
            });
        });
        
        const triggerConteurtab: any[] = [];

        for (let i = 0; i < triggers.length; i++) {
            await TriggerConteur.find({trigger_name: triggers[i].name}).then((values: any[]) => {
                triggerConteurtab.push(values)
            })
        }

        const triggerConteurtabSorted : any[] = []; 

        for(let i = 0; i < triggerConteurtab.length; i++) {
            triggerConteurtabSorted[i] = {nb_use: triggerConteurtab[i][0].nb_use, user_name:  triggerConteurtab[i][0].user_id};
            for(let j = 0; j < triggerConteurtab[i].length; j++) {
                if(triggerConteurtab[i][j].nb_use > triggerConteurtabSorted[i]){
                    triggerConteurtabSorted[i] = {nb_use: triggerConteurtab[i][j].nb_use, user_name:  triggerConteurtab[i][j].user_id};
                }
            }
        }

        let embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Les trigger disponibles sont:`)
            .setTimestamp();
            for (let i = 0; i < triggersName.length; i++) {
                embed.addFields({ name: "Trigger", value:  triggersName[i] + " <@"+ triggerConteurtabSorted[i].user_name + "> Premier avec " + triggerConteurtabSorted[i].nb_use + " utilisations."})
            }
            interaction.reply({
                 embeds: [embed],
                 ephemeral: true
        })        
    }
}



