(function() {
    var mongoose = require('mongoose');

    var chapterSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        city: { type: String, required: true, unique: false },
        state: { type: String, required: true, unique: false },
        zip: { type: String, required: true, unique: false },
        lat: { type: Number, required: true, unique: true },
        lng: { type: Number, required: true, unique: true },
        description: { type: String, required: true, unique: false },
        url: { type: String, required: true, unique: false },
        email: { type: String, required: true, unique: false },
        email_link: { type: String, required: true, unique: false },
        phone: { type: String, required: true, unique: false },
        chapterId: { type: Number, required: true, unique: true },
        web_link: { type: String, required: true, unique: false },
        url_link: { type: String, required: true, unique: false }
    });

    var Chapter = mongoose.model('Chapter', chapterSchema);

    module.exports = Chapter;
})();
