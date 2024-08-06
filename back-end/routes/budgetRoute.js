const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const authenticateToken = require('../middleware/authMiddleware');
// Define the route to get all venues
router.post('/get-all-plans-for-specific-user', authenticateToken, budgetController.getAllPlansForSpecificUser);
router.post('/save-selected-vendors',authenticateToken, budgetController.saveSelectedVendors);
module.exports = router;
