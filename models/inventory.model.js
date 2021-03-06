// Inventory Model
var mongoose = require('mongoose');

// Properties of the Item Type object
var Inventory = new mongoose.Schema({
  name: { type: String, required: true, unique: false }, // e.g. Kayak, Fishing Pole, Life Jacket
  description: { type: String, required: false, unique: false }, // Condition, details, restrictions
  chapter: { type: String, required: false, unique: false }, // Chapter that has the item in its inventory
  events: { type: [String], required: false, unique: false }, // Array of event id strings of events this item will be used for
  isUsed: { type: Boolean, required: false, unique: false } // Is registered to be used at an event
});

module.exports = mongoose.model('inventory', Inventory);

// References
//https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
