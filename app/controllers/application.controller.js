const express = require('express'),
      routes = express.Router(),
      Group = require('../models/group.model');

// routes.get('/groups/add', function (req, res) {
//   var s = new Group({
//     name: 'Group 2',
//     description: 'Lorem ipsum dolor'
//   });
//
//   s.save(function (err) {
//     if (err) {
//       res.send({error: true});
//     }
//
//     res.send(s);
//   });
// });
//
// routes.get('/groups', function (req, res) {
//   Group.find({}, function(err, groups) {
//     // var groupMap = {};
//     //
//     // groups.forEach(function(group) {
//     //   groupMap[group._id] = group;
//     // });
//
//     res.send(groups);
//   });
// });

module.exports = routes;