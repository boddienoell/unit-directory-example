(function() {
  'use strict';

  angular
    .module('bneIntranet2')
    .directive('bneUnitCard', bneFilter);

  /** @ngInject */
  function bneFilter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/unitCard/UnitCard.html',
      scope: {},
      controller: UnitCardController,
      controllerAs: 'vm',
      bindToController: {
        unit: '=unit',
        details: '=details',
        idx: '=idx'
      }
    };

    return directive;

    /** @ngInject */
    function UnitCardController($window, bneSettings, bneUnit ) {

      var vm = this;

      vm.changeShowFrame = function ( direction ){

        var currentPosition = vm.unit.showFrame;

        switch ( direction ){
          case 'next':
            if ( 2 === currentPosition ){
              vm.unit.showFrame = 0;
            } else {
              vm.unit.showFrame++;
            }
            break;
          case 'prev':
            if ( 0 === currentPosition ){
              vm.unit.showFrame = 3;
            } else {
              vm.unit.showFrame--;
            }
            break;
        }

      };

      vm.callStore = function ( unit_phone ){
        $window.location.href='tel:'+unit_phone;
      };

      vm.getDirections = function( lat, long ){

        switch( bneSettings.getMap() ) {
          case 'apple':
            return 'maps://maps.apple.com/?q=' + lat + ',' + long;
          case 'google':
            return 'http://maps.google.com/?q=' + lat + ',' + long;
          case 'bing':
            return 'http://bing.com/maps/default.aspx?sp=point.' + lat + '~' + long + '&lvl=15';
          default:
            return 'http://maps.google.com/?q=' + lat + ',' + long;
        }


      };

      vm.toggleFavorites = function( $index ){
        bneUnit.updateFavorite( $index );
      };

      vm.toggleCard = function(){
        vm.unit.show = ( ( vm.unit.show ) ? 0 : 1 || true );
      };

    }
  }

})();
