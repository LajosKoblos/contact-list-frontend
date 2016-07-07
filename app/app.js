'use strict';

require("authService");
require("contactService");
require("contactGroupService");
require("userService");

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'authServiceModule',
	'contactServiceModule',
	'contactGroupServiceModule',
	'userServiceModule',
	'myApp.version',
	'myApp.authentication',
	'myApp.groups',
	'myApp.groupsContactsShow',
	'myApp.users',
	'myApp.user_list',
	'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	// $locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');
	$routeProvider.otherwise({redirectTo: '/login'});
}])
	.factory('DefaultPathes', function () {
		var USERDEFAULT = '/groups';
		var ADMINDEFAULT = '/users';
		var oldURL = '';

		function setOldPath(path) {
			oldURL = path;
		}

		function getOldPath() {
			return oldURL;
		}

		function clean() {
			oldURL = '';
		}

		return {
			USER: USERDEFAULT,
			ADMIN: ADMINDEFAULT,
			OLD: getOldPath,
			setOLD: setOldPath,
			cleanOLDPath: clean,
			hasOldPath: function () {
				return oldURL == '';
			}
		}
	})
	.factory('RedirectFactory', ['Auth', 'DefaultPathes', function (auth, defaultPathes) {

		var oldURL = defaultPathes.OLD();
		function validateRedirect() {
			if (!oldURL.startsWith(defaultPathes.USER) || !oldURL.startsWith(defaultPathes.ADMIN)) {
				return auth.isLoggedIn() == 'USER' ? defaultPathes.USER : defaultPathes.ADMIN;
			} else {
				if (auth.isLoggedIn() == 'USER') {
					if (oldURL.startsWith(defaultPathes.USER))
						return defaultPathes.getOldPath();
				}
				if (auth.isLoggedIn() == 'ADMIN') {
					if (oldURL.startsWith(defaultPathes.ADMIN) || oldURL.startsWith(defaultPathes.USER))
						return defaultPathes.getOldPath();
				}
			}
		}

		return {
			validate: validateRedirect
		}

	}])
	.factory('Auth', function () {
		var userRole;

		return {
			getRole: function () {
				return userRole;
			},
			setRole: function (role) {
				userRole = role;
			},
			isLoggedIn: function () {
				return userRole ? userRole : false;
			}
		}
	})
	.run(['$rootScope', '$location', 'Auth', 'RedirectFactory', 'DefaultPathes', function ($rootScope, $location, auth, redirectFactory, defaultPathes) {
		$rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
			var loggedIn = auth.isLoggedIn();
			
			if (!loggedIn) {
				$location.path('/login');
			}
		});
	}

	]);