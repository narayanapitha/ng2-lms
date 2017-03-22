var Holiday        = require('../models/holiday'); // get the mongoose model
var mongoose    = require('mongoose');
var config      = require('../../config/database');
var passport	= require('passport');
var jwt = require('jsonwebtoken');
// bundle our routes


// get all users data (GET http://localhost:9000/api/users)
exports.listHolidays = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        var perPage = parseInt(req.query._limit);
        var startPage =  parseInt(req.query._start);
        var sortField = req.query._sort;
        var orderBy = parseInt(req.query._order);

        Holiday.find().count(function(err, count){
            var totalDoc = count;
            Holiday.find().limit(perPage).skip(startPage).sort({ '_id': -1 }).exec(function(err, holiday) {
              if (err) throw err;
      
              if (!holiday) {
                return res.status(403).send({success: false, msg: 'Authentication failed. Holiday not found.'});
              } else {
                res.json({success: true, total: totalDoc,  data: holiday});
              }
            });
        });

      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// create a new user account (POST http://localhost:8080/api/users)
exports.addHolidays = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
      // verifies secret and checks exp
      var decoded = jwt.decode(token, config.secret, {complete: true});
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          var newHoliday = new Holiday({
            holidayname: req.body.holidayname,
            holidaydate: req.body.holidaydate
          });
          // save the user
          newHoliday.save(function(err) {
            if (err) {
              return res.json({success: false, msg: 'Holiday name or date already exists.'});
            }
            res.json({success: true, msg: 'Successful created new Holiday.'});
          });
        }
      });
    } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// edit user data (GET http://localhost:9000/api/users/edit)
exports.editHolidays = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
          
        var updateData = { 
            holidayname: req.body.holidayname,
            holidaydate: req.body.holidaydate
        };
        // if everything is good, save to request for use in other routes
        Holiday.findByIdAndUpdate(req.body.id, updateData, function(err, holiday) {
              if (err) throw err;
      
              if (!holiday) {
                return res.json({success: false, msg: 'Holiday not found.'});
              } else {
                res.json({success: true, msg: 'Successful edit holiday.'});
              }
            });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// delete user data (GET http://localhost:9000/api/users/delete/123)
exports.deleteHolidays = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        Holiday.findByIdAndRemove(req.params.id, function(err, holiday) {
              if (err) throw err;
      
              if (!holiday) {
                return res.json({success: false, msg: 'Holiday not found.'});
              } else {
                res.json({success: true, msg: 'Successful delete holiday.'});
              }
            });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// get perticular user data (GET http://localhost:9000/api/users/123)
exports.getHolidays = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {

        var dataProjection = { 
            _id: false,
            __v: false
        };

        // if everything is good, save to request for use in other routes
        Holiday.findById(req.params.id, dataProjection,function(err, holiday) {
              if (err) throw err;
      
              if (!holiday) {
                return res.json({success: false, msg: 'Holiday not found.'});
              } else {
                res.json({success: true, data: holiday});
              }
            });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};
