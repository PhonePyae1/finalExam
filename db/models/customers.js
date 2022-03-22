//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name: String,
  address: {
      street: String,
      district: String,
      province: String,
      zip: Number
  },
  dob: Date,
  email: String,
  phone: String
});

module.exports = mongoose.model('Customer', CustomerSchema );