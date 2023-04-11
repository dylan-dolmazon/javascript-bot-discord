import { ChatInputCommandInteraction, GuildTextBasedChannel, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
const builder = new SlashCommandBuilder()
  .setName("laver")
  .setDescription("clear Message from the current channel.")
  .addNumberOption(option => 
                   option
                   .setName("numbermessage")
                   .setDescription("Number message delete")
                   .setRequired(true)
                   .setMinValue(1)
                   .setMaxValue(100))
  .addBooleanOption(option => 
                    option
                    .setName("silent")
                    .setDescription("choose if messages clear everyone see the command")
                    .setRequired(false)
                    )


export const command: Command ={
    name: "laver",
    builder: builder as SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => {
        const nbmessage = interaction.options.get("numbermessage")?.value as number;
        const silent = interaction.options.get("silent")?.value as boolean;
      
        if(!nbmessage){
          return interaction.reply("Mettez un nombre !!!!");
        }
        else{
          let channel = interaction.channel as GuildTextBasedChannel;
          channel.bulkDelete(nbmessage);
        }
        interaction.reply({
            content:`Suuuuuuuupresion des messages`,
            ephemeral: silent
          })
    }
}