const {transactionRegistrationSchema} = require("../validation/joiValidation");
const Transaction = require("../model/exchange");


//function to create a transaction
async function createTransaction(req, res, next) {
  const transactionData = {...req.body,transactionExchanger:req.user};
  try {
    const { error, value } =
      transactionRegistrationSchema.validate(transactionData);
    if (error) {
      res.status(400).send(error.details);
    } else {
      const transaction = await Transaction.create({...value, transactionExchanger:req.user});
      if (!transaction) {
        return next(errorHandler("Something went wrong ",500))
      } else {
        res.send({
          message: "Transaction created successfully",
        transaction:transaction});
      }
    }
  } catch (error) {
    res.status(500).send("Something went wrong ");
  }
}
//function to get all transaction

async function getAllTransactions(req,res,next) {
  const allTransactions = await Transaction.find()
  if (!allTransactions) {
    return next(errorHandler("No transaction found",404))
  }
  else {
    return res.send(allTransactions)
  }
}
//function to update transaction
async function updateTransaction(req,res,next) {
  const { id } = req.params;
  const { error, value } = transactionRegistrationSchema.validate()
  if (error) {
    return next(errorHandler(error.details,500))
  }
  else {
    const transactionToBeUpdated = await Transaction.findByIdAndUpdate(id, value)
    if (transactionToBeUpdated) {
      res.send({
        message: "Transaction updated successfully",
        transaction: transactionToBeUpdated
      })
    }
    else {
      return next(errorHandler("Something went wrong ",500))
    }
    
  }
  
}
//function to delete transaction
async function deleteTransaction(req,res,next) {
  const { id } = req.params;
  try {
    await Transaction.findByIdAndDelete(id)
    res.send('Transaction deleted successfully')
  } catch (error) {
    return next(errorHandler("Something went wrong ",500))
  }

}
//function to get transaction by id
async function getTransactionById(req,res,next) {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id)
    if (!transaction) {
      return res.send("No transaction found")
    }
    else {
      return res.send({
        message:"Transaction found successfully",
       transaction:transaction
      })
    }
  } catch (error) {
    return next (errorHandler("Something went wrong ",500))
  }
}
//function to delete all transactions 
async function deleteAllTransactions(req,res,next) {
  try {
    await Transaction.deleteMany()
    res.send('All transaction deleted successfully')
  } catch (error) {
    return next(errorHandler("Something went wrong ",500))
  }




}
//function to delete one transaction
async function deleteTransactionById(req,res,next) {
  const { id } = req.params;
  try {
    await Transaction.deleteById(id)
    return res.send('Transaction deleted successfully')
  } catch (error) {
    return next(errorHandler("Something went wrong",500))
  }
}

module.exports={createTransaction,getAllTransactions,deleteTransaction,updateTransaction,deleteAllTransactions,getTransactionById}