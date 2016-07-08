'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/users', {
		templateUrl: 'users/users.html',
		controller: 'UsersCtrl'
	})
	.when('/users/:action', {
		templateUrl: 'users/users.html',
		controller: 'UsersCtrl'
	})
	.when('/users/:action/:username', {
		templateUrl: 'users/users.html',
		controller: 'UsersCtrl'
	});
}])

.controller('UsersCtrl', function ($scope, $routeParams, $location, userService) {

	$scope.state = ([ 'edit', 'new' , 'show' ].indexOf($routeParams.action) !== -1) ? $routeParams.action : 'show';

	userService.getUsers().then(function (users) {

		$scope.users = users;
		$scope.currentUserName = (!$routeParams.username && $scope.state !== 'new') ? $scope.users[0].userName : $routeParams.username;
		$scope.passwordIsOk = false;

		var matchedUsers = $scope.users.filter( function ( user ) {
			return (user.userName === $scope.currentUserName);
		});

		$scope.user = (matchedUsers.length > 0) ? matchedUsers[0] : {};

			switch( $scope.state ) {
			case 'new':
				$location.path('/users/' + $scope.state );
				break;
			default:
				$location.path('/users/' + $scope.state + '/' + $scope.currentUserName);
		}
	});

	$scope.createUser = function() {
		$scope.user.role = $scope.user.role || 'USER';
		//$scope.currentUserName = $scope.user.userName;

		userService.createUser($scope.user).then(function ( response ) {
			$location.path('/users/');
		},function ( errorResponse ) {
			$scope.errors = errorResponse.fields;
		});
	};

	$scope.editUser = function() {
		// waiting for backend and service implementation
		contactService.updateContact($scope.groupId, $scope.contact).then(function ( response ) {
			//$location.path('/groups/edit' + $scope. );
		});
		contactService.changeUserPassword()
		contactService.setRole()
	};

});