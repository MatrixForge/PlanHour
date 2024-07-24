const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorsController');

// Define the route to get all venues
router.get('/getVendors', vendorController.getAllVenues);

module.exports = router;
