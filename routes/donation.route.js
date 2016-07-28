(function() {
	var express = require('express');
	var donor_router = express.Router();
	var mongoose = require('mongoose');

	var Donor = require('../models/donation.model.js');

	// Post request for the donors
	donor_router.post('/add', function(req, res, next) {
		// Store the new donor's information
		var newDonor = new Donor(req.body);

		// Save the new donor
		newDonor.save(function (err, donor) {
			// Handle error
			if (err) {
				next(err);
				return;
			}
			// Send the new donor document
			res.send(donor);
		});
	});

	// Get request for the donors
	donor_router.get('/all', function(req, res, next) {
		// Find the donor's information
		Donor.find(function (err, components) {
			// Handle error
			if (err) {
				res.json(err);
			}
			// Send donor information
			res.send(components);
		});
	});

	module.exports = donor_router;
})();
