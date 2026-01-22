const CACHE_NAME = 'to-ugm-v9'; // Versi dinaikkan agar cache diperbarui
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/img/background.jpg',
  './assets/img/target_bg.png',
  './assets/img/btn_settings.png', // Tetap disimpan karena dipakai di header
  './assets/img/logo_ugm.png',     // Ikon aplikasi baru ditambahkan
  './assets/img/icon_input.png',
  './assets/img/icon_history.png',
  './assets/img/icon_analysis.png',
  './assets/img/footer_scene.jpg',
  './assets/img/pochita_sleep.png',
  './assets/img/score_bad.png',
  './assets/img/score_mid.png',
  './assets/img/score_good.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});