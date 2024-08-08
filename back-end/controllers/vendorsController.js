const Venue = require('../models/vendorModel');
const Folder = require('../models/folderModel');
const subFolder = require('../models/subFolderModel');
const mongoose = require('mongoose')
// Controller to get all venues
exports.getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.find();
        res.json(venues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.addVendorToFolders = async (req, res) => {
    const { mainFolderId, vendorId } = req.params;
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(mainFolderId) || !mongoose.Types.ObjectId.isValid(vendorId)) {
        return res.status(400).send('Invalid folder or vendor ID');
    }

    try {
        const mainFolder = await Folder.findById(mainFolderId);
        if (!mainFolder) {
            return res.status(404).send('Main folder not found');
        }

        // Check if vendor already exists
        const existingVendor = mainFolder.vendors.find(vendor => {
            if (vendor.vendorId) {
                return vendor.vendorId.equals(vendorId);
            }
            return false;
        });

        if (!existingVendor) {
            mainFolder.vendors.push({
                vendorId: new mongoose.Types.ObjectId(vendorId),
                saved: false,
            });
            await mainFolder.save();
            return res.status(201).send('Vendor added to folder');
        } else {
            return res.status(409).send('Vendor already exists in folder');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
};
exports.addVendorToSubFolder = async (req, res) => {
    const { subFolderId, vendorId } = req.params;
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(subFolderId) || !mongoose.Types.ObjectId.isValid(vendorId)) {
        return res.status(400).send('Invalid subfolder or vendor ID');
    }
    try {
        const subFolder_check = await subFolder.findById(subFolderId);
        if (!subFolder_check) {
            return res.status(404).send('Subfolder not found');
        }
        // Check if vendor already exists
        const existingVendor = subFolder_check.vendors.find(vendor => {
            if (vendor.vendorId) {
                return vendor.vendorId.equals(vendorId);
            }
            return false;
        });
        if (!existingVendor) {
            subFolder_check.vendors.push({
                vendorId: new mongoose.Types.ObjectId(vendorId),
                saved: false,
            });
            await subFolder_check.save();
            res.status(201).send("vendor added to subfolder");
        } else {
            return res.status(404).send('vendor already found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};