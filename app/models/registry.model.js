const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegistrySchema = new Schema({

    id: {type: Number},
    name: {type: String},
    description: {type: String},
    createdBy: {type: String, default: "admin" },
    creationDate: { type: Date, default: Date.now },
    version: {type: Number, default: 1 },
    status: {type: String, default: "DRAFT" },
    nbrFields: {type: Number},
    nbrRecords: {type: Number, default: 0 },
    fields: { type: Array },
    records: { type: Array }
    },
  {
    timestamps: true
  });

module.exports = mongoose.model('Registry', RegistrySchema);
//
//
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
//    ],
//    "records": [
//        {
//        "name": "record1",
//         "values": [
//            {
//                "name": "Name",
//                "value": "Ionut Pistol",
//                "field_type": "type"
//            },
//            {
//                "name": "CNP",
//                "value": "191212321321",
//                "field_type": "type"
//            },
//            {
//                "name": "Gender",
//                "value": "Male",
//                "field_type": "type"
//            },
//            {
//                "name": "Address",
//                "value": "Dimitrie Pompeiu 6A",
//                "field_type": "type"
//            }
//         ]
//        }
//    ]
//}
