'use strict';

angular.module('myApp.contact_edit_view', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contact_edit/:groupid/:contactid', {
            templateUrl: 'contact_edit_view/contact_edit_view.html',
            controller: 'contactEditViewCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }])

    .controller('contactEditViewCtrl', function ($scope, $routeParams) {
        $scope.groupid = $routeParams.groupid;
        $scope.contactid = $routeParams.contactid;

        $scope.thisContact = {
            groupid: null,
            contactid: null,
            firstname: "",
            lastname: "",
            homemail: "",
            workmail: "",
            nickname: "",
            job: ""

        }


        $scope.testfill = function () {
            $scope.thisContact.groupid = 1,
            $scope.thisContact.contactid = 1,
            $scope.thisContact.firstname = "aladar",
                $scope.thisContact.lastname = "kovacs",
                $scope.thisContact.homemail = "kokoali@gmail.com",
                $scope.thisContact.workmail = "kovacs.aladar@work.com",
                $scope.thisContact.nickname = "KovAli",
                $scope.thisContact.job = "developer"

        }();


    });