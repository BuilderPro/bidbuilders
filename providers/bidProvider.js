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

function findBidById(bidId) {
	return db('bids').
		where('bid_id', bidId).
		then(deserialize);
}

module.exports = {
	findBidById: findBidById,
	findBidsByProjectId: (projectId) => {
		return db('bids').
			where('project_id', projectId).
			then(deserializeAll);
	},
	findBidsByUserId: (userId) => {
		return db('bids').
			where('owner', userId).
			then(deserializeAll);
	},
	saveBid: (bid) => {
		if(!bid.isUpdatable())
			return findBidById(bid.bidId)

		return db('bids')
			.where('bid_id', bid.bidId)
			.update(bid.toUpdateSafeDBModel(), '*').
			then(deserialize)
	},
	createBid: (bid) => {
		return db.returning('*')
			.insert(bid.toDBModel())
			.into('bids')
			.then(deserialize);	
	}
}