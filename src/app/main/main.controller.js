/*global _: false */
(function () {
    'use strict';

    angular
        .module('bneIntranet2')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($rootScope, bneCityState, bneLocalStorage, $timeout, $log, bneUnit) {

        var view = this;

        $rootScope.$emit('filtersUpdated', bneLocalStorage.getFilters());

        $rootScope.$on('loadingStart', function () {
            $rootScope.loading = true;

            $timeout(function () {
                if ($rootScope.loading) {
                    $rootScope.loading = false;
                    $log.error('Loading exceeded max time of 10 secs');
                }
            }, 10000);

        });

        $rootScope.$on('loadingEnd', function () {
            $rootScope.loading = false;
        });

        $rootScope.$on('setFavorites', function (event, args) {

            if ( 'clear' === args ){
                $rootScope.favorites = [];
            } else {
                var currentIdx = -1;

                _.forEach($rootScope.favorites, function (unit, idx) {

                    if (args.unit_number === unit.unit_number) {
                        currentIdx = idx;
                    }

                });

                if (currentIdx === -1) {
                    $rootScope.favorites.push(args);
                } else {
                    _.pullAt($rootScope.favorites, currentIdx);
                }


                $rootScope.favorites = _.uniq($rootScope.favorites, function (unit) {
                    return unit.unit_number;
                });
            }

            bneLocalStorage.setFavs($rootScope.favorites);

            $rootScope.$broadcast('setFavoritesComplete');

        });

        $rootScope.$on('filtersUpdated', function (event, args) {

            var blankFilter = {unit_name: '', unit_number: '', unit_city: '', unit_state: '' };

            if ( 'clear' === args || ! _.difference( _.values(args), _.values(blankFilter) ).length ) {
                $rootScope.filterActive = false;
                $rootScope.searchFilter = blankFilter;
            } else {
                $rootScope.filterActive = true;
                $rootScope.searchFilter = args;
            }

            bneLocalStorage.setFilters($rootScope.searchFilter);
        });

        $rootScope.$on('dataProcessed', function(event, args){


            bneUnit.setUnits( args.units );
            bneUnit.setDetails( args.details );

            view.data = {};
            view.data.units = bneUnit.getUnits();
            view.data.details = bneUnit.getDetails();
            view.favorites = bneUnit.getFavorites();

            bneCityState.setData( args.units );
            view.cities = bneCityState.getCitiesByState;
            view.states = _.keys(view.cities);

        });



    }

})();
