const mongoose = require('mongoose'),
  config = require('../config/environment');

module.exports = function() {
  var options = {server: {socketOptions: {keepAlive: 1}}};
  return mongoose.connect(config.DATABASE_URL, options).connection;
};
