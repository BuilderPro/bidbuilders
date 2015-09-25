var db = require('./pgProvider');
var Promise = require("bluebird");




function findBidsByUserId(userId) {
	return db('bids').where('owner', userId);
}

function findBidsByProjectId(projectId) {
	return db('bids').where('project_id', projectId);
}