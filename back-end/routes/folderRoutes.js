
const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const authenticateToken = require('../middleware/authMiddleware'); 

// Create a new folder
router.post('/folders', authenticateToken, folderController.createFolder);

// Get a folder by logged in user
router.get('/folders', authenticateToken,folderController.getAllFolders );

// Add a subfolder to a folder
router.post('/folders/:mainFolderId/subfolder',authenticateToken, folderController.addSubFolder);

// Get subfolders of a specific folder
router.get('/folders/:mainFolderId/subfolders', authenticateToken, folderController.getSubFolders);


module.exports = router;
