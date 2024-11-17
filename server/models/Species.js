const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
  taxonid: Number,
  scientific_name: String,
  category: String,
  population: String,
  threats: Array,
  habitat: String,
  conservation_measures: Array,
  region: String
});

module.exports = mongoose.model('Species', speciesSchema);
