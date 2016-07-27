(function() {

	var express = require('express');
	var router = express.Router();

	var mongoose = require('mongoose');

	var donor = require('../models/donation.model.js');

	donationRoute.post('/donors', function(req, res) {
		var newDonor = new donor(req.body);

		newDonor.save(function (err, donor) {
			if (err) {
				next(err);
				return;
			}
			res.send(donor)
		});
	});


	donationRoute.get('/donors', function(req, res) {
		donor.find(function (err, components) {
			if (err) {
				res.json(err);
			}
			res.send(components);
		});
	}); 

	module.exports = donationRoute;
})();