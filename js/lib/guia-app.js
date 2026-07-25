/** Guia integrado — roteiro de demonstração e referência do app. */

import { APP_VERSION } from "../config.js";
import { faixaDoDia, rotuloFaixa } from "./contexto-tempo.js";

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
    titulo: "Hoje — centro do dia",
    falar:
      "Hábitos, progresso da semana e a sugestão do momento. Mostre marcar um hábito e o bloco Agora.",
    painel: "hoje",
    tempo: "1 min",
  },
  {
    id: "cheguei",
    emoji: "🎯",
    titulo: "E agora? — só 2 opções",
    falar:
      "Quando a cabeça trava, o app oferece no máximo duas escolhas contextuais — sem lista infinita.",
    painel: "cheguei",
    chegueiOpcoes: true,
    tempo: "1 min",
  },
  {
    id: "neuro",
    emoji: "🧠",
    titulo: "Estudo → Neuro",
    falar:
      "Trilha de neurociência: ler, explicar com voz ou texto e receber feedback. Módulo TDAH impressiona.",
    painel: "estudo",
    estudoAba: "neuro",
    tempo: "2 min",
  },
  {
    id: "diario",
    emoji: "📓",
    titulo: "Diário com IA",
    falar:
      "Anotações do dia ficam seguras. Toque em Organizar com IA para um resumo gentil.",
    painel: "diario",
    tempo: "1 min",
  },
  {
    id: "insights",
    emoji: "✨",
    titulo: "Insights — streak gentil",
    falar:
      "Sem culpa: sequências e padrões mostram progresso real, não cobrança.",
    painel: "insights",
    tempo: "30 s",
  },
];

export const REFERENCIA_ABAS = [
  {
    id: "hoje",
    rotulo: "Hoje",
    emoji: "☀️",
    texto: "Checklist, Agora, inbox, avisos e revisão do dia.",
  },
  {
    id: "estudo",
    rotulo: "Estudo",
    emoji: "📚",
    texto: "Neuro, livros, vídeos, prática de inglês e pronúncia.",
  },
  {
    id: "rotina",
    rotulo: "Rotina",
    emoji: "🔄",
    texto: "Montar hábitos com IA ou editar a rotina completa.",
  },
  {
    id: "semana",
    rotulo: "Semana",
    emoji: "📅",
    texto: "Visão da semana e plano inteligente.",
  },
  {
    id: "diario",
    rotulo: "Diário",
    emoji: "📓",
    texto: "Notas por dia — dados sagrados, com histórico.",
  },
  {
    id: "insights",
    rotulo: "Insights",
    emoji: "📊",
    texto: "Sequências, taxa de conclusão e calendário de hábitos.",
  },
  {
    id: "ajustes",
    rotulo: "Ajustes",
    emoji: "⚙️",
    texto: "Sync, lembretes, exportar dados e versão do app.",
  },
];

export const DICAS_APRESENTACAO = [
  "Use Chrome ou Safari no celular — voz e instalação na tela inicial funcionam melhor.",
  "Permita o microfone na primeira vez (Estudo → Neuro → Explicar só com voz).",
  "Se algo parecer antigo, segure o botão de recarregar para atualizar a versão.",
  "O app funciona offline; IA (quando configurada) precisa de internet no Vercel.",
  "Para impressionar: comece pelo roteiro abaixo — leva cerca de 5 minutos.",
];

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
  const rotulo = rotuloFaixa(faixa);
  const hora = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return { faixa, rotulo, hora };
}

function renderPassoDemo(passo, indice, mapa, demoIndice) {
  const feito = Boolean(mapa[passo.id]);
  const ativoDemo = demoIndice === indice;
  return `
    <article class="guia-passo ${feito ? "feito" : ""} ${ativoDemo ? "ativo-demo" : ""}" data-guia-passo="${passo.id}">
      <div class="guia-passo-num">${indice + 1}</div>
      <div class="guia-passo-corpo">
        <header class="guia-passo-cab">
          <span class="guia-passo-emoji">${passo.emoji}</span>
          <h3 class="guia-passo-titulo">${esc(passo.titulo)}</h3>
          <span class="guia-passo-tempo">${esc(passo.tempo)}</span>
        </header>
        <p class="guia-passo-falar"><strong>O que dizer:</strong> ${esc(passo.falar)}</p>
        <div class="guia-passo-acoes">
          <button type="button" class="botao-primario" data-guia-ir="${esc(passo.painel)}" data-guia-passo-id="${passo.id}" data-guia-cheguei="${passo.chegueiOpcoes ? "1" : ""}" data-guia-estudo-aba="${passo.estudoAba || ""}">
            Abrir e mostrar →
          </button>
          <button type="button" class="botao-secundario" data-guia-marcar="${passo.id}">
            ${feito ? "✓ Feito" : "Marcar como feito"}
          </button>
        </div>
      </div>
    </article>`;
}

