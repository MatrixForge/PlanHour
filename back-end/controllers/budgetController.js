const Folder = require('../models/folderModel');
const SubFolder = require('../models/subFolderModel');
const Vendor = require('../models/vendorModel');

//All Vendors
exports.getAllPlansForSpecificUser = async (req, res) => {
    const { folderId, subFolderId } = req.body;
    try {
        const vendorIds = new Set();
        if(folderId){
            const folder = await Folder.findById(folderId).populate('vendors');
            if (folder) {
                folder.vendors.forEach(vendor => vendorIds.add(vendor._id));
            }
        }
        if(subFolderId){
            const subFolder = await SubFolder.findById(subFolderId).populate('vendors');
            if (subFolder) {
                subFolder.vendors.forEach(vendor => vendorIds.add(vendor._id));
            }
        }
        // Retrieve vendor details using vendor IDs
        const vendors = await Vendor.find({ _id: { $in: Array.from(vendorIds) } });

        res.status(200).json(vendors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to save selected vendors
exports.saveSelectedVendors = async (req, res) => {
    const { folderId, selectedVendors } = req.body;

    if (!folderId || !Array.isArray(selectedVendors)) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        // Find and update the folder with the selected vendors
        const folder = await Folder.findById(folderId);
        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        // Update vendors array
        folder.vendors = selectedVendors;
        await folder.save();

        res.status(200).json({ message: 'Vendors updated successfully', folder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
