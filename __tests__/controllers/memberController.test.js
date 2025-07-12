const memberController = require('../../controllers/memberController');
const memberService = require('../../services/memberService');
const CreateMemberDTO = require('../../dtos/createMemberDTO');

jest.mock('../../services/memberService');
jest.mock('../../validators/validateMemberInput', () => jest.fn(dto => dto));
jest.mock('../../utils/logHelper', () => ({
  logInfo: jest.fn(),
  logError: jest.fn(),
}));

const mockRequest = (body = {}) => ({ body, method: 'POST', url: '/api/members' });

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Member Controller', () => {
  describe('createMember', () => {
    it('should create member and return 201', async () => {
      const req = mockRequest({
        memberName: 'Siddarth Reddy',
        username: 'sidd',
        email: 'sidd@gmail.com'
      });
      const res = mockResponse();

      const mockResult = { _id: 'member123', username: 'sidd', memberName: 'Siddarth Reddy' };
      memberService.createMember.mockResolvedValue(mockResult);

      await memberController.createMember(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockResult);
      expect(memberService.createMember).toHaveBeenCalledWith(expect.any(CreateMemberDTO));
    });

    it('should handle service error and return error response', async () => {
      const req = mockRequest({ memberName: 'Sidd', username: 'sidd' });
      const res = mockResponse();

      const error = new Error('Member creation failed');
      error.statusCode = 400;
      memberService.createMember.mockRejectedValue(error);

      await memberController.createMember(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Member creation failed' });
    });
  });

  describe('getMember', () => {
    it('should return list of members', async () => {
      const req = { method: 'GET', url: '/api/members' };
      const res = mockResponse();

      const mockMembers = [{ _id: '1', username: 'sidd' }];
      memberService.getAllMembers.mockResolvedValue(mockMembers);

      await memberController.getMember(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMembers);
    });

    it('should handle error in getMember', async () => {
      const req = { method: 'GET', url: '/api/members' };
      const res = mockResponse();

      const error = new Error('Failed to fetch members');
      error.statusCode = 500;
      memberService.getAllMembers.mockRejectedValue(error);

      await memberController.getMember(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Failed to fetch members' });
    });
  });
});
