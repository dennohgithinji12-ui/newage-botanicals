/**
 * NewAge Health Botanicals & Rituals — High-Speed Service Worker
 * Implements Sub-Second Offline-Capable Asset Caching & Stale-While-Revalidate
 * Version: v1.2.0-speed-boost
 */

const CACHE_NAME = 'newage-botanicals-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/shop.html',
  '/product.html',
  '/checkout.html',
  '/css/styles.css',
  '/js/config.js',
  '/js/geo-currency.js',
  '/js/data/products.js',
  '/js/data/batch-registry.js',
  '/js/cart.js',
  '/js/paystack-service.js',
  '/js/app.js',
  '/js/seo-engine.js',
  '/assets/images/hero-apothecary.webp',
  '/assets/images/moringa-baobab.webp'
];

// Install: Pre-cache critical core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching critical application shell');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Non-critical precache item skipped:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up obsolete caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Purging outdated cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strategy Matrix
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Static Assets (Images, Fonts, CSS, JS): Cache-First with Background Revalidation
  if (
    url.pathname.match(/\.(jpg|jpeg|png|webp|svg|gif|woff2|woff|ttf|css|js)$/i) ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve cached version instantly and update in background
          fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          return networkResponse;
        }).catch(() => {
          // Fallback image if network fails
          if (url.pathname.match(/\.(jpg|jpeg|png|webp)$/i)) {
            return caches.match('/assets/images/hero-apothecary.webp');
          }
        });
      })
    );
    return;
  }

  // 2. HTML Navigation Requests: Stale-While-Revalidate
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(request).then((cached) => {
          return cached || caches.match('/index.html');
        });
      })
    );
    return;
  }

  // Default network fetch
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
