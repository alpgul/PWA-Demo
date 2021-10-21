var button = document.createElement("button");
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/ServiceWorkerRegistration/sw.js", {
      //ServiceWorkerUpdateViaCache updateViaCache;
      /*
       "imports": cache güncellemesinde sadece importscripts ile aktarımda danışılır.
       "all": hem http hem import isteklerinde önbelleğe başvurur.
       "none":http ve import isteklerinde önbelleğe başvurmaz.
      */
      updateViaCache: "none",
      scope: "ServiceWorkerRegistration"
    })
    .then(function (registration) {
      //USVString scope;
      console.log(registration.scope);

      //Promise<boolean> unregister(); kayıtlı olan register edilmiş serviceworkerı bulamazsa false doner. Silme işlemi tüm operasyon işlemlerinin bitiminden sonra tamamlanır
      registration.unregister().then(function (boolean) {
        // if boolean = true, unregister is successful
      });
      button.onclick = function () {
        //Promise<undefined> update(); Önbelleğe danışmadan worker dosyasını yeni sürümüyle günceller.
        registration.update();
      };
      //EventHandler onupdatefound; statechange tipi değiştiğinde çağrılır ServiceWorkerRegistration.installing değerine yeni serviceworker tanımlandığında çalışır
      registration.addEventListener("updatefound", function () {
        //ServiceWorker? installing; This property is initially set to null(state installing).
        var installingWorker = registration.installing;
        //ServiceWorker? waiting; This property is initially set to null.(state installed)
        installingWorker = registration.waiting;
        //ServiceWorker? active;This property is initially set to null.(state activating or activated)
        console.log(
          "A new service worker is being installed:",
          installingWorker
        );

        // You can listen for changes to the installing service worker's
        // state via installingWorker.onstatechange
      });
    })
    .catch(function (error) {
      console.log("Service worker registration failed:", error);
    });
} else {
  console.log("Service workers are not supported.");
}
