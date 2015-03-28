'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */


angular
  .module('app', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'lbServices',
    'infinite-scroll'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/legislators', {
        templateUrl: 'views/legislator.html',
        controller: 'LegislatorCtrl'
      })
      .when('/bills', {
        templateUrl: 'views/bill.html',
        controller: 'BillCtrl'
      })
      .when('/bills/:billId', {
        templateUrl: 'views/billSingle.html',
        controller: 'BillSingleCtrl'
      })
      .when('/legislators/:legislatorId', {
          templateUrl: 'views/legislatorSingle.html',
          controller: 'LegislatorSingleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
