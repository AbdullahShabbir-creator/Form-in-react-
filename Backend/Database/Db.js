const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/admissionformdb'

const connectdb = async()=>{
    try{
        mongoose.connect(url);
        console.log('Database connected Successfully ')
    }catch(error){
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); 
    }
}
module.exports = connectdb;