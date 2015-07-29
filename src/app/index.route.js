(function() {
  'use strict';

  angular
    .module('bneIntranet2')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'view'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
