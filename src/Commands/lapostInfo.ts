import axios from "axios";
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { TrackingResponse } from "../Types/LaposteDatasType";

const builder = new SlashCommandBuilder()
.setName('lapost')
.setDescription('suivre votre colis laposte')
.addStringOption(option=>
                  option.setName("numerosuivi")
                  .setDescription("le numéro de suivi de votre colis")
                  .setRequired(true))
.addBooleanOption(option=>
                option.setName("numerotest")
                .setDescription("true si numéro de test exemples dans le code false si vrai colis")
                .setRequired(true))
export const command: Command ={
    name: "lapost",
    builder: builder as SlashCommandBuilder,
    execute: async (interaction: ChatInputCommandInteraction) => {

        /**
         * Numéro de suivis test Il faut ajouteer true à numéro test dans la commande
         * LU680211095FR Courrier	0	200
         * LZ712917377US Courrier	1	200
         * 8K00009775862 Colissimo	3	200
         * 861011301731382 	Courrier	4	200
         * CB662173705US Colissimo	3	200
         * 861011301731382 Courrier	4	200
         * RB658828494MQ 	404
         */
        const numSuivis : string = interaction.options.get('numerosuivi')?.value as string;
        const sandbox : boolean = interaction.options.get('numerotest')?.value as boolean;

        let API_KEY : string | undefined;
        if(sandbox){
            API_KEY = process.env.LAPOSTE_SANDBOX;
        }else{
            API_KEY = process.env.LAPOSTE_API_KEY;
        }

        const headers = {
            'Accept': 'application/json',
            'X-Okapi-Key': API_KEY
        }

        const URL = `https://api.laposte.fr/suivi/v2/idships/${numSuivis}?lang=fr_FR&sandbox=${sandbox}`;
        
        let response : TrackingResponse;
        let livreur : string | undefined;

        let timelines : any[] = [];
        let events : any [] = [];
        await axios.get(URL, { headers }).then(async (datas : any) => {
            response = datas.data;
            livreur = 'Il est pris en charge par '+response.shipment?.product;
            response.shipment?.timeline.forEach(timeline => {
                if(timeline.status){
                    timelines.push({id: 'Timeline:'+timeline.id, shortLabel: timeline.shortLabel, longLabel: timeline.longLabel ? timeline.longLabel + '\n OK' : 'OK'});
                }
            })
            response.shipment?.event.forEach(event => {
                const date = new Date(event.date);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                const formattedDate = `${day} - ${month} - ${year}`;


                events.push({date: 'Event: '+formattedDate, label: event.label, code: event.code});
            })
        }).catch ((error) => {
            livreur = error.response.data.returnMessage;
            console.log(error);
            console.log('Error: Unable to retrieve shipment status');
        })

        let embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`Suivis de votre colis N° ${numSuivis}`)
        .setDescription(`${livreur}`)
        .addFields(
            timelines.map(({ id, shortLabel, longLabel }) => ({ name: `${id}. ${shortLabel}`, value: `${longLabel} ` })),
        )

        .addFields(
            events.map(({ date, label, code }) => ({ name: `${date} - ${code}`, value: label }))
        )
        .setAuthor({name: `${interaction.user.username}` , iconURL: interaction.user.avatarURL() as string})
        .setThumbnail(interaction.user.avatarURL())
        .setTimestamp();
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
}

