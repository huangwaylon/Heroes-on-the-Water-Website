// Dependencies
var express = require('express');
var inventory_router = express.Router();
var mongo = require('mongodb');

// Load the inventory model
var Inventory = require('../models/inventory.model.js');

// Request to add an inventory item
inventory_router.post('/add', function(req, res) {
  // Create a inventory item object initialized from request body
  var newItem = new Inventory({
                  name: req.body.i_name,
                  description: req.body.i_description,
                  chapter: req.body.i_chapter,
                  events: req.body.i_events,
                  isUsed: req.body.i_isUsed
                });
  // Create the object in the database
  Inventory.create(newItem,
  function(err) {
    if (err) {
      // Error occurred
      return res.status(500).json({ err: err });
    } else {
      // Inventory creation was successful
      return res.status(200).json({
        status: 'Add item successful!'
      });
    }
  });
});

// Remove an inventory object from the database
inventory_router.post('/remove', function(req, res) {
  Inventory.find({_id: req.body._id}).remove(
  function(err) {
    if (err) {
      // Error occurred
      return res.status(500).json({ err: err });
    } else {
      // Removal was successful
      return res.status(200).json({
        status: 'Remove item successful!'
      });
    }
  });
});

// Update an inventory item
inventory_router.post('/update', function(req, res) {
  // Retrieve the item from the reqeust
  var currItem = req.body;
  var o_id = new mongo.ObjectID(req.body.i_id);
  // Update the item in the database
  Inventory.update({'_id': o_id}, {
    name: currItem.i_name,
    description: currItem.i_description ,
    chapter: currItem.i_chapter,
    events: currItem.i_events,
    isUsed: currItem.i_isUsed
  }, function(err, numberAffected, rawResponse) {
    if (err) {
      // Error occurred
      return res.status(500).json({
        err: err
      });
    }
    // Update was successful
    return res.status(200).json({
      status: 'Update successful!'
    });
  })
});

// Retrieve all inventory items from database
inventory_router.get('/all', function (req, res) {
  Inventory.find(function (err, components) {
    if (err) {
      res.send(err);
    }
    res.json(components);
  });
});

module.exports = inventory_router;
