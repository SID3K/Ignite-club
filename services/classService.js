const ClassInstance = require('../models/classInstance');
const classRepository = require('../repository/classRepository');
const handleMongooseError = require('../utils/handleMongooseError');
const logger = require('../utils/logger');

class ClassService {
  async createClass({ className, startDate, endDate, startTime, duration, capacity }) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const classes = [];

    logger.info(`Creating classes for "${className}" from ${startDate} to ${endDate}`);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const classInstance = new ClassInstance({
        name: className,
        date: new Date(d),
        startTime,
        duration,
        capacity
      });
      classes.push(classInstance);
    }

    logger.info(`Prepared ${classes.length} class instances to insert`);

    try{
      const result = await classRepository.insertManyClasses(classes);
      logger.info(`Inserted ${result.length} classes into DB`);
      return result;
    }
    catch(err){
      logger.error(`createClass error: ${err.message}`);
      throw handleMongooseError(err);
    }

  }

  async getAllClasses(){
    try {
      logger.info('Fetching all classes from DB');
      const result = await classRepository.getAll();
      logger.info(`Fetched ${result.length} classes`);
      return result;
    }
    catch (error) {
      logger.error(`getAllClasses error: ${error.message}`);
      throw handleMongooseError(error);
    }
  }
}

module.exports = new ClassService();