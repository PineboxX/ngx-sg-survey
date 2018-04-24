importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! SW was  is loaded 🎉`);
} else {
  console.log(`Boo! SW didn't load 😬`);
}

workbox.setConfig({ debug: false });

workbox.core.setLogLevel(workbox.core.LOG_LEVELS.error);

self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

workbox.precaching.precacheAndRoute([]);

workbox.googleAnalytics.initialize();
