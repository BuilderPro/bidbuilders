'use strict';
var uuid = require('node-uuid');

class Project {
	constructor(data) {
		this.bidId = data.bidId || data.bid_id || uuid.v4();
		this.projectId = data.projectId || data.project_id
		this.owner = data.owner
		this.amount = data.amount
	}

	toUIModel() {
		return {
			bidId: this.bidId,
			projectId: this.projectId,
			owner: this.owner,
			amount: this.amount
		}
	}

	toDBModel() {
		return  {
			bid_id: this.bidId,
			project_id: this.projectId,
			owner: this.owner,
			amount: this.amount
		}
	}

}

module.exports = (projectData) => new Project(projectData);