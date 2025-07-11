const AppError = require('./appError');

function handleMongooseError(err) {
  if (err.name === 'ValidationError') {
    return new AppError(err.message || 'Validation failed', 400, 'Database Error');
  }

  if (err.name === 'CastError') {
    return new AppError('Invalid ID format', 400, 'Database Error');
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    const value = err.keyValue ? err.keyValue[field] : '';
    return new AppError(`Duplicate value for field '${field}': ${value}`, 409, 'Database Error');
  }

  if (err.name === 'MongoNetworkError' || err.name === 'MongooseServerSelectionError') {
    return new AppError('Database connection error', 503, 'Database Error');
  }

  return new AppError('Database operation failed', 500, 'Database Error');
}

module.exports = handleMongooseError;
