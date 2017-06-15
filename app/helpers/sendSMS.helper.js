const request = require('request');

function sendSMS(sms) {
  var headers = {
    'User-Agent':       'ColegiulPacientilor/API',
    'Content-Type':     'application/json'
  };

  var options = {
    url: 'http://localhost:3002/send',
    method: 'POST',
    headers: headers,
    body: sms
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
}

module.exports = sendSMS;