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
    const folders = await Folder.find({ createdBy: userId });
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addSubFolder=async (req, res) => {
  const { mainFolderId } = req.params;
  const { title, eventType, date, noOfGuests, description, createdBy } = req.body;

  console.log("bitch")

  try {
    // Create a new subfolder
    const subfolder = new subFolder({
      title,
      eventType,
      date,
      noOfGuests,
      description,
      createdBy: req.user.id
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
