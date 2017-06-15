const common = require('./common'),
  _ = require('lodash');

const development = {
  SECRET_TOKEN: 'Not that s3cret.',
    //DATABASE_URL: 'mongodb://192.168.99.100:27017'
    DATABASE_URL: 'mongodb://10.0.176.82:27017'
};

module.exports = _.merge({}, common, development);
