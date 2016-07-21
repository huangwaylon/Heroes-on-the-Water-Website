var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.model.js');
var Q = require('q');

router.post('/register', function(req, res) {
  User.register(new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    disabilities: req.body.disabilities,
    account: req.body.account,
    mail: []}),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

router.get('/hello', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true,
    username: req.user.username,
    id: req.user._id
  });
});

router.get('/users', function (req, res) {
  User.find(function (err, components) {
    if (err)
      res.send(err);

    res.json(components);
  });
});

router.post('/update', function(req, res) {
  var currUser = req.body;
  console.log(currUser);
  User.update({username: currUser.username}, {
    username: currUser.username,
    firstname: currUser.firstname,
    lastname: currUser.lastname,
    email: currUser.email,
    disabilities: currUser.disabilities,
    account: currUser.account,
    mail: currUser.mail
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

module.exports = router;
