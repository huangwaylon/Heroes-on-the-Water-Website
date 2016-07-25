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

  // Handle post requests for example resources
  router.post('/', function(req, res, next) {
    //console.log('handling post /examples', req.body)
    var newEvent = new EventList(req.body);

    newEvent.save(function(err, event) {
      if (err) {
        next(err);
        return;
      }

      //console.log('Example saved successfully: ', example);
      res.send('success');
    });
  });

  router.put('/', function(req, res, next) {
    console.log('handling post /events', req.body);
    var newEvent = new EventList(req.body);
    EventList.findOneAndUpdate({_id: req.body._id}, req.body, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send(err);
    return res.send("succesfully saved");
    });
  });

  module.exports = router;
})();
