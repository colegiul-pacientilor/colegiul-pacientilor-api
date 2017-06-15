const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({

    id: {type: Number},
    name: {type: String},
    description: {type: String},
    createdBy: {type: String},
    creationDate: { type: Date, default: Date.now },
    status: {type: String},
    nbrRecords: {type: Number, default: 0 },
    fields: { type: Array }
    },
  {
    timestamps: true
  });

module.exports = mongoose.model('Registry', GroupSchema);


//{
//    "name": "reg test 1",
//    "description": "some description",
//    "fields": [
//        {
//            "label": "Name",
//            "description": "Patient full name",
//            "reg_type": "1",
//            "mandatory": "true",
//            "type": "type"
//        },
//        {
//            "label": "CPN",
//            "description": "Patient CNP",
//            "reg_type": "1",
//            "mandatory": "true"
//            "type": "type"
//        },
//        {
//            "label": "Gender",
//            "description": "Patient gender: male/female",
//            "reg_type": "1",
//            "mandatory": "true"
//            "type": "type"
//        },
//        {
//            "label": "Address",
//            "description": "Patient gender: male/female",
//            "reg_type": "1",
//            "mandatory": "true"
//            "type": "type"
//        }
//    ]
//}
