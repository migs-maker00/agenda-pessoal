/** Cliente — feedback da trilha Neuro via API Vercel + Gemini. */

import { NEURO_IA_API_URL, hostAtual } from "../config.js";

let iaNeuroNoServidor = null;

export function urlApiNeuro() {
  const base = String(NEURO_IA_API_URL || "").trim();
  if (!base) return "";
  if (base.startsWith("http://") || base.startsWith("https://")) return base;
  if (typeof location !== "undefined") {
    return new URL(base, location.origin).href;
  }
  return base;
}

/** Sonda o servidor uma vez — evita prometer IA sem GROQ/Gemini configurado. */
export async function sondarIaNeuro() {
  if (hostAtual() !== "vercel" || !urlApiNeuro()) {
    iaNeuroNoServidor = false;
    return false;
  }
  try {
    const resposta = await fetch(urlApiNeuro());
    const dados = await resposta.json().catch(() => ({}));
    iaNeuroNoServidor = Boolean(dados.ia && dados.ia !== "nenhuma");
  } catch {
    iaNeuroNoServidor = false;
  }
  return iaNeuroNoServidor;
}

/** IA só no Vercel e com chave configurada no servidor. */
export function iaNeuroDisponivel() {
  return iaNeuroNoServidor === true;
}

export async function pedirFeedbackIaNeuro(modulo, explicacao) {
  const url = urlApiNeuro();
  const iaAtiva = iaNeuroNoServidor ?? (await sondarIaNeuro());
  if (!iaAtiva || !url) {
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
