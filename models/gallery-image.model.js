(function() {
  var mongoose = require('mongoose');

  var galleryImageSchema = new mongoose.Schema({
    //_id: {type: String, unique: true},
    path: { type: String, required: true, unique: true },
    w: { type: String, required: true, unique: false },
    h: { type: String, required: true, unique: false },
    thumbnail: { type: String, required: true, unique: true }
  });

  var galleryImage = mongoose.model('galleryImage', galleryImageSchema);

  module.exports = galleryImage;
})();
