(function() {
  var express = require("express");
  var app = express();

  // Set up parsing of the body as a JSON object
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/blackwater');
  var Schema = mongoose.Schema;

  var exampleRoute = require('./routes/example.route.js');

  // Set up a static resources director
  app.use(express.static('public'));

  // User the example route to handle requests for example resources
  app.use('/examples', exampleRoute);

  // If no route is found, send a 404 error
  app.use(function(req, res) {
    res.send(404, "Not Found");
  });

  // Start the server
  app.listen(3000, function() {
    console.log("Example app listening on port 3000");
  });
})();
