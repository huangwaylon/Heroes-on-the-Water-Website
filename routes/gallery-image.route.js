(function() {

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');

  var GalleryImage = require('../models/gallery-image.model.js');

  // Handl get request to get all example resources
  router.get('/', function(req, res, next) {
    GalleryImage.find({}, function(err, examples) {
      if (err) {
        next(err);
        return;
      }

      res.send(examples);
    });
  });

  module.exports = router;
})();
