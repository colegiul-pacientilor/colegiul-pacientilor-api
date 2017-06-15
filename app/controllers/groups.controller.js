const express = require('express'),
  routes = express.Router(),
  Group = require('../models/group.model'),
  User = require('../models/user.model');

// Create a group
routes.post('/groups', function (req, res) {
  var g = new Group({
    name: req.body.name,
    description: req.body.description
  });

  g.save(function (err) {
    if (err) {
      res.send({error: true});
    }

    res.send(g);
  });
});

// Get all groups
routes.get('/groups', function (req, res) {
  Group.find({}, function (err, groups) {
    res.send(groups);
  });
});

// Get group by id
routes.get('/groups/:id', function (req, res) {
  Group.findById(req.params.id, function (err, group) {
    res.send(group);
  });
});

// Remove Group by id
routes.delete('/groups/:id', function (req, res) {
  Group.find({_id: req.params.id}).remove().exec();
  res.send({success: true});
});

// Add user to group
routes.post('/groups/:id/users', function (req, res) {
  Group.findById(req.params.id, function (err, group) {

  var u = new User ({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
              });

    group.users.push(u);

    group.save(function (err) {
      if (err) {
        res.send({error: true});
      }

      res.send(group);
    });
  });
});

module.exports = routes;