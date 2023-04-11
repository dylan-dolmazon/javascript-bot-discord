import { CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js"

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			CLIENT_ID: string,
			DISCORD_TOKEN: string,
			DB_ADDRESS: string,
		}
	}
}
interface Command
{
	name:string,
	builder: SlashCommandBuilder,
	execute: Function<CommandInteraction>
}