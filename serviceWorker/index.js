navigator.serviceWorker.register("/serviceWorker/sw.js").then(
  (registration) => {
    var serviceWorker;
    if (registration.installing) {
      serviceWorker = registration.installing;
    } else if (registration.waiting) {
      serviceWorker = registration.waiting;
    } else if (registration.active) {
      serviceWorker = registration.active;
    }
    if (serviceWorker) {
      //ServiceWorkerState state;
      /*
    "parsed",
    "installing",
    "installed",
    "activating",
    "activated",
    "redundant"
    */
      console.log(serviceWorker.state);

      //postMessage(any message, sequence<object> transfer);
      serviceWorker.postMessage("Howdy from your installing page.");

      //EventHandler onstatechange;
      serviceWorker.addEventListener("statechange", function (e) {
        console.log(e.target.state);
      });
    }
  },
  (err) => {
    console.error("Installing the worker failed!", err);
  }
);
//USVString scriptURL;
console.log(navigator.serviceWorker.controller.scriptURL);
