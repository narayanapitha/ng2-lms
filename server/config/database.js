require('dotenv').config()
var passport	= require('passport');

module.exports = {
  'secret': 'devdacticIsAwesome',
  'database': process.env.DB_URL
};

module.exports.isAuthenticated = passport.authenticate('jwt', { session : false });