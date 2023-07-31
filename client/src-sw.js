const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache all the URLs specified in the self.__WB_MANIFEST array.
precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst strategy for caching pages.
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Cache responses with HTTP status 0 and 200.
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Set an expiration time of 30 days for cached items.
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm up the page cache by caching specific URLs.
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register a route to handle navigation requests using the pageCache strategy.
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// Set up asset caching.
registerRoute(
  // Filter the requests to cache only JS, CSS, and worker files.
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage for assets.
    cacheName: 'asset-cache',
    plugins: [
      // Cache responses with HTTP status 0 and 200.
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // Set a maximum of 60 entries in the cache and an expiration time of 30 days.
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
