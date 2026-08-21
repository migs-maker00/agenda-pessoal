/** North Home — GPS pessoal: ESTADO → DIREÇÃO → EXECUÇÃO */

import { t } from "./i18n.js";
import { normalizarEstadoGps, ESTADOS_GPS } from "./mindos-estado.js";
import { htmlCaminhoNorth } from "./north-caminho.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function horaAtual() {
  return new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function parseMinutos(texto) {
  const m = String(texto || "").match(/(\d+)\s*min/i);
  return m ? Math.min(120, Math.max(5, parseInt(m[1], 10))) : 25;
}

function classificarPasso(habito, passoCognitivo) {
  if (passoCognitivo?.tipo === "acao" && passoCognitivo.bloco) {
    const area = passoCognitivo.area || "geral";
    const titulo = t(`cognitivo.bloco.${passoCognitivo.bloco.id}`);
    return {
      tipo: "cognitivo",
      categoria: t("north.foco.aprender"),
      emoji: "🧠",
      titulo,
      subtitulo: t(`cognitivo.area.${area}`),
      minutos: passoCognitivo.bloco.minutos || 20,
      descricao: passoCognitivo.motivo || t("north.foco.desc.aprender"),
      acao: "cognitivo",
      blocoId: passoCognitivo.bloco.id,
      habitoId: null,
    };
  }

  if (!habito?.nome) return null;
  const n = String(habito.nome).toLowerCase();

  if (/ingl[eê]s|aprend|estud|vocabul|livro|pratic|neuro/.test(n)) {
    return {
      tipo: "habito",
      categoria: t("north.foco.aprender"),
      emoji: "🧠",
      titulo: /ingl/i.test(n) ? t("north.foco.ingles") : habito.nome.replace(/\(\d+\s*min\)/i, "").trim(),
      subtitulo: t("north.foco.duracao", { n: parseMinutos(habito.nome) }),
      minutos: parseMinutos(habito.nome),
      descricao: t("north.foco.desc.aprender"),
      acao: "habito",
      habitoId: habito.id,
      virtual: Boolean(habito.virtual) || !habito.id,
    };
  }

  if (/academia|gym|treino|corrida|jiu/.test(n)) {
    return {
      tipo: "habito",
      categoria: t("north.foco.corpo"),
      emoji: "🏋",
      titulo: habito.nome.replace(/\(\d+\s*min\)/i, "").trim(),
      subtitulo: t("north.foco.duracao", { n: parseMinutos(habito.nome) || 60 }),
      minutos: parseMinutos(habito.nome) || 60,
      descricao: t("north.foco.desc.corpo"),
      acao: "habito",
      habitoId: habito.id,
      virtual: Boolean(habito.virtual) || !habito.id,
    };
  }

  return {
    tipo: "habito",
    categoria: t("north.foco.agora"),
    emoji: "◆",
    titulo: habito.nome.replace(/\(\d+\s*min\)/i, "").trim(),
    subtitulo: habito.horario || t("north.foco.duracao", { n: parseMinutos(habito.nome) }),
    minutos: parseMinutos(habito.nome),
    descricao: t("north.foco.desc.geral"),
    acao: "habito",
    habitoId: habito.id,
    virtual: Boolean(habito.virtual) || !habito.id,
  };
}

function htmlEstadoBarra(estadoAtual) {
  const opcoes = ESTADOS_GPS.map((id) => {
    const ativo = estadoAtual === id ? " north-estado-opcao--ativo" : "";
    const emoji = t(`north.estado.${id}.emoji`);
    return `
      <button type="button" class="north-estado-opcao north-estado-opcao--barra${ativo}" data-north-estado="${id}" aria-pressed="${estadoAtual === id}">
        <span class="north-estado-emoji" aria-hidden="true">${emoji}</span>
        <span class="north-estado-label">${esc(t(`north.estado.${id}`))}</span>
      </button>`;
  }).join("");

  return `
    <div class="north-estado-barra">
      <p class="north-estado-barra-rotulo">${esc(t("north.estado.trocar"))}</p>
      <div class="north-estado-grid north-estado-grid--barra" role="group" aria-label="${esc(t("north.estado.aria"))}">
        ${opcoes}
      </div>
    </div>`;
}

