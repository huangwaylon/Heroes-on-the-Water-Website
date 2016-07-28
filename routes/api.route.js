// Dependencies
var express = require('express');
var router = express.Router();
var passport = require('passport');

// Load the User model
var User = require('../models/user.model.js');

// Register a new user with PassportJs
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
    // Automatically authenticate/login the user that just registered
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

// Request to login a user
router.post('/login', function(req, res, next) {
  // Attempt to authenticate user with PassportJs
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      // Error occurred
      return next(err);
    }
    if (!user) {
      // User does not exist
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        // Login attempt failed
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      // Login was successful
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

// Logout current user request
router.get('/logout', function(req, res) {
  req.logout();
  // Logout successful
  res.status(200).json({
    status: 'Bye!'
  });
});

// Checks the user's status - logged in or not
// Returned json includes a status field that indicates
// whether or not a user is logged in
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

// Request to get current user
router.get('/getuser', function(req, res) {
  if (!req.isAuthenticated()) {
    // No user is currently logged in
    return res.status(200).json({
      status: false
    });
  }
  // User retrieval was successful
  res.status(200).json({
    status: true,
    username: req.user.username,
    id: req.user._id
  });
});

// Request to obtain all users from database
router.get('/users', function (req, res) {
  User.find(function (err, components) {
    if (err) {
      // Error occurred
      res.send(err);
    }
    // Return all users
    res.json(components);
  });
});

// Request to update an existing user
router.post('/update', function(req, res) {
  // Retrieve the user object that is passed in
  var currUser = req.body;
  // Have the database update the entry
  User.update({username: currUser.username}, {
    username: currUser.username,
    firstname: currUser.firstname,
    lastname: currUser.lastname,
    email: currUser.email,
    disabilities: currUser.disabilities,
    account: currUser.account,
    mail: currUser.mail
  }, function(err, numberAffected, rawResponse) {
    if (err) {
      // Error occurred
      return res.status(500).json({
        err: err
      });
    }
    // User update was successful
    return res.status(200).json({
      status: 'Update successful!'
    });
  })
});

module.exports = router;
