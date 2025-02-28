const errorMiddleware = (err, req, res, next) => {
  console.log("error Middleware :", err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: err.stack,
  });
};

export default errorMiddleware;
