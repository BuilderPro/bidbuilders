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
			project_id: this.projectId,
			parent_id: this.parentId,
			owner: this.owner,
			accepted_bid: this.acceptedBid,
			name: this.name,
			description: this.description
		}
	}

	isUpdatable() {
		return Object.keys(this.toUpdateSafeDBModel()).length > 0;
	}

	// ensures we never overwrite parent_id
	toUpdateSafeDBModel() {
		var updateModel = {}
		// non-nullable fields

		// nullable fields
		if(this.acceptedBid !== undefined) updateModel.accepted_bid = this.acceptedBid
		if(this.name !== undefined) updateModel.name = this.name
		if(this.description !== undefined) updateModel.description = this.description

		return updateModel;
	}

}

module.exports = (projectData) => new Project(projectData);