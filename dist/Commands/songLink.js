"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('songlink')
    .setDescription('Search SongLink')
    .addStringOption(option => option.setName("musiquelink")
    .setDescription("le lien youtube de la musique")
    .setRequired(true))
    .addBooleanOption((option) => option.setName('getallurl').setDescription('juste les liens importants ?').setRequired(false));
exports.command = {
    name: "songlink",
    builder: builder,
    execute: async (interaction) => {
        const allLink = interaction.options.get("getalllink")?.value ? interaction.options.get("getalllink")?.value : false;
        const musiqueLink = interaction.options.get("musiquelink")?.value;
        const link = `https://api.song.link/v1-alpha.1/links?url=${musiqueLink}&userCountry=FR&songIfSingle=true`;
        let songPlatform = new Map();
        let globalLink = "pageUrl";
        let title = "Title";
        let ArtistName = "ArtistName";
        let thumbnailUrl = "https://www.miksmusic.com/wp-main/uploads/video-monetiztion-not-available-991x519.jpg";
        const keysToKeep = new Set(["deezer", "amazonMusic", "youtubeMusic", "spotify", "itunes", "youtube"]);
        await getJSONData(link).then(data => {
            const content = JSON.stringify(data);
            const tmp = JSON.parse(content);
            const info = Object.keys(tmp.entitiesByUniqueId);
            const platforms = Object.keys(tmp.linksByPlatform);
            globalLink = tmp.pageUrl;
            title = tmp.entitiesByUniqueId[info[0]].title;
            ArtistName = tmp.entitiesByUniqueId[info[0]].artistName;
            thumbnailUrl = tmp.entitiesByUniqueId[info[0]].thumbnailUrl;
            platforms.forEach(platform => {
                if (!allLink) {
                    if (keysToKeep.has(platform)) {
                        songPlatform.set(platform, tmp.linksByPlatform[platform]);
                    }
                }
                else {
                    songPlatform.set(platform, tmp.linksByPlatform[platform]);
                }
            });
        }).catch(error => {
            console.log(error);
            globalLink = "Music not found";
            title = "Your link";
            ArtistName = "return no results";
        });
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle(`${title} by ${ArtistName}`)
            .setTimestamp()
            .setDescription(`Global link: ${globalLink}`)
            .setThumbnail(thumbnailUrl);
        for (let entry of songPlatform.entries()) {
            embed.addFields({ name: entry[0], value: entry[1].url });
        }
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
async function getJSONData(link) {
    try {
        const response = await axios_1.default.get(link);
        return response.data;
    }
    catch (error) {
        return error;
    }
}
