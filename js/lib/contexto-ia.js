/** Cliente — sugestões contextuais via API Vercel (Groq). */

import { CONTEXTO_IA_API_URL, hostAtual } from "../config.js";
import { faixaDoDia } from "./contexto-tempo.js";

export function urlApiContexto() {
  const base = String(CONTEXTO_IA_API_URL || "").trim();
  if (!base) return "";
  if (base.startsWith("http")) return base;
  if (typeof location !== "undefined") return new URL(base, location.origin).href;
  return base;
}

export function contextoIaDisponivel() {
  return hostAtual() === "vercel" && Boolean(urlApiContexto());
}

const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export function montarPayloadContextoIa({ contexto, opcoes, perfil }) {
  const agora = new Date();
  const lista = [opcoes?.opcaoA, opcoes?.opcaoB]
    .filter(Boolean)
    .map((o) => ({
      id: o.id,
      titulo: o.titulo,
      passo: o.passo,
      tipo: o.tipo,
      habitoId: o.habitoId || null,
    }));

  return {
    contexto,
    faixa: opcoes?.faixa || faixaDoDia(agora),
    horaLocal: agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    diaSemana: DIAS[agora.getDay()],
    perfil: {
      acordar: perfil?.acordar || "",
      dormir: perfil?.dormir || "",
    },
    opcoes: lista,
  };
}

export function aplicarSugestaoIa(opcoesBase, resposta) {
  if (!opcoesBase || !resposta?.escolhidos?.length) return opcoesBase;

  const mapa = new Map();
  [opcoesBase.opcaoA, opcoesBase.opcaoB].filter(Boolean).forEach((o) => mapa.set(o.id, o));

  const escolhidos = resposta.escolhidos.map((id) => mapa.get(id)).filter(Boolean);
  if (!escolhidos.length) return opcoesBase;

  return {
    ...opcoesBase,
    intro: resposta.intro || opcoesBase.intro,
    opcaoA: escolhidos[0] || opcoesBase.opcaoA,
    opcaoB: escolhidos[1] || opcoesBase.opcaoB,
    ia: true,
  };
}

export async function pedirOpcoesContexto(payload) {
  const url = urlApiContexto();
  if (!contextoIaDisponivel() || !url) {
    return { ok: false, erro: "IA contextual só no app Vercel." };
  }

  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) {
      return { ok: false, erro: dados.erro || "IA indisponível." };
    }
    return { ok: true, ...dados };
  } catch {
    return { ok: false, erro: "Sem conexão com a IA." };
  }
}
