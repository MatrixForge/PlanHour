const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },  
    subfolder: { type: mongoose.Schema.Types.ObjectId, ref: 'subFolder' } 

});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
