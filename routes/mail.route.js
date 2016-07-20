(function() {

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');

  var Mail = require('../models/mail.model.js');

  // Handle get request to get all example resources
  router.get('/', function(req, res, next) {
    console.log('handling get /mail in mail.route.js');
    Mail.find({}, function(err, mail) {
      if (err) {
        next(err);
        return;
      }

      //console.log('returning mail: ', mail);
      res.send(mail);
    });
  });

  module.exports = router;
})();
