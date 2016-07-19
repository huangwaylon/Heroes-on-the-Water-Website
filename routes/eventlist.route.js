(function() {

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');

  var EventList = require('../models/eventlist.model.js');

  // Handl get request to get all example resources
  router.get('/', function(req, res, next) {
    EventList.find({}, function(err, examples) {
      if (err) {
        next(err);
        return;
      }

      res.send(examples);
    });
  });


  router.get('/:id', function(req, res, next) {
    EventList.find({"_id": req.params.id}, function(err, examples) {
      if (err) {
        next(err);
        return;
      }
      if(examples.length != 1) {
        console.log("More than one element found for id. Erroring.");
      } else {
        res.send(examples[0]);
      }
    });

  });

  module.exports = router;
})();
