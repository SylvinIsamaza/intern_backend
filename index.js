const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const transactionRouter = require("./routes/exchange");
const { connectToDb } = require("./db/connection");
const userRouter=require('./routes/user');
const errorHandler = require("./middlewares/errorHandler");
const cookieParser=require('cookie-parser')
dotenv.config();
const app = express();
connectToDb();

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
// app.use(cookieParser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/user", userRouter);
app.use(errorHandler)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
