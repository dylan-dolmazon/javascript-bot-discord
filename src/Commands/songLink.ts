import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import axios from 'axios';
import { SongType, Platform } from "../Types/SongType";

const builder = new SlashCommandBuilder()
.setName('songlink')
.setDescription('Search SongLink')
.addStringOption(option=>
    option.setName("musiquelink")
    .setDescription("le lien youtube de la musique")
    .setRequired(true))
.addBooleanOption((option) =>
    option.setName('getallurl').setDescription('juste les liens importants ?').setRequired(false))

export const command: Command ={
    name: "songlink",
    builder: builder as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {

        const allLink : boolean = interaction.options.get("getalllink")?.value ?  interaction.options.get("getalllink")?.value as boolean : false;

        const musiqueLink : string= interaction.options.get("musiquelink")?.value as string;
        const link : string = `https://api.song.link/v1-alpha.1/links?url=${musiqueLink}&userCountry=FR&songIfSingle=true`;

        let songPlatform : Map<string,Platform> = new Map<string,Platform>(); 
        let globalLink : string = "pageUrl";
        let title : string = "Title";
        let ArtistName : string = "ArtistName";
        let thumbnailUrl : string = "https://www.miksmusic.com/wp-main/uploads/video-monetiztion-not-available-991x519.jpg";

        const keysToKeep = new Set(["deezer", "amazonMusic", "youtubeMusic", "spotify","itunes","youtube"]);

        await getJSONData(link).then(data => {
            const content = JSON.stringify(data);
            const tmp : SongType = JSON.parse(content); 
            const info : string[] = Object.keys(tmp.entitiesByUniqueId);
            const platforms : string[] = Object.keys(tmp.linksByPlatform);
        
            globalLink = tmp.pageUrl;
            title = tmp.entitiesByUniqueId[info[0]].title;
            ArtistName = tmp.entitiesByUniqueId[info[0]].artistName;
            thumbnailUrl = tmp.entitiesByUniqueId[info[0]].thumbnailUrl;
        
            platforms.forEach(platform => {
                if(!allLink ){
                    if(keysToKeep.has(platform)){
                        songPlatform.set(platform,tmp.linksByPlatform[platform]);
                    }
                }else {
                    songPlatform.set(platform,tmp.linksByPlatform[platform]);
                }
            });
        }).catch(error => {
            console.log(error);
            globalLink = "Music not found";
            title = "Your link";
            ArtistName = "return no results";
        });


        let embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`${title} by ${ArtistName}`)
            .setTimestamp()
            .setDescription(`Global link: ${globalLink}`)
            .setThumbnail(thumbnailUrl);

        for(let entry of songPlatform.entries()){
            embed.addFields({ name: entry[0], value: entry[1].url })
        }

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })        
    }
}

async function getJSONData(link: string): Promise<any> {
    try {
        const response = await axios.get(link);
        return response.data;
    } catch (error) {
        return error;
    }
}
