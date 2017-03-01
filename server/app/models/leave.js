var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var LeaveSchema = new Schema({
  leavetype: {
        type: String,
        required: true
  },
  startdate: {
        type: String,
        required: true
  },
  enddate: {
        type: String,
        required: true
  },
  description: {
        type: String,
        required: true
  },
  approve_status: {
        type: String
  }
});
 
LeaveSchema.pre('save', function (next) {
      return next();
});
 
module.exports = mongoose.model('Leave', LeaveSchema);