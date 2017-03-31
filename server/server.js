var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
mongoose.Promise = global.Promise;
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var port        = process.env.PORT || 9000;
var jwt = require('jsonwebtoken');
var multer = require('multer');
var fs = require('fs');
var cors = require('cors')

var storageUser = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/users/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
var uploadUser = multer({ //multer settings
    storage: storageUser
}).single('file');


//cors enable
app.use(cors());

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// log to console
app.use(morgan('dev'));
 
// Use the passport package in our application
app.use(passport.initialize());
 
// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});


// demo Route (GET http://localhost:8080)
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});
 
// Start the server
app.listen(port);
//console.log('There will be dragons: http://localhost:' + port);


mongoose.connect(config.database);
 
// pass passport for configuration
require('./config/passport')(passport);
 
// bundle our routes
var apiRoutes = express.Router();

apiRoutes.post('/imageupload', function (req, res) {
 
  uploadUser(req, res, function (err) {
    if (err) {
      return res.end(err.toString());
    }

    var Filename = req.file.filename;
    var Destination = req.file.destination;
    var Path = req.file.path;
     //console.log(Filename + ' ====== '+ Destination + '========' + Path);
 
    res.send({success: true, msg: Filename});
  });
});

//define route constant
const userController = require('./app/controllers/users');
const holidayController = require('./app/controllers/holidays');
const leaveController = require('./app/controllers/leaves');
const settingController = require('./app/controllers/setting');

// users routes
apiRoutes.get('/users', config.isAuthenticated, userController.listUsers);
apiRoutes.post('/users', config.isAuthenticated, userController.addUsers);
apiRoutes.post('/users/edit', config.isAuthenticated, userController.editUsers);
apiRoutes.post('/users/profile', config.isAuthenticated, userController.editUsersProfile);
apiRoutes.get('/users/delete/:id', config.isAuthenticated, userController.deleteUsers);
apiRoutes.get('/users/:id', config.isAuthenticated, userController.getUser);
apiRoutes.get('/managers', config.isAuthenticated, userController.listManagers);
apiRoutes.get('/usersmanager/:id', config.isAuthenticated, userController.usersManager);

// holidays routes
apiRoutes.get('/holidays', config.isAuthenticated, holidayController.listHolidays);
apiRoutes.post('/holidays', config.isAuthenticated, holidayController.addHolidays);
apiRoutes.post('/holidays/edit', config.isAuthenticated, holidayController.editHolidays);
apiRoutes.get('/holidays/delete/:id', config.isAuthenticated, holidayController.deleteHolidays);
apiRoutes.get('/holidays/:id', config.isAuthenticated, holidayController.getHolidays);

// Leaves routes
apiRoutes.get('/leaves', config.isAuthenticated, leaveController.listLeaves);
apiRoutes.post('/leaves', config.isAuthenticated, leaveController.addLeaves);
apiRoutes.post('/leaves/edit', config.isAuthenticated, leaveController.editLeaves);
apiRoutes.get('/leaves/delete/:id', config.isAuthenticated, leaveController.deleteLeaves);
apiRoutes.get('/leaves/:id', config.isAuthenticated, leaveController.getLeaves);
apiRoutes.post('/leaves/confirm', config.isAuthenticated, leaveController.confirmLeave);
apiRoutes.get('/leavesuser/:userid', config.isAuthenticated, leaveController.listLeavesByUser);
apiRoutes.get('/leavesmanager/:managerid', config.isAuthenticated, leaveController.listLeavesByManager);

// Setting routes
apiRoutes.get('/settings', config.isAuthenticated, settingController.getSetting);
apiRoutes.post('/settings', config.isAuthenticated, settingController.editSetting);


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user, config.secret, {
            expiresIn: 30000 // expires in 1 minute
          });
          //var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.decode(token, config.secret, {complete: true});
    //console.log(decoded._doc);
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        decoded_user = decoded._doc;
        var dataProjection = {
            __v: false,
            password: false
        };

        User.findOne({
          username: decoded_user.username
          }, dataProjection, function(err, user) {
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

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// connect the api routes under /api/*
app.use('/api', apiRoutes);