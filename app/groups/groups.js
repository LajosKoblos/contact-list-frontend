'use strict';

angular.module('myApp.groups', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/groups/new', {
		templateUrl: 'groups/groups.html',
		controller: 'groupsCtrl'
	}).when('/groups/edit/:groupId', {
		templateUrl: 'groups/groups.html',
		controller: 'groupsCtrl'
	});
}])

.controller('groupsCtrl', function ($scope, $routeParams, $location, contactGroupService, contactService) {
	$scope.groups = [];

	var actionMatches = $location.path().match(/groups\/([\w]*)[\/]?.*/i);
	$scope.state = (actionMatches.length > 0) ? actionMatches[1] : '';

	contactGroupService.listGroups().then(function (groups) {
		
		$scope.groups = groups;
		$scope.currentGroupId = (!$routeParams.groupId) ? $scope.groups[0].name : $routeParams.groupId;
	});

	$scope.createGroup = function() {
		contactGroupService.createGroup($scope.group).then(function ( response ) {
			$location.path('/groups/' + $scope.currentGroupId + '/contacts/');
		});
	};

	$scope.editGroup = function() {
		contactGroupService.renameGroup($scope.group).then(function ( response ) {
			$location.path('/groups/' + $scope.currentGroupId + '/contacts/');
		});
	};

	$scope.deleteGroup = function( contactId ) {
		// TODO
	};
});