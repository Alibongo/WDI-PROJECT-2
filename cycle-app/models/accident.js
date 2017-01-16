const mongoose = require('mongoose');

const accidentSchema = mongoose.Schema({
  datetime: String,
  severity: String,
  lat: String,
  lng: String
});

module.exports = mongoose.model('Accident', accidentSchema);
