const Folder = require('../models/folderModel');
const subFolder = require('../models/subFolderModel');

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
    toDoList: []
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


exports.addSubFolder=async (req, res) => {
  const { mainFolderId } = req.params;
  const { title, eventType, date, noOfGuests, description, createdBy, vendors } = req.body;

  try {
    // Create a new subfolder
    const subfolder = new subFolder({
      title,
      eventType,
      date,
      noOfGuests,
      description,
      createdBy: req.user.id,
      vendors:[],
      toDoList:[]
    });
    await subfolder.save();

    // Update the main folder to include the subfolder ID
    const mainFolder = await Folder.findById(mainFolderId);
    if (!mainFolder) {
      return res.status(404).send('Main folder not found');
    }

    mainFolder.subfolders.push(subfolder._id);
    await mainFolder.save();

    res.status(201).send(subfolder);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.getSubFolders = async (req, res) => {
  const { mainFolderId } = req.params;

  try {
    const mainFolder = await Folder.findById(mainFolderId).populate('subfolders');
    if (!mainFolder) {
      return res.status(404).json({ message: 'Main folder not found' });
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

    if (folderOrSubFolder === 'folder') {
      // Populate subfolders field
      targetFolderOrSubFolder = await Folder.findById(id).populate('subfolders');
      if (!targetFolderOrSubFolder) {
        return res.status(404).json({ message: 'Folder not found' });
      }
      console.log('Folder:', targetFolderOrSubFolder);
    } else if (folderOrSubFolder === 'subFolder') {
      targetFolderOrSubFolder = await subFolder.findById(id);
      if (!targetFolderOrSubFolder) {
        return res.status(404).json({ message: 'SubFolder not found' });
      }
      console.log('SubFolder:', targetFolderOrSubFolder);
    }

    const toDoLists = targetFolderOrSubFolder.toDoList || [];

    // For folders, also include the populated subfolders
    if (folderOrSubFolder === 'folder') {
      const subfolders = targetFolderOrSubFolder.subfolders || [];
      res.status(200).json({ toDoLists, subfolders });
    } else {
      res.status(200).json({ toDoLists });
    }
  } catch (error) {
    console.error('Error:', error); // Log error for debugging
    res.status(400).json({ message: error.message });
  }
};

// Add Task to To-Do List
exports.addTask = async (req, res) => {
  const { folderOrSubFolder, id, task } = req.body; // Expecting an ID of folder or subFolder and a task object
  try {
    let targetFolderOrSubFolder;

    if (folderOrSubFolder === 'folder') {
      targetFolderOrSubFolder = await Folder.findById(id);
    } else if (folderOrSubFolder === 'subFolder') {
      targetFolderOrSubFolder = await subFolder.findById(id);
    }

    if (!targetFolderOrSubFolder) {
      return res.status(404).json({ message: 'Folder or SubFolder not found' });
    }

    targetFolderOrSubFolder.toDoList.push(task);
    await targetFolderOrSubFolder.save();

    res.status(200).json(targetFolderOrSubFolder.toDoList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};