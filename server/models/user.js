var mongoose = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
  firstName: { type: String, trim: true,  required: true },
  lastName: { type: String, trim: true,  required: true },
  afm: { type: String, trim: true,  required: true },
  password: {type: String, trum: true, required: true}
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
