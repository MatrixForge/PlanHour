const Folder = require("../models/folderModel");
const subFolder = require("../models/subFolderModel");

exports.createFolder = async (req, res) => {
  const { title, eventType, date, noOfGuests, description } = req.body;

  const folder = new Folder({
    title,
    eventType,
    date,
    noOfGuests,
    description,
    createdBy: req.user.id,
    vendors: [],
    toDoList: [],
  });

  try {
    const newFolder = await folder.save();
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all folders of the logged-in user
exports.getAllFolders = async (req, res) => {
  const userId = req.user.id;

  try {
    const folders = await Folder.find({ createdBy: userId });
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSubFolder = async (req, res) => {
  const { mainFolderId } = req.params;
  const {
    title,
    eventType,
    date,
    noOfGuests,
    description,
    createdBy,
    vendors,
  } = req.body;
  console.log("yaarr", mainFolderId);
  try {
    // Create a new subfolder
    const subfolder = new subFolder({
      title,
      eventType,
      date,
      noOfGuests,
      description,
      createdBy: req.user.id,
      parentFolder: mainFolderId,
      vendors: [],
      toDoList: [],
    });
    await subfolder.save();

    // Update the main folder to include the subfolder ID
    const mainFolder = await Folder.findById(mainFolderId);
    if (!mainFolder) {
      return res.status(404).send("Main folder not found");
    }

    mainFolder.subfolders.push(subfolder._id);
    await mainFolder.save();

    res.status(201).send(subfolder);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getSubFolders = async (req, res) => {
  const { mainFolderId } = req.params;

  try {
    const mainFolder = await Folder.findById(mainFolderId).populate(
      "subfolders"
    );
    if (!mainFolder) {
      return res.status(404).json({ message: "Main folder not found" });
    }
    res.status(200).json(mainFolder.subfolders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get toDoList
exports.getToDoList = async (req, res) => {
  const { folderOrSubFolder, id } = req.body; // Expecting an ID of folder or subFolder
  try {
    let targetFolderOrSubFolder;

    if (folderOrSubFolder === "folder") {
      // Populate subfolders field
      targetFolderOrSubFolder = await Folder.findById(id).populate(
        "subfolders"
      );
      if (!targetFolderOrSubFolder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      console.log("Folder:", targetFolderOrSubFolder);
    } else if (folderOrSubFolder === "subFolder") {
      targetFolderOrSubFolder = await subFolder.findById(id);
      if (!targetFolderOrSubFolder) {
        return res.status(404).json({ message: "SubFolder not found" });
      }
      console.log("SubFolder:", targetFolderOrSubFolder);
    }

    const toDoLists = targetFolderOrSubFolder.toDoList || [];

    // For folders, also include the populated subfolders
    if (folderOrSubFolder === "folder") {
      const subfolders = targetFolderOrSubFolder.subfolders || [];
      res.status(200).json({ toDoLists, subfolders });
    } else {
      res.status(200).json({ toDoLists });
    }
  } catch (error) {
    console.error("Error:", error); // Log error for debugging
    res.status(400).json({ message: error.message });
  }
};

// Add Task to To-Do List
exports.addTask = async (req, res) => {
  const { folderOrSubFolder, id, task } = req.body; // Expecting an ID of folder or subFolder and a task object
  try {
    let targetFolderOrSubFolder;

    if (folderOrSubFolder.toLowerCase() === 'folder') {
      targetFolderOrSubFolder = await Folder.findById(id);
    } else if (folderOrSubFolder === "subFolder") {
      targetFolderOrSubFolder = await subFolder.findById(id);
    }

    if (!targetFolderOrSubFolder) {
      return res.status(404).json({ message: "Folder or SubFolder not found" });
    }

    targetFolderOrSubFolder.toDoList.push(task);
    await targetFolderOrSubFolder.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Route to check if a folder has subfolders
exports.hasSubfolders = async (req, res) => {
  try {
    const { folderId } = req.params;

    // Find the folder by its ID and check if it has any subfolders
    const folder = await Folder.findById(folderId).populate("subfolders");

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const hasSubfolders = folder.subfolders.length > 0;

    res.json({ hasSubfolders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Search folders by title
exports.searchFolders = async (req, res) => {
  const { keyword } = req.query; // Get the search keyword from the query parameters
  const userId = req.user.id; // Assuming you are filtering by the logged-in user

  try {
    const folders = await Folder.find({
      createdBy: userId,
      title: { $regex: keyword, $options: "i" }, // Case-insensitive search
    });
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Search subfolders by title
exports.searchSubFolders = async (req, res) => {
  const { keyword } = req.query; // Get the search keyword from the query parameters
  const userId = req.user.id; // Assuming you are filtering by the logged-in user

  try {
    const subFolders = await SubFolder.find({
      createdBy: userId,
      title: { $regex: keyword, $options: "i" }, // Case-insensitive search
    });
    res.status(200).json(subFolders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sortFolders = async (req, res) => {
  const { sortBy } = req.query; // Get the sort option from the query parameters
  const userId = req.user.id;

  try {
    // Determine the sorting criteria based on the sortBy value
    let sortCriteria = {};
    if (sortBy === "newest") {
      sortCriteria = { createdAt: -1 };
    } else if (sortBy === "oldest") {
      sortCriteria = { createdAt: 1 };
    } else if (sortBy === "a-z") {
      sortCriteria = { title: 1 };
    } else if (sortBy === "z-a") {
      sortCriteria = { title: -1 };
    }

    const folders = await Folder.find({ createdBy: userId }).sort(sortCriteria);
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sort subfolders
exports.sortSubFolders = async (req, res) => {
  const { sortBy } = req.query; // Get the sort option from the query parameters
  const userId = req.user.id;

  try {
    // Determine the sorting criteria based on the sortBy value
    let sortCriteria = {};
    if (sortBy === "newest") {
      sortCriteria = { createdAt: -1 };
    } else if (sortBy === "oldest") {
      sortCriteria = { createdAt: 1 };
    } else if (sortBy === "a-z") {
      sortCriteria = { title: 1 };
    } else if (sortBy === "z-a") {
      sortCriteria = { title: -1 };
    }

    const subFolders = await SubFolder.find({ createdBy: userId }).sort(
      sortCriteria
    );
    res.status(200).json(subFolders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Folder
exports.editFolder = async (req, res) => {
  const { folderId } = req.params;
  const { title, eventType, date, noOfGuests, description } = req.body;

  try {
    const updatedFolder = await Folder.findByIdAndUpdate(
      folderId,
      { title, eventType, date, noOfGuests, description },
      { new: true }
    );
    console.log("folddd", updatedFolder);

    if (!updatedFolder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json(updatedFolder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Folder and Subfolders
exports.deleteFolder = async (req, res) => {
  const { folderId } = req.params;
  console.log("hewwwheh", folderId);

  try {
    console.log("heheh", folderId);
    // Find the folder to delete
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Delete all associated subfolders
    await subFolder.deleteMany({ _id: { $in: folder.subfolders } });

    // Delete the main folder
    await Folder.findByIdAndDelete(folderId);

    res
      .status(200)
      .json({ message: "Folder and subfolders deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Subfolder
exports.editSubFolder = async (req, res) => {
  const { subFolderId } = req.params;
  const { title, eventType, date, noOfGuests, description } = req.body;

  try {
    console.log("subfolder ID", subFolderId);
    console.log("request body", req.body);
    const updatedSubFolder = await subFolder.findByIdAndUpdate(
      subFolderId,
      { title, eventType, date, noOfGuests, description },
      { new: true }
    );
    console.log("edited folder", updatedSubFolder);
    if (!updatedSubFolder) {
      return res.status(404).json({ message: "Subfolder not found" });
    }

    res.status(200).json(updatedSubFolder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSubFolder = async (req, res) => {
  const { subFolderId } = req.params;

  try {
    // Find and delete the subfolder
    const deletedSubFolder = await subFolder.findByIdAndDelete(subFolderId);

    console.log("deleted sub is", deletedSubFolder);
    if (!deletedSubFolder) {
      return res.status(404).json({ message: "Subfolder not found" });
    }

    // Remove the reference from the parent folder
    await Folder.findByIdAndUpdate(deletedSubFolder.parentFolder, {
      $pull: { subfolders: subFolderId },
    });

    res.status(200).json({ message: "Subfolder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFolderById = async (req, res) => {
  const { folderId } = req.params; // Get the ID from the route parameters

  try {
    const folder = await Folder.findById(folderId); // Find the folder by its ID

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json(folder); // Respond with the folder data
  } catch (error) {
    console.error("Error fetching folder by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getsubFolderById = async (req, res) => {
  const { subfolderId } = req.params; // Get the ID from the route parameters

  try {
    console.log("idd", subfolderId);

    const folder = await subFolder.findById(subfolderId); // Find the folder by its ID

    if (!folder) {
      return res.status(404).json({ message: "sub Folder not found" });
    }

    res.status(200).json(folder); // Respond with the folder data
  } catch (error) {
    console.error("Error fetching folder by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

