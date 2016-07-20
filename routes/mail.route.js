(function() {

  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');

  var Mail = require('../models/mail.model.js');

  // Handle get request to get all mail resources
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


  // Handle post requests for mail resources
  router.post('/', function(req, res, next) {
    //console.log('handling post /mail', req.body)
    var newMail = new Mail(req.body);

    newMail.save(function(err, mail) {
      if (err) {
        next(err);
        return;
      }

      //console.log('Mail saved successfully: ', mail);
      res.send('success');
    });
  });

  module.exports = router;
})();
