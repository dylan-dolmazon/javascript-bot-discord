require('dotenv/config');
const mongoose = require('mongoose');

mongoose.connect(process.env.BD_ADDRESS, ()=>{
    console.log("DB Connected ");
});