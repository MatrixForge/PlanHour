const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  eventType: { type: String, required: true },
  date: { type: Date, required: true },
  noOfGuests: { type: Number, required: true },
  description: { type: String, required: true },
  subfolders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subFolder' }],
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toDoList: [{
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
  }],
  vendors: [{
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    saved: { type: Boolean, default: false },
  }],
  guests: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Guest"
  }],
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
