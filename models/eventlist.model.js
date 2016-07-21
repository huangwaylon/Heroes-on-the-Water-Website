(function() {
  var mongoose = require('mongoose');

  var eventlistSchema = new mongoose.Schema({
      name: { type: String, required: true, unique: false },
      date: { type:  String, required: true, unique: false },
      starttime: { type: String, required: true, unique: false },
      endtime: { type: String, required: true, unique: false },
      location: {type: String, required: true, unique: false },
      description: {type: String, required: false, unique: false },
      maxParticipants: { type: String, required: false, unique: false },
      maxVolunteers: { type:  String, required: false, unique: false },
      participants: { type:  String, required: false, unique: false },
      volunteers: { type:  String, required: false, unique: false }
      // participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
      // volunteers: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
  });

  var EventList = mongoose.model('Event', eventlistSchema);

  module.exports = EventList;
})();
