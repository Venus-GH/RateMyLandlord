const self = this;
const staticCacheName = "site-static-v5";
const dynamicCacheName = "site-dynamic-v3";
const urlsToCache = [
  "/",
  "/bundle.js",
  "offline.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css",
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
  "/img/orangemapmarker.png",
  "/img/explore2.png",
  "/img/explore3.png",
  "https://fonts.googleapis.com/css2?family=Space+Mono&display=swap",
  "/style.css",
];

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheResponse) => {
        return (
          cacheResponse ||
          fetch(evt.request).then((fetchResponse) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchResponse.clone());
              limitCacheSize(dynamicCacheName, 30);
              return fetchResponse;
            });
          })
        );
      })
      .catch(() => {
        // if (evt.request.url.indexOf(".html") > -1) {
        return caches.match("/offline.html");
        // }
      })
  );
});
