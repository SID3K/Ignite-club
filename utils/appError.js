class AppError extends Error {
  constructor(message, statusCode, type = 'Application Error') {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    this.type = type;
    Error.captureStackTrace(this, this.constructor);
  }
}


module.exports = AppError;