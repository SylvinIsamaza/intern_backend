const mongoose = require('mongoose')
//user model
const jwt=require('jsonwebtoken')
const userModel = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required:true
  },
  password: {
    type: String,
    required:true
    
  },
  avatar: {
    type:String
  }
})


module.exports = mongoose.model('User', userModel)
