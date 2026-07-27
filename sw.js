/* Service worker — lembretes agendados + cache offline (PWA) */

const CACHE = "agenda-v2.23.3";
const APP_VERSION = "2.23.3";

const alarmes = new Map();

const LIBS = [
  "agenda-notif",
  "aprender",
  "avisos-agenda",
  "cheguei",
  "contexto-ia",
  "contexto-tempo",
  "diario-historico",
  "estudo-fala",
  "estudo-hub",
  "estudo-links-sugeridos",
  "estudo-parceiro",
  "estudo-ui",
  "filosofia",
  "foco",
  "guia-app",
  "habitos",
  "i18n",
  "ia-servicos",
  "inteligencia",
  "lembretes",
  "livros-dados",
  "livros-extras",
  "livros-pratica",
  "livros-temas",
  "livros-trechos",
  "migracao-host",
  "modo-barulho",
  "neuro-explicar",
  "neuro-ia",
  "neuro-modulos",
  "neuro-voz",
  "padroes",
  "perfil",
  "preparar-amanha",
  "rotina-inteligente",
  "rotina-local",
  "rotina-preset",
  "streak-gentil",
  "tarde",
  "tdah",
  "traducoes",
  "transicao-coach",
  "voz-contexto",
  "voz-sintese",
];

function urlsPrecache() {
  const raiz = [
    "./",
    "./index.html",
    `./style.css?v=${APP_VERSION}`,
    "./sync.js?v=6",
    "./firebase-config.js",
    "./manifest.webmanifest",
    "./icon-192.png",
    "./icon-512.png",
    "./favicon-32.png",
    "./favicon-16.png",
    "./apple-touch-icon.png",
    `./js/main.js?v=${APP_VERSION}`,
    `./js/config.js?v=${APP_VERSION}`,
    `./js/app.js?v=${APP_VERSION}`,
  ];

  const libs = [];
  for (const nome of LIBS) {
    const caminho = `./js/lib/${nome}.js`;
    libs.push(`${caminho}?v=${APP_VERSION}`, `${caminho}?v=2.11.0`, caminho);
  }

  return [...raiz, ...libs];
}

async function matchCache(request) {
  const exato = await caches.match(request);
  if (exato) return exato;
  return caches.match(request, { ignoreSearch: true });
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await matchCache(request);
    if (cached) return cached;
    throw new Error("offline");
  }
}

async function cacheFirst(request) {
  const cached = await matchCache(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

async function navegacaoOffline(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
      cache.put("./index.html", response.clone());
    }
    return response;
  } catch {
    const cached =
      (await matchCache(request)) ||
      (await matchCache(new Request(new URL("./index.html", self.location.href).href)));
    if (cached) return cached;
    throw new Error("offline");
  }
}

async function precacheInstalacao() {
  const cache = await caches.open(CACHE);
  const urls = urlsPrecache();
  await Promise.allSettled(
    urls.map(async (url) => {
      try {
        await cache.add(url);
      } catch (erro) {
        console.warn("[sw] precache:", url, erro);
      }
    })
  );
}

function ehArquivoDoApp(url) {
  const caminho = url.pathname;
  if (caminho.endsWith("/") || caminho.endsWith("/index.html")) return true;
  if (caminho.includes("/js/")) return true;
  if (caminho.endsWith("/style.css")) return true;
  if (caminho.endsWith("/sync.js")) return true;
  if (caminho.endsWith("/firebase-config.js")) return true;
  return false;
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheInstalacao().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((chaves) => Promise.all(chaves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(navegacaoOffline(event.request));
    return;
  }

  if (ehArquivoDoApp(url)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(cacheFirst(event.request));
});

function limparAlarmes() {
  alarmes.forEach((id) => clearTimeout(id));
  alarmes.clear();
}

function agendarItem(item) {
  const delay = item.timestamp - Date.now();
  if (delay <= 0 || delay > 24 * 60 * 60 * 1000) return;

  const id = setTimeout(() => {
    self.registration.showNotification(item.title, {
      body: item.body,
      tag: item.tag,
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      data: { url: item.url || "./", habitoId: item.habitoId },
      requireInteraction: Boolean(item.importante),
    });
  }, delay);

  alarmes.set(item.tag, id);
}

self.addEventListener("message", (event) => {
  const dados = event.data;
  if (!dados) return;
  if (dados.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }
  if (dados.type !== "AGENDAR") return;

  limparAlarmes();
  const lista = Array.isArray(dados.agenda) ? dados.agenda : [];
  lista.forEach(agendarItem);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "./";
  const habitoId = event.notification.data?.habitoId;
  const destino = habitoId ? `${url.split("#")[0]}#habito-${habitoId}` : url;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((lista) => {
      for (const client of lista) {
        if ("focus" in client) {
          client.navigate(destino);
          return client.focus();
        }
      }
      return self.clients.openWindow(destino);
    })
  );
});
