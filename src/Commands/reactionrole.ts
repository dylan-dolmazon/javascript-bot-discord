import { ChatInputCommandInteraction, EmbedBuilder, MessageReaction, RoleResolvable, SlashCommandBuilder, TextChannel, User, } from "discord.js";
import { Command } from "../types";
const builder = new SlashCommandBuilder()
  .setName("reactrole")
  .setDescription("react role.")

export const command: Command ={
    name: "reactrole",
    builder: builder as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {
        
  let channel = interaction.channel as TextChannel;
     let embedOptions = ["Pimpo", "Djumbo"] as Array<string>;
    let reactOptions = ['🐈', '🐈‍⬛'] as Array<string>;
    const embed = new EmbedBuilder()
    .setTitle('Qui est le plus beaux ????????')
    .setColor('#0099ff')
    .setDescription("C'est l'heure de faire votre choix ...\n" + embedOptions.map((option: string, i: number) => reactOptions[i] + " " + option).join('\n'));



    const message = channel.send({ embeds: [embed] });

    for(let i = 0; i < embedOptions .length; i++) {
        (await message).react(reactOptions[i]);
    }




    const role1 =  (await message)?.guild?.roles.cache.find((r) => r.name === "Pain au chocolat") as RoleResolvable;
    const role2 = (await message)?.guild?.roles.cache.find((r) => r.name === "Chocolatine") as RoleResolvable;
    const filter = (reaction: MessageReaction, user: User) => {return  reaction.emoji.name === reactOptions[0] || reaction.emoji.name === reactOptions[1] };
    const collector = (await message)?.createReactionCollector({filter, dispose:true} );

    collector.on('collect', (reaction: MessageReaction, user:User) => {
            const member = interaction.guild?.members.cache.get(user.id);
            if( reaction.emoji.name === reactOptions[0]){
                member?.roles.add(role1)
            }
            if( reaction.emoji.name === reactOptions[1]){
                member?.roles.add(role2)
            }
            
           
    });

    collector.on('remove', (reaction: MessageReaction, user:User) => {
        const member = interaction.guild?.members.cache.get(user.id);
        if( reaction.emoji.name === reactOptions[0]){
            member?.roles.remove(role1)
        }
        if( reaction.emoji.name === reactOptions[1]){
            member?.roles.remove(role2)
        }
        
       
});


        interaction.reply({
            content:`react`,
            ephemeral: false
          })
        }
    
}