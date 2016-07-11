(function() {
  var mongoose = require('mongoose');

  var galleryImageSchema = new mongoose.Schema({
      path: { type: String, required: true, unique: true },
      w: { type: String, required: true, unique: false },
      h: { type: String, required: true, unique: false },
      thumbnail: { type: String, required: true, unique: true }
  });

  var GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

  module.exports = GalleryImage;
})();
