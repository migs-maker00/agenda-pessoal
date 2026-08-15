/** Cultivos North — o que você quer ser, não lista de horários. */

import { t } from "./i18n.js";
import { htmlCaminhoNorth } from "./north-caminho.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

export function htmlMindosRotina(caminho) {
  const caminhoHtml = htmlCaminhoNorth(caminho);

  return `
    ${caminhoHtml}
    <p class="mindos-sec-rodape">${esc(t("mindos.cultivos.rodape"))}</p>
    <details class="mindos-cultivos-mais">
      <summary>${esc(t("mindos.cultivos.mais"))}</summary>
      <p class="mindos-sec-apoio">${esc(t("mindos.cultivos.mais.apoio"))}</p>
    </details>`;
}
