const Folder = require('../models/folderModel');
const SubFolder = require('../models/subFolderModel');
const Vendor = require('../models/vendorModel');

//All Vendors
exports.getAllPlansForSpecificUser = async (req, res) => {
    const { id, folderOrSubFolder } = req.body;
    try {
        let targetFolderOrSubFolder;
        if (folderOrSubFolder === 'folder') {
            targetFolderOrSubFolder = await Folder.findById(id).populate({
                path: 'vendors.vendorId',
                model: 'Vendor'
            });
            if (!targetFolderOrSubFolder) {
                return res.status(204).json({ message: 'Folder not found' });
            }
        } else if (folderOrSubFolder === 'subfolder') {
            targetFolderOrSubFolder = await SubFolder.findById(id).populate({
                path: 'vendors.vendorId',
                model: 'Vendor'
            });
            if (!targetFolderOrSubFolder) {
                return res.status(204).json({ message: 'SubFolder not found' });
            }
        }
        const vendors = targetFolderOrSubFolder.vendors.map(vendor => vendor.vendorId);
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
