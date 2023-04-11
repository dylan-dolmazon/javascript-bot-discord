"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const builder = new discord_js_1.SlashCommandBuilder()
    .setName("unban")
    .setDescription("Ban someone from the server")
    .addUserOption(option => option
    .setName("membre")
    .setDescription("membre to unban")
    .setRequired(true));
exports.command = {
    name: "unban",
    builder: builder,
    execute: (interaction) => {
        const member = interaction.options.getUser('membre');
        interaction.guild?.members.unban(member);
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle("Bon retour l'ami !")
            .setDescription(`<@${member?.id}> à été débani.`)
            .setAuthor({ name: `${interaction.client.user.username}`, iconURL: interaction.client.user.avatarURL() })
            .setThumbnail(member?.avatarURL())
            .setTimestamp();
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
