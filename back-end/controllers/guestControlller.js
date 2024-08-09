const Guest = require("../models/guestlistModel"); // Adjust path if necessary
const Folder = require("../models/folderModel");
const subFolder = require("../models/subFolderModel");

// Create a new guest
exports.createGuest = async (req, res) => {
  try {
    const { name, email, number, folderId, subFolderId } = req.body;
    console.log("wwww", req.body);

    // Check if the main folder exists
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    console.log("folder is", folderId);

    // Check if subfolderId is provided, and if so, verify it exists

    console.log("sub folder is", req.body.subFolderId);
    
      const subfolder = await subFolder.findById(subFolderId);


      if (!subfolder) {
        console.log("yaa", subfolder);
      }
    
    const newGuest = new Guest({
      name,
      email,
      number,
      folder: folderId,
      subfolder: subFolderId || null, // Set subfolder to null if not provided
    });

    const savedGuest = await newGuest.save();

    // Add the guest ID to the respective folder or subfolder
    if (subfolder) {
      console.log("aaaa", savedGuest);
      subfolder.guests.push(savedGuest._id);
      await subfolder.save();
    } else {
      console.log("addd", savedGuest);
      folder.guests.push(savedGuest._id);
      await folder.save();
    }

    res.status(201).json(savedGuest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all guests from either a subfolder or a main folder
exports.getGuests = async (req, res) => {
  try {
    const { folderId, subfolderId } = req.query;

    let guests = [];

    if (subfolderId) {
      // Fetch guests from the specified subfolder
      const subfolder = await subFolder
        .findById(subfolderId)
        .populate("guests");
      if (!subfolder) {
        return res.status(404).json({ message: "Subfolder not found" });
      }
      guests = subfolder.guests;
    } else if (folderId) {
      // Fetch guests from the specified folder
      const folder = await Folder.findById(folderId).populate("guests");
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      guests = folder.guests;
    } else {
      return res
        .status(400)
        .json({ message: "Please provide either folderId or subfolderId" });
    }

    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.deleteMultipleGuests = async (req, res) => {
    try {
      const { ids } = req.body; // Expecting an array of guest IDs in the request body
  
      if (!ids || !Array.isArray(ids)) {
        return res
          .status(400)
          .json({ message: "Invalid request. Array of IDs is required." });
      }
  
      // Remove guests from Guest collection
      const deletedGuests = await Guest.find({ _id: { $in: ids } });
  
      if (deletedGuests.length === 0) {
        return res.status(404).json({ message: "Guests not found" });
      }
  
      // Loop through each deleted guest to remove their reference from Folder or SubFolder
      for (const guest of deletedGuests) {
        if (guest.subfolder) {
          await subFolder.findByIdAndUpdate(guest.subfolder, {
            $pull: { guests: guest._id }
          });
        } else if (guest.folder) {
          await Folder.findByIdAndUpdate(guest.folder, {
            $pull: { guests: guest._id }
          });
        }
      }
  
      // Now delete the guests from the Guest model
      await Guest.deleteMany({ _id: { $in: ids } });
  
      res.status(200).json({ message: "Guests deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

// Search guests by name
exports.searchGuests=async (req, res) => {
    try {
      const { query, folderId, subFolderId } = req.query;
  
      let searchCriteria = { name: { $regex: query, $options: 'i' } }; // Case-insensitive search
  
      // Filter by folderId or subFolderId if provided
      if (folderId) {
        searchCriteria.folder = folderId;
      }
      if (subFolderId) {
        searchCriteria.subfolder = subFolderId;
      }
  
      const guests = await Guest.find(searchCriteria);
      res.status(200).json(guests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };