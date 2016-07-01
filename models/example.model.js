(function() {
  var mongoose = require('mongoose');

  var exampleSchema = new mongoose.Schema({
    //_id: {type: String, unique: true},
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false, unique: false },
    created_at: Date,
    updated_at: Date
  });

  var Example = mongoose.model('Example', exampleSchema);

  module.exports = Example;
})();
