var Customer = require('../models/Customer.js'); 

module.exports = {

  add: function(req, res){
    var newCustomer = new Customer(req.body); 
    newCustomer.save(function(err, newCustomer){
      console.log("newCustomer saved ", newCustomer); 
      if(err){
        console.log(err); 
        return res.status(500).end(); 
      }
      res.status(200).send().end(); 
    })
  },

  getByLocation: function(req, res){
    console.log(req.params.id); 
    Customer 
      .find({status: "pending", location: req.params.id}, function(err, cust){
        // console.log('customers', cust);
        res.status(200).send(cust).end(); 
      })
  },

  helpCustomer: function(req, res){
    console.log("helpCustomer req body", req.body); 
    Customer 
      .findByIdAndUpdate(req.params.id, {
          "status": req.body.status, 
          "helpedAt": req.body.helpedAt
      })
      .exec(function(err, result) {
        console.log(result); 
        if(err) return res.status(500).end(); 
        return res.status(200).json(result); 
      })
  }
}