/** Semana North — direção, não dashboard. */

import { t } from "./i18n.js";
import { carregarTemaSemana } from "./tdah.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

export function htmlMindosSemana({ tema, feitosSemana, totalPossivel, focoNome, cognitivoResumo = null }) {
  const direcao = (tema || carregarTemaSemana() || t("mindos.semana.tema.placeholder")).trim();
  const progresso =
    totalPossivel > 0
      ? t("mindos.semana.progresso", { feitos: feitosSemana, total: totalPossivel })
      : "";

  const focoHtml = focoNome
    ? `<p class="mindos-sec-foco">
        <span class="mindos-sec-foco-rotulo">${esc(t("mindos.semana.foco"))}</span>
        ${esc(focoNome)}
      </p>`
    : "";

  let cognitivoHtml = "";
  if (cognitivoResumo) {
    const partes = [];
    if (cognitivoResumo.melhorArea && cognitivoResumo.melhorTaxa >= 70) {
      partes.push(t("cognitivo.semana.melhorou", { area: cognitivoResumo.melhorArea }));
    }
    if (cognitivoResumo.piorArea && cognitivoResumo.piorTaxa < 50) {
      partes.push(t("cognitivo.semana.travando", { area: cognitivoResumo.piorArea }));
    }
    if (cognitivoResumo.direcao) {
      partes.push(
        `<span class="mindos-sec-foco-rotulo">${esc(t("cognitivo.semana.direcao"))}</span> ${esc(cognitivoResumo.direcao)}`
      );
    }
    if (partes.length) {
      cognitivoHtml = `<p class="mindos-sec-meta">${partes.join(" · ")}</p>`;
    }
  }

  return `
    <p class="mindos-sec-rotulo">${esc(t("mindos.semana.titulo"))}</p>
    <p class="mindos-sec-direcao">${esc(direcao)}</p>
    ${progresso ? `<p class="mindos-sec-meta">${esc(progresso)}</p>` : ""}
    ${focoHtml}
    ${cognitivoHtml}
    <p class="mindos-sec-rodape">${esc(t("mindos.semana.rodape"))}</p>`;
}
