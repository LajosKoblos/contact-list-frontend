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

.controller('groupsCtrl', function ($scope, $rootScope, $routeParams, $location, contactGroupService, contactService) {
	$scope.errors = null;
	$scope.groups = [];
	$scope.group = {};

	var actionMatches = $location.path().match(/groups\/([\w]*)[\/]?.*/i);
	$scope.state = (actionMatches.length > 0) ? actionMatches[1] : '';

	contactGroupService.listGroups().then(function (groups) {
		
		$scope.groups = groups;
		if (groups.length > 0) {
		$scope.currentGroupId = (!$routeParams.groupId) ? $scope.groups[0].name : $routeParams.groupId;


		if($scope.state=="edit")
		{
			$scope.group = $scope.groups.filter( function ( group ) {
				return (group.name === $scope.currentGroupId);
			})[0];
		}
		}
		else {
			$scope.currentGroupId=null
		}
	});

	$scope.createGroup = function() {
		var group = { "id": { "userName":$rootScope.userName, "contactGroupName": $scope.group.name }, "displayName":$scope.group.displayName }

		contactGroupService.createGroup(group).then(function ( response ) {
			$location.path('/groups/' + $scope.group.name + '/contacts/');
		}, function ( errorResponse ) {
			$scope.errors = errorResponse.fields;
		});
	};

	$scope.editGroup = function() {
		var group = { "id": { "userName":$rootScope.userName, "contactGroupName": $scope.group.name }, "displayName":$scope.group.displayName }

		contactGroupService.renameGroup(group).then(function ( response ) {
			$location.path('/groups/' + $scope.currentGroupId + '/contacts/');
		}, function( errorResponse ) {
			$scope.errors = errorResponse.fields;
		});
	};

	$scope.deleteGroup = function( contactId ) {
		// TODO
	};
});