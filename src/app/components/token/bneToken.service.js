/*global _: false */
(function(){
    'use strict';

    angular
        .module('bneIntranet2')
        .service('bneToken', bneToken );

    /** @ngInject */
    function bneToken( ){

        /** number used once generator, redacted for public distribution */
        this.getToken = getToken();

        function getToken(){
            return '';
        }
    }


})();