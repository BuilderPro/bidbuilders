(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('ProjectsCtrl', ['$scope', '$http', '$state', 'toaster', 'ProjectsService',
    function($scope, $http, $state, toaster, ProjectsService) {

	console.log("ProjectCtrl hit");

	ProjectsService.listProjects();         
    
    $scope.createProject = function(project){
    	ProjectsService.createProject(project).then(function(project){
    		toaster.pop('success', "Project Created", "Your project was created"); 
    	})
    }

}]);
})();