var Location = require('../models/Location.js'); 

module.exports = {

  list: function(req, res) {
    Location
      .find({ user: req.user._id })
      .select('_id name nameparam')
      .exec()
      .then(function(locations) {
        console.log(locations); 
        return res.json(locations);
    });
  },  
  listOne: function(req, res) {
    Location
      .findById(req.params.id)
      .populate('user', 'email')
      .exec()
      .then(function(location){
        res.status(200).json(location);
      }, function(err){
        res.status(500).json(err);
    });
  },   
  listName: function(req, res) {
    console.log('listNamebody', req.params.name)
    Location
      .find({nameparam: req.params.name})
      .select('_id name nameparam active')
      .exec()
      .then(function(location){
        res.status(200).json(location);
      }, function(err){
        res.status(500).json(err);
    });
  },
  create: function(req, res) {
    console.log(req)
    var newLocation = new Location(req.body);
    newLocation.user = req.user._id;
    newLocation.save(function(err, location) {
      if (err) {
        console.log(err)
        return res.status(500).end();
      }
      return res.json(location);
    });
  },
  update: function(req, res) {
    Location
    .findByIdAndUpdate(req.params.id, {name: req.body.name})
    .exec(function(err, result) {
      console.log(result)
      if(err) return res.status(500).end();
      return res.status(200).json(result);
    });
  },
  delete: function(req, res) {
    console.log('ssctrl', req);
    Location
    .findById(req.params.id)
    .remove()
    .exec(function(err, result) {
      console.log(result)
      if(err) return res.status(500).end();
      return res.status(200).json(result);
    });
  }

}
