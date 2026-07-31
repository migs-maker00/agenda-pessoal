/** Insights MindOS — continuidade, não dashboard. */

import { t } from "./i18n.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

export function htmlMindosInsights({ mensagem, feitosSemana, streakRotulo }) {
  const meta =
    feitosSemana > 0
      ? t("mindos.insights.passos", { n: feitosSemana })
      : t("mindos.insights.sem.passos");

  return `
    <p class="mindos-sec-rotulo">${esc(t("mindos.insights.titulo"))}</p>
    <p class="mindos-sec-direcao">${esc(mensagem || t("mindos.insights.default"))}</p>
    <p class="mindos-sec-meta">${esc(streakRotulo)} · ${esc(meta)}</p>
    <p class="mindos-sec-rodape">${esc(t("mindos.insights.rodape"))}</p>`;
}
