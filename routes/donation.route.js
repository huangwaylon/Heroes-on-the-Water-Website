(function() {

	var express = require('express');
	var router = express.Router();

	var mongoose = require('mongoose');
	//var Q = requre('q');

	var Donor = require('../models/donation.model.js');

	// Handle get request to get all example resources
/*	router.get('/', function(req, res, next) {
		console.log('handling get /donors in donation.route.js');
		Donor.find({}, function(err, donors) {
			if (err) {
				next(err);
				return;
			}

			console.log('returning donors: ', donors);
			res.send(donors);
		});
	}); */

	 router.post('/donors/', function(req, res) {
		var newDonor = new donor({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			phone: req.body.phone,
			donation: req.body.donation,
			address: req.body.address,
			city: req.body.city,
			zip: req.body.zip,
			state: req.body.state,
			country: req.body.country,
			comment: req.body.comment
		});

		donor.create(newDonor, function(err) {
			if (err) {
				console.log(err);
				return res.status.(500).json({err: err});
			} else {
				return res.status(200).json({
					status: 'Successfully added new donor'
				});
			}
		});
	});


	router.get('/getdonors', function(req, res) {
		donor.find(function (err, components) {
			if (err) {
				res.json(err);
			}
			res.send("Successfully inserted");
		});
	}); 

	module.exports = router;
})();