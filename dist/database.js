"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
const mongoose = require('mongoose');
mongoose.connect(process.env.BD_ADDRESS, () => {
    console.log("DB Connected ");
});
