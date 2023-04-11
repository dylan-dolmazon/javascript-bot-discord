import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../types";
import ytdlcore from "ytdl-core";
import ytsearch from 'yt-search';
import { MusicHandler, AllMusicHandler } from "../Class/musicHandler";

import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";

const builder = new SlashCommandBuilder()
.setName('jouer')
.setDescription('Jouer une musique provenant de youtube')
.addStringOption(option=>
                option.setName("musique")
                .setDescription("nom de la musique, ou URL youtube")
                .setRequired(true));

export const command: Command ={
    name: "jouer",
    builder: builder as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {
        
        const member = interaction.member?.user as User
        const user = await interaction.guild?.members.fetch(member.id);
        
        if(!interaction.member?.voice.channel) return interaction.reply('vous devez etre dans un channel vocal pour executer cette commande')

        const param :string= interaction.options.get('musique')?.value as string 
        let url = undefined
        let urlImage = undefined
        let nameSong = undefined
        if(!param)return interaction.reply('Musique incorrecte');
        if(ytdlcore.validateURL(param)){
            url = param
            nameSong = url
            urlImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/CD_icon_test.svg/1024px-CD_icon_test.svg.png"
        }else{
            const musicFound = await ytsearch(param);
            const music = musicFound.videos.slice(0,1)[0]
            url = music.url;    
            urlImage = music.thumbnail
            nameSong = music.title
        }
        
        const stream = ytdlcore(url, { filter: "audioonly"});
        if(interaction.guild!= null){
            const voiceConnection = joinVoiceChannel({
                channelId: interaction.member?.voice.channel.id,
                guildId: interaction.guildId as string,
                adapterCreator: interaction.guild?.voiceAdapterCreator,
            })
            const player = createAudioPlayer();
            const ressource = createAudioResource(stream);
            player.play(ressource);
            voiceConnection.subscribe(player);
            const musicHandler = AllMusicHandler.filter((handler)=>{
                return handler.getServer() as any == interaction.guildId;
            })
            if(musicHandler.length == 0){
                const musicHandler = new MusicHandler(interaction.guildId, player)
                AllMusicHandler.push(musicHandler);
            }else{
                musicHandler[0].setAudioPlayer(player)
            }
           
            player.on(AudioPlayerStatus.Idle,()=>{
                console.log('The audio player has started playing!');
            })
     
        }


        let embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Do Re Mi Fa Sol La Si Do")
        .setDescription(`**${nameSong}** en cours de diffusion !`)
        .setAuthor({name: `${interaction.client.user.username}` , iconURL: interaction.client.user.avatarURL() as string})
        .setThumbnail(urlImage)
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        }) 
    }
}




