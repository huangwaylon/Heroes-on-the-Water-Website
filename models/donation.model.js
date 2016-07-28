(function() {
    var mongoose = require('mongoose');

    // Information from the donor that will be stored.
    var donationSchema = new mongoose.Schema({
        firstname: { type: String, required: true, unique: false },
        lastname: { type: String, required: true, unique: false },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        donation: { type: String, required: true, unique: false },
        address: { type: String, required: false, unique: true },
        city: { type: String, required: false, unique: false },
        zip: { type: String, required: false, unique: false },
        state: { type: String, required: false, unique: false },
        country: { type: String, required: false, unique: false },
        comment: { type: String, required: false, unique: false }
    });

    var Donor = mongoose.model('Donor', donationSchema);

    module.exports = Donor;
})();
