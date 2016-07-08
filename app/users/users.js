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

	if (['edit', 'new'].indexOf($routeParams.action) !== -1) {
		$scope.state = $routeParams.action;
	} else {
		$scope.state = 'edit';
	}

	userService.getUsers().then(function (users) {
		
		$scope.users = users;
		$scope.currentUserName = (!$routeParams.username && $scope.state !== 'new') ? $scope.users[0].userName : $routeParams.username;
		$scope.user.passwordConf = "";
		$scope.passwordIsOk = false;


		var matchedUsers = $scope.users.filter( function ( user ) {
			return (user.userName === $scope.currentUserName);
		});

		$scope.user = (matchedUsers.length > 0) ? matchedUsers[0] : {};

		console.log(matchedUsers[0]);

			switch( $scope.state ) {
			case 'new':
				$location.path('/users/' + $scope.state );
				break;
			default:
				$location.path('/users/' + $scope.state + '/' + $scope.currentUserName);
		}


	});

	$scope.createUser = function() {

		$scope.user.role = $scope.user.role ? "ADMIN" : "USER";
		if ($scope.passwordIsOk){
			userService.createUser($scope.user).then(function ( response ) {
				$location.path('/users/edit/:');
			});
		}
	};

	$scope.editUser = function() {
		// waiting for backend and service implementation
		contactService.updateContact($scope.groupId, $scope.contact).then(function ( response ) {
			//$location.path('/groups/edit' + $scope. );
		});
		contactService.changeUserPassword()
		contactService.setRole()
	};

	$scope.passwordsAreMatching = function () {
		$scope.passwordIsOk = ($scope.user.password === $scope.user.passwordConf )
		return $scope.passwordIsOk
	}

});