(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('ProjectsCtrl', ['$scope', '$http', '$state', 'toaster', 'ProjectsService',
    function($scope, $http, $state, toaster, ProjectsService) {

	console.log("ProjectCtrl hit");

	$http.get('/projects').then(function(projects){
        console.log("PROJECTS", projects.data)
        $scope.projects = projects.data; 
    }, function(err){
        if(err) console.log("Error getting projects. ", err); 
    }); 
    
    $scope.createProject = function(project){
        $http.post('/project', {
            "name": project.name,
            "description": project.description
        }).then(function(project){
            ProjectsService.listProjects()
            $scope.$apply(); 
        });
    };

}]);
})();