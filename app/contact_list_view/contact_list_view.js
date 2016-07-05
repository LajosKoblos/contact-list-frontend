'use strict';

angular.module('myApp.contactListView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact_list_view', {
    templateUrl: 'contact_list_view/contact_list_view.html',
    controller: 'ContactListViewCtrl'
  });
}])

.controller('ContactListViewCtrl', function($scope) {


    console.log("itt")
    // filtering the contact list by firstName
    $scope.filterFirstName = "";
    
    // creating dummy contact list elements
    $scope.contactList = [
        {firstName:"testFName1" , lastName:"testLName1"},
        {firstName:"testFName11", lastName:"testLName1"},
        {firstName:"testFName12", lastName:"testLName1"},
        {firstName:"testFName21", lastName:"testLName1"},
        {firstName:"testFName22", lastName:"testLName1"},
        {firstName:"testFName3" , lastName:"testLName2"}
    ];

    // function to list all the contacts in a group
    $scope.getContactsInGroup = function () {
        console.log("getContactsInGroup");
    };



});