(function() {
  'use strict';

  angular
    .module('bneIntranet2')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($rootScope, $scope, $mdSidenav) {

      $rootScope.$on('filtersUpdated', function(){
        $scope.filterActive = $rootScope.filterActive;
      });

      $scope.openFilter = function(){
        $mdSidenav('filterNav').toggle();
      };

    }
  }

})();
