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
        res.status(200).json(targetFolderOrSubFolder.vendors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to save selected vendors for both folder and subfolder
exports.saveSelectedVendors = async (req, res) => {
    const { id, selectedVenues, folderOrSubFolder } = req.body;

    // Check if the required fields are present
    if (!id || !selectedVenues || !folderOrSubFolder) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        let targetFolderOrSubFolder;

        // Determine if the target is a folder or subfolder
        if (folderOrSubFolder === 'folder') {
            targetFolderOrSubFolder = await Folder.findById(id);
            if (!targetFolderOrSubFolder) {
                return res.status(404).json({ message: 'Folder not found' });
            }
        } else if (folderOrSubFolder === 'subfolder') {
            targetFolderOrSubFolder = await SubFolder.findById(id);
            if (!targetFolderOrSubFolder) {
                return res.status(404).json({ message: 'SubFolder not found' });
            }
        }

        // Update the saved status of vendors in the folder or subfolder
        targetFolderOrSubFolder.vendors.forEach(vendor => {
            const vendorIdStr = vendor.vendorId.toString();

            if (Object.values(selectedVenues).includes(vendorIdStr)) {
                vendor.saved = true;
            } else {
                vendor.saved = false; // Reset others to false
            }
        });

        // Save the updated folder or subfolder
        await targetFolderOrSubFolder.save();

        res.status(200).json({ message: 'Vendors updated successfully', targetFolderOrSubFolder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};