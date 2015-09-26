'use strict';
var uuid = require('node-uuid');

class Invite {
	constructor(data) {
		this.inviteToken = data.inviteToken || data.invite_token || uuid.v4();
		this.email = data.email
		this.timestamp = data.timestamp || new Date().toISOString()
		this.invitee = data.invitee
		this.status = data.status || 'pending'
		this.projectId = data.projectId || data.project_id
	}

	toUIModel() {
		return {
			email: this.email,
			timestamp: this.timestamp,
			invitee: this.invitee,
			status: this.status,
			projectId: this.projectId
		}
	}

	toDBModel() {
		return  {
			invite_token: this.inviteToken,
			email: this.email,
			timestamp: this.timestamp,
			invitee: this.invitee,
			status: this.status,
			project_id: this.projectId
		}
	}

	accept() {
		this.status = 'accepted'
	}

	reject() {
		this.status = 'rejected'
	}

	isUpdatable() {
		return Object.keys(this.toUpdateSafeDBModel()).length > 0;
	}

	// ensures we never overwrite project_id, owner
	toUpdateSafeDBModel() {
		var updateModel = {}
		// non-nullable fields
		if(this.status !== undefined) updateModel.status = status

		// nullable fields

		return updateModel;
	}

}

module.exports = (inviteData) => new Invite(inviteData);