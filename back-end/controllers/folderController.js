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
    //createdBy: req.user.id // Assuming you have user authentication
  });

  try {
    const newFolder = await folder.save();
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a folder by ID
exports.getFolderById = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id).populate('subfolders');
    res.status(200).json(folder);
  } catch (error) {
    res.status(404).json({ message: error.message });
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