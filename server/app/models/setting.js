var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var SettingSchema = new Schema({
  leavepermonth: {
        type: Number,
        required: true
  },
  leaveperyear: {
        type: Number,
        required: true
  }
  
});
 
SettingSchema.pre('save', function (next) {
      return next();
});
 
module.exports = mongoose.model('Setting', SettingSchema);