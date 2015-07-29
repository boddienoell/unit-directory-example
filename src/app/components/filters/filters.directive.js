(function () {
    'use strict';

    angular
        .module('bneIntranet2')
        .directive('bneFilters', bneFilter);

    /** @ngInject */
    function bneFilter() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/filters/filters.html',
            scope: {
                states: '=',
                cities: '='
            },
            controller: FilterController,
            controllerAs: 'view',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function FilterController($rootScope, $mdSidenav) {

            var view = this;

            view.close = function () {

                $rootScope.$emit('loadingStart');
                $rootScope.$emit('filtersUpdated', view.searchFilter);

                var slider = $mdSidenav('filterNav').close();

                slider.then(function () {
                    $rootScope.$emit('loadingEnd');
                });
            };

            view.clearFilter = function () {

                $rootScope.$emit('loadingStart');

                $rootScope.$emit('filtersUpdated', 'clear');

                var slider = $mdSidenav('filterNav').close();
                slider.then(function () {
                    $rootScope.$emit('loadingEnd');
                });

            };

            view.closeKeyBoard = function(){
                return false;
            };

        }

    }

})();