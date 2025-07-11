const createBookingDTO = require('../dtos/createBookingDTO');
const BookingSearchDTO = require('../dtos/bookingSearchDTO');
const validateBookingInput = require('../validators/validateBookingInput');
const validateBookingSearchInput = require('../validators/validateBookingSearchInput');
const bookingService = require('../services/bookingService');

const createBooking = async (req, res)=>{
    try{
        const bookingDto = new createBookingDTO(req.body);
        const validatedDto = validateBookingInput(bookingDto);

        const result = await bookingService.createBooking(validatedDto);
        res.status(201).json(result);
    }
    catch(error){
        res.status(error.statusCode || 500).json({ message: error.message || 'Something went wrong' });
    }
}

const bookingSearch = async(req, res)=>{
    try{
        const bookingSearchDto = new BookingSearchDTO(req.query);
        const validatedDto = validateBookingSearchInput(bookingSearchDto);

        const result = await bookingService.searchBookings(validatedDto);
        res.status(200).json(result);
    }
    catch(error){
        res.status(error.statusCode || 500).json({message: error.message || 'Something went wrong'});
    }
}

module.exports = { createBooking, bookingSearch };