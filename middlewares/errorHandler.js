// Define a custom error handling middleware
const errorHandler = (err, req, res, next) => {
  // Default error status code is 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  
  // Default error message
  const message = err.message || 'Internal Server Error';

  // Log the error for debugging (optional)
  console.error(err);

  // Send a JSON response with the error status code and message
  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
