//Location.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment'); 

var  customerModel = new Schema({
  name: {type: String},
  joined: {type: Date, default: Date.now()},
  status: {type: String, enum: ["pending", "done"], default: "pending"},
  helpedAt: {type: Date},
  location: {type: String},
  email: {type: String},
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Customer', customerModel); 