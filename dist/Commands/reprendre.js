"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const musicHandler_1 = require("../Class/musicHandler");
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('reprendre')
    .setDescription('Reprendre la musique en cours');
exports.command = {
    name: "reprendre",
    builder: builder,
    execute: async (interaction) => {
        const member = interaction.member?.user;
        const user = await interaction.guild?.members.fetch(member.id);
        if (!interaction.member?.voice.channel)
            return interaction.reply('vous devez etre dans un channel vocal pour executer cette commande');
        if (interaction.guild != null) {
            const voiceConnection = (0, voice_1.getVoiceConnection)(interaction.member?.voice.channel.guild.id);
            const handler = musicHandler_1.AllMusicHandler.filter((value) => value.getServer() == interaction.guildId);
            handler[0].audioPlayer.unpause();
        }
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle("oooook... let's goooooooo !")
            .setDescription(`La musique a repris`)
            .setAuthor({ name: `${interaction.client.user.username}`, iconURL: interaction.client.user.avatarURL() });
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
