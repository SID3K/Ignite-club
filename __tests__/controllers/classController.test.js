const classController = require('../../controllers/classController');
const classService = require('../../services/classService');
const createClassDTO = require('../../dtos/createClassDTO');
const validateClassInput = require('../../validators/validateClassInput');

jest.mock('../../services/classService');
jest.mock('../../validators/validateClassInput');

const mockRequest = (body = {}) => ({ body, method: 'POST', url: '/api/classes' });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Class Controller', () => {
  describe('createClass', () => {
    it('should create a class and return 201', async () => {
      const reqBody = {
        className: 'Yoga',
        startDate: '2025-07-15',
        endDate: '2025-07-16',
        startTime: '08:00',
        duration: '60',
        capacity: '20'
      };
      const req = mockRequest(reqBody);
      const res = mockResponse();

      const validatedDto = new createClassDTO(reqBody);
      const mockResult = [{ _id: '1' }, { _id: '2' }];

      validateClassInput.mockReturnValue(validatedDto);
      classService.createClass.mockResolvedValue(mockResult);

      await classController.createClass(req, res);

      expect(validateClassInput).toHaveBeenCalledWith(expect.any(createClassDTO));
      expect(classService.createClass).toHaveBeenCalledWith(validatedDto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockResult });
    });

    it('should handle errors and return 500', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      validateClassInput.mockImplementation(() => { throw new Error('Invalid input'); });

      await classController.createClass(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Invalid input' });
    });
  });

  describe('getClasses', () => {
    it('should fetch all classes and return 200', async () => {
      const req = mockRequest();
      const res = mockResponse();

      const mockResult = [{ name: 'Yoga' }, { name: 'Cardio' }];
      classService.getAllClasses.mockResolvedValue(mockResult);

      await classController.getClasses(req, res);

      expect(classService.getAllClasses).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockResult });
    });

    it('should handle errors and return 500', async () => {
      const req = mockRequest();
      const res = mockResponse();

      classService.getAllClasses.mockRejectedValue(new Error('Database operation failed'));

      await classController.getClasses(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Database operation failed' });
    });
  });
});
