/*global navigator: false, console: false, ServiceWorkerRegistration: false */
(function () {
    'use strict';

    angular
        .module('bneIntranet2')
        .service('bneNotifications', bneNotifications );

    /** @ngInject */
    function bneNotifications( $http ){

        var projectNumber = 108665027042;

        if ('serviceWorker' in navigator) {

            navigator.serviceWorker.register('/service-worker.js')
                .then(function(event){
                });
        } else {
            return;
          //  console.warn('Service workers aren\'t supported in this browser.');
        }

        this.subscribe = function(){

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(initialiseState);
            } else {
                console.warn('Service workers aren\'t supported in this browser.');
            }

        };

        function initialiseState(){

            navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {

                if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                    console.warn('Notifications aren\'t supported.');
                    return;
                }

                if (Notification.permission === 'denied') {
                    console.warn('The user has blocked notifications.');
                    return;
                }

                if (!('PushManager' in window)) {
                    console.warn('Push messaging isn\'t supported.');
                    return;
                }

                serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
                    .then(function(subscription) {
                        registerSubscriptionId( subscription.subscriptionId );
                        console.log( subscription );

                    })
                    .catch(function(e) {
                        alert(Notification.permission);

                        if (Notification.permission === 'denied') {
                            // The user denied the notification permission which
                            // means we failed to subscribe and the user will need
                            // to manually change the notification permission to
                            // subscribe to push messages
                            console.log('Permission for Notifications was denied');
                        } else {
                            // A problem occurred with the subscription, this can
                            // often be down to an issue or lack of the gcm_sender_id
                            // and / or gcm_user_visible_only
                            console.log('Unable to subscribe to push.', e);
                        }
                    });
            });

        }

        function registerSubscriptionId( id ){

            var call = $http.post('https://mybne.com/wp-json/bne-nr/chrome', {key: id});
        }

    }

})();