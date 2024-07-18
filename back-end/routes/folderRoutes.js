
const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const authenticateToken = require('../middleware/authMiddleware'); // Adjust the path as necessary


// Get all folders
router.get('/folders',authenticateToken, folderController.getAllFolders);

// Create a new folder
router.post('/folders', authenticateToken, folderController.createFolder);

// Get a folder by ID
router.get('/folders/:id', folderController.getAllFolders );

// Add a subfolder to a folder
router.post('/folders/:id/subfolders', folderController.addSubfolder);

module.exports = router;
