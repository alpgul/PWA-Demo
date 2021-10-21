//EventHandler onmessageerror;iletide alınırken hata olusursa
self.addEventListener("messageerror", function (event) {});
//EventHandler onmessage; ServiceWorkerContainer nesnesine gelen iletiler alındığında (örneğin, bir Client.postMessage() çağrısı yoluyla) tetiklenen bir olay işleyicisidir.
self.addEventListener("message", (event) => {
  console.log(`The client sent me a message: ${event.data}`);

  event.source.postMessage("Hi client");
});
//EventHandler onactivate; Bu, installdan sonra sw tarafından kontrol edilecek sayfa yenilendiğinde gerçekleşir.
self.addEventListener("activate", function (event) {});
//Promise<undefined> skipWaiting(); forces the waiting service worker to become the active service worker.
self.skipWaiting().then(function () {
  //Do something
});
//attribute ServiceWorker serviceWorker;
var serviceWorker = self.serviceWorker;

//attribute ServiceWorkerRegistration registration;
var serviceWorkerRegistration = self.registration;

//attribute Clients clients;
var swClients = self.clients;

// EventHandler oninstall; bir yükleme olayı meydana geldiğinde (servis çalışanı yüklediğinde) başlatılan bir olay işleyicisidir. Bu olay activate önce olur.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("shell-v1").then((cache) => {
      return cache.addAll([
        "/app.html",
        "/assets/v1/base.css",
        "/assets/v1/app.js",
        "/assets/v1/logo.png",
        "/assets/v1/intro_video.webm"
      ]);
    })
  );
});

//EventHandler onfetch; genellikle fetch() yöntemi çağrıldığında başlatılan bir olay işleyicisidir.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(e.request)
      .then((response) => {
        return response || fetch(e.request);
      })
      .catch(() => {
        return caches.match("/fallback.html");
      })
  );
});
