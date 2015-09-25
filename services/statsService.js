var Customer = require('../models/Customer.js'); 
var q = require('q'); 
var moment = require('moment');   

module.exports = {

  getCustomers: function(req, res) {
  var dfd = q.defer();
    Customer
      .find()
      .where("helpedAt").gt(0)
      .exec(function(err, customers) {
          dfd.resolve(customers);
      })
    return dfd.promise;
  }

}