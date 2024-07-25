const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorsController');
const authenticate = require('../middleware/authMiddleware')
// Define the route to get all venues
router.get('/getVendors' ,vendorController.getAllVenues);
router.patch('/addVendorToFolder/:mainFolderId/:vendorId', vendorController.addVendorToFolders);
router.patch('/addVendorToSubFolder/:subFolderId/:vendorId', vendorController.addVendorToSubFolder);
module.exports = router;
