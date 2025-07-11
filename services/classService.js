const ClassInstance = require('../models/classInstance');
const classRepository = require('../repository/classRepository');
const handleMongooseError = require('../utils/handleMongooseError');

class ClassService {
  async createClass({ className, startDate, endDate, startTime, duration, capacity }) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const classes = [];

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

    try{
      return await classRepository.insertManyClasses(classes);
    }
    catch(err){
      throw handleMongooseError(err);
    }

  }

  async getAllClasses(){
    try{
      return await classRepository.getAll();
    }
    catch(error){
      throw handleMongooseError(error);
    }
  }
}

module.exports = new ClassService();