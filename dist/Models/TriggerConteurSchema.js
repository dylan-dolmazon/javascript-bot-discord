"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const TriggerConteurSchema = mongoose.Schema({
    trigger_name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    nb_use: {
        type: Number,
        required: true
    }
});
TriggerConteurSchema.plugin(uniqueValidator);
module.exports = mongoose.model('triggerconteur', TriggerConteurSchema);
