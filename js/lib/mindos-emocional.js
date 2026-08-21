/** Emocional North — visão da trilha de habilidades emocionais (Memória). */

import { t } from "./i18n.js";
import { EIXOS, nivelEixo, proximaPraticaEmocional, resumoEmocional } from "./emocional-dados.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

export function htmlMindosEmocional(estado = "") {
  const resumo = resumoEmocional();
  const proxima = proximaPraticaEmocional(estado);

  const eixosHtml = EIXOS.map((eixo) => {
    const nivel = nivelEixo(eixo);
    return `
      <li class="mindos-emocional-eixo">
        <span class="mindos-emocional-eixo-nome">${esc(t(`emocional.eixo.${eixo}`))}</span>
        <span class="mindos-emocional-eixo-nivel">${esc(t("emocional.nivel", { n: nivel }))}</span>
      </li>`;
  }).join("");

  const proximaHtml = proxima
    ? `
      <div class="mindos-emocional-proxima">
        <p class="mindos-sec-rotulo">${esc(t("emocional.proxima"))}</p>
        <p class="mindos-emocional-pratica-titulo">${esc(t(`emocional.pratica.${proxima.id}.titulo`))}</p>
        <p class="mindos-emocional-pratica-texto">${esc(t(`emocional.pratica.${proxima.id}.texto`))}</p>
        <button
          type="button"
          class="north-cta north-cta--secundario"
          data-emocional-praticar
          data-emocional-eixo="${esc(proxima.eixo)}"
          data-emocional-id="${esc(proxima.id)}"
        >${esc(t("emocional.praticar", { n: proxima.minutos }))}</button>
      </div>`
    : "";

  return `
    <p class="mindos-sec-rotulo">${esc(t("emocional.titulo"))}</p>
    <p class="mindos-sec-apoio">${esc(t("emocional.apoio"))}</p>
    <ul class="mindos-emocional-eixos">${eixosHtml}</ul>
    ${proximaHtml}
    <p class="mindos-sec-rodape">${esc(t("emocional.rodape", { total: resumo.total }))}</p>`;
}

/** Card compacto para embutir no caminho (acolher/descansar). */
export function htmlPraticaEmocionalCard(pratica) {
  if (!pratica) return "";
  return `
    <div class="north-caminho-emocional-card">
      <p class="north-caminho-emocional-rotulo">${esc(t("north.caminho.emocional.rotulo"))}</p>
      <p class="north-caminho-emocional-titulo">${esc(t(`emocional.pratica.${pratica.id}.titulo`))}</p>
      <p class="north-caminho-emocional-texto">${esc(t(`emocional.pratica.${pratica.id}.texto`))}</p>
      <button
        type="button"
        class="north-cta north-cta--secundario"
        data-emocional-praticar
        data-emocional-eixo="${esc(pratica.eixo)}"
        data-emocional-id="${esc(pratica.id)}"
      >${esc(t("emocional.praticar", { n: pratica.minutos }))}</button>
    </div>`;
}
