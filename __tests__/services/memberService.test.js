const memberService = require('../../services/memberService');
const memberRepository = require('../../repository/memberRepository');

jest.mock('../../repository/memberRepository');
jest.mock('../../utils/handleMongooseError', () => jest.fn((err) => new Error(`Wrapped: ${err.message}`)));

describe('MemberService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createMember', () => {
    const payload = {
      username: 'sidd',
      memberName: 'Siddarth Reddy',
      email: 'sidd@gmail.com'
    };

    it('should create a member successfully', async () => {
      memberRepository.findMemberByUserName.mockResolvedValue(null);
      memberRepository.saveMember.mockResolvedValue({ _id: '123', ...payload });

      const result = await memberService.createMember(payload);

      expect(result).toEqual(expect.objectContaining({ username: 'sidd' }));
      expect(memberRepository.findMemberByUserName).toHaveBeenCalledWith('sidd');
      expect(memberRepository.saveMember).toHaveBeenCalledWith({
        username: 'sidd',
        name: 'Siddarth Reddy',
        email: 'sidd@gmail.com'
      });
    });

    it('should throw AppError if username already exists', async () => {
      memberRepository.findMemberByUserName.mockResolvedValue({ _id: 'existing' });

      await expect(memberService.createMember(payload)).rejects.toThrow('username already exist');
    });

    it('should handle unexpected errors with mongoose wrapper', async () => {
      const error = new Error('Mongo broke');
      memberRepository.findMemberByUserName.mockRejectedValue(error);

      await expect(memberService.createMember(payload)).rejects.toThrow('Wrapped: Mongo broke');
    });
  });

  describe('getAllMembers', () => {
    it('should return members list', async () => {
      const mockMembers = [{ _id: '1', username: 'sidd' }];
      memberRepository.getAll.mockResolvedValue(mockMembers);

      const result = await memberService.getAllMembers();

      expect(result).toEqual(mockMembers);
      expect(memberRepository.getAll).toHaveBeenCalled();
    });

    it('should handle error in getAllMembers', async () => {
      const error = new Error('DB fail');
      memberRepository.getAll.mockRejectedValue(error);

      await expect(memberService.getAllMembers()).rejects.toThrow('Wrapped: DB fail');
    });
  });
});
