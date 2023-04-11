import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../types";
import ms from "ms";
const builder = new SlashCommandBuilder()
.setName('silence')
.setDescription('réduire au silence un membre')
.addUserOption(option=>
                option.setName("membre")
                .setDescription("Le membre que vous souhaitez réduire au silence (format : 1d 1h 1m 1s)")
                .setRequired(true))
.addStringOption(option=>
                  option.setName("durée")
                  .setDescription("la durée du silence")
                  .setRequired(true))
.addStringOption(option=>
                  option.setName("raison")
                  .setDescription("la raison du silence")
                  .setRequired(false));
export const command: Command ={
    name: "silence",
    builder: builder as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {
        
        const member = interaction.options.getUser('membre') as User;
        const user = await interaction.guild?.members.fetch(member.id);
        const duree :string = interaction.options.get('durée')?.value as string
        const raison :string = interaction.options.get('raison')?.value ? interaction.options.get('raison')?.value as string : 'aucune raison valable' ;
        if(!ms(duree))return interaction.reply({
            content: "duréé incorrecte",
            ephemeral:true,
        })
        if(!user)return interaction.reply('Membre pas trouvé')
        try{
            user.timeout(ms(duree),raison);
        }catch(error){
            console.log(error);

        }
        
        let embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Chuuuuuuuuut !")
        .setDescription(`<@${member?.id}> à été réduit au silence pendant ${ms(ms(duree),{long: true})}, la raison : ${raison}`)
        .setAuthor({name: `${interaction.client.user.username}` , iconURL: interaction.client.user.avatarURL() as string})
        .setThumbnail(member?.avatarURL());
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
}




