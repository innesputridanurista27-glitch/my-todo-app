self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('todo-store').then((cache) => cache.addAll([
      'index.html', 'aktif.html', 'selesai.html', 'kalender.html'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
const CACHE_NAME = 'todo-list-v1';
const ASSETS_TO_CACHE = [
    '/',
    'index.html',
    'aktif.html',
    'selesai.html',
    'kalender.html',
    'catatan.html',
    'akun.html',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap'
];

// Tahap Install: Simpan aset ke cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Tahap Fetch: Ambil dari cache jika offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});