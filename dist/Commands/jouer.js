"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const yt_search_1 = __importDefault(require("yt-search"));
const musicHandler_1 = require("../Class/musicHandler");
const voice_1 = require("@discordjs/voice");
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('jouer')
    .setDescription('Jouer une musique provenant de youtube')
    .addStringOption(option => option.setName("musique")
    .setDescription("nom de la musique, ou URL youtube")
    .setRequired(true));
exports.command = {
    name: "jouer",
    builder: builder,
    execute: async (interaction) => {
        const member = interaction.member?.user;
        const user = await interaction.guild?.members.fetch(member.id);
        if (!interaction.member?.voice.channel)
            return interaction.reply('vous devez etre dans un channel vocal pour executer cette commande');
        const param = interaction.options.get('musique')?.value;
        let url = undefined;
        let urlImage = undefined;
        let nameSong = undefined;
        if (!param)
            return interaction.reply('Musique incorrecte');
        if (ytdl_core_1.default.validateURL(param)) {
            url = param;
            nameSong = url;
            urlImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/CD_icon_test.svg/1024px-CD_icon_test.svg.png";
        }
        else {
            const musicFound = await (0, yt_search_1.default)(param);
            const music = musicFound.videos.slice(0, 1)[0];
            url = music.url;
            urlImage = music.thumbnail;
            nameSong = music.title;
        }
        const stream = (0, ytdl_core_1.default)(url, { filter: "audioonly" });
        if (interaction.guild != null) {
            const voiceConnection = (0, voice_1.joinVoiceChannel)({
                channelId: interaction.member?.voice.channel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild?.voiceAdapterCreator,
            });
            const player = (0, voice_1.createAudioPlayer)();
            const ressource = (0, voice_1.createAudioResource)(stream);
            player.play(ressource);
            voiceConnection.subscribe(player);
            const musicHandler = musicHandler_1.AllMusicHandler.filter((handler) => {
                return handler.getServer() == interaction.guildId;
            });
            if (musicHandler.length == 0) {
                const musicHandler = new musicHandler_1.MusicHandler(interaction.guildId, player);
                musicHandler_1.AllMusicHandler.push(musicHandler);
            }
            else {
                musicHandler[0].setAudioPlayer(player);
            }
            player.on(voice_1.AudioPlayerStatus.Idle, () => {
                console.log('The audio player has started playing!');
            });
        }
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle("Do Re Mi Fa Sol La Si Do")
            .setDescription(`**${nameSong}** en cours de diffusion !`)
            .setAuthor({ name: `${interaction.client.user.username}`, iconURL: interaction.client.user.avatarURL() })
            .setThumbnail(urlImage);
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
