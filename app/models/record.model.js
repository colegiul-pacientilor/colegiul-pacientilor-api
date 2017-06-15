const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecordSchema = new Schema({

    id: {type: Number},
    values: { type: Array }
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('Record', RecordSchema);

