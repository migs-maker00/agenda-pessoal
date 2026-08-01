/** Guia integrado — roteiro de demonstração e referência do app. */

import { APP_VERSION } from "../config.js";
import { faixaDoDia } from "./contexto-tempo.js";
import { rotuloFaixaI18n, t, localeTag } from "./i18n.js";
import { carregarPerfil } from "./perfil.js";
import { nomeUsuarioPerfil } from "./north.js";

const CHAVE_PROGRESSO = "guia-app-progresso-v1";
const CHAVE_VISTO = "guia-app-visto-v1";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

export const ROTEIRO_DEMO = [
  {
    id: "hoje",
    emoji: "☀️",
    tituloKey: "guia.rota.hoje.titulo",
    falarKey: "guia.rota.hoje.falar",
    painel: "hoje",
    tempoKey: "guia.tempo.1min",
  },
  {
    id: "cheguei",
    emoji: "🎯",
    tituloKey: "guia.rota.cheguei.titulo",
    falarKey: "guia.rota.cheguei.falar",
    painel: "cheguei",
    chegueiOpcoes: true,
    tempoKey: "guia.tempo.1min",
  },
  {
    id: "neuro",
    emoji: "🧠",
    tituloKey: "guia.rota.neuro.titulo",
    falarKey: "guia.rota.neuro.falar",
    painel: "estudo",
    estudoAba: "neuro",
    tempoKey: "guia.tempo.2min",
  },
  {
    id: "diario",
    emoji: "📓",
    tituloKey: "guia.rota.diario.titulo",
    falarKey: "guia.rota.diario.falar",
    painel: "diario",
    tempoKey: "guia.tempo.1min",
  },
  {
    id: "insights",
    emoji: "✨",
    tituloKey: "guia.rota.insights.titulo",
    falarKey: "guia.rota.insights.falar",
    painel: "insights",
    tempoKey: "guia.tempo.30s",
  },
];

export const REFERENCIA_ABAS = [
  { id: "hoje", rotuloKey: "nav.hoje", emoji: "☀️", textoKey: "guia.ref.hoje" },
  { id: "estudo", rotuloKey: "nav.estudo", emoji: "📚", textoKey: "guia.ref.estudo" },
  { id: "rotina", rotuloKey: "nav.rotina", emoji: "🔄", textoKey: "guia.ref.rotina" },
  { id: "semana", rotuloKey: "nav.semana", emoji: "📅", textoKey: "guia.ref.semana" },
  { id: "diario", rotuloKey: "nav.diario", emoji: "📓", textoKey: "guia.ref.diario" },
  { id: "insights", rotuloKey: "nav.insights", emoji: "📊", textoKey: "guia.ref.insights" },
  { id: "ajustes", rotuloKey: "nav.ajustes", emoji: "⚙️", textoKey: "guia.ref.ajustes" },
];

const DICAS_KEYS = ["guia.dica.1", "guia.dica.2", "guia.dica.3", "guia.dica.4", "guia.dica.5"];

export function carregarProgressoGuia() {
  try {
    const raw = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || "{}");
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}

export function salvarProgressoGuia(mapa) {
  localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(mapa));
}

export function marcarPassoGuia(id, feito = true) {
  const mapa = carregarProgressoGuia();
  if (feito) mapa[id] = Date.now();
  else delete mapa[id];
  salvarProgressoGuia(mapa);
  return mapa;
}

export function resetarProgressoGuia() {
  localStorage.removeItem(CHAVE_PROGRESSO);
  return {};
}

export function guiaJaVisto() {
  return Boolean(localStorage.getItem(CHAVE_VISTO));
}

export function marcarGuiaVisto() {
  localStorage.setItem(CHAVE_VISTO, "1");
}

export function progressoRoteiro(mapa = carregarProgressoGuia()) {
  const total = ROTEIRO_DEMO.length;
  const feitos = ROTEIRO_DEMO.filter((p) => mapa[p.id]).length;
  return { feitos, total, pct: total ? Math.round((feitos / total) * 100) : 0 };
}

function saudacaoGuia() {
  const faixa = faixaDoDia();
  const rotulo = rotuloFaixaI18n(faixa);
  const hora = new Date().toLocaleTimeString(localeTag(), { hour: "2-digit", minute: "2-digit" });
  return { faixa, rotulo, hora };
}

function renderPassoDemo(passo, indice, mapa, demoIndice) {
  const feito = Boolean(mapa[passo.id]);
  const ativoDemo = demoIndice === indice;
  const titulo = t(passo.tituloKey);
  const falar = t(passo.falarKey);
  const tempo = t(passo.tempoKey);
  return `
    <article class="guia-passo ${feito ? "feito" : ""} ${ativoDemo ? "ativo-demo" : ""}" data-guia-passo="${passo.id}">
      <div class="guia-passo-num">${indice + 1}</div>
      <div class="guia-passo-corpo">
        <header class="guia-passo-cab">
          <span class="guia-passo-emoji">${passo.emoji}</span>
          <h3 class="guia-passo-titulo">${esc(titulo)}</h3>
          <span class="guia-passo-tempo">${esc(tempo)}</span>
        </header>
        <p class="guia-passo-falar">${t("guia.passo.falar", { texto: esc(falar) })}</p>
        <div class="guia-passo-acoes">
          <button type="button" class="botao-primario" data-guia-ir="${esc(passo.painel)}" data-guia-passo-id="${passo.id}" data-guia-cheguei="${passo.chegueiOpcoes ? "1" : ""}" data-guia-estudo-aba="${passo.estudoAba || ""}">
            ${esc(t("guia.passo.abrir"))}
          </button>
          <button type="button" class="botao-secundario" data-guia-marcar="${passo.id}">
            ${feito ? esc(t("guia.passo.feito")) : esc(t("guia.passo.marcar"))}
          </button>
        </div>
      </div>
    </article>`;
}

