'use strict';

require("authService");
require("contactService");
require("contactGroupService");

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'authServiceModule',
  'contactServiceModule',
  'contactGroupServiceModule',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
