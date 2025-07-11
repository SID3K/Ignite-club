const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ClassInstance', 
        required: true
    },
    participationDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
