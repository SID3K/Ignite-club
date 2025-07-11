/**
 * @typedef {Object} BookingDTO
 * @property {string} username - Unique username of the member (required)
 * @property {string} classId - Unique Id of the class (required)
 * @property {string} participationDate - Date of participation in YYYY-MM-DD format (required)
 */

class CreateBookingDTO {
  constructor({ username, classId, participationDate}) {
    this.username = username;
    this.classId = classId;
    this.participationDate = participationDate;
  }
}

module.exports = CreateBookingDTO;