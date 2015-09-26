var db = require('./pgProvider');
var Promise = require("bluebird");
var Project = require('../models/Project')

function deserialize(response) {
	var project = response[0];
	return Promise.resolve(project == null ? null : Project(project))
}

function deserializeAll(projects) {
	if(projects == null) 		return Promise.resolve(null)
	if(Array.isArray(projects)) return Promise.resolve(projects.map(Project))
	else 						return Promise.resolve(Project(projects))
}

function findProjectsByParentId(parentId) {
	return db.raw('WITH RECURSIVE sub_projects AS ( '+
		'SELECT p.*,0 AS depth ' +
		'FROM projects p WHERE project_id = ? ' +
		'UNION ' +
		'SELECT t.*,s.depth+1 ' +
		'FROM projects t JOIN sub_projects s ON t.parent_id = s.project_id ' +
		') SELECT * FROM sub_projects WHERE project_id != ?',[parentId, parentId]).
		then(deserializeAll);
}

module.exports = {
	findProjectById: (projectId) => {
		return db('projects').
			where('project_id', projectId).
			then(deserialize)
	},
	findProjectsByUserId: (userId) => {
		return db('projects').
			where('owner', userId).
			then(deserializeAll);
	},
	findProjectsByParentId: (parentId) => {
		return db('projects').
			where('parent_id', parentId).
			then(deserializeAll)
	},
	findAllProjectsByParentId: (parentId) => {
		return db.raw('WITH RECURSIVE sub_projects AS ( '+
		'SELECT p.*,0 AS depth ' +
		'FROM projects p WHERE project_id = ? ' +
		'UNION ' +
		'SELECT t.*,s.depth+1 ' +
		'FROM projects t JOIN sub_projects s ON t.parent_id = s.project_id ' +
		') SELECT * FROM sub_projects WHERE project_id != ?',[parentId, parentId]).
		then((result) => deserializeAll(result.rows));
	},
	createProject: (project) => {
		return  db.returning('*')
			.insert(project.toDBModel())
			.into('projects')
			.then(deserialize);	
	}
}