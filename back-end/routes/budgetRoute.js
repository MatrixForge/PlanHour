const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const authenticateToken = require('../middleware/authMiddleware');
// Define the route to get all venues
router.post('/getAllPlansForSpecificUser', authenticateToken, budgetController.getAllPlansForSpecificUser);

module.exports = router;
