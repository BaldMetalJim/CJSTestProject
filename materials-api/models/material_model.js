const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let materialSchema = new Schema({
  name: String,
  volume: Number,
  delivery: Date,
  color: String,
  cost: Number
}, {
  collection: 'materials'
})
module.exports = mongoose.model('Material', materialSchema)