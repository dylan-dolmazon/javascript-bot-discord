"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const musicHandler_1 = require("../Class/musicHandler");
const voice_1 = require("@discordjs/voice");
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('arreter')
    .setDescription('arrêter la musique en cours');
exports.command = {
    name: "arreter",
    builder: builder,
    execute: async (interaction) => {
        const member = interaction.member?.user;
        const user = await interaction.guild?.members.fetch(member.id);
        if (!interaction.member?.voice.channel)
            return interaction.reply('vous devez etre dans un channel vocal pour executer cette commande');
        if (interaction.guild != null) {
            const voiceConnection = (0, voice_1.getVoiceConnection)(interaction.member?.voice.channel.guild.id);
            const handler = musicHandler_1.AllMusicHandler.filter((value) => value.getServer() == interaction.guildId);
            handler[0].audioPlayer.stop();
            voiceConnection?.destroy();
        }
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle("Enfin !")
            .setDescription(`J'arrête de diffuser cette musique insuportable ...`)
            .setAuthor({ name: `${interaction.client.user.username}`, iconURL: interaction.client.user.avatarURL() });
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
