'use strict';

angular.module('myApp.contactView', ['ngRoute', 'contactServiceModule'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/groups/:groupId/contacts/:contactId', {
            templateUrl: 'contact_view/contact_view.html',
            controller: 'ContactViewCtrl'
        });
    }])

    .controller('ContactViewCtrl', function ($scope, $routeParams, contactService) {
        $scope.contact = {}
        contactService.getContact($routeParams.groupId, $routeParams.contactId).then(function (c) {
                $scope.contact = c;
             }
        )
    });