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
  console.log("sw has beeen activated");
});

//fetch event
self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt);
});
