const Venue = require('../models/venueModel');

// Controller to get all venues
exports.getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.find();
        res.json(venues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
