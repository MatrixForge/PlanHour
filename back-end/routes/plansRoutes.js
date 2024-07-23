const express = require('express');
const router = express.Router();
const venueController = require('../controllers/plansController');

// Define the route to get all venues
router.get('/getVenues', venueController.getAllVenues);

module.exports = router;
