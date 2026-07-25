/** Cliente — feedback da trilha Neuro via API Vercel + Gemini. */

import { NEURO_IA_API_URL, hostAtual } from "../config.js";

export function urlApiNeuro() {
  const base = String(NEURO_IA_API_URL || "").trim();
  if (!base) return "";
  if (base.startsWith("http://") || base.startsWith("https://")) return base;
  if (typeof location !== "undefined") {
    return new URL(base, location.origin).href;
  }
  return base;
}

/** IA só no Vercel (mesma origem). GitHub Pages usa fallback local. */
export function iaNeuroDisponivel() {
  return hostAtual() === "vercel" && Boolean(urlApiNeuro());
}

export async function pedirFeedbackIaNeuro(modulo, explicacao) {
  const url = urlApiNeuro();
  if (!iaNeuroDisponivel() || !url) {
    return { ok: false, erro: "IA disponível no app Vercel." };
  }

  try {
    const resposta = await fetch(url, {
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
