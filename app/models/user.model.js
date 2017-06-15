const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {type: String, required: true},
    gender: {type: String, enum: ['Male', 'Female']},
    role: {type: String, enum: ['Admin', 'Basic User', 'Doctor', 'Provider']}
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('User', UserSchema);
