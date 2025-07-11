const bookingRepository = require('../repository/bookingRepository');
const AppError = require('../utils/appError');
const handleMongooseError = require('../utils/handleMongooseError');

class BookingService {
  async createBooking({ username, classId, participationDate }) {
    try {
      const member = await bookingRepository.findMemberByUsername(username);
      if (!member) throw new AppError('Member not found', 404, 'Database Error');

      const classInstance = await bookingRepository.findClassById(classId);
      if (!classInstance) throw new AppError('Class not found', 404, 'Database Error');

      const bookingCount = await bookingRepository.countExistingBookings(classInstance._id, participationDate);
      if (bookingCount >= classInstance.capacity) {
        throw new AppError('Class is full', 400, 'Database Error');
      }

      const bookingData = {
        memberId: member._id,
        classId: classInstance._id,
        participationDate: classInstance.date
      };

      return await bookingRepository.saveBooking(bookingData);
    } catch (err) {
      if (err instanceof AppError) {  //if it's already an AppError, rethrow it without handling
        throw err;
      }
      throw handleMongooseError(err);
    }
  }

  async searchBookings({ username, startDate, endDate }) {
    try {
      const member = await bookingRepository.findMemberByUsername(username);
      if (!member && (!startDate && !endDate)) throw new AppError('Member not found', 404, 'Database Error');
      const memberid = member ? member._id : '';

      return await bookingRepository.findBookingsForMember(memberid, startDate, endDate);
    } 
    catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw handleMongooseError(err);
    }
  }
}


module.exports = new BookingService();
