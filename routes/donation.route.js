(function() {

	var express = require('express');
	var router = express.Router();

	var mongoose = require('mongoose');

	var Donor = require('../models/donor.model.js');

	// Handle get request to get all example resources
	router.get('/', function(req, res, next) {
		console.log('handling get /donors');
		Donor.find({}, function(err, donors) {
			if (err) {
				next(err);
				return;
			}

			console.log('returning donors: ', donors);
			res.send(donors);
		});
	});

	module.exports = router;
});