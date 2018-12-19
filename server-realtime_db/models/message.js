const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user_id: {type: String},
  station_id: {type: Number},
  station_city: {type: String},
  name: {
    type: String,
    min: [1, "Too few characters"],
    max: [30, "Too many characters"],
    required: [true, "A name is required"]
  },
  message: {
    type: String,
    min: [0, "Too few characters"],
    max: [500, "Too many characters"],
    required: [true, "A message is required"]
  },
});

module.exports = mongoose.model('Message', messageSchema);