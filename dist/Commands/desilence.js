"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const builder = new discord_js_1.SlashCommandBuilder()
    .setName('desilence')
    .setDescription('redonner la parole un membre')
    .addUserOption(option => option.setName("membre")
    .setDescription("Le membre que vous souhaitez re-entendre ")
    .setRequired(true));
exports.command = {
    name: "desilence",
    builder: builder,
    execute: async (interaction) => {
        const member = interaction.options.getUser('membre');
        const user = await interaction.guild?.members.fetch(member.id);
        if (!user)
            return interaction.reply('Membre pas trouvé');
        try {
            user.timeout(null);
        }
        catch (error) {
            console.log(error);
        }
        let embed = new discord_js_1.EmbedBuilder()
            .setColor("Random")
            .setTitle("BlablaBlaBla !")
            .setDescription(`<@${member?.id}> peut maintenant re-parler !`)
            .setAuthor({ name: `${interaction.client.user.username}`, iconURL: interaction.client.user.avatarURL() })
            .setThumbnail(member?.avatarURL());
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