function htmlEstadoPicker(estadoAtual) {
  const opcoes = ESTADOS_GPS.map((id) => {
    const ativo = estadoAtual === id ? " north-estado-opcao--ativo" : "";
    const emoji = t(`north.estado.${id}.emoji`);
    return `
      <button type="button" class="north-estado-opcao${ativo}" data-north-estado="${id}">
        <span class="north-estado-emoji" aria-hidden="true">${emoji}</span>
        <span class="north-estado-label">${esc(t(`north.estado.${id}`))}</span>
      </button>`;
  }).join("");

  return `
    <div class="north-home north-home--estado" data-north-fase="estado">
      <p class="north-hora">${esc(horaAtual())}</p>
      <h2 class="north-pergunta">${esc(t("north.pergunta"))}</h2>
      <div class="north-estado-grid" role="group" aria-label="${esc(t("north.estado.aria"))}">
        ${opcoes}
      </div>
      <p class="north-tagline">${esc(t("north.slogan"))}</p>
    </div>`;
}

function htmlDirecao({ estado, passo, depois, timerAtivo, timerTexto, concluido = false, caminho = null }) {
  const gps = normalizarEstadoGps(estado);
  const estadoBar = htmlEstadoBarra(gps);
  const caminhoHtml = caminho ? htmlCaminhoNorth(caminho) : "";

  if (concluido) {
    return `
      <div class="north-home north-home--feito" data-north-fase="feito" data-north-estado-atual="${esc(gps)}">
        ${estadoBar}
        <h2 class="north-feito-titulo">${esc(t("north.feito"))}</h2>
        <p class="north-feito-apoio">${esc(t("north.feito.apoio"))}</p>
        <p class="north-feito-proximo">${esc(t("north.feito.proximo"))}</p>
        <button type="button" class="north-cta north-cta--primario" data-north-continuar>${esc(t("north.continuar"))}</button>
        <button type="button" class="north-cta north-cta--secundario" data-north-encerrar>${esc(t("north.encerrar"))}</button>
      </div>`;
  }

  if (!passo) {
    return `
      <div class="north-home north-home--livre" data-north-fase="livre" data-north-estado-atual="${esc(gps)}">
        ${estadoBar}
        ${caminhoHtml}
        <p class="north-hora">${esc(horaAtual())}</p>
        <p class="north-transicao">${esc(t("north.transicao"))}</p>
        <p class="north-livre">${esc(t("north.livre"))}</p>
      </div>`;
  }

  const depoisHtml =
    gps !== "sobrecarregado" && depois
      ? `<p class="north-depois"><span class="north-depois-rotulo">${esc(t("north.depois"))}</span> ${esc(depois.nome?.replace(/\(\d+\s*min\)/i, "").trim() || depois.nome)}</p>`
      : "";

  const timerHtml =
    timerAtivo && timerTexto
      ? `<p class="north-timer-ativo" role="status">${esc(timerTexto)} · <button type="button" class="north-link" data-mindos-parar>${esc(t("agora.parar"))}</button></p>`
      : "";

  const dataComecar =
    passo.acao === "cognitivo"
      ? `data-north-comecar="cognitivo:${passo.blocoId}"`
      : `data-north-comecar="${passo.virtual ? "virtual" : passo.habitoId}" data-north-minutos="${passo.minutos}"`;

  return `
    <div class="north-home north-home--direcao" data-north-fase="direcao" data-north-estado-atual="${esc(gps)}">
      ${estadoBar}
      ${caminhoHtml}
      <p class="north-hora">${esc(horaAtual())}</p>
      <p class="north-transicao">${esc(t("north.transicao"))}</p>
      <p class="north-foco-rotulo">${esc(t("north.foco.rotulo"))}</p>
      <div class="north-foco-card">
        <div class="north-foco-icone" aria-hidden="true">${passo.emoji}</div>
        <p class="north-foco-categoria">${esc(passo.categoria)}</p>
        <h3 class="north-foco-titulo">${esc(passo.titulo)}</h3>
        <p class="north-foco-meta">${esc(passo.subtitulo)}</p>
        <p class="north-foco-desc">${esc(passo.descricao)}</p>
      </div>
      ${timerHtml}
      <button type="button" class="north-cta north-cta--primario" ${dataComecar}>${esc(t("north.comecar"))}</button>
      ${depoisHtml}
    </div>`;
}

