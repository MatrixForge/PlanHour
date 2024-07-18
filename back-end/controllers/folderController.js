const Folder = require('../models/folderModel');

// Get all folders
exports.getAllFolders = async (req, res) => {
  try {
    const folders = await Folder.find().populate('subfolders');
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFolder = async (req, res) => {
  const { title, eventType, date, noOfGuests, description } = req.body;

  const folder = new Folder({
    title,
    eventType,
    date,
    noOfGuests,
    description,
    createdBy: req.user.id 
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
    const folders = await Folder.find({ createdBy: userId }).populate('subfolders');
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a subfolder to a folder
exports.addSubfolder = async (req, res) => {
  const { id } = req.params;
  const { title, eventType, date, noOfGuests, image } = req.body;

  const subfolder = new Folder({
    title,
    eventType,
    date,
    noOfGuests,
    image,
  });

  try {
    const parentFolder = await Folder.findById(id);
    const newSubfolder = await subfolder.save();
    parentFolder.subfolders.push(newSubfolder);
    await parentFolder.save();
    res.status(201).json(newSubfolder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};