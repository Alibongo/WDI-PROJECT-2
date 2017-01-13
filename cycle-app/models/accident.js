const mongoose = require('mongoose');

const accidentSchema = mongoose.Schema({
  datetime: String,
  severity: String,
  latitude: String,
  longitude: String,
  location: String
});

module.exports = mongoose.model('Accident', accidentSchema);
