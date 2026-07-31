/** Rotina MindOS — ritmo do dia, sem lista de produtividade. */

import { t } from "./i18n.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

export function htmlMindosRotina(itens) {
  if (!itens.length) {
    return `
      <p class="mindos-sec-rotulo">${esc(t("mindos.rotina.titulo"))}</p>
      <p class="mindos-sec-livre">${esc(t("mindos.rotina.vazio"))}</p>
      <p class="mindos-sec-rodape">${esc(t("mindos.rotina.rodape"))}</p>`;
  }

  const lista = itens
    .map(
      (item) => `
      <li class="mindos-sec-item">
        <span class="mindos-sec-hora">${esc(item.horario || "—")}</span>
        <span class="mindos-sec-nome">${esc(item.nome)}</span>
      </li>`
    )
    .join("");

  return `
    <p class="mindos-sec-rotulo">${esc(t("mindos.rotina.titulo"))}</p>
    <p class="mindos-sec-apoio">${esc(t("mindos.rotina.apoio"))}</p>
    <ul class="mindos-sec-lista">${lista}</ul>
    <p class="mindos-sec-rodape">${esc(t("mindos.rotina.rodape"))}</p>`;
}
