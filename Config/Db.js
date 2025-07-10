const mongoose = require("mongoose");
require('dotenv').config()
const uri = process.env.DB_URI || 'mongodb://localhost:27017/'


const connectToDB = ()=>{
    mongoose.connect(uri,{dbName:'yakyak'}).then(()=>{
        console.log('Database Connection Successful');
        
    }).catch(()=>{
        console.log('database connection failed');
        
    })
}

module.exports = connectToDB