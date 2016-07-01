(function() {

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');

  var Example = require('../models/example.model.js');

  // Handl get request to get all example resources
  router.get('/', function(req, res, next) {
    console.log('handling get /examples');
    Example.find({}, function(err, examples) {
      if (err) {
        next(err);
        return;
      }

      console.log('returning examples: ', examples);
      res.send(examples);
    });
  });

  // Handle post requests for example resources
  router.post('/', function(req, res, next) {
    console.log('handling post /examples', req.body)
    var newExample = new Example(req.body);

    newExample.save(function(err, example) {
      if (err) {
        next(err);
        return;
      }

      console.log('Example saved successfully: ', example);
      res.send('success');
    });
  });

  module.exports = router;
})();
