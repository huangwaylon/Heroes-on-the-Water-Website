// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  disabilities: String,
  account: String,
  mail: [String]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
