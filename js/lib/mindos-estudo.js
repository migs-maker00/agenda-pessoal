/** Estudo MindOS — um passo de conhecimento, ferramentas recolhidas. */

import { resumoSessao } from "./estudo-hub.js";
import { livroAtivo, META_PERGUNTAS_DIA } from "./livros-pratica.js";
import { t } from "./i18n.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

const PASSO_EMOJI = {
  assistir: "▶",
  ouvir: "🎧",
  praticar: "📖",
  falar: "🗣️",
  neuro: "🧠",
};

export function proximoPassoEstudo(dados, metaPratica = META_PERGUNTAS_DIA) {
  const resumo = resumoSessao(dados, metaPratica);
  const pendente = resumo.passos.find((p) => !p.ok);
  return pendente ? { passo: pendente, resumo } : { passo: null, resumo };
}

export function htmlMindosEstudo(dados) {
  const livro = livroAtivo();
  const { passo, resumo } = proximoPassoEstudo(dados);
  const progresso = t("mindos.estudo.progresso", { feitos: resumo.feitos, total: resumo.total });
  const livroHtml = livro?.titulo
    ? `<p class="mindos-sec-meta">${esc(livro.titulo)}</p>`
    : "";

  if (!passo) {
    return `
      <p class="mindos-sec-rotulo">${esc(t("mindos.estudo.titulo"))}</p>
      ${livroHtml}
      <p class="mindos-sec-direcao">${esc(t("mindos.estudo.concluido"))}</p>
      <p class="mindos-sec-meta">${esc(progresso)}</p>
      <p class="mindos-sec-rodape">${esc(t("mindos.estudo.rodape"))}</p>`;
  }

  const emoji = PASSO_EMOJI[passo.id] || "◆";
  const rotulo = t(`mindos.estudo.passo.${passo.id}`);

  return `
    <p class="mindos-sec-rotulo">${esc(t("mindos.estudo.titulo"))}</p>
    ${livroHtml}
    <p class="mindos-sec-apoio">${esc(t("mindos.estudo.proximo"))}</p>
    <div class="mindos-foco-card mindos-estudo-passo">
      <div class="mindos-foco-corpo">
        <span class="mindos-foco-emoji" aria-hidden="true">${emoji}</span>
        <div class="mindos-foco-textos">
          <p class="mindos-foco-nome">${esc(rotulo)}</p>
        </div>
      </div>
      <button type="button" class="botao-primario mindos-estudo-continuar" data-mindos-estudo-aba="${esc(passo.id)}">
        ${esc(t("mindos.estudo.continuar"))}
      </button>
    </div>
    <p class="mindos-sec-meta">${esc(progresso)}</p>
    <p class="mindos-sec-rodape">${esc(t("mindos.estudo.rodape"))}</p>`;
}
