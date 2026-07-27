/**
 * Ponto de entrada do app — expõe API para sync.js e inicializa a UI.
 */
import { APP_VERSION } from "./config.js?v=2.23.4";

const CHAVE_VERSAO_LOCAL = "app-versao-carregada";
const CHAVE_TENTOU_RECUPERAR = "app-tentou-recuperar-cache";
const CHAVE_RECARREGAR_SW = "sw-recarregar-pendente";
const CHAVE_RECARREGAR_VERSAO = "versao-recarregando";
const NOME_CACHE = `agenda-v${APP_VERSION}`;

function mostrarErroCarregamento(erro) {
  const detalhe = erro?.message || String(erro);
  const offline = !navigator.onLine;
  document.body.innerHTML = `
    <div style="font-family:system-ui,sans-serif;max-width:28rem;margin:2rem auto;padding:1.5rem;line-height:1.5;text-align:center">
      <h1 style="font-size:1.1rem;margin:0 0 .75rem">Não foi possível carregar o app</h1>
      <p style="margin:0 0 1rem;color:#444">
        ${
          offline
            ? "Sem internet. Abra o app com Wi‑Fi/dados uma vez para preparar o cache offline, depois use o ícone na tela inicial."
            : "Toque abaixo para limpar o cache e tentar de novo."
        }
      </p>
      ${
        offline
          ? ""
          : `<button type="button" id="botao-recarregar-erro" style="padding:12px 20px;border:none;border-radius:10px;background:#1b365d;color:#faf7f1;font-weight:600;cursor:pointer;font-size:1rem">
        Limpar cache e recarregar
      </button>`
      }
      <p style="margin:12px 0 0;font-size:.8rem;color:#666">${detalhe}</p>
    </div>`;
  document.getElementById("botao-recarregar-erro")?.addEventListener("click", () => {
    forcarAtualizacaoApp();
  });
}

export function forcarRecargaComVersaoNova() {
  const u = new URL(location.href);
  u.searchParams.set("v", APP_VERSION);
  u.searchParams.set("t", Date.now());
  location.replace(u.toString());
}

async function limparCachesAntigos() {
  if (!("caches" in window)) return;
  const chaves = await caches.keys();
  await Promise.all(chaves.map((chave) => caches.delete(chave)));
}

async function removerServiceWorkers() {
  if (!("serviceWorker" in navigator)) return;
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((reg) => reg.unregister()));
}

function ligarRecargaControladaSW() {
  if (!("serviceWorker" in navigator)) return;
  if (ligarRecargaControladaSW._ligado) return;
  ligarRecargaControladaSW._ligado = true;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (sessionStorage.getItem(CHAVE_RECARREGAR_SW) !== "1") return;
    sessionStorage.removeItem(CHAVE_RECARREGAR_SW);
    forcarRecargaComVersaoNova();
  });
}

async function cacheAppPronto() {
  if (!("caches" in window)) return false;
  try {
    const cache = await caches.open(NOME_CACHE);
    const index = await cache.match(new URL("./index.html", location.href).href, {
      ignoreSearch: true,
    });
    if (!index) return false;
    const chaves = await cache.keys();
    return chaves.length >= 15;
  } catch {
    return false;
  }
}

async function aguardarCacheApp() {
  if (await cacheAppPronto()) return true;

  return new Promise((resolve) => {
    const limite = setTimeout(() => resolve(false), 12000);

    const aoMensagem = (evento) => {
      if (evento.data?.type !== "PRECACHE_OK") return;
      if (evento.data.version && evento.data.version !== APP_VERSION) return;
      clearTimeout(limite);
      navigator.serviceWorker.removeEventListener("message", aoMensagem);
      resolve(true);
    };

    navigator.serviceWorker.addEventListener("message", aoMensagem);
    navigator.serviceWorker.controller?.postMessage({ type: "PRECACHE_CHECK" });
  });
}

async function configurarServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;

  ligarRecargaControladaSW();

  const registration = await navigator.serviceWorker.register("./sw.js");
  try {
    await registration.update();
  } catch {
    /* offline — mantém SW existente */
  }

  await navigator.serviceWorker.ready;

  if (navigator.onLine) {
    await aguardarCacheApp();
  }

  return registration;
}

export async function forcarAtualizacaoApp() {
  if (!navigator.onLine) return;
  sessionStorage.removeItem(CHAVE_RECARREGAR_VERSAO);
  await removerServiceWorkers();
  await limparCachesAntigos();
  sessionStorage.removeItem(CHAVE_TENTOU_RECUPERAR);
  localStorage.setItem(CHAVE_VERSAO_LOCAL, APP_VERSION);
  forcarRecargaComVersaoNova();
}

async function prepararVersaoNova() {
  const salva = localStorage.getItem(CHAVE_VERSAO_LOCAL);
  if (!salva || salva === APP_VERSION) {
    localStorage.setItem(CHAVE_VERSAO_LOCAL, APP_VERSION);
    sessionStorage.removeItem(CHAVE_RECARREGAR_VERSAO);
    return false;
  }

  if (!navigator.onLine) {
    return false;
  }

  if (sessionStorage.getItem(CHAVE_RECARREGAR_VERSAO) === "1") {
    localStorage.setItem(CHAVE_VERSAO_LOCAL, APP_VERSION);
    sessionStorage.removeItem(CHAVE_RECARREGAR_VERSAO);
    return false;
  }

  sessionStorage.setItem(CHAVE_RECARREGAR_VERSAO, "1");
  await removerServiceWorkers();
  await limparCachesAntigos();
  localStorage.setItem(CHAVE_VERSAO_LOCAL, APP_VERSION);
  forcarRecargaComVersaoNova();
  return true;
}

async function iniciar() {
  if (await prepararVersaoNova()) return;

  try {
    await configurarServiceWorker();

    const app = await import(`./app.js?v=${APP_VERSION}`);

    app.initApp();

    window.APP_VERSION = APP_VERSION;
    window.forcarAtualizacaoApp = forcarAtualizacaoApp;
    window.getEstadoHabitos = app.getEstadoExportavel;
    window.aplicarEstadoRemoto = app.aplicarEstadoRemoto;
    window.aplicarTema = app.aplicarTema;
    window.desenhar = app.desenhar;
    window.carregarNotaHoje = app.carregarNotaHoje;
    window.carregarNotaDiario = app.carregarNotaDiario;
    window.hojeStr = app.hojeStr;
  } catch (erro) {
    console.error(erro);

    if (!navigator.onLine) {
      mostrarErroCarregamento(erro);
      return;
    }

    if (!sessionStorage.getItem(CHAVE_TENTOU_RECUPERAR)) {
      sessionStorage.setItem(CHAVE_TENTOU_RECUPERAR, "1");
      await forcarAtualizacaoApp();
      return;
    }

    mostrarErroCarregamento(erro);
  }
}

iniciar();
