const bookingController = require('../../controllers/bookingController');
const bookingService = require('../../services/bookingService');
const createBookingDTO = require('../../dtos/createBookingDTO');


jest.mock('../../services/bookingService');
jest.mock('../../validators/validateBookingInput', () => jest.fn(dto => dto));
jest.mock('../../validators/validateBookingSearchInput', () => jest.fn(dto => dto));
jest.mock('../../utils/logHelper', () => ({
  logInfo: jest.fn(),
  logError: jest.fn(),
}));

const mockRequest = (data = {}, query = {}, method = 'POST', url = '') => ({
  body: data,
  query,
  method,
  url,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Booking Controller', () => {

  describe('createBooking', () => {
    it('should create booking and return 201', async () => {
      const req = mockRequest({ username: 'sidd', classId: 'class123', participationDate: '2025-07-20' });
      const res = mockResponse();

      const mockResult = { _id: 'booking123', username: 'sidd' };
      bookingService.createBooking.mockResolvedValue(mockResult);

      await bookingController.createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockResult });
      expect(bookingService.createBooking).toHaveBeenCalledWith(expect.any(createBookingDTO));
    });

    it('should handle errors and return appropriate status code', async () => {
      const req = mockRequest({ username: 'x' });
      const res = mockResponse();

      const error = new Error('Failed to book');
      error.statusCode = 400;
      bookingService.createBooking.mockRejectedValue(error);

      await bookingController.createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Failed to book' });
    });
  });

  describe('bookingSearch', () => {
    it('should return booking search results', async () => {
      const req = mockRequest({}, { username: 'sidd' }, 'GET', '/api/bookings');
      const res = mockResponse();

      const mockResult = [{ _id: 'booking1' }];
      bookingService.searchBookings.mockResolvedValue(mockResult);

      await bookingController.bookingSearch(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockResult });
    });

    it('should handle errors in booking search', async () => {
      const req = mockRequest({}, { username: 'failUser' });
      const res = mockResponse();

      const error = new Error('Search failed');
      error.statusCode = 500;
      bookingService.searchBookings.mockRejectedValue(error);

      await bookingController.bookingSearch(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Search failed' });
    });
  });
});
