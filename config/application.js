const bodyParser = require('body-parser'),
  routes = require('../app/routes'),
  application = require('../app/controllers/application.controller'),
  groups = require('../app/controllers/groups.controller');
  registries = require('../app/controllers/registries.controller');

module.exports = function (app) {
  app.use(bodyParser.urlencoded({extended: false})); // Parses urlencoded bodies
  app.use(bodyParser.json());                        // Send JSON responses

  app.use('/', routes);
  app.use('/', application);
  app.use('/', groups);
  app.use('/', registries);

  // Enable CORS from client-side
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
};