class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.stack = (new Error()).stack; // Capture stack trace
  }
}

export default ApiError;
