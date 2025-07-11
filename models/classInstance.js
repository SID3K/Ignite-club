const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('ClassInstance', classSchema);