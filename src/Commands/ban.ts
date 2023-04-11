import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../types";
const builder = new SlashCommandBuilder()
.setName("exclure")
.setDescription("Ban someone from the server")
.addUserOption(option => 
  option
  .setName("membre")
  .setDescription("membre to ban")
  .setRequired(true)
  )
  .addStringOption(option => 
      option
  .setName("raison")
  .setDescription("raison to ban")
  .setRequired(false)
  );

export const command: Command ={
    name: "exclure",
    builder: builder as SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => {
        const member = interaction.options.getUser('membre') as User;
        const raison : string = interaction.options.get('raison')?.value ? interaction.options.get('raison')?.value as string : 'aucune raison valable';

        interaction.guild?.members.ban(member,{reason: raison});
        
        let embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("CASSE TOI DE LAAAAA !")
        .setDescription(`<@${member?.id}> à été exclu, la raison : ${raison}`)
        .setAuthor({name: `${interaction.client.user.username}` , iconURL: interaction.client.user.avatarURL() as string})
        .setThumbnail(member?.avatarURL())
        .setTimestamp();
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
}



