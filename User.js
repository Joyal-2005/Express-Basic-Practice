const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Admin', 'Member', 'Guest'], default: 'Member' }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
