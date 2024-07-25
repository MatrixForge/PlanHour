const Venue = require('../models/vendorModel');
const Folder = require('../models/folderModel');
const subFolder = require('../models/subFolderModel');
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
    try{
        const mainFolder = await Folder.findById(mainFolderId);
        if (!mainFolder) {
            return res.status(404).send('Main folder not found');
        }

        if (!mainFolder.vendors.includes(vendorId)){
            mainFolder.vendors.push(vendorId);
            await mainFolder.save();
            res.status(201).send("vendor added to folder");
        }else{
            return res.status(404).send('venue already found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addVendorToSubFolder = async (req, res) => {
    const { subFolderId, vendorId } = req.params;
    try {
        const subFolder_check = await subFolder.findById(subFolderId);
        if (!subFolder_check) {
            return res.status(404).send('Sub folder not found');
        }

        if (!subFolder_check.vendors.includes(vendorId)) {
            subFolder_check.vendors.push(vendorId);
            await subFolder_check.save();
            res.status(201).send("vendor added to subfolder");
        } else {
            return res.status(404).send('vendor already found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};