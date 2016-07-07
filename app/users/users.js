'use strict';

angular.module('myApp.Users', ['ngRoute'])

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

	$scope.state = ([ 'edit', 'new' ].indexOf($routeParams.action) !== -1) ? $routeParams.action : 'edit';

	userService.getUsers().then(function (users) {
		
		$scope.users = users;
		console.log($scope.users)
		$scope.currentUserName = (!$routeParams.username && $scope.state !== 'new') ? $scope.users[0].userName : $routeParams.username;


		var matchedUsers = $scope.users.filter( function ( user ) {
			return (user.userName === $scope.currentUserName);
		});

		$scope.user = (matchedUsers.length > 0) ? matchedUsers[0] : {};

		$scope.userName = $scope.user.userName
		$scope.password = $scope.user.password
		$scope.role = $scope.user.role;

		switch( $scope.state ) {
			case 'new':
				$location.path('/users/' + $scope.state );
				break;
			default:
				$location.path('/users/' + $scope.state + '/' + $scope.currentUserName);
		}


	});

	$scope.createUser = function() {
		userService.createUser({userName: user.userName, password: user.password, role: user.role}).then(function ( response ) {
			console.log(response)
			$location.path('/users/new');
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