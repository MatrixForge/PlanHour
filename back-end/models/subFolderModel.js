const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  eventType: { type: String, required: true },
  date: { type: Date, required: true },
  noOfGuests: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toDoList: [{
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
  }],
  vendors:[
    {type:mongoose.Schema.Types.ObjectId, ref:"Vendor"}
  ]
});

const subFolder = mongoose.model('subFolder', folderSchema);

module.exports = subFolder;
