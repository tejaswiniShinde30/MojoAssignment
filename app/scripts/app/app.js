(function () {
    var userinitiativeApp = angular.module("userinitiativeApp", ['ngAnimate', 'ui.bootstrap', 'ui.router', 'ngMessages', 'ngResource', 'common.services', 'config', 'smart-table', 'ngSanitize', 'ui.mask', 'allMock']);
    userinitiativeApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider, $sceDelegateProvider, $qProvider) {

        $urlRouterProvider.otherwise("/login");
        $stateProvider.state('Login', {
                url: '/login',
                templateUrl: 'views/login.html',

            })
            .state('App', {
                url: '/app',
                templateUrl: 'views/master.html',

            })
            .state('App.editProfile', {
                url: '/editProfile',
                templateUrl: 'views/editProfile.html'

            })
            .state('App.UsersInitiative', {
                url: '/userInitiative',
                templateUrl: '/components/users/userInitiatives.html',

            })
            .state('App.MyInitiative', {
                url: '/myInitiative',
                template: '<div ui-view></div>'

            })
            .state('App.MyInitiative.AddNewInitiative', {
                url: '/addNewInitiative',
                templateUrl: '/components/users/addNewInitiative.html'

            })
             .state('App.MyInitiative.AddNewInitiative.Basic', {
                url: '/basic/:title/:desc/:img',
                templateUrl: '/components/users/basic.html',

            })
            .state('App.MyInitiative.AddNewInitiative.Advanced', {
                url: '/advanced/:title/:desc/:img',
                templateUrl: '/components/users/advanced.html',

            })
            .state('App.MyInitiative.AddNewInitiative.Preview', {
                url: '/preview/:title/:desc/:img',
                templateUrl: '/components/users/preview.html',

            })
            .state('App.MyInitiative.Dashboard', {
                url: '/dashboard',
                templateUrl: '/components/users/myInitiatives.html'

            })
            .state('App.AllInitiative', {
                url: '/allInitiative',
                templateUrl: '/components/administrator/initiatives.html',

            })
            .state('App.Users', {
                url: '/users',
                templateUrl: '/components/administrator/users.html',

            });

        $qProvider.errorOnUnhandledRejections(false);


    });


    userinitiativeApp.run(function ($rootScope) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });
    });

})();
