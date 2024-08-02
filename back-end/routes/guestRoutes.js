const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestControlller');

// Route to create a new guest
router.post('/create-guests', guestController.createGuest);

// Route to get all guests
router.get('/get-guests', guestController.getGuests);

// Route to delete a guest by ID
router.delete('/guests/:id', guestController.deleteGuest);

// Delete multiple guests by IDs
router.delete('/delete-guests', guestController.deleteMultipleGuests);

module.exports = router;
