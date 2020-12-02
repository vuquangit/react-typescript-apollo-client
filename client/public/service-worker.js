function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.')

  const {
    image,
    tag,
    url,
    title,
    text,
    shouldRequireInteraction = false,
  } = event.data.json()

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag: tag,
    image: '/logo192.png',
    badge: 'https://spyna.it/icons/favicon.ico',
    requireInteraction: shouldRequireInteraction,
    actions: [
      {
        action: 'Detail',
        title: 'View',
        icon: 'https://via.placeholder.com/128/ff0000',
      },
      { action: 'Punch in', title: 'Punch In' },
    ],
  }
  event.waitUntil(self.registration.showNotification(title, options))
}

function openPushNotification(event) {
  console.log(
    '[Service Worker] Notification click Received.',
    event.notification.data
  )

  event.notification.close()
  // eslint-disable-next-line no-undef
  event.waitUntil(clients.openWindow(event.notification.data))
}

self.addEventListener('push', receivePushNotification)
self.addEventListener('notificationclick', openPushNotification)
