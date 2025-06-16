self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('calc-cache').then(cache => {
        return cache.addAll([
          './',
          './index.html',
          './click.mp3',
          './manifest.json',
          './style.css', // agar bo‘lsa
          './icon-192.png',
          './icon-512.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  });
  