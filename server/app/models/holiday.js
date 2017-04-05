var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var HolidaySchema = new Schema({
  holidayname: {
        type: String,
        unique: true,
        required: true
  },
  holidaydate: {
        type: Object,
        required: true
  }
});
 
HolidaySchema.pre('save', function (next) {
      return next();
});
 
module.exports = mongoose.model('Holiday', HolidaySchema);