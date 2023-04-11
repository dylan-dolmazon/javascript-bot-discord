"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clientDiscord_1 = __importDefault(require("../clientDiscord"));
const Trigger = require('../models/TriggerSchema');
const TriggerConteur = require('../Models/TriggerConteurSchema');
clientDiscord_1.default.on("messageCreate", (message) => {
    Trigger.findOne({ name: message.content })
        .then((trigger) => {
        if (trigger != null) {
            TriggerConteur.findOne({ trigger_name: trigger.name, user_id: message.author.id })
                .then((conteur) => {
                if (conteur != null) {
                    conteur.nb_use++;
                    conteur.save();
                }
                else {
                    conteur = new TriggerConteur({
                        trigger_name: trigger.name,
                        user_id: message.author.id,
                        nb_use: 1
                    });
                    conteur.save();
                }
                const attachment = trigger.image ? trigger.image : null;
                message.channel.send(trigger.response);
                message.channel.send(message.author.username + ' à utilisé ce trigger ' + conteur.nb_use + ' fois.');
                if (attachment)
                    message.channel.send({ files: [attachment] });
            });
        }
    });
});
