const express = require('express'),
    routes = express.Router(),
    User = require('../models/user.model');

// Create a user
routes.post('/users', function (req, res) {
    var g = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        gender: req.body.gender,
        role: req.body.role
    });

    g.save(function (err) {
        if (err) {
            res.send({error: true});
        }

        res.send(g);
    });
});

// Get all users
routes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.send(users);
    });
});

// Get user by id
routes.get('/users/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        res.send(user);
    });
});

// Remove User by id
routes.delete('/users/:id', function (req, res) {
    User.find({_id: req.params.id}).remove().exec();
    res.send({success: true});
});

module.exports = routes;
