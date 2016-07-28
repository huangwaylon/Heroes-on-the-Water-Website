// Dependencies
var express = require('express');
var blog_router = express.Router();

// Load in the blog model
var Blog = require('../models/blog.model.js');

// Adds a blog item to the database
blog_router.post('/add', function(req, res) {
  // Create blog object initialized from the request
  var newItem = new Blog({
                  title: req.body.b_title,
                  body: req.body.b_body,
                  author: req.body.b_author,
                  timestamp: req.body.b_timestamp
                });
  // Create the blog object in the database
  Blog.create(newItem,
  function(err) {
    if (err) {
      // Error occurred
      return res.status(500).json({ err: err });
    } else {
      // Creation successful
      return res.status(200).json({
        status: 'Add blog item successful!'
      });
    }
  });
});

// Removes a blog item, by id, from the database
blog_router.post('/remove', function(req, res) {
  Blog.find({_id: req.body._id}).remove(
  function(err) {
    if (err) {
      // Error occurred
      return res.status(500).json({ err: err });
    } else {
      // Creation successful
      return res.status(200).json({
        status: 'Remove blog item successful!'
      });
    }
  });
});

// Retrieves all blog items
blog_router.get('/all', function (req, res) {
  Blog.find(function (err, components) {
    if (err) {
      // Error occurred
      res.send(err);
    }
    // Retrieval successful
    res.json(components);
  });
});

module.exports = blog_router;
