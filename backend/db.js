const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGOURI

const connectToMongo = () =>{
    mongoose.connect(mongoURI, {
      },()=>{
        console.log(`Mongo connection successful ${mongoose.connection.host}`)
    })
}

module.exports = connectToMongo;