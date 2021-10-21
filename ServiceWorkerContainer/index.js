if ("serviceWorker" in navigator) {
  //Promise<FrozenArray<ServiceWorkerRegistration>> getRegistrations(); Kayıtlı olan registration array olarak döndürür.
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    document.querySelector("#status").textContent =
      "ServiceWorkerRegistrations found.";
  });

  //Promise<(ServiceWorkerRegistration or undefined)> getRegistration(optional USVString clientURL = "")
  /*
  aldığı parametreyle eşleşen kayıtlı registration scope değeriyle eşleşiyorsa döndürür.
  */
  navigator.serviceWorker.getRegistration("/app").then(function (registration) {
    if (registration) {
      document.querySelector("#status").textContent =
        "ServiceWorkerRegistration found.";
    }
  });

  // Promise<ServiceWorkerRegistration> register(USVString scriptURL, optional RegistrationOptions options = {});
  /*
  serviceworker kaydı gerçeklerştirir.
  scope:default değeri serviceworker dizinidir. cache işlemi uygulanacak dizin sınırlar
  type:classic ve module değerlerini alır
  classic:standart script demektir. varysayılan değerdir
  module:kaydı yapılan serviceworker es module tipindedir.
  updateViaCache:cache güncellemelerini sınırlandırır.
  imports: sadece importscript türündekileri günceller
  all: tüm istekleri günceller
  none:tüm istekleri güncellemez  
  */
  navigator.serviceWorker
    .register("/ServiceWorkerContainer/sw.js", {
      scope: "ServiceWorkerContainer",
      type: "classic",
      updateViaCache: "imports"
    })
    .then(
      function (registration) {
        console.log("Service worker registration succeeded:", registration);
      },
      /*catch*/ function (error) {
        console.log("Service worker registration failed:", error);
      }
    );

  //Promise<ServiceWorkerRegistration> ready; asla reject dönmez service worker active olana kadar bekler eğer şuan sayfada aktif durum olduğunda ServiceWorkerRegistration döndürür
  navigator.serviceWorker.ready.then(function (registration) {
    console.log("A service worker is active:", registration.active);
  });

  // service worker state değeri activating or activated ise serviceworker döner eğer force reflesh veya serviceworker yoksa ServiceWorkerRegistration.active değeri null döner
  if (navigator.serviceWorker.controller) {
    console.log(
      `This page is currently controlled by: ${navigator.serviceWorker.controller}`
    );
  } else {
    console.log("This page is not currently controlled by a service worker.");
  }
  //kayıtlı serviceworker yeni active worker edindiğinde çalışır
  navigator.serviceWorker.addEventListener("controllerchange", (e) => {
    // ...
  });
  //serviceworkerdan mesaj geldiğinde çalışır
  navigator.serviceWorker.addEventListener("message", (e) => {
    // ...
  });
  //eğer serviceworker tarafından gönderilen mesaj yeniden nesneleştirilemezse burada hata adın çalışacaktır
  navigator.serviceWorker.addEventListener("messageerror", (e) => {
    // ...
  });
  //startMessages(); dom yüklenmeden mesajlaşmanın başlamasını istenirse çağrılır normade dom yüklendikten sonra mesajlaşma başlar
  navigator.serviceWorker.startMessages();
} else {
  console.log("Service workers are not supported.");
}
