'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MainCtrl', function ($scope, Bill, Legislator) {
    $scope.legislators = Legislator.count();

    var Housefilter = { where: { chamber: 'lower' } };
    var SenateFilter = { where: { chamber: 'upper' } };


    $scope.legislatorsFull = Legislator.find();

    $scope.houseCount = Legislator.count( Housefilter );
    $scope.senateCount = Legislator.count( SenateFilter );
    $scope.bills = Bill.count();

    var PassedFilter = { where: { status: 2 } };
    var SignedFilter = { where: { status: 3 } };

    $scope.signedBills = Bill.count( SignedFilter );
    $scope.passedBills = Bill.count( PassedFilter );

  });
