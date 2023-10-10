const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/user");
dotenv.config();
//function to authenticate user by using cookies
const authenticateUser = async function (req, res, next) {
  try {
    const { token } = req.cookies;
    console.log(token)
    const decodedUser = jwt.decode(token, process.env.JWT_SECRET);
    console.log(decodedUser)
    const user = await User.findById(decodedUser.id);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.send({
      message: "Authentication failed",
    });
  }
};
module.exports = { authenticateUser };
