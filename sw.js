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

// sw.js
self.addEventListener('push', (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/906/906334.png'
    });
});

// Pengecekan interval setiap 1 menit (Logika sederhana)
setInterval(() => {
    // Di PWA murni, pengecekan waktu biasanya dilakukan di file JS utama
    // karena Service Worker memiliki batasan akses ke localStorage di beberapa browser
}, 60000);