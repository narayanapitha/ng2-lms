var Leave        = require('../models/leave'); // get the mongoose model
var User        = require('../models/user');
var mongoose    = require('mongoose');
var config      = require('../../config/database');
var passport	= require('passport');
var jwt = require('jsonwebtoken');
// bundle our routes


// get all users data (GET http://localhost:9000/api/users)
exports.listLeaves = (req, res) => {
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

        Leave.find().count(function(err, count){
            var totalDoc = count;
            Leave.find().limit(perPage).skip(startPage).sort({ '_id': -1 }).populate('userid', { firstname: 1, lastname: 1}).exec(function(err, leave) {
              if (err) throw err;
      
              if (!leave) {
                return res.status(403).send({success: false, msg: 'Authentication failed. leave not found.'});
              } else {
                res.json({success: true, total: totalDoc,  data: leave});
              }
            });
        });

        /*Leave.find(function(err, leave) {
              if (err) throw err;
      
              if (!leave) {
                return res.status(403).send({success: false, msg: 'Authentication failed. leaves not found.'});
              } else {
                res.json({success: true, data: leave});
              }
            }).populate('userid', { firstname: 1, lastname: 1});*/


      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

// get all users data (GET http://localhost:9000/api/users)
exports.listLeavesByUser = (req, res) => {
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

        Leave.find({userid: req.params.userid}).count(function(err, count){
            var totalDoc = count;
            Leave.find({userid: req.params.userid}).limit(perPage).skip(startPage).sort({ '_id': -1 }).populate('userid', { firstname: 1, lastname: 1}).exec(function(err, leave) {
              if (err) throw err;
      
              if (!leave) {
                return res.status(403).send({success: false, msg: 'Authentication failed. leave not found.'});
              } else {
                res.json({success: true, total: totalDoc,  data: leave});
              }
            });
        });


       /* Leave.find({userid: req.params.userid}, function(err, leave) {
              if (err) throw err;
      
              if (!leave) {
                return res.status(403).send({success: false, msg: 'Authentication failed. leaves not found.'});
              } else {
                res.json({success: true, data: leave});
              }
            }).populate('userid', { firstname: 1, lastname: 1});*/


      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

// get all users data (GET http://localhost:9000/api/users)
exports.listLeavesByManager = (req, res) => {
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

        Leave.find({managerid: req.params.managerid}).count(function(err, count){
            var totalDoc = count;
            Leave.find({managerid: req.params.managerid}).limit(perPage).skip(startPage).sort({ '_id': -1 }).populate('userid', { firstname: 1, lastname: 1}).exec(function(err, leave) {
              if (err) throw err;
      
              if (!leave) {
                return res.status(403).send({success: false, msg: 'Authentication failed. leave not found.'});
              } else {
                res.json({success: true, total: totalDoc,  data: leave});
              }
            });
        });


        /*Leave.find({managerid: req.params.managerid}, function(err, leave) {
              if (err) throw err;
      
              if (!leave) {
                return res.status(403).send({success: false, msg: 'Authentication failed. leaves not found.'});
              } else {
                res.json({success: true, data: leave});
              }
            }).populate('userid', { firstname: 1, lastname: 1});*/

      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// create a new user account (POST http://localhost:8080/api/users)
exports.addLeaves = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
      // verifies secret and checks exp
      var decoded = jwt.decode(token, config.secret, {complete: true});
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          var newLeave = new Leave({
            userid: req.body.userid,
            managerid: req.body.managerid,
            leavetype: req.body.leavetype,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            description: req.body.description,
            approve_status: req.body.approve_status,
          });
          // save the user
          newLeave.save(function(err) {
            if (err) {
              return res.json({success: false, msg: 'Holiday name or date already exists.'});
            }
            return res.json({success: true, msg: 'Successful created new Holiday.'});
          });
        }
      });
    } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// edit user data (GET http://localhost:9000/api/users/edit)
exports.editLeaves = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
          
        var updateData = { 
            managerid: req.body.managerid,
            leavetype: req.body.leavetype,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            description: req.body.description,
            approve_status: req.body.approve_status,
            comment: req.body.comment
        };
        // if everything is good, save to request for use in other routes
        Leave.findByIdAndUpdate(req.body.id, updateData, function(err, leave) {
              if (err) throw err;
      
              if (!leave) {
                return res.json({success: false, msg: 'leave not found.'});
              } else {
                res.json({success: true, msg: 'Successful edit leave.'});
              }
            });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// delete user data (GET http://localhost:9000/api/users/delete/123)
exports.deleteLeaves = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        Leave.findByIdAndRemove(req.params.id, function(err, leave) {
              if (err) throw err;
      
              if (!leave) {
                return res.json({success: false, msg: 'Leave not found.'});
              } else {
                res.json({success: true, msg: 'Successful delete leave.'});
              }
            });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// get perticular user data (GET http://localhost:9000/api/users/123)
exports.getLeaves = (req, res) => {
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
        Leave.findById(req.params.id, dataProjection,function(err, leave) {
              if (err) throw err;
      
              if (!leave) {
                return res.json({success: false, msg: 'Holiday not found.'});
              } else {
                res.json({success: true, data: leave});
              }
            }).populate('userid', { firstname: 1, lastname: 1}).populate('managerid', { firstname: 1, lastname: 1});
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

// approve leave data (GET http://localhost:9000/api/users/delete/123)
exports.confirmLeave = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        var updateData = {
            comment : req.body.comment,
            approve_status: req.body.approve_status
        };
        // if everything is good, save to request for use in other routes
        Leave.findByIdAndUpdate(req.body.id, updateData, function(err, leave) {
              if (err) throw err;
      
              if (!leave) {
                return res.json({success: false, msg: 'Leave not found.'});
              } else {
                res.json({success: true, msg: 'Successful update leave status.'});
              }
            });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};