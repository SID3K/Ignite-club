const AppError = require('../utils/appError');

const validateBookingInput = (dto) => {
  const { username, classId, participationDate } = dto;

  const cleanUsername = typeof username === 'string' ? username.trim() : '';
  if(!cleanUsername){
    throw new AppError('username must not be empty string', 400);
  }
  if (!classId || !participationDate) {
    throw new AppError('classId and participationDate are required', 400);
  }

  const parsedDate = new Date(participationDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(parsedDate.getTime()) || parsedDate < today) {
    throw new AppError('participationDate must be a valid date and it should be today or a future date', 400);
  }

  return {
    ...dto,
    participationDate: parsedDate.toISOString().split('T')[0],
    username: cleanUsername
  };
};

module.exports = validateBookingInput;
