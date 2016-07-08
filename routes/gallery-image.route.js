(function() {

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');

  var galleryImage = require('../models/gallery-image.model.js');

  // Handl get request to get all example resources
  router.get('/', function(req, res, next) {
    galleryImage.find({}, function(err, examples) {
      if (err) {
        next(err);
        return;
      }

      console.log('returning examples: ', examples);
      res.send(examples);
    });
  });

  module.exports = router;
})();
