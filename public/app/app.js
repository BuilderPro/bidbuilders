(function(){
  'use strict';

var app = angular.module('bidBuilders', ['ui.router', 'ui.bootstrap', 'toaster']);

app
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('landing', {
          url: '/',
          templateUrl : 'app/landing/landingView.html',
          controller  : 'LandingCtrl'
      })
      .state('login', {
        url:'/login',
        templateUrl : 'app/login/loginView.html',
        controller : 'LoginCtrl'
      })
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'app/dashboard/dashboardView.html', 
        controller: 'DashboardCtrl',
        resolve: {
          console: function(){
            console.log("Dashboard resolve"); //works 
          }
        }
      })
      .state('projects', {
        url: '/projects', 
        templateUrl: 'app/projects/projectsView.html', 
        controller: 'ProjectsCtrl'
      })
      .state('bids', {
        url: '/bids',
        templateUrl: 'app/bids/BidView.html', 
        controller: 'BidCtrl'
      })
  });

})();