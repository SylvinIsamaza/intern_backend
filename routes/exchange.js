const express = require("express");
const {
  createTransaction,
  deleteTransaction,
  deleteAllTransactions,
  updateTransaction,
  getTransactionById,
  getAllTransactions,
} = require("../controllers/exchange");
const { authenticateUser } = require("../middlewares/auth");

const router = express.Router();

router.get("/get-transactions", authenticateUser, getAllTransactions); // Api endpoints to get all transactions
router.post("/create-transaction", authenticateUser, createTransaction); //api endpoints to create transactions
router.delete("/delete-transaction/:id", authenticateUser, deleteTransaction); // api endpoints to delete certain transaction
router.delete("/delete-transactions", authenticateUser, deleteAllTransactions); //api endpoints to delete all transactions
router.put("/update-transaction/:id", authenticateUser, updateTransaction); //api endpoints to update the certain transaction
router.get("/get-transaction/:id", authenticateUser, getTransactionById); //api endpoints to get transaction using id
module.exports = router;
