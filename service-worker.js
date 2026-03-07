self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("farmer-app").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/farmer.html",
        "/admin.html",
        "/style.css"
      ]);
    })
  );
});