const AppError = require('../utils/appError');

validateClassInput = (dto) => {

  const { className, startDate, endDate, startTime, duration, capacity } = dto;

  if (!className || !startDate || !endDate || !startTime || !duration || capacity===undefined){
    throw new AppError('Missing required fields', 400);
  }

  if (typeof capacity !== 'number' || capacity == NaN || capacity < 1){
    console.log("capacity not valid")
    throw new AppError('Capacity must be a number and at least 1', 400);
  }

   const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new AppError('Invalid date format', 400, 'Validation Error');
  }

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(startTime)) {
    throw new AppError('startTime must be in HH:mm format (24-hour)', 400);
  }

  // Check if start date is in the past
  if (start < today) {
    throw new AppError('Start date must be today or in the future', 400, 'Validation Error');
  }

  // Check if startDate is before or equal to endDate
  if (start > end) {
    throw new AppError('Start date cannot be after end date', 400, 'Validation Error');
  }

  return dto;
};

module.exports = validateClassInput;