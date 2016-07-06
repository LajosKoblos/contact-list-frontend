'use strict';

angular.module('myApp.contact_edit', ['ngRoute', 'contactServiceModule'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contact_edit/:groupid/:contactid', {
            templateUrl: 'contact_edit_view/contact_edit_view.html',
            controller: 'contactEditCtrl'
        }).when('/contact_edit/new/', {
            templateUrl: 'contact_edit_view/contact_edit_view.html',
            controller: 'contactEditCtrl'
        })
            .otherwise({
                redirectTo: '/'
            });
    }])

    .controller('contactEditCtrl', function ($scope, $routeParams, contactService) {
        console.log("contactEditCtrl online");
        $scope.param = {
            groupid: $routeParams.groupid,
            contactid: $routeParams.contactid
        }
        if ($scope.param.contactid) {
            $scope.contact = contactService.getContact($scope.groupid, $scope.contactid);
            console.log("contact edit - routeParams given");
            $scope.pageTitle = "Edit contact";
        }

        else {
            console.log("contact create");
            $scope.pageTitle = "Create contact";
        }

        $scope.editContact = function () {
            var contactResource = $scope.contact;

            contactResource.firstName = $scope.firstname;
            contactResource.lastName = $scope.lastname;
            contactResource.workEmail = $scope.workmail;
            contactResource.nickName = $scope.nickname;
            contactResource.jobTitle = $scope.jobtitle;

            console.log(contactResource);

            var contact_edit = contactService.updateContact($scope.groupid, contactResource);
            contact_edit.then(function (data) {
                console.log(data)
            });
        }

    });