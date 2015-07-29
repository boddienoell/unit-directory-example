/*global localStorage: false */

(function(){
    'use strict';

    angular
        .module('bneIntranet2')
        .service('bneLocalStorage', bneLocalStorage);

    /** @ngInject */
    function bneLocalStorage(){

        var unitsKey    = 'units';
        var detailsKey  = 'details';
        var favKey      = 'favs';
        var filtersKey  = 'filters';
        var settingsKey = 'settings';

        var units;
        var details;
        var favs;
        var filters;

        var settings;

        this.getUnits = function(){

            if ( !units ){
                units = getItem( unitsKey );
            }

            return units;
        };

        this.setUnits = function( units ){
            setItem( unitsKey, units);
        };

        this.getDetails = function(){

            if ( !details ){
                details = getItem( detailsKey );
            }

            return details;
        };

        this.setDetails = function( details ){
            return setItem( detailsKey, details);
        };

        this.getFavs = function(){

            if ( !favs ){
                favs = getItem( favKey );
            }

            return favs;
        };

        this.setFavs = function( favs ){
            return setItem( favKey, favs);
        };

        this.getFilters = function(){

            if ( !filters ){
                filters = getItem( filtersKey );
            }

            return ( filters || 'clear' );
        };

        this.setFilters = function( filters ){
            return setItem( filtersKey, filters);
        };

        this.getSettings = function(){

            if ( ! settings ){
                settings = getItem( settingsKey );
            }

            return settings;
        };

        this.setSettings = function( settings ){
            return setItem( settingsKey, settings );
        };

        function getItem( key ){
            return JSON.parse(localStorage.getItem(key));
        }

        function setItem( key, value ){
            return localStorage.setItem(key, JSON.stringify(value));
        }
    }

})();