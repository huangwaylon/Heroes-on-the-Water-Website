(function() {
    var mongoose = require('mongoose');

    var chapterSchema = new mongoose.Schema({
        name: String,
        city: String,
        state: String,
        zip: String,
        lat: Number,
        lng: Number,
        description: String,
        url: String,
        email: String,
        email_link: String,
        phone: String,
        chapterId: Number,
        web_link: String,
        url_link: String
    });

    var Chapter = mongoose.model('Chapter', chapterSchema);


    module.exports = Chapter;
})();
