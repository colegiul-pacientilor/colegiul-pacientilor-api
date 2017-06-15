const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: { type: String },
    description: { type: String },
    users: { type: Array }
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('Group', GroupSchema);
