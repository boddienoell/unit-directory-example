(function () {
    'use strict';

    angular
        .module('bneIntranet2')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $http, $q, $timeout, bneUnitApi, bneToken, bneLocalStorage, bneUnit) {

        $rootScope.$emit('loadingStart');

        //Get the unit information from server, local, or default
        bneUnitApi.setService(bneToken, $http, $q, bneLocalStorage);

        var dataPromise = bneUnitApi.getData();

        dataPromise.then(function (data) {

            var favs = bneLocalStorage.getFavs();

            bneUnit.setFavorites( favs );

            _.forEach( data.units, function(val, idx){

                _.forEach( favs, function( fav ) {

                    if ( ! val.favorite ){
                        if ( val.unit_number == fav.unit_number ){
                            data.units[idx].favorite = 1;
                        } else {
                            data.units[idx].favorite = 0;
                        }
                    }

                });
            });

            $rootScope.$emit('dataProcessed', data );

            $timeout(function () {
                $rootScope.$emit('loadingEnd');
            }, 1000);

        });

    }

})();
