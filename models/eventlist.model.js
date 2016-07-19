(function() {
  var mongoose = require('mongoose');

  var eventlistSchema = new mongoose.Schema({
      name: { type: String, required: true, unique: false },
      starttime: { type: String, required: true, unique: false },
      endtime: { type: String, required: true, unique: false },
      location: {type: String, required: true, unique: false },
      description: {type: String, required: false, unique: false },
      chapter: { type: String, required: false, unique: false },
      participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
      volunteers: {type: String, required: true, unique: false }
  });

  var EventList = mongoose.model('Event', eventlistSchema);

  module.exports = EventList;
})();
