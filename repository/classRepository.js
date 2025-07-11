const ClassInstance = require('../models/classInstance');

class ClassRepository {
  async insertManyClasses(classes) {
    return await ClassInstance.insertMany(classes);
  }

  async findByNameAndDate(name, date) {
    return await ClassInstance.findOne({ name, date });
  }

  async getAll(){
    return await ClassInstance.find({});
  }
}

module.exports = new ClassRepository();