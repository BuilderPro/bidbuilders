//Location.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var  locationSchema = new Schema({
  name: {type: String, unique: true, required: true},
  nameparam: {type: String},
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  customers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}],
  date: { type: Date, default: Date.now },
	active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Location', locationSchema); 