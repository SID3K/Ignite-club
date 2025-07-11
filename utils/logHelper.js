const logger = require('./logger');

const logInfo = (req, message) => {
  logger.info(`${req.method} ${req.originalUrl} - ${message}`);
};

const logError = (req, error) => {
  logger.error(`${req.method} ${req.originalUrl} - ${error.message}`);
};

module.exports = { logInfo, logError };
