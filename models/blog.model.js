// Blog Model
var mongoose = require('mongoose');

// Properties of the Blog object
var Blog = new mongoose.Schema({
  title: { type: String, required: true, unique: false }, // e.g. July 4th Event Review
  body: { type: String, required: true, unique: false }, // e.g. T'was a great event!
  author: { type: String, required: true, unique: false}, // e.g. John Oliver
  timestamp: { type: Date, required: true, unique: false} // e.g. 12/25/2020
});

module.exports = mongoose.model('blogs', Blog);

// References
//https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
