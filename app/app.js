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
	'myApp.groupsContactsShow',
	'myApp.user_list',
	'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');
	$routeProvider.otherwise({redirectTo: '/view1'});
}]);