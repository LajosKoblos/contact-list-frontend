'use strict';

angular.module('myApp.contactGroupView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact_group', {
    templateUrl: 'contact_group_view/contact_group_view.html',
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