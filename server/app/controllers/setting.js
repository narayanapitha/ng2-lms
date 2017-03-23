var mongoose    = require('mongoose');
var config      = require('../../config/database');
var passport	= require('passport');
var jwt = require('jsonwebtoken');
var Setting        = require('../models/setting'); // get the mongoose model
// bundle our routes


exports.getSetting = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes

        Setting.findById("58d39e3d4c5bbb40411de9e2", function(err, setting) {
              if (err) throw err;
            
              if (!setting) {
                return res.json({success: false, msg: 'Settings not found.'});
              } else {
                res.json({success: true, data: setting});
              }
            });
        
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};



exports.editSetting = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
      var decoded = jwt.decode(token, config.secret, {complete: true});
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {


           var updateData = { 
              leavepermonth: req.body.leavepermonth,
              leaveperyear: req.body.leaveperyear
          };
         
          Setting.findByIdAndUpdate("58d39e3d4c5bbb40411de9e2", updateData, function(err, setting) {
              if (err) throw err;
      
              if (!setting) {
                return res.json({success: false, msg: 'settings not found.'});
              } else {
                res.json({success: true, msg: 'Successful edit settings.'});
              }
            });


        }
      });
    } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};