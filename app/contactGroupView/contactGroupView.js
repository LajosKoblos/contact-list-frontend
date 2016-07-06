'use strict';

angular.module('myApp.groups', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/groups', {
    templateUrl: 'contactGroupView/contactGroupView.html',
    controller: 'GroupsCtrl'
  });
}])

.controller('GroupsCtrl', function($scope) {
  // $scope.data="sajt";
  $scope.groups=[
    { name: "name", displayName: "friends" },
    { name: "name2", displayName: "enemies" } 
  ];

});