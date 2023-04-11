"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const clientDiscord_1 = __importDefault(require("../clientDiscord"));
let commands = new discord_js_1.Collection();
commands.set('virer', require("../Commands/kick").command);
commands.set('exclure', require("../Commands/ban").command);
commands.set('laver', require("../Commands/laver").command);
commands.set('unban', require("../Commands/unban").command);
commands.set('poll', require("../Commands/poll").command);
commands.set('trigger', require("../Commands/trigger").command);
commands.set('rmtrigger', require("../Commands/removeTrigger").command);
commands.set('listtrigger', require("../Commands/listTrigger").command);
commands.set('inspecttrigger', require("../Commands/inspectTrigger").command);
commands.set('modifytrigger', require("../Commands/modifyTrigger").command);
commands.set('songlink', require("../Commands/songLink").command);
commands.set('lapost', require("../Commands/lapostInfo").command);
commands.set('silence', require("../Commands/silence").command);
commands.set('desilence', require("../Commands/desilence").command);
commands.set('jouer', require("../Commands/jouer").command);
commands.set('arreter', require("../Commands/arreter").command);
commands.set('pause', require("../Commands/pause").command);
commands.set('reprendre', require("../Commands/reprendre").command);
commands.set('reactrole', require("../Commands/reactionrole").command);
clientDiscord_1.default.on(discord_js_1.Events.GuildMemberAdd, member => {
    const channel = member.guild.channels.cache.find(c => c.name === "welcome");
    let role = member.guild.roles.cache.find(r => r.name === "MEMBER");
    if (channel) {
        channel.send("Bienvenue sur le serveur, le role MEMBER vous a été attribué par default.");
    }
    if (role) {
        member.roles.add(role)
            .catch(console.error);
    }
});
clientDiscord_1.default.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const command = commands.get(interaction.commandName);
    if (!command)
        return;
    command.execute(interaction);
});
