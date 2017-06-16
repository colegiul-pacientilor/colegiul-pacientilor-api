const request = require('request');

function sendSMS(sms, callback) {

  var options = {
    url: 'http://localhost:3002/send',
    method: 'POST',
    json: sms
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }

    callback(body);
  });
}

module.exports = sendSMS;