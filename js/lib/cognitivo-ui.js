/** UI do desenvolvimento cognitivo — integrado ao North. */

import {
  BLOCOS,
  AREAS,
  concluirBlocoCognitivo,
  iniciarBlocoCognitivo,
  registrarDesempenhoBloco,
  salvarRascunhoBloco,
  sessaoCognitivaCompleta,
} from "./cognitivo-dados.js";
import { t } from "./i18n.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function rotuloArea(id) {
  return t(`cognitivo.area.${id}`);
}

function rotuloBloco(id) {
  return t(`cognitivo.bloco.${id}`);
}

/** Card compacto para Agora. */
export function htmlCognitivoAgora(passo) {
  if (!passo || passo.tipo === "concluido") return "";
  const bloco = passo.bloco;
  const titulo = t("cognitivo.agora.titulo");
  const acao = t("cognitivo.agora.acao", {
    min: bloco.minutos,
    bloco: rotuloBloco(bloco.id),
  });
  const diff = t("cognitivo.agora.dificuldade", { n: passo.dificuldade });
  const motivo = passo.motivo ? `<p class="cognitivo-agora-motivo">${esc(passo.motivo)}</p>` : "";

  return `
    <section class="mindos-cognitivo-agora" aria-label="${esc(titulo)}">
      <p class="mindos-depois-rotulo">${esc(titulo)}</p>
      <div class="mindos-foco-card cognitivo-card-compacto">
        <div class="mindos-foco-corpo">
          <span class="mindos-foco-emoji" aria-hidden="true">🧠</span>
          <div class="mindos-foco-textos">
            <p class="mindos-foco-nome">${esc(acao)}</p>
            <p class="mindos-sec-meta">${esc(diff)}</p>
          </div>
        </div>
        ${motivo}
        <button type="button" class="botao-primario" data-cognitivo-comecar="${esc(bloco.id)}">
          ${esc(t("cognitivo.comecar"))}
        </button>
      </div>
    </section>`;
}

/** Hero na aba Conhecimento. */
export function htmlMindosCognitivo(passo, dados) {
  const progresso = t("cognitivo.progresso", {
    feitos: passo.blocosFeitos ?? 0,
    total: passo.total ?? BLOCOS.length,
  });
  const objetivo = dados.objetivo
    ? `<p class="mindos-sec-meta">${esc(t("cognitivo.objetivo"))}: ${esc(dados.objetivo)}</p>`
    : `<p class="mindos-sec-meta">${esc(t("cognitivo.objetivo.vazio"))}</p>`;

  if (passo.tipo === "concluido") {
    return `
      <p class="mindos-sec-rotulo">${esc(t("cognitivo.titulo"))}</p>
      ${objetivo}
      <p class="mindos-sec-direcao">${esc(t("cognitivo.concluido"))}</p>
      <p class="mindos-sec-meta">${esc(progresso)}</p>`;
  }

  const bloco = passo.bloco;
  const diff = t("cognitivo.dificuldade", { n: passo.dificuldade, nivel: passo.nivelNome });

  return `
    <p class="mindos-sec-rotulo">${esc(t("cognitivo.titulo"))}</p>
    ${objetivo}
    <p class="mindos-sec-apoio">${esc(t("cognitivo.proximo"))}</p>
    <div class="mindos-foco-card cognitivo-card-compacto">
      <div class="mindos-foco-corpo">
        <span class="mindos-foco-emoji" aria-hidden="true">🧠</span>
        <div class="mindos-foco-textos">
          <p class="mindos-foco-nome">${esc(rotuloBloco(bloco.id))} · ${bloco.minutos} min</p>
          <p class="mindos-sec-meta">${esc(diff)}</p>
        </div>
      </div>
      ${passo.motivo ? `<p class="cognitivo-motivo">${esc(passo.motivo)}</p>` : ""}
      <button type="button" class="botao-primario" data-cognitivo-comecar="${esc(bloco.id)}">
        ${esc(t("cognitivo.comecar"))}
      </button>
    </div>
    <p class="mindos-sec-meta">${esc(progresso)}</p>
    <details class="cognitivo-objetivo-form">
      <summary class="botao-texto">${esc(t("cognitivo.objetivo.ajustar"))}</summary>
      <form data-cognitivo-objetivo class="cognitivo-form-inline">
        <input type="text" name="objetivo" class="campo-opcao" maxlength="120" placeholder="${esc(t("cognitivo.objetivo.placeholder"))}" value="${esc(dados.objetivo || "")}" />
        <select name="area" class="campo-opcao">
          ${AREAS.map((a) => `<option value="${a}" ${dados.areaFoco === a ? "selected" : ""}>${esc(rotuloArea(a))}</option>`).join("")}
        </select>
        <button type="submit" class="botao-secundario">${esc(t("cognitivo.objetivo.salvar"))}</button>
      </form>
    </details>`;
}

