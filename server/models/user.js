var mongoose = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;



var UserSchema = new mongoose.Schema({
  firstName: { type: String, trim: true,  required: true },
  lastName: { type: String, trim: true,  required: true },
  afm: { type: String, trim: true,  required: true },
  password: {type: String, trim: true, required: true},
  type: {type: String, trim: true, required: true},
  parentU12: {type: Boolean},
  situation: {type: String, trim: true, required: true}, 
  situationDate: {type: Date},
  applied:{type: Boolean},
  employer: {type: ObjectId, ref: 'User'},
  employees: [{
      id: { type: ObjectId, ref: 'User'},
    }]
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
