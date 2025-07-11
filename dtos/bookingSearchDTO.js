/**
 * @typedef {Object} BookingSearchDTO
 * @property {string} [username] -Username to filter by member (optional)
 * @property {string} [startDate] - Start date (must be in YYYY-MM-DD format) (optional)
 * @property {string} [endDate] - End date (must be >= startDate) (optional)
 * @description At least one of `username` or (`startDate` and `endDate`) must be provided
 */

class BookingSearchDTO{
    constructor({username, startDate, endDate}){
        this.username = typeof username === 'string' ? username.trim() : '';
        this.startDate = startDate || null;
        this.endDate = endDate || null;
    }
}

module.exports = BookingSearchDTO;