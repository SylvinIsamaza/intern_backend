const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
//connection to database
async function connectToDb (){
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Connected to database ');
    
  } catch (error) {
    console.log('Failed to connect to database'+error.message)
  }
}

module.exports={connectToDb}