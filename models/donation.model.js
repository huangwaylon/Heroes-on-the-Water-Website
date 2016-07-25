(function() {
	var mongoose = require('mongoose');

	var donationSchema =  new mongoose.Schema({
		donorInfo: {
			firstname: { type: String, required: true, unique: false },
			lastname: { type: String, required: true, unique: false },
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

	var donor = mongoose.model('donor', donationSchema);

	module.exports = donor;
})();