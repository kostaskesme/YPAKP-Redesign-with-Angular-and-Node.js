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
  situation: {type: String, trim: true}, 
  situationDate: {type: Date},
  employers: [
    {
      id: { type: ObjectId, ref: 'User', required: true },
      company: {type: String, trim: true},
      firstName: { type: String, trim: true,  required: true },
      lastName: { type: String, trim: true,  required: true },
      afm: { type: String, trim: true,  required: true }
    }
  ],
  employees: [
    {
      id: { type: ObjectId, ref: 'User', required: true },
      firstName: { type: String, trim: true,  required: true },
      lastName: { type: String, trim: true,  required: true },
      afm: { type: String, trim: true,  required: true },
      situation: {type: String, trim: true, required: true}, 
      situationDate: {type: Date}
    }
  ]
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
