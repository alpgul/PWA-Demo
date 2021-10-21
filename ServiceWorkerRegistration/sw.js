self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async function () {
      //NavigationPreloadManager navigationPreload; (managing the preloading of resources)
      if (self.registration.navigationPreload) {
        // Enable navigation preloads!
        await self.registration.navigationPreload.enable();
      }
    })()
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async function () {
      // Respond from the cache if we can
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;

      // Else, use the preloaded response, if it's there
      const response = await event.preloadResponse;
      if (response) return response;

      // Else try the network.
      return fetch(event.request);
    })()
  );
});
