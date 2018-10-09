var mongoose = require('mongoose');
var EmergencyContactSchema = new mongoose.Schema({
  userId: String,
  name: String,
  relationship: String,
  homePhone: Number,
  mobilePhone: Number,
  lastModified: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('Emergency', EmergencyContactSchema, 'EmergencyContact');