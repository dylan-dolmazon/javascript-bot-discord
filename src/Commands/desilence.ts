import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../types";
const builder = new SlashCommandBuilder()
.setName('desilence')
.setDescription('redonner la parole un membre')
.addUserOption(option=>
                option.setName("membre")
                .setDescription("Le membre que vous souhaitez re-entendre ")
                .setRequired(true));

export const command: Command ={
    name: "desilence",
    builder: builder as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {
        
        const member = interaction.options.getUser('membre') as User;
        const user = await interaction.guild?.members.fetch(member.id);
       
        if(!user)return interaction.reply('Membre pas trouvé')
        try{
            user.timeout(null);
        }catch(error){
            console.log(error);

        }
        
        let embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("BlablaBlaBla !")
        .setDescription(`<@${member?.id}> peut maintenant re-parler !`)
        .setAuthor({name: `${interaction.client.user.username}` , iconURL: interaction.client.user.avatarURL() as string})
        .setThumbnail(member?.avatarURL());
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
}




