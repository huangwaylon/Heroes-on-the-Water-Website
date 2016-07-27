var express = require('express');
var inventory_router = express.Router();
var mongo = require('mongodb');
var Inventory = require('../models/inventory.model.js');
var Q = require('q');

inventory_router.post('/add', function(req, res) {
  var newItem = new Inventory({
                  name: req.body.i_name,
                  description: req.body.i_description,
                  chapter: req.body.i_chapter,
                  events: req.body.i_events,
                  isUsed: req.body.i_isUsed
                });
  Inventory.create(newItem,
  function(err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: err });
    } else {
      return res.status(200).json({
        status: 'Add item successful!'
      });
    }
  });
});

inventory_router.post('/remove', function(req, res) {
  Inventory.find({_id: req.body._id}).remove(
  function(err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: err });
    } else {
      return res.status(200).json({
        status: 'Remove item successful!'
      });
    }
  });
});

inventory_router.post('/update', function(req, res) {
  var currItem = req.body;
  var o_id = new mongo.ObjectID(req.body.i_id);
  console.log(o_id);
  console.log(currItem);
  Inventory.update({'_id': o_id}, {
    name: currItem.i_name,
    description: currItem.i_description ,
    chapter: currItem.i_chapter,
    events: currItem.i_events,
    isUsed: currItem.i_isUsed 
  }, function(err, numberAffected, rawResponse) {
    console.log(rawResponse);
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    return res.status(200).json({
      status: 'Update successful!'
    });
  })
});

inventory_router.get('/all', function (req, res) {
  Inventory.find(function (err, components) {
    if (err)
      res.send(err);

    res.json(components);
  });
});

module.exports = inventory_router;
