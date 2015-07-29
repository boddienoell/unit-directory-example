(function () {
    'use strict';

    angular
        .module( 'bneIntranet2' )
        .service( 'bneUnit', bneUnit );



    function bneUnit(bneLocalStorage){

        var units;
        var details;
        var favorites = [];

        this.getUnits = function(){
            return units;
        };

        this.getDetails = function(){
            return details;
        };

        this.getFavorites = function(){
            return favorites;
        };

        this.setUnits = function( data ){
            units = data;
        };

        this.setDetails = function( data ){
            details = data;
        };

        this.setFavorites = function( data ){
            favorites = data;
        };

        this.updateFavorite = function( idx ){

            units[idx].favorite = ( (  units[idx].favorite ) ? 0 : 1 || true );

            var index = _.indexOf( favorites, units[idx] );

            if ( index === -1 ){
                favorites.push( units[idx] );
            } else {
                _.pullAt( favorites, index, 1 );
            }

            console.log(_.uniq(favorites, 'unit_number') );
            bneLocalStorage.setFavs( _.uniq(favorites, 'unit_number') );

        };

    }

})();