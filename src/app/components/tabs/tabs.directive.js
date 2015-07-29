/*global _: false */
(function () {
    'use strict';

    angular
        .module('bneIntranet2')
        .directive('bneTabs', bneTabs);

    /** @ngInject */
    function bneTabs() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/tabs/tabs.html',
            scope: {
              data: '=',
              favorites: '='
            },
            controller: TabController,
            controllerAs: 'view',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function TabController($rootScope, $timeout, bneGeocodes, $window, bneUnit) {

            var view = this;

            view.data = {};
            view.data.units = bneUnit.getUnits();
            view.data.details = bneUnit.getDetails();

            view.favoriteFilter = { favorite: 1 };

            view.dataLoaded = false;

            view.noMore = false;

            view.limitNumber = 10;

            view.closestStores = [];

            view.clearFavorites = function(){

                _.forEach($rootScope.units, function(unit, idx){
                    $rootScope.units[idx].favorite = 0;
                });

                view.units = $rootScope.units;

                $rootScope.$emit('setFavorites', 'clear');
            };

            view.updateTotal = function(){
                view.limitUpdating = true;

                $timeout(function(){
                    view.limitNumber = view.limitNumber + 50;
                },750);

                $timeout(function(){
                    view.limitUpdating = false;
                },2000);

            };

            view.getClosestStore = function(){

                $rootScope.$emit('loadingStart');

                $window.navigator.geolocation.getCurrentPosition(
                    function(data){

                        var foundClosestStores;

                        var newPoint = _.cloneDeep(bneGeocodes);
                        bneGeocodes.LatLon( data.coords.latitude, data.coords.longitude );

                        var newlist = [];

                        _.forEach(view.data.units, function(val){
                            newPoint.LatLon(val.unit_geocode_latitude, val.unit_geocode_longitude)
                            var distance = bneGeocodes.distanceTo(newPoint);
                            newlist.push( {unit: val, distance: Math.floor(distance * 1)} );
                        });

                        newlist = _.sortBy(newlist, 'distance');
                        foundClosestStores = _.pluck(newlist, 'unit');

                        view.closestStores = foundClosestStores;

                        $rootScope.$emit('loadingEnd');
                        $rootScope.$digest();
                    }
                );
            };

            $rootScope.$on('filtersUpdated', function(){
                view.searchFilter = $rootScope.searchFilter;
            });

        }

    }

})();
