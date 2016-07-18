var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.model.js');
var Q = require('q');

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
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
  res.setHeader("Content-Type", "application/json");
  res.status(200);

  var u = Q.defer();
  User.findById(req.user._id, function (err, user) {
    if (err) {
      u.reject(err);
    } else {
      u.resolve(user);
    }
  });

  res.json({
    hello: "world",
    username: req.user.username,
    firstname: u.promise.firstname,
    lastname: u.promise.lastname,
    email: u.promise.email,
    disabilities: u.promise.disabilities
  });
});

module.exports = router;
