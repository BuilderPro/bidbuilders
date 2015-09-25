var db = require('./pgProvider');
var Promise = require("bluebird");


function findProjectsByUserId(userId) {
	return db('projects').where('owner', userId);
}