const Joi = require("joi");

const userRegistrationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Add tlds option to disallow top-level domains (e.g., .com)
    .required()
    .messages({
      "string.email": "Invalid email address",
      "any.required": "Please enter an email address",
    }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "any.required": "Please enter a password",
      "string.min": "Password must be at least 8 characters long",
    }),
  repeatPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password does not match",
      "any.required": "Password does not match",
    }),
});

const transactionRegistrationSchema = Joi.object({
  transactionNumber: Joi.number().required().messages({
    "any.required": "Transaction number is required",
    "number.base": "Transaction number must be a valid number",
  }),
  transactionExchanger: Joi
    .required()
    .messages({
      "any.required": "Transactionr is required",
    }),
  openDate: Joi.date()
    .messages({
      "any.required": "Open date is required",
      "date.base": "Open date must be a valid date",
    }),
  closedDate: Joi.date()
    .required()
    .messages({
      "any.required": "Close date is required",
      "date.base": "Close date must be a valid date",
    }),
  accountBalance: Joi.number()
    .messages({
      "number.base": "Account balance must be a valid number",
      "any.required": "Account balance is required",
    }),
  status: Joi.string()
    .valid("Active", "New", "Completed")
    .messages({
      "string.base": "Status must be a valid string",
      "any.only": "Status must be one of Active, New, Completed",
    }),
});

module.exports = { userRegistrationSchema, transactionRegistrationSchema };
