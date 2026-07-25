/** Cliente — feedback da trilha Neuro via API Vercel + Gemini. */

import { NEURO_IA_API_URL } from "../config.js";

export function iaNeuroDisponivel() {
  return Boolean(String(NEURO_IA_API_URL || "").trim());
}

export async function pedirFeedbackIaNeuro(modulo, explicacao) {
  if (!iaNeuroDisponivel()) {
    return { ok: false, erro: "IA não configurada neste app." };
  }

  try {
    const resposta = await fetch(NEURO_IA_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moduloId: modulo.id,
        titulo: modulo.titulo,
        textoModulo: modulo.texto,
        pontosChave: modulo.pontosChave,
        explicacao,
      }),
    });

    const dados = await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
      return {
        ok: false,
        erro: dados.erro || "Não foi possível consultar a IA agora.",
      };
    }

    if (!dados.avaliacao) {
      return { ok: false, erro: "Resposta inválida da IA." };
    }

    return { ok: true, avaliacao: dados.avaliacao };
  } catch {
    return {
      ok: false,
      erro: "Sem conexão com a IA. Verifique a internet e tente de novo.",
    };
  }
}
