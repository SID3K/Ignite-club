const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./utils/logger'); 
const PORT = process.env.PORT || 3000;

connectDB();
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});