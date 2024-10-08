// models/Token.js
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
