/** Clientes IA — diário, semana, genérico (backend Vercel). */

import { iaVercelConfigurada, sondarIaVercel, urlApiVercel } from "../config.js";
import { locale } from "./i18n.js";
import { carregarPerfil } from "./perfil.js";
import { nomeUsuarioPerfil } from "./north.js";

function perfilIa() {
  const p = carregarPerfil();
  return { nome: nomeUsuarioPerfil(p) };
}

export function iaDisponivel() {
  return iaVercelConfigurada();
}

async function postApi(path, payload) {
  const iaAtiva = iaVercelConfigurada() || (await sondarIaVercel());
  if (!iaAtiva) return { ok: false, erro: "IA indisponível — configure GROQ no Vercel." };
  try {
    const res = await fetch(urlApiVercel(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, locale: locale() }),
    });
    const dados = await res.json().catch(() => ({}));
    if (!res.ok || dados.ok === false) {
      return { ok: false, erro: dados.erro || "IA indisponível." };
    }
    return { ok: true, ...dados, fonte: "ia" };
  } catch {
    return { ok: false, erro: "Sem conexão com a IA." };
  }
}

export async function pedirResumoDiario(texto, revisao) {
  return postApi("/api/diario-resumo", { texto, revisao, perfil: perfilIa() });
}

export async function pedirPlanoSemana(stats, padroes) {
  return postApi("/api/semana-agente", { stats, padroes, perfil: perfilIa() });
}

export async function pedirCaminhoNorth(payload) {
  return postApi("/api/north-caminho", { ...payload, perfil: perfilIa() });
}
