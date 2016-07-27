(function() {

	var express = require('express');
	var router = express.Router();

	var mongoose = require('mongoose');

	var Donor = require('../models/donation.model.js');

	router.post('/', function(req, res, next) {
		var newDonor = new Donor(req.body);

		newDonor.save(function (err, donor) {
			if (err) {
				next(err);
				return;
			}
			res.send(donor);
		});
	});


	router.get('/', function(req, res, next) {
		Donor.find(function (err, components) {
			if (err) {
				res.json(err);
			}
			res.send(components);
		});
	}); 

	module.exports = router;
})();