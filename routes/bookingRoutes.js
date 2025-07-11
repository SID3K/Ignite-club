const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/createbooking', bookingController.createBooking);
router.get('/searchbooking', bookingController.bookingSearch);

module.exports = router;