export function htmlNorthHome({
  estadoMental = "",
  foco,
  depois,
  passoCognitivo,
  timerAtivo,
  timerTexto,
  concluido = false,
  priorizarCognitivo = true,
  caminho = null,
}) {
  const estado = normalizarEstadoGps(estadoMental);

  if (!estado) return htmlEstadoPicker("");

  const passo = classificarPasso(
    foco?.habito,
    priorizarCognitivo && ["focado", "bem", "normal"].includes(estado) ? passoCognitivo : null
  ) || classificarPasso(foco?.habito, null);

  return htmlDirecao({
    estado,
    passo,
    depois: estado === "sobrecarregado" ? null : depois,
    timerAtivo,
    timerTexto,
    concluido,
    caminho,
  });
}

export function htmlNorthFocus({ titulo, timerTexto, pausado = false }) {
  return `
    <div class="north-focus-inner">
      <p class="north-focus-kicker">${esc(t("north.foco.modo"))}</p>
      <h2 class="north-focus-titulo">${esc(titulo || t("north.foco.modo"))}</h2>
      <p class="north-focus-timer" id="north-focus-timer" role="timer">${esc(timerTexto || "25:00")}</p>
      <div class="north-focus-bar" aria-hidden="true"><span class="north-focus-bar-fill"></span></div>
      <button type="button" class="north-cta north-cta--primario" data-north-focus-finalizar>${esc(t("north.finalizar"))}</button>
      <button type="button" class="north-link" data-north-focus-pausar>${esc(pausado ? t("north.retomar") : t("north.pausar"))}</button>
    </div>`;
}

export function htmlMemoriaHub() {
  const itens = [
    { painel: "estudo", emoji: "🧠", titulo: "north.memoria.conhecimento", apoio: "north.memoria.conhecimento.apoio" },
    { painel: "diario", emoji: "✎", titulo: "north.memoria.diario", apoio: "north.memoria.diario.apoio" },
    { painel: "semana", emoji: "→", titulo: "north.memoria.direcao", apoio: "north.memoria.direcao.apoio" },
    { painel: "insights", emoji: "◐", titulo: "north.memoria.continuidade", apoio: "north.memoria.continuidade.apoio" },
    { painel: "emocional", emoji: "❤", titulo: "north.memoria.emocional", apoio: "north.memoria.emocional.apoio" },
    { painel: "rotina", emoji: "◎", titulo: "north.memoria.cultivos", apoio: "north.memoria.cultivos.apoio" },
  ];

  const cards = itens
    .map(
      (item) => `
    <button type="button" class="north-memoria-card" data-memoria-painel="${item.painel}">
      <span class="north-memoria-emoji" aria-hidden="true">${item.emoji}</span>
      <span class="north-memoria-textos">
        <span class="north-memoria-titulo">${esc(t(item.titulo))}</span>
        <span class="north-memoria-apoio">${esc(t(item.apoio))}</span>
      </span>
    </button>`
    )
    .join("");

  return `
    <div class="north-memoria">
      <p class="north-memoria-rotulo">${esc(t("north.memoria.titulo"))}</p>
      <p class="north-memoria-apoio-principal">${esc(t("north.memoria.apoio"))}</p>
      <div class="north-memoria-grid">${cards}</div>
    </div>`;
}

export { classificarPasso, parseMinutos };
