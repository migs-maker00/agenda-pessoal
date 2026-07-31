/** Cliente — feedback da trilha Neuro via API Vercel + Groq/Gemini. */

import {
  NEURO_IA_API_URL,
  iaVercelConfigurada,
  sondarIaVercel,
  urlApiVercel,
} from "../config.js";
import { locale } from "./i18n.js";
import { carregarPerfil } from "./perfil.js";

export function urlApiNeuro() {
  return urlApiVercel(NEURO_IA_API_URL);
}

/** Sonda o Vercel uma vez — evita prometer IA sem GROQ/Gemini configurado. */
export async function sondarIaNeuro() {
  return sondarIaVercel();
}

/** IA disponível quando o backend Vercel tem chave configurada. */
export function iaNeuroDisponivel() {
  return iaVercelConfigurada();
}

export async function pedirFeedbackIaNeuro(modulo, explicacao) {
  const url = urlApiNeuro();
  const iaAtiva = iaVercelConfigurada() || (await sondarIaNeuro());
  if (!iaAtiva || !url) {
    return { ok: false, erro: "IA indisponível — configure GROQ no Vercel." };
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
        locale: locale(),
        perfil: { nome: carregarPerfil().nome || "North" },
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
