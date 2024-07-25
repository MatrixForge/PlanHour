
const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestListController');
const authenticateToken = require('../middleware/authMiddleware'); 


router.post('/send-invitations', authenticateToken, guestController.sendInvitations);

router.get('/oauth2callback',authenticateToken, guestController.oAuth2callback);

module.exports = router;
