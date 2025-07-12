const bookingService = require('../../services/bookingService');
const bookingRepository = require('../../repository/bookingRepository');
const AppError = require('../../utils/appError');

jest.mock('../../repository/bookingRepository');
jest.mock('../../utils/handleMongooseError', () => jest.fn(err => new Error(`Wrapped: ${err.message}`)));

describe('BookingService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createBooking', () => {
    const mockMember = { _id: 'member1' };
    const mockClass = { _id: 'class1', capacity: 2, name: 'Yoga', date: new Date('2025-07-18') };

    it('should create booking successfully', async () => {
      bookingRepository.findMemberByUsername.mockResolvedValue(mockMember);
      bookingRepository.findClassById.mockResolvedValue(mockClass);
      bookingRepository.countExistingBookings.mockResolvedValue(1);
      bookingRepository.saveBooking.mockResolvedValue({ success: true });

      const result = await bookingService.createBooking({
        username: 'sidd',
        classId: 'class1',
        participationDate: '2025-07-18'
      });

      expect(result).toEqual({ success: true });
      expect(bookingRepository.saveBooking).toHaveBeenCalledWith({
        memberId: mockMember._id,
        classId: mockClass._id,
        participationDate: mockClass.date
      });
    });

    it('should throw error if member not found', async () => {
      bookingRepository.findMemberByUsername.mockResolvedValue(null);

      await expect(bookingService.createBooking({
        username: 'invalid',
        classId: 'class1',
        participationDate: '2025-07-18'
      })).rejects.toThrow('Member not found');
    });

    it('should throw error if class not found', async () => {
      bookingRepository.findMemberByUsername.mockResolvedValue(mockMember);
      bookingRepository.findClassById.mockResolvedValue(null);

      await expect(bookingService.createBooking({
        username: 'sidd',
        classId: 'invalid',
        participationDate: '2025-07-18'
      })).rejects.toThrow('Class not found');
    });

    it('should throw error if participation date does not match class date', async () => {
      const wrongDateClass = { ...mockClass, date: new Date('2025-07-19') };
      bookingRepository.findMemberByUsername.mockResolvedValue(mockMember);
      bookingRepository.findClassById.mockResolvedValue(wrongDateClass);

      await expect(bookingService.createBooking({
        username: 'sidd',
        classId: 'class1',
        participationDate: '2025-07-18'
      })).rejects.toThrow('Participation date must match the class date');
    });

    it('should throw error if class is full', async () => {
      bookingRepository.findMemberByUsername.mockResolvedValue(mockMember);
      bookingRepository.findClassById.mockResolvedValue(mockClass);
      bookingRepository.countExistingBookings.mockResolvedValue(2); // equal to capacity

      await expect(bookingService.createBooking({
        username: 'sidd',
        classId: 'class1',
        participationDate: '2025-07-18'
      })).rejects.toThrow('Class is full');
    });
  });

  describe('searchBookings', () => {
    it('should return bookings for a valid member', async () => {
      const mockMember = { _id: 'member123' };
      const mockResults = [{ _id: 'booking1' }];

      bookingRepository.findMemberByUsername.mockResolvedValue(mockMember);
      bookingRepository.findBookingsForMember.mockResolvedValue(mockResults);

      const result = await bookingService.searchBookings({
        username: 'sidd',
        startDate: '2025-07-10',
        endDate: '2025-07-20'
      });

      expect(result).toEqual(mockResults);
    });

    it('should throw error if no member and no date filters', async () => {
      bookingRepository.findMemberByUsername.mockResolvedValue(null);

      await expect(bookingService.searchBookings({
        username: 'ghost',
        startDate: null,
        endDate: null
      })).rejects.toThrow('Member not found');
    });
  });
});
