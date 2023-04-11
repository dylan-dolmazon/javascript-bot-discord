import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../types";
const builder = new SlashCommandBuilder()
.setName("unban")
.setDescription("Ban someone from the server")
.addUserOption(option => 
  option
  .setName("membre")
  .setDescription("membre to unban")
  .setRequired(true)
  )

export const command: Command ={
    name: "unban",
    builder: builder as SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => {
        const member = interaction.options.getUser('membre') as User;

        interaction.guild?.members.unban(member);

        let embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Bon retour l'ami !")
        .setDescription(`<@${member?.id}> à été débani.`)
        .setAuthor({name: `${interaction.client.user.username}` , iconURL: interaction.client.user.avatarURL() as string})
        .setThumbnail(member?.avatarURL())
        .setTimestamp();

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
}