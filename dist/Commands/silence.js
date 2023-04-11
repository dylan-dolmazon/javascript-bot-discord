"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('silence')
    .setDescription('réduire au silence un membre')
    .addUserOption(option => option.setName("membre")
    .setDescription("Le membre que vous souhaitez réduire au silence (format : 1d 1h 1m 1s)")
    .setRequired(true))
    .addStringOption(option => option.setName("durée")
    .setDescription("la durée du silence")
    .setRequired(true))
    .addStringOption(option => option.setName("raison")
    .setDescription("la raison du silence")
    .setRequired(false));
exports.command = {
    name: "silence",
    builder: builder,
    execute: async (interaction) => {
        const member = interaction.options.getUser('membre');
        const user = await interaction.guild?.members.fetch(member.id);
        const duree = interaction.options.get('durée')?.value;
        const raison = interaction.options.get('raison')?.value ? interaction.options.get('raison')?.value : 'aucune raison valable';
        if (!(0, ms_1.default)(duree))
            return interaction.reply({
                content: "duréé incorrecte",
                ephemeral: true,
            });
        if (!user)
            return interaction.reply('Membre pas trouvé');
        try {
            user.timeout((0, ms_1.default)(duree), raison);
        }
        catch (error) {
            console.log(error);
        }
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle("Chuuuuuuuuut !")
            .setDescription(`<@${member?.id}> à été réduit au silence pendant ${(0, ms_1.default)((0, ms_1.default)(duree), { long: true })}, la raison : ${raison}`)
            .setAuthor({ name: `${interaction.client.user.username}`, iconURL: interaction.client.user.avatarURL() })
            .setThumbnail(member?.avatarURL());
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
