/** Avalia explicações do usuário (modo aprender explicando). */

import { normalizarTexto } from "./habitos.js";

export const CHAVE_NEURO_EXPLICACOES = "neuro-explicacoes-v1";

function carregarMapa() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_NEURO_EXPLICACOES) || "{}");
  } catch {
    return {};
  }
}

function salvarMapa(mapa) {
  localStorage.setItem(CHAVE_NEURO_EXPLICACOES, JSON.stringify(mapa));
}

function agendarSync() {
  if (window.syncEstaAplicandoRemoto?.()) return;
  if (typeof window.agendarSyncNuvem === "function") window.agendarSyncNuvem();
}

export function carregarExplicacoesNeuro() {
  return carregarMapa();
}

export function aplicarExplicacoesNeuro(mapa) {
  salvarMapa(mapa && typeof mapa === "object" ? mapa : {});
}

/** Mantém a versão mais recente de cada módulo/dia. */
export function mesclarExplicacoesNeuro(local = {}, remoto = {}) {
  const resultado = { ...(local && typeof local === "object" ? local : {}) };
  if (!remoto || typeof remoto !== "object") return resultado;

  for (const [chave, remotoItem] of Object.entries(remoto)) {
    if (!remotoItem || typeof remotoItem !== "object") continue;
    const localItem = resultado[chave];
    if (!localItem || typeof localItem !== "object") {
      resultado[chave] = remotoItem;
      continue;
    }

    const emLocal = Number(localItem.em) || 0;
    const emRemoto = Number(remotoItem.em) || 0;
    if (emRemoto > emLocal) {
      resultado[chave] = remotoItem;
      continue;
    }
    if (emRemoto < emLocal) continue;

    const lenLocal = String(localItem.texto ?? "").trim().length;
    const lenRemoto = String(remotoItem.texto ?? "").trim().length;
    if (lenRemoto > lenLocal) resultado[chave] = remotoItem;
  }

  return resultado;
}

export function explicacaoSalva(moduloId, chaveDia) {
  const mapa = carregarMapa();
  return mapa[`${chaveDia}::${moduloId}`] || null;
}

export function salvarExplicacao(moduloId, chaveDia, texto, avaliacao) {
  const mapa = carregarMapa();
  mapa[`${chaveDia}::${moduloId}`] = {
    texto,
    avaliacao,
    em: Date.now(),
  };
  salvarMapa(mapa);
  agendarSync();
}

export function modulosExplicadosNoDia(chaveDia) {
  const mapa = carregarMapa();
  return Object.keys(mapa).filter((k) => k.startsWith(`${chaveDia}::`)).length;
}

function textoContemTermo(texto, termo) {
  const t = normalizarTexto(termo);
  if (!t || t.length < 3) return false;
  return normalizarTexto(texto).includes(t);
}

/** Compara explicação do usuário com gabarito por palavras-chave. */
export function avaliarExplicacao(texto, modulo) {
  const limpo = String(texto ?? "").trim();
  if (limpo.length < 25) {
    return {
      ok: false,
      pct: 0,
      acertos: [],
      faltou: (modulo.gabarito || []).map((g) => g.rotulo),
      feedback: "Escreva um pouco mais — explique como se estivesse ensinando uma amiga.",
      curto: true,
    };
  }

  const acertos = [];
  const faltou = [];

  (modulo.gabarito || []).forEach((item) => {
    const achou = item.termos.some((termo) => textoContemTermo(limpo, termo));
    if (achou) acertos.push(item.rotulo);
    else faltou.push(item.rotulo);
  });

  const total = (modulo.gabarito || []).length || 1;
  const pct = Math.round((acertos.length / total) * 100);

  let feedback;
  if (pct >= 85) {
    feedback = "Excelente! Você explicou o essencial — ensinar fixa o conhecimento.";
  } else if (pct >= 55) {
    feedback = `Bom! Você pegou a ideia central. Releia o texto e tente incluir: ${faltou.slice(0, 2).join(" e ")}.`;
  } else {
    feedback = `Vale reler o módulo e explicar de novo. Tente mencionar: ${faltou.slice(0, 3).join(", ")}.`;
  }

  return { ok: pct >= 55, pct, acertos, faltou, feedback, curto: false };
}
