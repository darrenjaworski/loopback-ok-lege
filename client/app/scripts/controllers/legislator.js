'use strict';

/**
 * @ngdoc function
 * @name app.controller:Legislator controllers
 * @description
 * # Legislation controllers for the main legislator page and individual pages.
 * Controller of the app
 */
angular.module('app')
    .controller('LegislatorCtrl', function ($scope, Legislator) {
        $scope.legislators = Legislator.find();
    })
    .controller('LegislatorSingleCtrl', function ($scope, $routeParams, Legislator, Bill) {

        var legislatorid = $routeParams.legislatorId;

        $scope.legislator = Legislator.findById( { id : legislatorid } );

        var sponsorFilter = { filter :{ where: { openstateid: 'OKB00010097' } } };

        $scope.sponsoredBills = Bill.find( sponsorFilter );

    });
