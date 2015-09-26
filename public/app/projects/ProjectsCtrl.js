(function(){
'use strict';

var app = angular.module('bidBuilders');

app
  .controller('ProjectsCtrl', ['$scope', '$http', '$state', 'toaster', 
    function($scope, $http, $state, ProjectService, toaster) {

    console.log("ProjectsCtrl"); 
	toaster.pop('success', "title", "text");
       


}]);
})();