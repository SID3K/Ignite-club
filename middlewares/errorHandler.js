function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
}

module.exports = errorHandler;