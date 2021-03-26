const self = this;
const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v2";
const urlsToCache = [
  "/",
  "/bundle.js",
  "offline.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

//cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

//install service worker
self.addEventListener("install", (evt) => {
  //   console.log("sw has been installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      return cache.addAll(urlsToCache);
    })
  );
});

//activate sw
self.addEventListener("activate", (evt) => {
  //   console.log("sw has beeen activated");
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

//fetch event
self.addEventListener("fetch", (evt) => {
  //   console.log("fetch event", evt);
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
        return caches.match("/offline.html");
      })
  );
});
