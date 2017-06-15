const express = require('express'),
      routes = express.Router(),
      sendSMS = require('../helpers/sendSMS.helper');

routes.post('/login', function(req, res) {
  sendSMS(req.body.sms);

  res.send({});
});

module.exports = routes;