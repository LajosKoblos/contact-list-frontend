'use strict';

describe('myApp.user_list', function() {

  var deferred;
  var $mockScope;

  beforeEach(module('myApp.user_list'));
  beforeEach(inject(function($controller, $rootScope, $q ){
    deferred = $q.defer();
    $mockScope = $rootScope.$new();
  }));


  describe('UserListController', function() {
    it('should use the contactService.getUsers to retrieve the group list', inject(function($controller, $rootScope) {
     //Given
      var mockUsers = [{name : "Group1"},{name : "Group2"}];

      var mockUserService = {
          "getUsers" : function() {
            deferred.resolve(mockUsers);
            return deferred.promise;
          }
      };

      //When
      $controller('UserListController', {'$scope' : $mockScope, 'userService' : mockUserService});

      //Then
      $rootScope.$apply(); // must be here in order to test resolved deferred objects
      expect($mockScope.users).toBe(mockUsers);
    }));

    it('should populate the errors into $scope', inject(function($controller, $rootScope) {
      //Given
      var mockError = [{code : 403, message : "Not authorized"}];

      var mockUserService = {
        "getUsers" : function() {
          deferred.reject(mockError);
          return deferred.promise;
        }
      };

      //When
      $controller('UserListController', {'$scope' : $mockScope, 'UserService' : mockUserService});

      //Then
      $rootScope.$apply(); // must be here in order to test resolved deferred objects
      expect($mockScope.errors.message).toBe(mockError.message);
    }));
  });
});
