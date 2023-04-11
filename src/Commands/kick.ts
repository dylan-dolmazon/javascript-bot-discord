import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../types";
const builder = new SlashCommandBuilder()
.setName('virer')
.setDescription('virer un membre du serveur')
.addUserOption(option=>
                option.setName("membre")
                .setDescription("Le membre que vous souhaitez expulser")
                .setRequired(true))
.addStringOption(option=>
                  option.setName("raison")
                  .setDescription("la raison de l'expulsion")
                  .setRequired(false));
export const command: Command ={
    name: "virer",
    builder: builder as SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => {
        
        let member = interaction.options.getUser('membre') as User;
        let raison :string = interaction.options.get('raison')?.value ? interaction.options.get('raison')?.value as string : 'aucune raison valable' ;
        
        interaction.guild?.members.kick(member, raison)
        
        let embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Dehoooooors !")
        .setDescription(`${member.tag} à été viré, la raison : ${raison}`)
        .setAuthor({name: `${interaction.client.user.username}` , iconURL: interaction.client.user.avatarURL() as string})
        .setThumbnail(member?.avatarURL());
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
}



