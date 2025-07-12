const classService = require('../../services/classService');
const classRepository = require('../../repository/classRepository');

jest.mock('../../repository/classRepository');

describe('ClassService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createClass', () => {
    it('should create one class per day and insert them', async () => {
      const dto = {
        className: 'Yoga',
        startDate: '2025-07-15',
        endDate: '2025-07-17',
        startTime: '08:00',
        duration: '60',
        capacity: 20
      };

      const expectedLength = 3;
      const mockInserted = new Array(expectedLength).fill({ _id: 'abc123' });

      classRepository.insertManyClasses.mockResolvedValue(mockInserted);

      const result = await classService.createClass(dto);

      expect(classRepository.insertManyClasses).toHaveBeenCalled();
      expect(result.length).toBe(expectedLength);
    });

    it('should handle repository error', async () => {
      const dto = {
        className: 'Zumba',
        startDate: '2025-08-01',
        endDate: '2025-08-01',
        startTime: '10:00',
        duration: '45',
        capacity: 10
      };

      classRepository.insertManyClasses.mockRejectedValue(new Error('Database operation failed'));

      await expect(classService.createClass(dto)).rejects.toThrow('Database operation failed');
    });
  });

  describe('getAllClasses', () => {
    it('should fetch all classes', async () => {
      const mockData = [{ name: 'Yoga' }, { name: 'Cardio' }];

      classRepository.getAll.mockResolvedValue(mockData);

      const result = await classService.getAllClasses();

      expect(classRepository.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });

    it('should handle errors while fetching', async () => {
      classRepository.getAll.mockRejectedValue(new Error('Database operation failed'));

      await expect(classService.getAllClasses()).rejects.toThrow('Database operation failed');
    });
  });
});
