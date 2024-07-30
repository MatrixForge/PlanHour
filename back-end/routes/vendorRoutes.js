const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorsController');
const authenticateToken = require('../middleware/authMiddleware'); 
// Define the route to get all venues
router.get('/getVendors',authenticateToken, vendorController.getAllVenues);
router.patch('/addVendorToFolder/:mainFolderId/:vendorId', authenticateToken ,vendorController.addVendorToFolders);
router.patch('/addVendorToSubFolder/:subFolderId/:vendorId', authenticateToken, vendorController.addVendorToSubFolder);
module.exports = router;
