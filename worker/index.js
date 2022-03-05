"use strict";

self.addEventListener("push", function (event) {
  const data = JSON.parse(event.data.text());
  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: "https://overkilltodoapp.vercel.app/icon.png",
      image: "https://overkilltodoapp.vercel.app/notification.png",
      showTrigger: new TimestampTrigger(data.time),
      actions: [
        {
          action: "check",
          title: "Complete",
          icon: "https://overkilltodoapp.vercel.app/check.png",
        },
        {
          action: "close",
          title: "Close",
          icon: "https://overkilltodoapp.vercel.app/close.png",
        },
      ],
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
            }
          }
          return client.focus();
        }
        return clients.openWindow("/");
      })
  );
});

// self.addEventListener('pushsubscriptionchange', function(event) {
//   event.waitUntil(
//       Promise.all([
//           Promise.resolve(event.oldSubscription ? deleteSubscription(event.oldSubscription) : true),
//           Promise.resolve(event.newSubscription ? event.newSubscription : subscribePush(registration))
//               .then(function(sub) { return saveSubscription(sub) })
//       ])
//   )
// })
