const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecordSchema = new Schema({

    id: {type: Number},
    values: { type: Array },
    createdBy: {type: String, default: "admin" },
    creationDate: { type: Date, default: Date.now },
    version: {type: Number, default: 1 }
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('Record', RecordSchema);

