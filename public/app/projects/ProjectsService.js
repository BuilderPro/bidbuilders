(function(){

'use strict';

var app = angular.module('bidBuilders');

app.service('ProjectsService', ['$http', function($http){

	console.log("ProjectService hit"); 

	this.createProject = function(project){
		//
	}

	this.deleteProject = function(projectId){
		//
	}

	this.updateProject = function(project){
		//
	}

}]); 
})();