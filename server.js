(function() {
  // dependencies
  var express = require('express');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var expressSession = require('express-session');
  var mongoose = require('mongoose');
  var hash = require('bcrypt-nodejs');
  var path = require('path');
  var passport = require('passport');
  var localStrategy = require('passport-local' ).Strategy;
  var express = require("express");
  var app = express();

  // Set up parsing of the body as a JSON object
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/blackwater');
  var Schema = mongoose.Schema;
  // user schema/model
  var User = require('./models/user.model.js');


  var exampleRoute = require('./routes/example.route.js');
  var galleryImageRoute = require('./routes/gallery-image.route.js');

  // Set up a static resources director
  app.use(express.static('public'));

  // User the example route to handle requests for example resources
  app.use('/examples', exampleRoute);

  //Handle requests for outing images
  app.use('/galleryImages', galleryImageRoute);


  // define middleware
  //app.use(express.static(path.join(__dirname, './client')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(require('express-session')({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, 'public')));

  // configure passport
  passport.use(new localStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './client', 'index.html'));
  });

  // If no route is found, send a 404 error
  app.use(function(req, res) {
    res.status(404).send("Not Found");
  });

  // Start the server
  app.listen(3000, function() {
    console.log("Example app listening on port 3000");
  });
})();
