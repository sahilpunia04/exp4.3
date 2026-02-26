const errorHandler = (err, req, res, next) => {
  console.error(err); // Log full error internally

app.use(errorHandler); 
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Redis errors
  if (err.code === "ECONNREFUSED") {
    statusCode = 503;
    message = "Redis service unavailable";
  }

  // Handle JSON parsing error
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    statusCode = 400;
    message = "Invalid JSON format";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;