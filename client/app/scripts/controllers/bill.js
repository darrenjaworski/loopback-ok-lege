'use strict';

/**
 * @ngdoc function
 * @name app.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the app
 */
angular.module('app')
    .controller('BillCtrl', function ($scope, Bill) {
      $scope.bills = Bill.find();

      $scope.limitSize = 10;

      $scope.moreBills = function() {
          $scope.limitSize += 50;
          console.log($scope.limitSize);
      }

    })
    .controller('BillSingleCtrl', function ($scope, $routeParams, Bill) {
        $scope.bill = Bill.findById({ id : $routeParams.billId });
        $scope.authors = Bill.introdby({ id: $routeParams.billId });
        //$scope.votes = Bill.votes({ id: $routeParams.billId });
    });
