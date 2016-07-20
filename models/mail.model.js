(function() {
    var mongoose = require('mongoose');

    var mailSchema = new mongoose.Schema({
        id: Number,
        sender: String,
        recipient: String,
        subject: String,
        body: String,
        read: Boolean
    });

    var Mail = mongoose.model('Mail', mailSchema);

    module.exports = Mail;
})();
