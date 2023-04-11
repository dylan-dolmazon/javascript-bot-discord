"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const TriggersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
});
TriggersSchema.plugin(uniqueValidator);
module.exports = mongoose.model('TriggerObject', TriggersSchema);
