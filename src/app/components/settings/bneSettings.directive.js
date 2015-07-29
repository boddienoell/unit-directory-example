(function () {
    'use strict';

    angular
        .module('bneIntranet2')
        .directive('bneSettingsView', bneSettingsView);

        /** @ngInject */
        function bneSettingsView(){

            var directive = {
                restrict: 'E',
                templateUrl: 'app/components/settings/settings.html',
                controller: SettingsController,
                bindToController: true
            };

            return directive;

            /** @ngInject */
            function SettingsController( $scope, bneSettings ){

                $scope.device = bneSettings.getDevice();
                $scope.map = bneSettings.getMap();
                $scope.notifications = bneSettings.getNotifications();

                $scope.updateSettings = function(){

                    bneSettings.setDevice( $scope.device );
                    bneSettings.setMap( $scope.map );
                    bneSettings.setNotifications( $scope.notifications );

                };

            }

        }
})();