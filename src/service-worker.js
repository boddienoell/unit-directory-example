'use strict';

var KEY_VALUE_STORE_NAME = 'notification';

function showNotification(title, body, icon, data) {

    var notificationOptions = {
        body: body,
        icon: icon ? icon : 'assets/icons/favicon-196x196.png',
        tag: 'bne-message-notification',
        data: data
    };
    if (self.registration.showNotification) {
        self.registration.showNotification(title, notificationOptions);
        return;
    } else {
        new Notification(title, notificationOptions);
    }
}

self.addEventListener('push', function(event) {

    // Since this is no payload data with the first version
    // of Push notifications, here we'll grab some data from
    // an API and use it to populate a notification

    var title = 'Something Happened Somewhere by Someone';
    var message = 'And now we are all going to most likely die or be completely fine';
    var icon = 'assets/icons/favicon-196x196.png';
    var notificationTag = 'bne-message-notification';

    // Add this to the data of the notification
    var urlToOpen = 'http://i3.kym-cdn.com/photos/images/newsfeed/000/897/000/6c2.gif';

    var notificationFilter = {
        tag: 'bne-message-notification'
    };


    var notificationData = {
        url: urlToOpen
    };

    if (self.registration.getNotifications) {
        return self.registration.getNotifications(notificationFilter)
            .then(function(notifications) {
                if (notifications && notifications.length > 0) {
                    // Start with one to account for the new notification
                    // we are adding
                    var notificationCount = 1;
                    for (var i = 0; i < notifications.length; i++) {
                        var existingNotification = notifications[i];
                        if (existingNotification.data &&
                            existingNotification.data.notificationCount) {
                            notificationCount += existingNotification.data.notificationCount;
                        } else {
                            notificationCount++;
                        }
                        existingNotification.close();
                    }
                    message = 'You have ' + notificationCount +
                        ' weather updates.';
                    notificationData.notificationCount = notificationCount;
                }

                return showNotification(title, message, icon, notificationData);
            });
    } else {
        return showNotification(title, message, icon, notificationData);
    }

});


self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event);

    if (Notification.prototype.hasOwnProperty('data')) {
        return clients.openWindow('https://google.com');
    } else {
        return clients.openWindow('https://google.com');
    }
});

/*

 curl --header "Authorization: key=AIzaSyAhvzOhHM7i-JKwbCYBduAWPtk8W1sYnA8" --header Content-Type:"application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"APA91bFbE8qQoJD1q4vb0m3p_rgeNumPvsNGz1HFuUUfI79rR59lI72TpMngRtmXV1AVT5OLo8k3A5P9nQB--UGMaHYcEui66eMw8Svpw5qMCVWf1dqkiDQYBzDTnFsqQJxLSAceHf2SC8EN26ArRXgAexKPiop6HA\"]}"


 */