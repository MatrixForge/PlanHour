const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },


    city: {
        type: [String],
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },

    staff: {
        type: [String],
        required: true
    },
});



module.exports = mongoose.model('Venue', venueSchema);;
