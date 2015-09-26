(function(){
  'use strict';

var app = angular.module('bidBuilders', [ 'ui.router', 'ui.bootstrap']);

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
        controller: 'DashboardCtrl'
      })

  });

})();