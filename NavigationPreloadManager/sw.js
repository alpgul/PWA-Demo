addEventListener("activate", (event) => {
  event.waitUntil(
    (async function () {
      if (self.registration.navigationPreload) {
        // Promise<undefined> enable(); Navigasyon önyüklemesini etkinleştirir
        await self.registration.navigationPreload.enable();
        //Promise<undefined> disable(); Navigasyon önyüklemesini devre dışı bırakır
        //Promise<undefined> setHeaderValue(ByteString value); Service-Worker-Navigation-Preload başlığının değerini ayarlar header ekleme
        //Promise<NavigationPreloadState> getState(); aşağıdaki obje değerlerini döndürür
        /*
         NavigationPreloadState {
            boolean enabled = false;
            ByteString headerValue;
          };
        */
      }
    })()
  );
});

addEventListener("fetch", (event) => {
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
