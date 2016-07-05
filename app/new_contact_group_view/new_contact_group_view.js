'use strict';

angular.module('myApp.new_contact_group_view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new_contact_group_view', {
    templateUrl: 'new_contact_group_view/new_contact_group_view.html',
    controller: 'newContactGroupViewCtrl'
});
}])

.controller('newContactGroupViewCtrl', [function($scope) {
  $scope.contactGroups = [];
  $scope.new_contact_group = "";

  $scope.createNewContactGroup = function(){
    if (!$scope.new_contact_group){return}
    if ($scope.contactGroups.indexOf($scope.new_contact_group) == -1) {
      $scope.contactGroups.push($scope.new_contact_group);
    }
    else {
      $scope.errortext = ""
    }

  }


}]);