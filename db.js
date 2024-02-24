
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoURI = process.env.MONGODB_URL;
const app = express();
app.use(express.json());

//start mongoose server
const InitiateMongoServer = async() =>{

    try{
        await mongoose.connect(mongoURI,{
    
          
        });
    
    console.log("Successfully Connected to DB!");
    }
    catch(e){
        console.log(e);
        throw e;
    }
    
    };
    
    module.exports = InitiateMongoServer;