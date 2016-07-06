'use strict';

angular.module('myApp.contactGroupView', ['ngRoute', 'contactGroupServiceModule'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/groups', {
            templateUrl: 'contact_group_view/contact_group_view.html',
            controller: 'GroupsCtrl'
        });
    }])

    .controller('GroupsCtrl', function ($scope, contactGroupService) {
        contactGroupService.listGroups().then(function (data) {
            $scope.groups = data;
        });
    });
