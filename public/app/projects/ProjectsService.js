(function(){

'use strict';

var app = angular.module('bidBuilders');

app.service('ProjectsService', ['$http', function($http){

	console.log("ProjectsService hit"); 

	this.listProjects = function(){
		$http.get('/projects').then(function(projects){
			console.log("Projects List", projects); 
		}, function(err){
			if(err) console.log("Error getting projects. ", err); 
		})
	}; 

	this.createProject = function(project){
		$http.post('/project', 
			{
			    "parentId": project.parentId,
			    "owner": project.owner,
			    "name": project.name,
			    "description": project.description
			}).then(function(project){
				$state.go('projects');
				console.log("Project Added: ", project); 
			}, function(err){
				if(err) console.log("err: ", err); 
			})
	}; 

	this.deleteProject = function(projectId){
		//
	}; 

	this.updateProject = function(project){
		//
	}; 

}]); 
})();