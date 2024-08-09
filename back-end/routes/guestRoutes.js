const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestControlller');

// Route to create a new guest
router.post('/create-guests', guestController.createGuest);

// Route to get all guests
router.get('/get-guests', guestController.getGuests);

// Delete multiple guests by IDs
router.delete('/delete-guests', guestController.deleteMultipleGuests);

router.get('/search-guests' , guestController.searchGuests);

module.exports = router;
