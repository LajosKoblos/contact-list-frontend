'use strict';

angular.module('myApp.contactListView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when("/groups/:groupId/contacts/", {
          templateUrl: 'contact_list_view/contact_list_view.html',
          controller: 'ContactListViewCtrl'
      })
      .when("/groups/:groupId/contacts/show/:contactId", {
          templateUrl: 'contact_list_view/contact_list_view.html',
          controller: 'ContactListViewCtrl'
      })
      .when("/groups/:groupId/contacts/edit/:contactId", {
          templateUrl: 'contact_list_view/contact_list_view.html',
          contoller: 'ContactListViewCtrl'
      })
      .when("/groups/:groupId/contacts/new", {
          templateUrl: 'contact_list_view/contact_list_view.html',
          contoller: 'ContactListViewCtrl'
      })
}])

.controller('ContactListViewCtrl', function($scope, contactService) {

    $scope.contactList = [];

    // creating dummy contact list elements
    $scope.contactListTest = [
        {firstName:"testFName1" , lastName:"testLName1"},
        {firstName:"testFName11", lastName:"testLName1"},
        {firstName:"testFName12", lastName:"testLName1"},
        {firstName:"testFName21", lastName:"testLName1"},
        {firstName:"testFName22", lastName:"testLName1"},
        {firstName:"testFName3" , lastName:"testLName2"}
    ];

    contactService.getContactsInGroup().then(function (data){
        console.log(data)
        console.log(data[0])

    });

    $scope.editActualContact = function () {
     console.log("edit")
    }
    


});