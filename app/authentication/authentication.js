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

.controller('authenticationCtrl', function ($scope, $rootScope, $location, authService, Auth) {
	$scope.user = { userName: '', password: '' };
	$scope.error = '';

	$scope.login = function () {
		authService.login($scope.user).then( function ( response ) {
			console.log(response);
			
			Auth.setRole(response.role);
			var path = (response.role === 'USER') ? '/groups' : '/users';
			$location.path(path);
			$scope.error = '';

		 }, function ( error ) {

			if (error.status == 401) {
				$scope.error = error;
			}
			if (error.status == 500){
				$scope.error = error;
			}

		 });
	}


	$scope.logout = function () {
		authService.logout();
		$scope.user = { userName: '', password: '' };
		$scope.loginError = false;
		$scope.tokenID = '';
		$location.path('/login');
	}
});