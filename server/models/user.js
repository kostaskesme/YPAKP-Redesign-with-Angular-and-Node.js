var mongoose = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
  name: { type: String, trim: true,  required: true },
  lastName: { type: String, trim: true,  required: true },
  afm: { type: String, trim: true,  required: true },
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
