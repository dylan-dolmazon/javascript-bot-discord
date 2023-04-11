"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const builder = new discord_js_1.SlashCommandBuilder()
    .setName("exclure")
    .setDescription("Ban someone from the server")
    .addUserOption(option => option
    .setName("membre")
    .setDescription("membre to ban")
    .setRequired(true))
    .addStringOption(option => option
    .setName("raison")
    .setDescription("raison to ban")
    .setRequired(false));
exports.command = {
    name: "exclure",
    builder: builder,
    execute: (interaction) => {
        const member = interaction.options.getUser('membre');
        const raison = interaction.options.get('raison')?.value ? interaction.options.get('raison')?.value : 'aucune raison valable';
        interaction.guild?.members.ban(member, { reason: raison });
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle("CASSE TOI DE LAAAAA !")
            .setDescription(`<@${member?.id}> à été exclu, la raison : ${raison}`)
            .setAuthor({ name: `${interaction.client.user.username}`, iconURL: interaction.client.user.avatarURL() })
            .setThumbnail(member?.avatarURL())
            .setTimestamp();
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
