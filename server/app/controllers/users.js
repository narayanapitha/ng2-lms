var mongoose    = require('mongoose');
var config      = require('../../config/database');
var passport	= require('passport');
var jwt = require('jsonwebtoken');
var User        = require('../models/user'); // get the mongoose model
var fs = require('fs');
// bundle our routes


// get all users data (GET http://localhost:9000/api/users)
exports.listUsers = (req, res) => {
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

        User.find().count(function(err, count){
            var totalDoc = count;
            User.find().limit(perPage).skip(startPage).sort({ '_id': -1 }).exec(function(err, user) {
              if (err) throw err;
      
              if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
              } else {
                res.json({success: true, total: totalDoc,  data: user});
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
exports.addUsers = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
      var decoded = jwt.decode(token, config.secret, {complete: true});
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {


          var reporting = req.body.reportingmanager;
          var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            photo: req.body.photo,
            birthday: req.body.birthday,
            emailaddress: req.body.email,
            role: req.body.role,
            gender: req.body.gender,
            employmentdate: req.body.employmentdate,
            phone: req.body.phone,
            address: req.body.address,
            leaveperyear: req.body.leaveperyear,
            leaveflag: req.body.leaveflag
          });
         
          newUser.save(function(err, adduser) {
            
            if (err) {
              return res.json({success: false, msg: 'Username already exists.'});
            }

            if(reporting=='self'){
                var updateData = { 
                    reportingmanager: adduser._id
                };
            }else{
                var updateData = { 
                    reportingmanager: req.body.reportingmanager
                };
            }
           
              User.findByIdAndUpdate(adduser._id, updateData, function(err, user) {
                if (err) throw err;
        
                if (!user) {
                  return res.json({success: false, msg: 'User not created successfully.'});
                } else {
                  res.json({success: true, msg: 'Successful created new user.'});
                }
              });
          });
        }
      });
    } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

// edit user data (GET http://localhost:9000/api/users/edit)
exports.editUsers = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {

        if(req.body.uploadimg && req.body.uploadimg===1){
          /*-----delete user image-----*/
          User.findById(req.body.id, 
          function(err, response){
              if(response.photo!=''){
                var filepath = './uploads/users/'+response.photo;
                fs.stat(filepath, function(err, stats){
                      if(err) return console.log(err);
                      fs.unlink(filepath);
                });
              }
          });
        }
        

        var reporting = req.body.reportingmanager;  
        var updateData = { 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            photo: req.body.photo,
            birthday: req.body.birthday,
            emailaddress: req.body.email,
            role: req.body.role,
            gender: req.body.gender,
            employmentdate: req.body.employmentdate,
            phone: req.body.phone,
            address: req.body.address,
            leaveperyear: req.body.leaveperyear,
            leaveflag: req.body.leaveflag
        };  


        // if everything is good, save to request for use in other routes
        User.findByIdAndUpdate(req.body.id, updateData, function(err, user) {
              if (err) throw err;
              
              //res.json({success: true, msg: 'Successful edit user.'});
              if(reporting=='self'){
                  var updateRportingData = { 
                      reportingmanager: user._id
                  };
              }else{
                 var updateRportingData = { 
                      reportingmanager: req.body.reportingmanager
                  };
              }

    
              if (!user) {
                return res.json({success: false, msg: 'User not found.'});

              } else {

                User.findByIdAndUpdate(user._id, updateRportingData, function(err, userreporting) {
                  if (err) throw err;
                  
                   res.json({success: true, msg: 'Successful edit user.'});
                });
               
              }
            });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// edit profile data (GET http://localhost:9000/api/users/profile)
exports.editUsersProfile = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {

        if(req.body.uploadimg && req.body.uploadimg===1){
          /*-----delete user image-----*/
          User.findById(req.body.id, 
          function(err, response){
              if(response.photo!=''){
                var filepath = './uploads/users/'+response.photo;
                fs.stat(filepath, function(err, stats){
                      if(err) return console.log(err);
                      fs.unlink(filepath);
                });
              }
          });
        }
        
        var updateData = { 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            photo: req.body.photo,
            birthday: req.body.birthday,
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address
        };  


        // if everything is good, save to request for use in other routes
        User.findByIdAndUpdate(req.body.id, updateData, function(err, user) {
              if (err) throw err;
              if (!user) {
                return res.json({success: false, msg: 'User not found.'});
              } else {
                   res.json({success: true, msg: 'Successful edit user.'});
              }
          });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// delete user data (GET http://localhost:9000/api/users/delete/123)
exports.deleteUsers = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {

        
        /*-----delete user image-----*/
          User.findById(req.body.id, 
          function(err, response){
              if(response.photo!=''){
                var filepath = './uploads/users/'+response.photo;
                fs.stat(filepath, function(err, stats){
                      if(err) return console.log(err);
                      fs.unlink(filepath);
                });
              }
          });
        // if everything is good, delete user data from collections
       User.findByIdAndRemove(req.params.id, function(err, user) {
              if (err) throw err;
      
              if (!user) {
                return res.json({success: false, msg: 'User not found.'});
              } else {
                res.json({success: true, msg: 'Successful delete user.'});
              }
            });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};


// get perticular user data (GET http://localhost:9000/api/users/123)
exports.getUser = (req, res) => {
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
            __v: false,
            password: false
        };

        // if everything is good, save to request for use in other routes
        User.findById(req.params.id, dataProjection, function(err, user) {
              if (err) throw err;
      
              if (!user) {
                return res.json({success: false, msg: 'User not found.'});
              } else {
                res.json({success: true, data: user});
              }
            });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

// get all users data (GET http://localhost:9000/api/users)
exports.listManagers = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        User.find({ role: '2' }, function(err, user) {
              if (err) throw err;
      
              if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
              } else {
                res.json({success: true, data: user});
              }
            });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};

// get all users data (GET http://localhost:9000/api/users)
exports.usersManager = (req, res) => {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
       
        var perPage = parseInt(req.query._limit);
        var startPage =  parseInt(req.query._start);
        var sortField = req.query._sort;
        var orderBy = parseInt(req.query._order);

        User.find({ reportingmanager: req.params.id, _id: { $ne: req.params.id } }).count(function(err, count){
            var totalDoc = count;
            User.find({ reportingmanager: req.params.id, _id: { $ne: req.params.id } }).limit(perPage).skip(startPage).sort({ '_id': -1 }).exec(function(err, user) {
              if (err) throw err;
      
              if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
              } else {
                res.json({success: true, total: totalDoc,  data: user});
              }
            });
        });



      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
};