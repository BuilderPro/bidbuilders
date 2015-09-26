var db = require('./pgProvider');
var Promise = require("bluebird");
var Bid = require('../models/Bid')

function deserialize(response) {
	var bid = response[0];
	return Promise.resolve(bid == null ? null : Bid(bid))
}

function deserializeAll(bids) {
	if(bids == null) 		return Promise.resolve(null)
	if(Array.isArray(bids)) return Promise.resolve(bids.map(Bid))
	else 					return Promise.resolve(Bid(bids))
}

function findBidsByUserId(userId) {
	return db('bids').
		where('owner', userId).
		then(deserializeAll);
}

function findBidsByProjectId(projectId) {
	return db('bids').
		where('project_id', projectId).
		then(deserializeAll);
}

module.exports = {
	findBidsByProjectId: findBidsByProjectId,
	findBidsByUserId: findBidsByUserId
}