/** Sessão ativa — bloco corrente. */
export function htmlCognitivoSessao(passo, dados) {
  if (!passo || passo.tipo !== "acao") return "";
  const id = passo.blocoId;
  const rascunho = dados.sessao?.rascunhos?.[id] || "";

  if (id === "raciocinio") return htmlBlocoRaciocinio(passo, rascunho);
  if (id === "aprendizagem") return htmlBlocoAprendizagem(passo, rascunho);
  if (id === "memoria") return htmlBlocoMemoria(passo, rascunho);
  if (id === "explicacao") return htmlBlocoExplicacao(passo, rascunho);
  if (id === "reflexao") return htmlBlocoReflexao(passo, rascunho);
  return "";
}

function htmlBlocoRaciocinio(passo, rascunho) {
  const problemas = passo.problemas || [];
  const cards = problemas
    .map(
      (p, i) => `
    <fieldset class="cognitivo-problema" data-cognitivo-problema="${i}">
      <legend>${esc(p.enunciado)}</legend>
      <div class="cognitivo-opcoes">
        ${p.opcoes
          .map(
            (o) =>
              `<label class="cognitivo-opcao"><input type="radio" name="prob-${i}" value="${esc(o)}" /> ${esc(o)}</label>`
          )
          .join("")}
      </div>
      <input type="hidden" data-resposta-correta="${esc(p.resposta)}" />
    </fieldset>`
    )
    .join("");

  return `
    <section class="cognitivo-bloco-ativo estudo-bloco">
      <h2 class="bloco-titulo">${esc(rotuloBloco("raciocinio"))}</h2>
      <p class="bloco-apoio">${esc(t("cognitivo.raciocinio.apoio"))}</p>
      ${passo.revisao ? `<p class="cognitivo-revisao-rapida">${esc(t("cognitivo.revisao.antes", { titulo: passo.revisao.titulo }))}</p>` : ""}
      <form data-cognitivo-bloco="raciocinio">${cards}
        <button type="submit" class="botao-primario">${esc(t("cognitivo.bloco.concluir"))}</button>
      </form>
    </section>`;
}

function htmlBlocoAprendizagem(passo, rascunho) {
  const c = passo.conceito || {};
  return `
    <section class="cognitivo-bloco-ativo estudo-bloco">
      <h2 class="bloco-titulo">${esc(rotuloBloco("aprendizagem"))}</h2>
      <p class="bloco-apoio">${esc(t("cognitivo.aprendizagem.apoio"))}</p>
      <div class="cognitivo-conceito-card">
        <p class="cognitivo-conceito-titulo">${esc(c.titulo || t("cognitivo.aprendizagem.livre"))}</p>
        <p class="cognitivo-conceito-resumo">${esc(c.resumo || "")}</p>
      </div>
      <label class="estudo-form-rotulo" for="cognitivo-aprend-notas">${esc(t("cognitivo.aprendizagem.notas"))}</label>
      <textarea id="cognitivo-aprend-notas" class="nota-campo" data-cognitivo-rascunho="aprendizagem" rows="4" placeholder="${esc(t("cognitivo.aprendizagem.placeholder"))}">${esc(rascunho)}</textarea>
      <button type="button" class="botao-primario" data-cognitivo-bloco-ok="aprendizagem">${esc(t("cognitivo.bloco.concluir"))}</button>
    </section>`;
}

