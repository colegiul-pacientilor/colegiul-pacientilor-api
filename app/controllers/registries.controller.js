// TODO
// 1. setup createdby = current user
// 2. handle registry states (invalid, deleted/archived, draft)
// 3. handle version

var multer =require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

const express = require('express'),
  routes = express.Router(),
  Registry = require('../models/registry.model'),
  RegistryField = require('../models/registryfield.model'),
  Record = require('../models/record.model');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: '10.0.177.196:9200',
    log: 'trace'
});

// Create a registry
routes.post('/registries', function (req, res) {
  var g = new Registry({
    name: req.body.name,
    description: req.body.description,
    createdBy: req.body.createdBy,
    status: req.body.status,
    fields : req.body.fields || registry.fields
    });

g.nbrFields = g.fields.length;
//    if (req.body.fields) {
//        req.body.fields.forEach(function(entry) {
//            var rf = new RegistryField({
//                label: entry.label,
//                description: entry.description,
//                reg_type: entry.reg_type,
//                active: entry.active,
//                mandatory: entry.mandatory,
//                type : entry.type,
//                length : entry.length,
//                min : entry.min,
//                max : entry.max,
//                values : entry.values
//            });
//            g.fields.push(rf);
//        });
//        g.nbrFields = g.fields.length;
//    }


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

// Search registries
routes.get('/registries/search', function (req, res) {
    Registry.find({}, function (err, registries) {
      res.send(registries);
    });
});

// Get registry by id
routes.get('/registries/:id', function (req, res) {
  Registry.findById(req.params.id, function (err, registry) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(registry);
        }
  });
});

// Remove registry by id
routes.delete('/registries/:id', function (req, res) {
  Registry.find({_id: req.params.id}).remove().exec();
  res.send({success: true});
});

// Update a registry by id
routes.post('/registries/:id', function (req, res) {

//    req.body.version++;
//
//    Registry.findOneAndUpdate({_id: req.params.id}, req.body, {upsert:true}, function(err, registry){
//        if (err) return res.status(500).send(err);
//        return res.send(registry);
//    });

  Registry.findById(req.params.id, function (err, registry) {

      // Handle any possible database errors
      if (err) {
          res.status(500).send(err);
      } else {

        registry.name = req.body.name || registry.name;
        registry.description = req.body.description || registry.description;
        registry.status = req.body.status || registry.status;
        registry.version++;

        registry.fields = req.body.fields || registry.fields;
        registry.nbrFields = registry.fields.length;

//        if (req.body.fields) {
//            req.body.fields.forEach(function(entry) {
//                var rf = new RegistryField({
//                    label: entry.label,
//                    description: entry.description,
//                    reg_type: entry.reg_type,
//                    active: entry.active,
//                    mandatory: entry.mandatory,
//                    type : entry.type,
//                    length : entry.length,
//                    min : entry.min,
//                    max : entry.max,
//                    values : entry.values
//                });
//                g.fields.push(rf);
//            });
//            registry.nbrFields = g.fields.length;
//        }

        registry.update();

        res.send(registry);
      }
    });
});


// Add record to registry
routes.post('/registries/:id/records', function (req, res) {
  Registry.findById(req.params.id, function (err, registry) {

  var r = new Record({
              values: req.body.values,
          });

    registry.records.push(r);

      registry.nbrRecords++;

      registry.save(function (err) {
      if (err) {
        res.send({error: true});
      }

      var elastic = new RepositoryElasticsearchService(client);
      elastic.saveInElastic(req.body, registry._doc.name);

      res.send(registry);
    });

  });
});

// Get all records in a registry
routes.get('/registries/:id/records', function (req, res) {
 Registry.findById(req.params.id, function (err, registry) {
     res.send(registry.records);
   });
});

function RepositoryElasticsearchService(client) {

  this.client = client;

  this.makeString= function(message, regName) {
      message.registryName = regName;
      delete message._id;
      message.name = new Date()
      message.values.forEach( function (item) {
              message[item.name] = item.value
          })
      return message;
  };

    this.saveInElastic = function (message, regName) {
      var elasticSearchMessage = this.makeString(message, regName);
        elasticSearchMessage['@timestamp'] =new Date();

      this.client.index({
          index: 'cp',
          type: 'case',
          body: elasticSearchMessage,
          refresh: true
      });
  }

}

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

routes.post('/registries/:id/upload', function(req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        console.log("File " +req.file.originalname+ " was uploaded to following path: " + req.file.path);
        try {
            console.log("Trying to parse excel file....");
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                }
                console.log("HOORAY!!!! Excel file was successfully parsed");
                console.log("The file contains " + result.length + " cases. Start to create cases");

                Registry.findById(req.params.id, function (err, registry) {
                    console.log("Registry " + req.params.id + " was found in db");

                    result.forEach( function (record) {
                        //console.log("Record from excel " + record.stringify );
                        var valuesArray = [];
                        for(var i in record){
                            var key = i;
                            var val = record[i];
                            var newObj = {name: key, value: val}
                            valuesArray.push(newObj);
                            //console.log("key: " +i + " value: " + val );
                        }

                        var r = new Record({
                            values: valuesArray
                        });
                       // console.log("Record mongodb object " + r.stringify );
                        registry.records.push(r);
                    });

                    registry.save(function (err) {
                        if (err) {
                            res.send({error: true});
                        }
                        console.log("Registry saved. Records imported! YAY!!!");
                        res.send(registry);
                    });

                    //res.send({'answer' : "completed"});
                });
                //res.json({error_code:0,err_desc:null, data: registry});
            });
        } catch (e){
            res.json({error_code:1,err_desc:"Corupted excel file"});
        }
    })

});



module.exports = routes;