"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const builder = new discord_js_1.SlashCommandBuilder()
    .setName("reactrole")
    .setDescription("react role.");
exports.command = {
    name: "reactrole",
    builder: builder,
    execute: async (interaction) => {
        let channel = interaction.channel;
        let embedOptions = ["Pimpo", "Djumbo"];
        let reactOptions = ['🐈', '🐈‍⬛'];
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('Qui est le plus beaux ????????')
            .setColor('#0099ff')
            .setDescription("C'est l'heure de faire votre choix ...\n" + embedOptions.map((option, i) => reactOptions[i] + " " + option).join('\n'));
        const message = channel.send({ embeds: [embed] });
        for (let i = 0; i < embedOptions.length; i++) {
            (await message).react(reactOptions[i]);
        }
        const role1 = (await message)?.guild?.roles.cache.find((r) => r.name === "Pain au chocolat");
        const role2 = (await message)?.guild?.roles.cache.find((r) => r.name === "Chocolatine");
        const filter = (reaction, user) => { return reaction.emoji.name === reactOptions[0] || reaction.emoji.name === reactOptions[1]; };
        const collector = (await message)?.createReactionCollector({ filter, dispose: true });
        collector.on('collect', (reaction, user) => {
            const member = interaction.guild?.members.cache.get(user.id);
            if (reaction.emoji.name === reactOptions[0]) {
                member?.roles.add(role1);
            }
            if (reaction.emoji.name === reactOptions[1]) {
                member?.roles.add(role2);
            }
        });
        collector.on('remove', (reaction, user) => {
            const member = interaction.guild?.members.cache.get(user.id);
            if (reaction.emoji.name === reactOptions[0]) {
                member?.roles.remove(role1);
            }
            if (reaction.emoji.name === reactOptions[1]) {
                member?.roles.remove(role2);
            }
        });
        interaction.reply({
            content: `react`,
            ephemeral: false
        });
    }
};
