const CACHE_NOME = "painel-avanzi-v1"; // troque pra v2, v3... quando atualizar o painel

const ARQUIVOS_ESSENCIAIS = [
  "./",
  "./Painel_Producao_Avanzigit.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NOME).then((cache) => cache.addAll(ARQUIVOS_ESSENCIAIS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((c) => c !== CACHE_NOME).map((c) => caches.delete(c)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evento) => {
  const url = evento.request.url;
  if (url.includes("docs.google.com") || url.includes("google")) {
    evento.respondWith(
      fetch(evento.request).catch(() => caches.match(evento.request))
    );
    return;
  }
  evento.respondWith(
    caches.match(evento.request).then((resp) => resp || fetch(evento.request))
  );
});
