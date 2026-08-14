/** Tela principal North — um foco, depois disso, alívio. */

import { detectarHabitoAprender } from "./aprender.js";
import { faixaDoDia, habitoFazSentidoAgora } from "./contexto-tempo.js";
import { t } from "./i18n.js";
import { configUIEstado, ESTADOS_MENTAIS } from "./mindos-estado.js";
import { carregarPerfil, hhmmParaMinutos, minutosAgora } from "./perfil.js";
import { nomeUsuarioPerfil } from "./north.js";
import { sugestaoAgora } from "./tdah.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function emojiHabito(habito) {
  const n = String(habito?.nome || "").toLowerCase();
  if (/academia|gym|treino|jiu|corrida|caminh/.test(n)) return "🏋";
  if (/ingl[eê]s|aprend|estud|vocabul|livro|pratic/.test(n)) return "📖";
  if (/água|agua|hidr/.test(n)) return "💧";
  if (/medit|sil[eê]ncio|respir/.test(n)) return "🧘";
  if (/dormir|sono|telas|descans/.test(n)) return "🌙";
  if (/organizar|cheg/.test(n)) return "🏠";
  if (/di[aá]rio|nota/.test(n)) return "✎";
  return "◆";
}

function saudacaoPeriodo() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return t("mindos.saudacao.manha");
  if (h >= 12 && h < 18) return t("mindos.saudacao.tarde");
  return t("mindos.saudacao.noite");
}

