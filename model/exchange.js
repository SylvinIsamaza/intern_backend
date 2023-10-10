const mongoose = require("mongoose");

// Transaction model
const transactionSchema = mongoose.Schema(
  {
    transactionNumber: {
      type: Number,
      required: true,
    },
    transactionExchanger: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    openDate: {
      type: Date,
      default: Date.now,
    },
    closedDate: {
      type: Date,
    },
    accountBalance: {
      type: Number,
      default: 0,
    },
    status: {
      type: String, 
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema); 
