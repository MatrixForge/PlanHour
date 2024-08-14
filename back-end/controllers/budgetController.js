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


// // Controller to save selected vendors
// exports.saveSelectedVendors = async (req, res) => {
//     const { id, selectedVenues } = req.body;

//     if (!id || !Array.isArray(selectedVenues)) {
//         return res.status(400).json({ message: 'Invalid data' });
//     }
//     console.log('selectedVenues', selectedVenues)
//     try {
//         // Find the folder by ID
//         const folder = await SubFolder.findById(id);
//         if (!folder) {
//             return res.status(404).json({ message: 'Folder not found' });
//         }

//         // Update the saved status of vendors
//         folder.vendors.forEach(vendor => {
//             if (selectedVenues.includes(vendor.vendorId.toString())) {
//                 vendor.saved = true;
//             } else {
//                 vendor.saved = false; // Optional: Reset others to false
//             }
//         });

//         await folder.save();

//         res.status(200).json({ message: 'Vendors updated successfully', folder });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
// Controller to save selected vendors for both folder and subfolder
exports.saveSelectedVendors = async (req, res) => {
    const { id, selectedVenues, folderOrSubFolder } = req.body;

    if (!id || !Array.isArray(selectedVenues) || !folderOrSubFolder) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        let targetFolderOrSubFolder;

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

        // Update the saved status of vendors
        targetFolderOrSubFolder.vendors.forEach(vendor => {
            if (selectedVenues.includes(vendor.vendorId.toString())) {
                vendor.saved = true;
            } else {
                vendor.saved = false; // Reset others to false
            }
        });

        await targetFolderOrSubFolder.save();

        res.status(200).json({ message: 'Vendors updated successfully', targetFolderOrSubFolder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
