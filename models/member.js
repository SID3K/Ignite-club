const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});

module.exports = mongoose.model('Member', memberSchema);
