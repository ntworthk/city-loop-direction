const ghpath = '/city-loop-direction';

const CACHE_NAME = 'melbourne-time-cache-v1';
const urlsToCache = [
  '${ghpath}/',
  '${ghpath}/index.html',
  '${ghpath}/manifest.json',
  '${ghpath}/icon-192x192.png',
  '${ghpath}/icon-512x512.png',
  'https://www.ptua.org.au/files/2008/2023/07/PTUA-new-cityloop_WEEKEND-1024x873.png',
  'https://www.ptua.org.au/files/2008/2023/07/PTUA-new-cityloop_NIGHT-NETWORK-1024x873.png',
  'https://www.ptua.org.au/files/2008/2023/07/PTUA-new-cityloop_AM-OFF-PEAK-1024x873.png',
  'https://www.ptua.org.au/files/2008/2023/07/PTUA-new-cityloop_AM-PEAK-1024x873.png',
  'https://www.ptua.org.au/files/2008/2023/07/PTUA-new-cityloop_PM-OFF-PEAK-1024x873.png',
  'https://www.ptua.org.au/files/2008/2023/07/PTUA-new-cityloop_PM-PEAK-1024x873.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
