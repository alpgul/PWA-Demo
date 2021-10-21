self.addEventListener("notificationclick", function (event) {
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({
        type: "window"
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          //Promise<WindowClient?> navigate(USVString url); belirli bir URL'yi bir client sayfasına yükler
          client.navigate("www.google.com").then(function (windowClient) {
            // do something with your WindowClient after navigation
          });
          //attribute boolean focused; odaklanıp odaklanmadığını gösteren bir boolean değeridir.
          var myFocused = client.focused;
          //attribute VisibilityState visibilityState;the visibility of the current client
          var myVisState = client.visibilityState;
          //postMessage(any message, sequence<object> transfer); send a message to a client (a Window, Worker, or SharedWorker).
          client.postMessage({
            msg: "Hey I just got a fetch from you!",
            url: event.request.url
          });
          //attribute ClientType type; İstemci türü
          /*
          ClientType {
            "worker",
            "window",
            "all"
            "sharedworker",
          }; */
          //attribute DOMString id;Client nesnesinin evrensel olarak benzersiz tanımlayıcısını döndürür.
          var clientId = client.id;
          //attribute FrameType frameType; mevcut İstemcinin göz atma bağlamının türünü belirtir
          /*
          FrameType {
            "auxiliary",
            "top-level",
            "none"
            "nested",            
          }; */
          var myFrameType = client.frameType;
          //attribute USVString url; returns the URL of the current service worker client.
          if (client.url == "/" && "focus" in client)
            //Promise<WindowClient> focus(); odağı geçerli cliente ver
            return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/");
      })
  );
});
