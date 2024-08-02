const Guest = require('../models/guestlistModel'); // Adjust path if necessary

// Create a new guest
exports.createGuest = async (req, res) => {
    try {
        const { name, email, number } = req.body;

        const newGuest = new Guest({ name, email, number });
        await newGuest.save();

        res.status(201).json(newGuest);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all guests
exports.getGuests = async (req, res) => {
    try {
        const guests = await Guest.find();
        res.status(200).json(guests);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a guest by ID
exports.deleteGuest = async (req, res) => {
    try {
        const { id } = req.params;
        await Guest.findByIdAndDelete(id);
        res.status(200).json({ message: 'Guest deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.deleteMultipleGuests = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of guest IDs in the request body

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: 'Invalid request. Array of IDs is required.' });
        }

        await Guest.deleteMany({ _id: { $in: ids } });

        res.status(200).json({ message: 'Guests deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};




