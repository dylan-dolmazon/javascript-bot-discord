import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
const builder = new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll")
	.addStringOption((option) =>
		option.setName('question').setDescription('The question of your poll').setRequired(true),
	)
	.addStringOption((option) =>
		option.setName('choice1').setDescription('The choice number 1').setRequired(true),
	)
    .addStringOption((option) =>
		option.setName('choice2').setDescription('The choice number 2').setRequired(true),
    )
    .addStringOption((option) =>
		option.setName('choice3').setDescription('The choice number 3').setRequired(false),
	)
    .addStringOption((option) =>
		option.setName('choice4').setDescription('The choice number 4').setRequired(false),
	)
    .addStringOption((option) =>
		option.setName('choice5').setDescription('The choice number 5').setRequired(false),
	)
    .addStringOption((option) =>
		option.setName('choice6').setDescription('The choice number 6').setRequired(false),
	)
    .addStringOption((option) =>
		option.setName('choice7').setDescription('The choice number 7').setRequired(false),
	)
    .addStringOption((option) =>
		option.setName('choice8').setDescription('The choice number 8').setRequired(false),
	)
    .addStringOption((option) =>
		option.setName('choice9').setDescription('The choice number 9').setRequired(false),
	)
    .addStringOption((option) =>
		option.setName('choice10').setDescription('The choice number 10').setRequired(false),
	);

export const command: Command ={
    name: "strawpoll",
    builder: builder as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {

        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

        const question :string = interaction.options.get('question')?.value as string;
        const response :string[] = [];

        interaction.options.data.forEach((element,index) => {
            if(index != 0) {
                response.push(element.value as string);
            }
        });
        const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle('Le Strawpoll est le suivant')
        .setDescription(`Question: ${question} ?`)
        .setTimestamp()
        .setAuthor({name: `${interaction.client.user.username}` , iconURL: interaction.client.user.avatarURL() as string})
        .setThumbnail(interaction.client.user?.avatarURL());

        for(let i = 0 ; i< response.length ; i++){
            embed.addFields({ name: emojis[i], value: response[i], inline: true })
        }

        const msg = await interaction.reply({
            embeds: [embed],
            fetchReply: true
        })
        for(let i = 0 ; i< response.length ; i++){
            msg.react(emojis[i]);
        }
    }
}



