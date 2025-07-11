const AppError = require('../utils/appError');

function validateBookingSearchInput({ username, startDate, endDate }) {
  const hasUsername = typeof username === 'string' && username.trim() !== '';
  const hasDateRange = startDate && endDate;

  if(!hasUsername && !hasDateRange) {
    throw new AppError('Either username or both startDate and endDate must be provided', 400, 'Validation Error');
  }

  if(hasDateRange) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end)) {
      throw new AppError('Invalid date format', 400, 'Validation Error');
    }
    //check if start date is before or equal to end date
    if(start > end) {
      throw new AppError('startDate must be before endDate', 400, 'Validation Error');
    }
  }

  return { username, startDate, endDate };
}

module.exports = validateBookingSearchInput;