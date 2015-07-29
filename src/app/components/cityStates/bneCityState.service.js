/*global _: false */
(function(){
    'use strict';

    angular
        .module('bneIntranet2')
        .service('bneCityState', bneCityState);

        /** @ngInject */
        function bneCityState(){

            var citiesByState = {};
            var states;

            this.setData = function(data){

                var cityStates = _.groupBy(data, 'unit_state');

                _.forEach( cityStates, function(val, idx){

                    citiesByState[idx] = _.uniq( val, function(unit){
                        return unit.unit_city;
                    });

                    citiesByState[idx] = _.sortByOrder(citiesByState[idx], ['unit_name']);

                });

                states = _.keys( this.citiesByState );

                return true;

            };

            this.getStates          = getStates();
            this.getCitiesByState   = getCitiesByState();

            function getStates(){
                return _.keys( citiesByState );
            }

            function getCitiesByState(){
                return citiesByState;
            }

        }

})();