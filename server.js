(function() {
  // Dependencies
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
  var MongoStore = require('connect-mongo')(expressSession);

  var app = express();

  // Set up parsing of the body as a JSON object
  app.use(bodyParser.json());

  // Set up database url for mongoose to connect to
  mongoose.connect('mongodb://localhost:27017/blackwater', function (err) {
    if (err) {
      console.log(err);
    }
  });

  var Schema = mongoose.Schema;
  var User = require('./models/user.model.js');

  // Required routes
  var exampleRoute = require('./routes/example.route.js');
  var galleryImageRoute = require('./routes/gallery-image.route.js');
  var chapterRoute = require('./routes/chapter.route.js');
  var donationRoute = require('./routes/donation.route.js');
  var mailRoute = require('./routes/mail.route.js');
  var routes = require('./routes/api.route.js');
  var eventlistRoute = require('./routes/eventlist.route.js');
  var inventoryRoute = require('./routes/inv.route.js');

  app.use(express.static('public'));

  // Define middleware
  app.use(express.static(path.join(__dirname, './client')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(require('express-session')({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({mongooseConnection:mongoose.connection})
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, 'public')));

  // Configure PassportJs and authenticate
  passport.use(new localStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // data routes
  app.use('/user/', routes);
  app.use('/inventory/', inventoryRoute);
  app.use('/donors/', donationRoute);
  app.use('/examples', exampleRoute);
  app.use('/galleryImages', galleryImageRoute);
  app.use('/events', eventlistRoute);
  app.use('/user', routes);
  app.use('/inventory', inventoryRoute);
  app.use('/chapters', chapterRoute);
  app.use('/mail', mailRoute)

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './client', 'index.html'));
  });

  // If no route is found, send a 404 error
  app.use(function(req, res) {
    res.status(404).send("Sorry! The page that you request was not found!");
  });

  // Start the server
  app.listen(3000, function() {
    console.log("Heroes on the Water listening on port 3000");
  });
})();
