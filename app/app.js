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
    'myApp.authentication'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/login'});
}])
    .factory('DefaultPathes', function () {
        var USERDEFAULT = '/groups';
        var ADMINDEFAULT = '/users';
        var oldURL = '';

        function setOldPath(path) {
            oldURL = path;
        }

        function getOldPath() {
            return oldURL;
        }

        function clean() {
            oldURL = '';
        }

        return {
            USER: USERDEFAULT,
            ADMIN: ADMINDEFAULT,
            OLD: getOldPath,
            setOLD: setOldPath,
            cleanOLDPath: clean,
            hasOldPath: function () {
                return oldURL == '';
            }
        }
    })
    .factory('RedirectFactory', ['Auth', 'DefaultPathes', function (auth, defaultPathes) {

        function validateRedirect() {
            if (!oldURL.startsWith(defaultPathes.USER) || !oldURL.startsWith(defaultPathes.ADMIN)) {
                return auth.isLoggedIn() == 'USER' ? defaultPathes.USER : defaultPathes.ADMIN;
            } else {
                if (auth.isLoggedIn() == 'USER') {
                    if (oldURL.startsWith(defaultPathes.USER))
                        return defaultPathes.getOldPath();
                }
                if (auth.isLoggedIn() == 'ADMIN') {
                    if (oldURL.startsWith(defaultPathes.ADMIN) || oldURL.startsWith(defaultPathes.USER))
                        return defaultPathes.getOldPath();
                }
            }
        }

        return {
            validate: validateRedirect
        }

    }])
    .factory('Auth', function () {
        var userRole;

        return {
            getRole: function () {
                return userRole;
            },
            setRole: function (role) {
                userRole = role;
            },
            isLoggedIn: function () {
                return userRole ? userRole : false;
            }
        }
    })
.run(['$rootScope', '$location', 'Auth', 'RedirectFactory', 'DefaultPathes', function ($rootScope, $location, auth, redirectFactory, defaultPathes) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {

        console.log("current");
        console.log(currentRoute);

        var loggedIn = auth.isLoggedIn();
        var path;
        if (loggedIn) {           //valaki bejelentkezve vam
            path = defaultPathes.hasOldPath() ? redirectFactory.validate() : nextRoute.$$route.originalPath;

        } else {      //nincs bejelentkezve
            if ((typeof currentRoute) !== 'undefined' || (typeof currentRoute.$$route) !== 'undefined' ) {

                console.log("nincs bejelentkezve és van url amiről szeretne tduni.")
                console.log(currentRoute.$$route);
                defaultPathes.setOLD(currentRoute.$$route.originalPath);
            }
            console.log("nincs url és nincs miről tudni");
            path = "/";
        }
        $location.path(path).replace();
        defaultPathes.cleanOLDPath();
    });
}

]);