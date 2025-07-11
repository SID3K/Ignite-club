const createBookingDTO = require('../dtos/createBookingDTO');
const BookingSearchDTO = require('../dtos/bookingSearchDTO');
const validateBookingInput = require('../validators/validateBookingInput');
const validateBookingSearchInput = require('../validators/validateBookingSearchInput');
const bookingService = require('../services/bookingService');
const logger = require('../utils/logger');
const { logInfo, logError } = require('../utils/logHelper');


const createBooking = async (req, res)=>{
    try{
        logInfo(req, 'Create booking request received');
        const bookingDto = new createBookingDTO(req.body);
        const validatedDto = validateBookingInput(bookingDto);

        const result = await bookingService.createBooking(validatedDto);
        logger.info(`Booking created successfully for user: ${validatedDto.username}`);
        res.status(201).json(result);
    }
    catch(error){
        logError(req, error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
    }
}

const bookingSearch = async(req, res)=>{
    try{
        logInfo(req, 'Search booking request received');
        const bookingSearchDto = new BookingSearchDTO(req.query);
        const validatedDto = validateBookingSearchInput(bookingSearchDto);

        const result = await bookingService.searchBookings(validatedDto);
        logger.info(`Search returned ${result.length} bookings`);
        res.status(200).json(result);
    }
    catch(error){
        logError(req, error);
        res.status(error.statusCode || 500).json({message: error.message || 'Something went wrong'});
    }
}

module.exports = { createBooking, bookingSearch };