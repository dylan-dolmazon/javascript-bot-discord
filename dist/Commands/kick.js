"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('virer')
    .setDescription('virer un membre du serveur')
    .addUserOption(option => option.setName("membre")
    .setDescription("Le membre que vous souhaitez expulser")
    .setRequired(true))
    .addStringOption(option => option.setName("raison")
    .setDescription("la raison de l'expulsion")
    .setRequired(false));
exports.command = {
    name: "virer",
    builder: builder,
    execute: (interaction) => {
        let member = interaction.options.getUser('membre');
        let raison = interaction.options.get('raison')?.value ? interaction.options.get('raison')?.value : 'aucune raison valable';
        interaction.guild?.members.kick(member, raison);
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle("Dehoooooors !")
            .setDescription(`${member.tag} à été viré, la raison : ${raison}`)
            .setAuthor({ name: `${interaction.client.user.username}`, iconURL: interaction.client.user.avatarURL() })
            .setThumbnail(member?.avatarURL());
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
