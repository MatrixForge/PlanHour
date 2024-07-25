const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  city: {
    type: [String],
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  services: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  staff: {
    type: [String],
    required: true
  },
  vendorType: {
    type: String,
    required: true
  }
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
