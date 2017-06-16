const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegistryFieldSchema = new Schema({

    id: {type: Number},
    label: {type: String},
    description: {type: String},
    reg_type: {type: String},
    creationDate: { type: Date, default: Date.now },
    active: {type: Boolean, default: true },
    mandatory: {type: Boolean, default: true },
    type : {type: String},
    length : {type: String},
    min : {type: Number},
    max : {type: Number},
    values : {type: Array}
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('RegistryField', RegistryFieldSchema);