/** Duração estimada entre dormir e acordar (rotina). */
export function duracaoSonoProgramada(perfil) {
  const dormir = hhmmParaMinutos(perfil.dormir || "23:30");
  let acordar = hhmmParaMinutos(perfil.acordar || "06:00");
  if (acordar <= dormir) acordar += 24 * 60;
  const total = acordar - dormir;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return { h, m, texto: m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h` };
}

function rotuloDuracao(habito) {
  const n = String(habito?.nome || "");
  const match = n.match(/(\d+)\s*min/i);
  if (match) return t("mindos.duracao.min", { n: match[1] });
  if (habito?.horario) return habito.horario;
  return "";
}

export function obterDepois(habitos, focoResultado, opts) {
  if (!focoResultado?.habito) return null;

  const faixa = faixaDoDia();
  const pendentes = habitos
    .filter((h) => opts.estaPendente(h))
    .filter((h) => habitoFazSentidoAgora(h, faixa))
    .filter((h) => !focoResultado.virtual && String(h.id) !== String(focoResultado.habito.id));

  const ordenados = opts.ordenarPorHorario(pendentes);
  let depois = ordenados[0] || null;

  if (!depois && pendentes.length) {
    depois = pendentes.find((h) => String(h.id) !== String(focoResultado.habito.id)) || null;
  }

  if (!depois) {
    const estudo = pendentes.find(detectarHabitoAprender);
    if (estudo && String(estudo.id) !== String(focoResultado.habito.id)) depois = estudo;
  }

  return depois;
}

/** @deprecated use obterDepois */
export function obterFocoEDepois(habitos, chave, opts) {
  const foco = sugestaoAgora(habitos, chave, opts);
  const depois = obterDepois(habitos, foco, opts);
  return { foco, depois };
}

function htmlEstadoMental(estadoAtual, ui) {
  if (!ui.showEstadoChips) {
    return `
      <p class="mindos-estado-recuperar">
        <button type="button" class="botao-texto mindos-estado-recuperar-btn" data-mindos-estado="organizado">
          ${esc(t("mindos.estado.melhor"))}
        </button>
      </p>`;
  }

  const chips = ESTADOS_MENTAIS.map((id) => {
    const ativo = id === estadoAtual ? " ativo" : "";
    return `<button type="button" class="mindos-estado-chip${ativo}" data-mindos-estado="${id}">${esc(t(`mindos.estado.${id}`))}</button>`;
  }).join("");

  return `
    <div class="mindos-estado" role="group" aria-label="${esc(t("mindos.estado.aria"))}">
      <p class="mindos-estado-pergunta">${esc(t("mindos.estado.pergunta"))}</p>
      <div class="mindos-estado-chips">${chips}</div>
    </div>`;
}

export function htmlMindosHoje({ foco, depois, perfil, timerAtivo, timerTexto, estadoMental = "", convite = "", cognitivo = null }) {
  const ui = configUIEstado(estadoMental);
  const nome = nomeUsuarioPerfil(perfil);
  const saudacao = saudacaoPeriodo();
  const titulo = t("mindos.ola.nome", { saudacao, nome: esc(nome) });
  const conviteHtml = convite?.texto
    ? convite.acao
      ? `<button type="button" class="mindos-convite botao-texto" data-north-convite="${esc(convite.acao)}">${esc(convite.texto)}</button>`
      : `<p class="mindos-convite">${esc(convite.texto)}</p>`
    : "";

  const sono = duracaoSonoProgramada(perfil);
  const agoraMin = minutosAgora();
  const acordou = agoraMin >= hhmmParaMinutos(perfil.acordar || "06:00");
  const sonoHtml =
    ui.showSono && acordou
      ? `<p class="mindos-sono">${esc(t("mindos.sono", { duracao: sono.texto }))}</p>`
      : "";

  const estadoHtml = htmlEstadoMental(estadoMental, ui);
  const rodape = esc(t(ui.rodapeKey));

  if (!foco?.habito) {
    return `
      <header class="mindos-cab">
        <p class="mindos-saudacao">${titulo}</p>
        ${conviteHtml}
        ${sonoHtml}
      </header>
      ${estadoHtml}
      <p class="mindos-livre">${esc(t("mindos.livre.tudo"))}</p>
      <p class="mindos-rodape">${rodape}</p>`;
  }

  const hab = foco.habito;
  const virtual = Boolean(foco.virtual) || !hab.id;
  const emoji = emojiHabito(hab);
  const horario =
    ui.showHorarioFoco && hab.horario
      ? `<span class="mindos-foco-hora">${esc(hab.horario)}</span>`
      : "";
  const timerBloco =
    timerAtivo && timerTexto
      ? `<div class="mindos-timer" role="status">
          <span class="mindos-timer-valor">${esc(timerTexto)}</span>
          <button type="button" class="botao-texto mindos-timer-parar" data-mindos-parar>${esc(t("agora.parar"))}</button>
        </div>`
      : "";

  const depoisHtml =
    ui.showDepois && depois
      ? `
      <section class="mindos-depois" aria-label="${esc(t("mindos.depois.titulo"))}">
        <p class="mindos-depois-rotulo">${esc(t("mindos.depois.titulo"))}</p>
        <div class="mindos-depois-card">
          <span class="mindos-depois-emoji">${emojiHabito(depois)}</span>
          <div class="mindos-depois-info">
            <p class="mindos-depois-nome">${esc(depois.nome)}</p>
            <p class="mindos-depois-meta">${esc(rotuloDuracao(depois))}</p>
          </div>
        </div>
      </section>`
      : "";

  const focoRotuloHtml = ui.showFocoRotulo
    ? `<p class="mindos-foco-rotulo">${esc(t("mindos.foco.rotulo"))}</p>`
    : "";

  const chegueiHtml = ui.showCheguei
    ? `<p class="mindos-cheguei">
        <button type="button" class="botao-texto mindos-link-cheguei">${esc(t("agora.link.cheguei"))}</button>
      </p>`
    : "";

  return `
    <header class="mindos-cab">
      <p class="mindos-saudacao">${titulo}</p>
      ${conviteHtml}
      ${sonoHtml}
    </header>
    ${estadoHtml}
    ${focoRotuloHtml}
    <section class="mindos-foco-card" aria-label="${esc(t("mindos.foco.rotulo"))}">
      <div class="mindos-foco-corpo">
        <span class="mindos-foco-emoji" aria-hidden="true">${emoji}</span>
        <div class="mindos-foco-textos">
          <p class="mindos-foco-nome">${esc(hab.nome)}</p>
          ${horario}
        </div>
      </div>
      ${timerBloco}
      <button type="button" class="botao-primario mindos-comecar" data-mindos-comecar="${virtual ? "virtual" : hab.id}">
        ${esc(t("mindos.comecar"))}
      </button>
    </section>
    ${depoisHtml}
    ${cognitivo || ""}
    <p class="mindos-rodape">${rodape}</p>
    ${chegueiHtml}`;
}
