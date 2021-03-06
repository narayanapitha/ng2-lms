var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var User = require('../models/user');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var LeaveSchema = new Schema({
  userid: {type: Schema.Types.ObjectId, ref: 'User' },
  managerid: {type: Schema.Types.ObjectId, ref: 'User' },
  leavetype: {
        type: String,
        required: true
  },
  leavedate: {
        type: Object,
        required: true
  },
  description: {
        type: String,
        required: true
  },
  approve_status: {
        type: Number
  },
  comment: {
      type: String,  
  }
});
 
LeaveSchema.pre('save', function (next) {
      return next();
});
 
module.exports = mongoose.model('Leave', LeaveSchema);