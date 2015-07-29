/*global _: false */
(function() {
    'use strict';

    angular
        .module('bneIntranet2')
        .service('bneSettings', bneSettings);

    /** @ngInject */
    function bneSettings(bneLocalStorage, bneNotifications){

        var settings = {};

        this.getNotifications = function(){
            if ( ! settings ){ return null; }
            return ( _.isUndefined(settings.notifications) ) ? null : settings.notifications;
        };

        this.setNotifications = function(notifications){

            if ( notifications ){
                bneNotifications.subscribe();
            }
            updateSettings('notifications', notifications);
        };

        this.getMap = function(){
            if ( ! settings ){ return null; }
            return ( _.isUndefined(settings.map) ) ? null : settings.map;
        };

        this.setMap = function( map ){
            updateSettings('map', map);
        };

        this.getDevice = function(){
            if ( ! settings ){ return null; }
            return ( _.isUndefined(settings.device) ) ? null : settings.device;
        };

        this.setDevice = function( device ){
            updateSettings('device', device);
        };

        function getSettings(){
            settings = bneLocalStorage.getSettings();
        }

        function updateSettings(key, value){
            if ( !settings ){ settings = {}; }
            settings[key] = value;
            bneLocalStorage.setSettings(settings);
        }

        getSettings();
    }

})();