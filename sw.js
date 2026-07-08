const CACHE_NOME = "painel-avanzi-v3"; // subiu pra v3 (agora com push)

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

// ===== Recebe a notificacao push e mostra na tela =====
self.addEventListener("push", (evento) => {
  let dados = { title: "Avanzi Quimica", body: "Nova notificacao" };
  try {
    dados = evento.data.json();
  } catch (e) {
    if (evento.data) dados.body = evento.data.text();
  }
  const opcoes = {
    body: dados.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    vibrate: [100, 50, 100],
    data: dados.url || "./Painel_Producao_Avanzigit.html"
  };
  evento.waitUntil(
    self.registration.showNotification(dados.title || "Avanzi Quimica", opcoes)
  );
});

// ===== Ao clicar na notificacao, abre/foca o painel =====
self.addEventListener("notificationclick", (evento) => {
  evento.notification.close();
  const destino = evento.notification.data || "./";
  evento.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((lista) => {
      for (const c of lista) {
        if ("focus" in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow(destino);
    })
  );
});
