'use strict';

angular.module('myApp.authentication', ['ngRoute', 'authServiceModule'])

.config(function ($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: '/authentication/authentication.html',
		controller: 'authenticationCtrl'
	}).when('/logout', {
		//templateUrl: '/authentication_view/login.html',
		controller: 'authenticationCtrl'
	});

})

.controller('authenticationCtrl', function ($scope, $rootScope, $location, $route, authService, Auth) {
	$rootScope.userName = '';
	
	$scope.user = { userName: '', password: '' };
	$scope.error = '';

	$scope.login = function () {
		authService.login($scope.user).then( function ( response ) {
			Auth.setRole(response.role);

			var isAdmin = (response.role === 'ADMIN');
			
			$rootScope.userIsLoggedIn = true;
			$rootScope.userName = $scope.user.userName;
			$rootScope.userIsAdmin = isAdmin;
			$scope.error = '';
			$location.path(isAdmin ? '/users' : '/groups');

		 }, function ( errorResponse ) {

				if (errorResponse.status == 401) {
					$scope.error = errorResponse;
				}
				if (error.status == 500){
					$scope.error = errorResponse;
				}
		 });
	}


	$rootScope.logout = function () {
		authService.logout();
		
		$rootScope.userName = '';
		$rootScope.userIsLoggedIn = false;
		$rootScope.userIsAdmin = false;

		$scope.user = { userName: '', password: '' };
		$scope.loginError = false;
		$scope.tokenID = '';
		$location.path('/login');
	}
});