/**
 * @typedef {Object} ClassDTO
 * @property {string} className -  Name of the class (required)
 * @property {string} startDate - Start date of the calss (required)
 * @property {string} endDate - End date of the calss should be greater than start date (required)
 * @property {string} startTime - start time of the class (required)
 * @property {string} duration - Duration of the class in minutes (required)
 * @property {string} capacity - Capacity of the class should be atleast 1 (required)
 */

class CreateClassDTO{
    constructor({className, startDate, endDate, startTime, duration, capacity}){
        this.className = className;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.duration = duration;
        this.capacity = Number(capacity);
    }
}

module.exports = CreateClassDTO;