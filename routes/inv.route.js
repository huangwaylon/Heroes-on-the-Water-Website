var express = require('express');
var inventory_router = express.Router();

var Inventory = require('../models/inventory.model.js');
var Q = require('q');

inventory_router.post('/add', function(req, res) {
  var newItem = new Inventory({
                  name: req.body.i_name,
                  description: req.body.i_description,
                  isUsed: req.body.i_isUsed
                });
  console.log(newItem);
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

inventory_router.get('/all', function (req, res) {
  Inventory.find(function (err, components) {
    if (err)
      res.send(err);

    res.json(components);
  });
});

module.exports = inventory_router;
