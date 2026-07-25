/** Avalia explicações do usuário (modo aprender explicando). */

import { normalizarTexto } from "./habitos.js";

const CHAVE = "neuro-explicacoes-v1";

function carregarMapa() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE) || "{}");
  } catch {
    return {};
  }
}

function salvarMapa(mapa) {
  localStorage.setItem(CHAVE, JSON.stringify(mapa));
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
