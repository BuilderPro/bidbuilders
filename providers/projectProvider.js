var db = require('./pgProvider');
var Promise = require("bluebird");
var Project = require('../models/Project')

function deserialize(response) {
	var project = response[0];
	return Promise.resolve(project == null ? null : Project(project))
}

function deserializeAll(projects) {
	if(projects == null) return Promise.resolve(null)
	if(Array.isArray(projects)) return Promise.resolve(users.map(Project))
}

function findProjectsByUserId(userId) {
	return db('projects').where('owner', userId).then(deserialize);
}

function findProjectById(projectId) {
	return db('projects').where('project_id', projectId).then(deserialize)
}

module.exports = {
	findProjectById: findProjectById,
	findProjectsByUserId: findProjectsByUserId
}