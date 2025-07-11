const bookingRepository = require('../repository/bookingRepository');
const AppError = require('../utils/appError');
const handleMongooseError = require('../utils/handleMongooseError');
const logger = require('../utils/logger');


class BookingService {
  async createBooking({ username, classId, participationDate }) {
    try {
      logger.info(`Creating booking for ${username} on ${participationDate}`);
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

      const saved = await bookingRepository.saveBooking(bookingData);
      logger.info(`Booking saved for user ${username} in class ${classInstance.name}`);
      return saved;
    } catch (err) {
      logger.error(`createBooking error: ${err.message}`);
      if (err instanceof AppError) {  //if it's already an AppError, rethrow it without handling
        throw err;
      }
      throw handleMongooseError(err);
    }
  }

  async searchBookings({ username, startDate, endDate }) {
    try {
      logger.info(`Searching bookings for ${username} from ${startDate || 'N/A'} to ${endDate || 'N/A'}`);
      const member = await bookingRepository.findMemberByUsername(username);
      if (!member && (!startDate && !endDate)) throw new AppError('Member not found', 404, 'Database Error');
      const memberid = member ? member._id : '';

      const results = await bookingRepository.findBookingsForMember(memberid, startDate, endDate);
      logger.info(`Found ${results.length} bookings for ${username || 'anonymous'} from ${startDate || 'N/A'} to ${endDate || 'N/A'}`);
      return results;
    } 
    catch (err) {
      logger.error(`searchBookings error: ${err.message}`);
      if (err instanceof AppError) {
        throw err;
      }
      throw handleMongooseError(err);
    }
  }
}


module.exports = new BookingService();
