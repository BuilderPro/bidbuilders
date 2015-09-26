'use strict';
var uuid = require('node-uuid');

class Project {
	constructor(data) {
		this.projectId = data.projectId || data.project_id || uuid.v4();
		this.parentId = data.parentId || data.parent_id
		this.owner = data.owner
		this.acceptedBid = data.acceptedBid || data.accepted_bid
		this.name = data.name
		this.description = data.description
	}

	toUIModel() {
		return {
			projectId: this.projectId,
			parentId: this.parentId,
			owner: this.owner,
			acceptedBid: this.acceptedBid,
			name: this.name,
			description: this.description
		}
	}

	toDBModel() {
		return  {
			project_id: this.userId,
			parent_id: this.email,
			owner: this.owner,
			accepted_bid: this.acceptedBid,
			name: this.name,
			description: this.description
		}
	}

}

module.exports = function(userData) {
	return new Project(userData);
}