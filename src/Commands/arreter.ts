import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../types";
import { AllMusicHandler } from "../Class/musicHandler";

import { getVoiceConnection } from "@discordjs/voice";
const builder = new SlashCommandBuilder()
.setName('arreter')
.setDescription('arrêter la musique en cours')


export const command: Command ={
    name: "arreter",
    builder: builder as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {
        
        const member = interaction.member?.user as User
        const user = await interaction.guild?.members.fetch(member.id);
        
        if(!interaction.member?.voice.channel) return interaction.reply('vous devez etre dans un channel vocal pour executer cette commande')

       
       
        if(interaction.guild!= null){
            const voiceConnection = getVoiceConnection(interaction.member?.voice.channel.guild.id);
            const handler = AllMusicHandler.filter((value)=>value.getServer() as any==interaction.guildId);
            handler[0].audioPlayer.stop();
            voiceConnection?.destroy();
        }


        let embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Enfin !")
        .setDescription(`J'arrête de diffuser cette musique insuportable ...`)
        .setAuthor({name: `${interaction.client.user.username}` , iconURL: interaction.client.user.avatarURL() as string})
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        }) 
    }
}




