(function() {
    var mongoose = require('mongoose');

    var mailSchema = new mongoose.Schema({
        sender: String,
        recipient: String,
        subject: String,
        body: String,
        date: Date,
        read: Boolean
    });

    var Mail = mongoose.model('Mail', mailSchema);

    module.exports = Mail;
})();
