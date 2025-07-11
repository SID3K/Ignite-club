const Member = require('../models/member');
const ClassInstance = require('../models/classInstance');
const Booking = require('../models/booking');

class BookingRepository {
  async findMemberByUsername(username) {
    return await Member.findOne({ username });
  }

  async findClassById(classId) {
    return await ClassInstance.findById(classId);
  }

  async countExistingBookings(classId, participationDate) {
    const parsedDate = new Date(participationDate);
    return await Booking.countDocuments({ classId, participationDate: parsedDate });
  }

  async saveBooking(bookingData) {
    const booking = new Booking(bookingData);
    return await booking.save();
  }

  async findBookingsForMember(memberId, startDate, endDate) {
    const dateQuery = {};

    if (startDate) dateQuery.$gte = new Date(startDate);
    if (endDate) dateQuery.$lte = new Date(endDate);

    const query = { };
    if(memberId) query.memberId = memberId;
    if (Object.keys(dateQuery).length > 1) {
      query.participationDate = dateQuery;
    }

    return await Booking.find(query).populate('memberId').populate('classId');
  }
}

module.exports = new BookingRepository();
