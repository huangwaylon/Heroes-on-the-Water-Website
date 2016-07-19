(function() {

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');

  var Chapter = require('../models/chapter.model.js');

  // Handle get request to get all example resources
  router.get('/', function(req, res, next) {
    console.log('handling get /chapters in chapter.route.js');
    Chapter.find({}, function(err, chapters) {
      if (err) {
        next(err);
        return;
      }

      //console.log('returning chapters: ', chapters);
      res.send(chapters);
    });
  });

  module.exports = router;
})();
