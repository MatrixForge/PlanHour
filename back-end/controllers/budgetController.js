const Folder = require('../models/folderModel');
const subFolder = require('../models/subFolderModel');
const Vendor = require('../models/vendorModel');
exports.getAllPlansForSpecificUser = async (req, res) => {
    const { userId } = req.body;
    try {
        const folders = await Folder.find({ createdBy: userId }).populate('vendors');
        const subFolders = await subFolder.find({ createdBy: userId }).populate('vendors');
        // Extract vendor IDs from folders and subfolders
        const vendorIds = new Set();
        folders.forEach(folder => folder.vendors.forEach(vendor => vendorIds.add(vendor)));
        subFolders.forEach(subFolder => subFolder.vendors.forEach(vendor => vendorIds.add(vendor)));

        // Retrieve vendor details using vendor IDs
        const vendors = await Vendor.find({ _id: { $in: Array.from(vendorIds) } });

        res.status(200).json(vendors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};