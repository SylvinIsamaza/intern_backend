const User = require("../model/user");
const jwt = require('jsonwebtoken')
const lodash=require('lodash')
const bcrypt = require('bcrypt');
const { userRegistrationSchema } = require("../validation/joiValidation");
const errorHandler = require("../middlewares/errorHandler");
const { response } = require("express");
const path = require("path");
const sendToken = require("../utils");
//function for creating user
const createUser = async (req, res) => {
  const userData = req.body;
 
  try {
   
  
    const user = await User.findOne({ email: req.body.email });
    //check if user is already registered
    const filename = req.file.filename
    const fileUrl = path.join(filename);
    if (user) {
      const filePath = `uploads/${filename}`;
    await fs.unlink(filePath, (err) => {
      if (err) {
        res.status(500).json({ message: "error while deleting file" });
      } else {
      }
    });
      return res.status(400).json({
        message: "User with that email already exists",
      });
    } else {
      
      const { error, value } = userRegistrationSchema.validate(userData);
      
      if (error) {
        return res.status(400).json({
          message: "User registration failed",
          error: error.details[0].message,
        });
      } else {
     
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(value.password, 10);
        
        const createdUser = await User.create({ email: value.email, password: hashedPassword,avatar:fileUrl });
        
        if (createdUser) {
          return res.status(201).json({
            message: "User created successfully",
            user: createdUser
          });
        } else {
          return res.status(500).json({ message: "User registration failed" });
        }
      }
    }
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getUser = async (req, res, next) => {

  
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      return res.send({
        status: 200,
        success: true,
        user: await lodash.pick(user, ["id", "email", "avatar"]),
      });
    }
    else {
      return res.send({message: "User not found" });
    }
    
  } catch (error) {
    return res.send({message: "Something went wrong"+error.message });
  }
};
const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  
  if (user) {
    const isCorrect = await bcrypt.compare(req.body.password, user.password)
    if (isCorrect) {
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 1000),
        httpOnly: true,
        secure: false,
        path: "/",
      };
      console.log('password correct')
     
      token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
      })
   
      console.log(token)
    
      return res.cookie("token", token, options).send(user).status(200);
    
    }
    else {
    res.send("Invalid password")
    }
  }
  else {
    res.send("Invalid password")
  }
}

const getUserById =async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.send("User not found")
  }
  else {
    return res.send({message:"User found",user:user})
  }
}
module.exports = { createUser, getUser,login,getUserById };
