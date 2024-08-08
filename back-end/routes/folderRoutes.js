
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
// To Do List Routes
router.post('/getToDoList', authenticateToken, folderController.getToDoList);
router.post('/addTask', authenticateToken, folderController.addTask);

//to check if main has sub foldrs(returns bool)
router.get('/check-subfolders/:folderId',folderController.hasSubfolders);
//search for main

router.get('/folders/search', authenticateToken, folderController.searchFolders);
//sort for main
router.get('/folders/sort', authenticateToken, folderController.sortFolders);
router.get('/search-subfolders',authenticateToken, folderController.searchSubFolders);
router.get('/sort-subfolders',authenticateToken, folderController.sortSubFolders);


//delete for main
router.delete('/folders/delete/:folderId', authenticateToken, folderController.deleteFolder);
//delete for sub
router.delete('/subfolders/delete/:subFolderId', authenticateToken, folderController.deleteSubFolder);
//edit for main
router.put('/folders/edit/:folderId', authenticateToken, folderController.editFolder);
//edit for sub
router.put('/subfolders/edit/:subFolderId', authenticateToken, folderController.editSubFolder);


//fetch a specific clicked folder
router.get('/folders/:folderId', folderController.getFolderById);
//fetch a specific clicked subfolder
router.get('/subfolders/:subfolderId', folderController.getsubFolderById);


module.exports = router;
