var db = require('./pgProvider');
var fs = require('fs');
var Promise = require("bluebird");
var Invite = require('../models/Invite');


String.format = function(format) {
var args = Array.prototype.slice.call(arguments, 1);
return format.replace(/{(\d+)}/g, function(match, number) { 
  return typeof args[number] != 'undefined'
    ? args[number] 
    : match
  ;
});
};

// MANDRILL
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('yRDeeVllVBZJxjM2F69Tdg');

function deserialize(response) {
	var invite = response[0];
	return Promise.resolve(invite == null ? null : Invite(invite))
}

function deserializeAll(invites) {
	if(invites == null) 		return Promise.resolve(null)
	if(Array.isArray(invites))  return Promise.resolve(invites.map(Invite))
	else 						return Promise.resolve(Invite(invites))
}

function findInviteByToken(token) {
	return db('invites').
		where('invite_token', token).
		then(deserialize)
}

function findInvitesByUserId(userId) {
	return db('invites').
		where('invitee').
		then(deserializeAll)
}

module.exports = {
	findInviteByToken: findInviteByToken,
	findInvitesByUserId: findInvitesByUserId,
	saveInvite: (invite) => {
		if(!invite.isUpdatable())
			return findInviteByToken(invite.inviteToken)

		return db('invites')
			.where('invite_token', invite.inviteToken)
			.update(invite.toUpdateSafeDBModel(), '*').
			then(deserialize)
	},
	createInvite: (invite) => {
		return  db.returning('*')
			.insert(invite.toDBModel())
			.into('invites')
			.then(deserialize)
			.then(function(invite) {
				fs.readFile('email/invite.html', 'utf8', function(err, data) {
					data = String.format(data, invite.inviteToken, invite.inviteToken);
					var message = {
					    "html": data,
					    "subject": "BidBuilder Invite",
					    "from_email": "admin@bidbuilder.com",
					    "from_name": "Bid Builder",
					    "to": [{
				            "email": invite.email,
				            "type": "to"
				        }]
					};
					mandrill_client.messages.send({
						"message": message, 
						"async": false, 
						"ip_pool": "Main Pool"
					}, function(result) {
					}, function(e) {
				    	console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
					});
				});

				return Promise.resolve(invite);
			});	
	}
}