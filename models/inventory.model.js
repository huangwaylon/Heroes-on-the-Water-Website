// Inventory Model
var mongoose = require('mongoose');

// Properties of the Item Type object
var Inventory = new mongoose.Schema({
  name: { type: String, required: true, unique: false }, // e.g. Kayak, Fishing Pole, Life Jacket
  chapter: { type: String, required: false, unique: false }, // Chapter that has the item in its inventory
  description: { type: String, required: false, unique: false }, // Condition, details, restrictions
  isUsed: { type: Boolean, required: false, unique: false } // Is registered to be used at an event
});

module.exports = mongoose.model('inventory', Inventory);

// References
//https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
