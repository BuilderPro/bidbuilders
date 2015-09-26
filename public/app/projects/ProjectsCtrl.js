(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('ProjectsCtrl', ['$scope', '$http', '$state', 'toaster', 'ProjectsService',
    function($scope, $http, $state, toaster, ProjectsService) {

	console.log("ProjectCtrl hit");

	$http.get('/projects').then(function(projects){
        $scope.projects = projects; 
    }, function(err){
        if(err) console.log("Error getting projects. ", err); 
    }); 
    
    $scope.createProject = function(project){
        $http.post('/project', {
            "name": project.name,
            "description": project.description
        }).then(function(project){
            toaster.pop('success', "Project Created!", "Your project has been created"); 
        });
    };

}]);
})();