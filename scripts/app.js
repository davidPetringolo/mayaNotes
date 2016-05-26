var mayaNotes = angular.module('mayaNotes', ['ui.router', 'pouchdb', 'angularMoment', 'textAngular', 'truncate', 'pouchdb', 'ui.bootstrap', 'ngTagsInput']);

mayaNotes.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'pages/homeView.html',
            controller: 'homeController'
        })
        .state('details', {
            url: '/details/:id',
            templateUrl: 'pages/detailsView.html',
            controller: 'detailsController'
        })
        .state('edit', {
            url: '/edit/:id/:rev',
            templateUrl: 'pages/editView.html',
            controller: 'editController'
        })

        .state('insert', {
            url: '/insert/',
            templateUrl: 'pages/insertView.html',
            controller: 'insertController'
        })

        .state('delete', {
            templateUrl: 'pages/deleteView.html',
            controller: 'deleteController'
        })
    ;
});