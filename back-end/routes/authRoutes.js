const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword, getUserByToken } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', authenticateToken, getUserByToken); // Protected route to get user by token
module.exports = router;