export function renderPainelGuia({ iaAtiva = false, demoIndice = null } = {}) {
  const mapa = carregarProgressoGuia();
  const { feitos, total, pct } = progressoRoteiro(mapa);
  const { rotulo, hora } = saudacaoGuia();

  const passos = ROTEIRO_DEMO.map((p, i) => renderPassoDemo(p, i, mapa, demoIndice)).join("");

  const refCards = REFERENCIA_ABAS.map(
    (a) => `
    <button type="button" class="guia-ref-card" data-guia-ir="${a.id}">
      <span class="guia-ref-emoji">${a.emoji}</span>
      <span class="guia-ref-rotulo">${esc(a.rotulo)}</span>
      <span class="guia-ref-texto">${esc(a.texto)}</span>
    </button>`
  ).join("");

  const dicas = DICAS_APRESENTACAO.map((d) => `<li>${esc(d)}</li>`).join("");

  const demoBanner =
    demoIndice != null && demoIndice >= 0 && demoIndice < ROTEIRO_DEMO.length
      ? `<div class="guia-demo-banner" role="status">
          <p>Modo apresentação — passo <strong>${demoIndice + 1}</strong> de ${total}</p>
          <div class="guia-demo-banner-acoes">
            <button type="button" class="botao-secundario" data-guia-demo-proximo="1">Próximo passo →</button>
            <button type="button" class="botao-texto" data-guia-demo-parar="1">Sair do modo</button>
          </div>
        </div>`
      : "";

  return `
    <div class="guia-painel">
      ${demoBanner}
      <header class="guia-hero">
        <p class="guia-hero-kicker">Guia do app · v${esc(APP_VERSION)}</p>
        <h2 class="guia-hero-titulo">Tudo que você precisa mostrar — em um lugar só</h2>
        <p class="guia-hero-apoio">
          ${esc(rotulo)} · ${esc(hora)}. App feito para TDAH: poucas escolhas, passos pequenos, sem culpa.
        </p>
        <div class="guia-hero-acoes">
          <button type="button" class="botao-primario guia-cta-demo" data-guia-demo-iniciar="1">
            ▶ Iniciar roteiro de 5 min
          </button>
          <button type="button" class="botao-secundario" data-guia-ir="cheguei" data-guia-cheguei="1">
            E agora? — 2 opções
          </button>
        </div>
      </header>

      <section class="guia-bloco guia-progresso-bloco" aria-label="Progresso do roteiro">
        <div class="guia-progresso-topo">
          <span class="guia-progresso-rotulo">Roteiro de demonstração</span>
          <span class="guia-progresso-valor">${feitos}/${total} · ${pct}%</span>
        </div>
        <div class="guia-progresso-barra" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="guia-progresso-preenchido" style="width:${pct}%"></div>
        </div>
        <div class="guia-roteiro-passos">${passos}</div>
        <button type="button" class="botao-texto guia-reset" data-guia-reset="1">Zerar progresso do roteiro</button>
      </section>

      <section class="guia-bloco" aria-label="Mapa das abas">
        <h3 class="guia-bloco-titulo">Mapa rápido das abas</h3>
        <p class="guia-bloco-apoio">Toque para ir direto. <em>E agora?</em> não está na barra — fica aqui e em Hoje.</p>
        <div class="guia-ref-grid">${refCards}</div>
      </section>

      <section class="guia-bloco guia-dicas-bloco" aria-label="Dicas para apresentar">
        <h3 class="guia-bloco-titulo">Antes de mostrar para alguém</h3>
        <ul class="guia-dicas-lista">${dicas}</ul>
        <p class="guia-ia-status ${iaAtiva ? "ativa" : ""}">
          ${iaAtiva ? "✨ IA ativa no servidor — Neuro, Diário e Agora podem usar inteligência." : "ℹ️ IA local ativa — funciona sem chave; configure GROQ no Vercel para IA completa."}
        </p>
      </section>
    </div>`;
}

export function passoDemoPorIndice(indice) {
  return ROTEIRO_DEMO[indice] ?? null;
}

export function indicePassoDemo(id) {
  return ROTEIRO_DEMO.findIndex((p) => p.id === id);
}
