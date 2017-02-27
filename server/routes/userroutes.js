var express     = require('express');
var userRouter = express.Router();
var User        = require('../app/models/user'); // get the mongoose model
var mongoose    = require('mongoose');
var config      = require('./config/database');
var passport	= require('passport');
var jwt = require('jsonwebtoken');
// bundle our routes

// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/users', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
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
      reportingmanager: req.body.reportingmanager,
      employmentdate: req.body.employmentdate,
      phone: req.body.phone,
      address: req.body.address
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

// route to a restricted info (GET http://localhost:9000/api/users)
apiRoutes.get('/users', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        User.find(function(err, user) {
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
});

// route to a restricted info (GET http://localhost:9000/api/edituser)
apiRoutes.post('/users/edit', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
          
        var updateData = { 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            photo: req.body.photo,
            birthday: req.body.birthday,
            emailaddress: req.body.email,
            role: req.body.role,
            gender: req.body.gender,
            reportingmanager: req.body.reportingmanager,
            employmentdate: req.body.employmentdate,
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
});


// route to a restricted info (GET http://localhost:9000/api/deleteUser)
apiRoutes.get('/users/delete/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
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
});


// route to a restricted info (GET http://localhost:9000/api/users)
apiRoutes.get('/users/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
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
        User.findById(req.params.id, dataProjection,function(err, user) {
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
});
