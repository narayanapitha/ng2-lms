var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var UserSchema = new Schema({
  username: {
        type: String,
        unique: true,
        required: true
  },
  password: {
        type: String,
        required: true
  },
  firstname: {
        type: String,
        required: true
  },
  lastname: {
        type: String,
        required: true
  },
  photo: {
        type: String
  },
  birthday: {
        type: Object,
        required: true
  },
  emailaddress: {
        type: String,
        unique: true,
        required: true
  },
  role: {
        type: String,
        required: true
  },
  gender: {
        type: String,
        required: true
  },
  reportingmanager: {type: Schema.Types.ObjectId, ref: 'User' },
  employmentdate: {
        type: Object,
        required: true
  },
  phone: {
        type: String
  },
  address: {
        type: String
  },
  leaveperyear: {
        type: Number
  },
  leaveflag: {
        type: Number
  }
  
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);