const express = require('express'),
  routes = express.Router(),
  Registry = require('../models/registry.model');

// Create a registry
routes.post('/registries', function (req, res) {
  var g = new Registry({
    name: req.body.name,
    description: req.body.description,
    createdBy: req.body.createdBy,
    status: req.body.status,
    fields: req.body.fields
  });

  g.save(function (err) {
    if (err) {
      res.send({error: true});
    }

    res.send(g);
  });
});

// Get all registries
routes.get('/registries', function (req, res) {
  Registry.find({}, function (err, registries) {
    res.send(registries);
  });
});

// Get registry by id
routes.get('/registries/:id', function (req, res) {
  Registry.findById(req.params.id, function (err, registry) {
    res.send(registry);
  });
});

// Remove registry by id
routes.delete('/registries/:id', function (req, res) {
  Registry.find({_id: req.params.id}).remove().exec();
  res.send({success: true});
});


// Add record to registry
//routes.post('/registries/:id/record', function (req, res) {
//  Registry.findById(req.params.id, function (err, registry) {
//    registry.record.push({
//      email: req.body.record.email,
//      firstName: req.body.record.firstName,
//      lastName: req.body.record.lastName
//    });
//
//    registry.save(function (err) {
//      if (err) {
//        res.send({error: true});
//      }
//
//      res.send(registry);
//    });
//  });
//});

module.exports = routes;