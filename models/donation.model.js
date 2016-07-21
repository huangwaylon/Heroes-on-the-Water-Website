(function() {
	var mongoose = require('mongoose');

	var donationSchema =  new mongoose.Schema({
		donor: {
			firstname: { type: String, required: true, unique: true },
			lastname: { type: String, required: true, unique: true },
			email: { type: String, required: true, unique: true },
			phone: { type: Number, required: true, unique: true },
			donation: { type: Number, required: true, unique: false },
			address: { type: String, required: false, unique: true },
			city: { type: String, required: false, unique: false },
			zip: { type: Number, required: false,  unique: false },
			state: { type: String, required: false, unique: false },
			country: { type: String, required: false, unique: false},
			comment: { type: String, required: false, unique: true }
		}
	});

	var donorInfo = mongoose.model('donorInfo', donationSchema);

	app.post('/donor', function(req, res) {
		new donor({
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
		}).save(function(err, doc) {
			if (err) {
				res.json.(err);
			} else {
				res.send('Successfully Sent')
			}
		});
	});

	module.exports = donorInfo;
})();