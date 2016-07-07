'use strict';

describe('myApp.authentication', function() {

    var deferred;
    var $mockScope;

    beforeEach(module('myApp.authentication'));
    beforeEach(inject(function($controller, $rootScope, $q ){
        deferred = $q.defer();
        $mockScope = $rootScope.$new();
    }));
    
    describe('LoginController', function() {
        it('should use the authenticationService.login to retrieve the ', inject(function($controller, $rootScope) {
            //Given
            var mockUser= [{userName : "Admin", password : "Alma1234", Role : "ADMIN"}];

            var mockAuthorizationService = {
                "login" : function() {
                    deferred.resolve(mockUser);
                    return deferred.promise;
                }
            };

            //When
            $controller('loginController', {'$scope' : $mockScope, 'authenticationService' : mockAuthorizationService});
            $rootScope.$apply(); // must be here in order to test resolved deferred objects
            //Then
            expect($mockScope.Role).toBe(mockUser.Role);
        }));

        it('should populate the errors into $rootscope', inject(function($controller, $rootScope) {
            //Given
            var mockError = [{code : 403, message : "Not authorized"}];

            var mockAuthorizationService = {
                "login" : function() {
                    deferred.reject(mockError);
                    return deferred.promise;
                }
            };

            //When
            $controller('loginController', {'$scope' : $mockScope, 'authenticationService' : mockAuthorizationService});
            $rootScope.$apply(); // must be here in order to test resolved deferred objects
            //Then
            console.log($mockScope.errors);
            expect($mockScope.errors.message).toBe(mockError.message);
        }));
    });
});