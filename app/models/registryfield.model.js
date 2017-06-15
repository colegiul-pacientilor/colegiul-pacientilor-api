const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({

    id: {type: Number},
    label: {type: String},
    description: {type: String},
    reg_type: {type: Number, enum: [1, 2]},
    creationDate: { type: Date, default: Date.now },
    active: {type: Boolean},
    mandatory: {type: Boolean},
    type : {type: String}
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('RegistryField', GroupSchema);

