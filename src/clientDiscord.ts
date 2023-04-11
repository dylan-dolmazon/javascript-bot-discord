import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({ 
	partials: [
		Partials.Message, 
		Partials.Channel, 
		Partials.Reaction,
	], 
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessageReactions
	] 
});

if(!process.env.DISCORD_TOKEN)
	console.log("Please provide a discord app token in your .env file.");
else
	client.login(process.env.DISCORD_TOKEN)
	.then(()=>{console.log("Bot connected ! ")})
	.catch((error)=>{console.log(error)});
export default client;