export function renderPainelGuia({ iaAtiva = false, demoIndice = null } = {}) {
  const mapa = carregarProgressoGuia();
  const { feitos, total, pct } = progressoRoteiro(mapa);
  const { rotulo, hora } = saudacaoGuia();
  const nome = nomeUsuarioPerfil(carregarPerfil());

  const passos = ROTEIRO_DEMO.map((p, i) => renderPassoDemo(p, i, mapa, demoIndice)).join("");

  const refCards = REFERENCIA_ABAS.map(
    (a) => `
    <button type="button" class="guia-ref-card" data-guia-ir="${a.id}">
      <span class="guia-ref-emoji">${a.emoji}</span>
      <span class="guia-ref-rotulo">${esc(t(a.rotuloKey))}</span>
      <span class="guia-ref-texto">${esc(t(a.textoKey))}</span>
    </button>`
  ).join("");

  const dicas = DICAS_KEYS.map((k) => `<li>${esc(t(k))}</li>`).join("");

  const demoBanner =
    demoIndice != null && demoIndice >= 0 && demoIndice < ROTEIRO_DEMO.length
      ? `<div class="guia-demo-banner" role="status">
          <p>${t("guia.demo.banner", { atual: demoIndice + 1, total })}</p>
          <div class="guia-demo-banner-acoes">
            <button type="button" class="botao-secundario" data-guia-demo-proximo="1">${esc(t("guia.demo.proximo"))}</button>
            <button type="button" class="botao-texto" data-guia-demo-parar="1">${esc(t("guia.demo.sair"))}</button>
          </div>
        </div>`
      : "";

  return `
    <div class="guia-painel">
      ${demoBanner}
      <header class="guia-hero">
        <p class="guia-hero-kicker">${esc(t("guia.hero.kicker", { versao: APP_VERSION }))}</p>
        <h2 class="guia-hero-titulo">${esc(t("guia.hero.titulo"))}</h2>
        <p class="guia-hero-apoio">${esc(t("guia.hero.apoio", { nome, faixa: rotulo, hora }))}</p>
        <div class="guia-hero-acoes">
          <button type="button" class="botao-primario guia-cta-demo" data-guia-demo-iniciar="1">
            ${esc(t("guia.demo.iniciar"))}
          </button>
          <button type="button" class="botao-secundario" data-guia-ir="cheguei" data-guia-cheguei="1">
            ${esc(t("guia.cheguei.btn"))}
          </button>
        </div>
      </header>

      <section class="guia-bloco guia-progresso-bloco" aria-label="${esc(t("guia.progresso"))}">
        <div class="guia-progresso-topo">
          <span class="guia-progresso-rotulo">${esc(t("guia.progresso"))}</span>
          <span class="guia-progresso-valor">${feitos}/${total} · ${pct}%</span>
        </div>
        <div class="guia-progresso-barra" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="guia-progresso-preenchido" style="width:${pct}%"></div>
        </div>
        <div class="guia-roteiro-passos">${passos}</div>
        <button type="button" class="botao-texto guia-reset" data-guia-reset="1">${esc(t("guia.reset"))}</button>
      </section>

      <details class="guia-mais mindos-sec-mais">
        <summary class="mindos-sec-mais-resumo guia-mais-resumo">${esc(t("guia.mais.referencia"))}</summary>
        <div class="mindos-sec-mais-conteudo">
      <section class="guia-bloco" aria-label="${esc(t("guia.mapa.titulo"))}">
        <h3 class="guia-bloco-titulo">${esc(t("guia.mapa.titulo"))}</h3>
        <p class="guia-bloco-apoio">${t("guia.mapa.apoio")}</p>
        <div class="guia-ref-grid">${refCards}</div>
      </section>

      <section class="guia-bloco guia-dicas-bloco" aria-label="${esc(t("guia.dicas.titulo"))}">
        <h3 class="guia-bloco-titulo">${esc(t("guia.dicas.titulo"))}</h3>
        <ul class="guia-dicas-lista">${dicas}</ul>
        <p class="guia-ia-status ${iaAtiva ? "ativa" : ""}">
          ${esc(iaAtiva ? t("guia.ia.ativa") : t("guia.ia.local"))}
        </p>
      </section>
        </div>
      </details>
    </div>`;
}

export function passoDemoPorIndice(indice) {
  const passo = ROTEIRO_DEMO[indice];
  if (!passo) return null;
  return {
    ...passo,
    titulo: t(passo.tituloKey),
    falar: t(passo.falarKey),
  };
}

export function indicePassoDemo(id) {
  return ROTEIRO_DEMO.findIndex((p) => p.id === id);
}
