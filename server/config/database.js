require('dotenv').config()

module.exports = {
  'secret': 'devdacticIsAwesome',
  'database': process.env.DB_URL
};