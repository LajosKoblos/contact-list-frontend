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
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'myApp.contact_edit',
    'myApp.contactGroupView',
    'myApp.user_list',
    'myApp.user_creation',
    'myApp.new_contact_group_view'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
