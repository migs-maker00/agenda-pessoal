/** Clientes IA — diário, semana, genérico (backend Vercel). */

import { iaVercelConfigurada, sondarIaVercel, urlApiVercel } from "../config.js";
import { locale } from "./i18n.js";

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
    if (!res.ok) return { ok: false, erro: dados.erro || "IA indisponível." };
    return { ok: true, ...dados };
  } catch {
    return { ok: false, erro: "Sem conexão." };
  }
}

export function resumoDiarioLocal(texto, revisao = {}) {
  const linhas = String(texto || "")
    .split(/[.!?\n]+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 8);
  return {
    ok: true,
    feito: linhas.slice(0, 2),
    pesou: revisao.ficou ? [revisao.ficou.slice(0, 100)] : [],
    amanha: revisao.amanha || (linhas[linhas.length - 1] || "").slice(0, 100),
    fraseApoio: "Você registrou o dia — isso já organiza a cabeça.",
    fonte: "local",
  };
}

export async function pedirResumoDiario(texto, revisao) {
  const resp = await postApi("/api/diario-resumo", { texto, revisao });
  if (resp.ok) return { ...resp, fonte: "ia" };
  return resumoDiarioLocal(texto, revisao);
}

export function planoSemanaLocal(stats) {
  const linhas = [];
  if (stats.streak > 0) linhas.push(`${stats.streak} dias seguidos — mantenha leve.`);
  if (stats.feitosSemana != null) {
    linhas.push(`${stats.feitosSemana} hábitos feitos esta semana.`);
  }
  linhas.push("Escolha 1–3 prioridades por dia, não mais.");
  linhas.push("Use Agora quando travar — só 2 opções.");
  return {
    ok: true,
    titulo: "Plano da semana",
    linhas: linhas.slice(0, 5),
    focoPrincipal: stats.prioridades?.[0] ? "Suas estrelas de hoje" : "Um hábito essencial",
    fraseMotivacao: "Semana não precisa ser perfeita — precisa ser sua.",
    fonte: "local",
  };
}

export async function pedirPlanoSemana(stats, padroes) {
  const resp = await postApi("/api/semana-agente", { stats, padroes });
  if (resp.ok) return { ...resp, fonte: "ia" };
  return planoSemanaLocal(stats);
}
