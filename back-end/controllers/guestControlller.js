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

    let subfolder = null;
    // Check if subfolderId is provided, and if so, verify it exists

    console.log("sub folder is", req.body.subFolderId);
    
        if (subfolder) {
      subfolder = await subFolder.findById(subFolderId);
      if (!subfolder) {
        return res.status(404).json({ message: "Subfolder not found" });
      }
    }

    const newGuest = new Guest({
      name,
      email,
      number,
      folder: folderId,
      subfolder: subfolderId || null, // Set subfolder to null if not provided
    });

    const savedGuest = await newGuest.save();

    // Add the guest ID to the respective folder or subfolder
    if (subfolderId) {
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

// Delete a guest by ID
exports.deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;
    await Guest.findByIdAndDelete(id);
    res.status(200).json({ message: "Guest deleted" });
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

    await Guest.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Guests deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
