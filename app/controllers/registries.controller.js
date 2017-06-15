// TODO
// setup createdby = current user
// handle registry states (invalid, deleted/archived, draft)
//



const express = require('express'),
  routes = express.Router(),
  Registry = require('../models/registry.model');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: '10.0.177.196:9200',
    log: 'info'
});

// Create a registry
routes.post('/registries', function (req, res) {
  var g = new Registry({
    name: req.body.name,
    description: req.body.description,
    createdBy: req.body.createdBy,
    status: req.body.status,
    fields: req.body.fields,
    nbrFields : req.body.fields.length
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
routes.post('/registries/:id/records', function (req, res) {
  Registry.findById(req.params.id, function (err, registry) {
    registry.records.push({
      values: req.body.values
    });

    registry.nbrRecords++;

      var elastic = new RepositoryElasticsearchService(client);
      elastic.saveInElastic(req.body, registry._doc.name);


      registry.save(function (err) {
      if (err) {
        res.send({error: true});
      }

      res.send(registry);
    });


   registry.on('es-indexed', function(err,res) {});

  });
});

// Get all records in a registry
routes.get('/registries/:id/records', function (req, res) {
 Registry.findById(req.params.id, function (err, registry) {
     res.send(registry);
   });
});

function RepositoryElasticsearchService(client) {

  this.client = client;

  this.makeString= function(message, regName) {
      message.registryName = regName;
      delete message._id;
      message.records.forEach( function (record) {
          record.values.forEach( function (item) {
              message[item.name] = item.value
          })
      });
      return message;
  };

    this.saveInElastic = function (message, regName) {
      var elasticSearchMessage = this.makeString(message, regName);
        elasticSearchMessage['@timestamp'] = elasticSearchMessage.creationDate;

      this.client.index({
          index: 'test_index',
          type: 'case',
          body: elasticSearchMessage,
          refresh: true
      });
  }

}


module.exports = routes;