function htmlBlocoMemoria(passo, rascunho) {
  const perguntas = passo.perguntas || [];
  const itens = perguntas
    .map(
      (p, i) => `
    <label class="estudo-form-rotulo" for="cognitivo-mem-${i}">${esc(p.pergunta)}</label>
    <textarea id="cognitivo-mem-${i}" class="nota-campo" data-cognitivo-memoria="${i}" rows="2" placeholder="${esc(t("cognitivo.memoria.placeholder"))}"></textarea>`
    )
    .join("");

  return `
    <section class="cognitivo-bloco-ativo estudo-bloco">
      <h2 class="bloco-titulo">${esc(rotuloBloco("memoria"))}</h2>
      <p class="bloco-apoio">${esc(t("cognitivo.memoria.apoio"))}</p>
      ${itens || `<textarea class="nota-campo" data-cognitivo-rascunho="memoria" rows="3">${esc(rascunho)}</textarea>`}
      <button type="button" class="botao-primario" data-cognitivo-bloco-ok="memoria">${esc(t("cognitivo.bloco.concluir"))}</button>
    </section>`;
}

function htmlBlocoExplicacao(passo, rascunho) {
  const prompt = passo.promptExplicacao || t("cognitivo.explicacao.prompt");
  return `
    <section class="cognitivo-bloco-ativo estudo-bloco">
      <h2 class="bloco-titulo">${esc(rotuloBloco("explicacao"))}</h2>
      <p class="bloco-apoio">${esc(t("cognitivo.explicacao.apoio", { tema: prompt }))}</p>
      <textarea class="nota-campo" data-cognitivo-rascunho="explicacao" rows="5" placeholder="${esc(t("cognitivo.explicacao.placeholder"))}">${esc(rascunho)}</textarea>
      <label class="estudo-form-rotulo" for="cognitivo-conhecimento-titulo">${esc(t("cognitivo.conhecimento.titulo"))}</label>
      <input id="cognitivo-conhecimento-titulo" type="text" class="campo-opcao" data-cognitivo-conhecimento-titulo maxlength="80" placeholder="${esc(t("cognitivo.conhecimento.titulo.placeholder"))}" />
      <button type="button" class="botao-primario" data-cognitivo-bloco-ok="explicacao">${esc(t("cognitivo.bloco.concluir"))}</button>
    </section>`;
}

function htmlBlocoReflexao(passo, rascunho) {
  const campos = ["aprendi", "errei", "nao_entendi", "proximo"];
  const fields = campos
    .map(
      (c) => `
    <label class="estudo-form-rotulo" for="cognitivo-ref-${c}">${esc(t(`cognitivo.reflexao.${c}`))}</label>
    <input id="cognitivo-ref-${c}" type="text" class="campo-opcao" data-cognitivo-reflexao="${c}" maxlength="200" />`
    )
    .join("");

  return `
    <section class="cognitivo-bloco-ativo estudo-bloco">
      <h2 class="bloco-titulo">${esc(rotuloBloco("reflexao"))}</h2>
      <p class="bloco-apoio">${esc(t("cognitivo.reflexao.apoio"))}</p>
      <form data-cognitivo-bloco="reflexao">${fields}
        <button type="submit" class="botao-primario">${esc(t("cognitivo.sessao.finalizar"))}</button>
      </form>
    </section>`;
}

/** Métricas simples — sem dashboard. */
export function htmlCognitivoMetricas(dados) {
  const m = dados.metricas || {};
  const taxa =
    m.total > 0 ? t("cognitivo.metrica.taxa", { n: Math.round((m.acertos / m.total) * 100) }) : "";
  const sessoes = t("cognitivo.metrica.sessoes", { n: m.sessoesConcluidas || 0 });
  const diff = t("cognitivo.metrica.dificuldade", { n: dados.dificuldade });
  return `
    <div class="cognitivo-metricas">
      <p class="mindos-sec-meta">${esc(sessoes)} · ${esc(diff)}${taxa ? ` · ${esc(taxa)}` : ""}</p>
    </div>`;
}

export function processarFormRaciocinio(form) {
  const fieldsets = form.querySelectorAll("[data-cognitivo-problema]");
  let acertos = 0;
  fieldsets.forEach((fs) => {
    const correto = fs.querySelector("[data-resposta-correta]")?.value;
    const sel = fs.querySelector('input[type="radio"]:checked')?.value;
    if (sel && sel === correto) acertos += 1;
  });
  return { acertos, total: fieldsets.length };
}

export {
  concluirBlocoCognitivo,
  iniciarBlocoCognitivo,
  registrarDesempenhoBloco,
  salvarRascunhoBloco,
  sessaoCognitivaCompleta,
};
