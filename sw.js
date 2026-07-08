const CACHE_NOME = "painel-avanzi-v2"; // subiu pra v2 pra forcar a atualizacao

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
  const req = evento.request;
  const url = req.url;

  // Dados do Google Sheets: rede primeiro
  if (url.includes("docs.google.com") || url.includes("google")) {
    evento.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  // Pagina do painel (navegacao): SEMPRE busca a versao nova na internet.
  // So usa a copia guardada se estiver offline.
  if (req.mode === "navigate" || req.destination === "document") {
    evento.respondWith(
      fetch(req)
        .then((resp) => {
          const copia = resp.clone();
          caches.open(CACHE_NOME).then((c) => c.put(req, copia));
          return resp;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./Painel_Producao_Avanzigit.html")))
    );
    return;
  }

  // Resto (icones, bibliotecas): cache primeiro (rapido)
  evento.respondWith(caches.match(req).then((resp) => resp || fetch(req)));
});
