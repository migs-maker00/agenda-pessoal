/** Cliente — sugestões contextuais via API Vercel (Groq). */

import {
  CONTEXTO_IA_API_URL,
  iaVercelConfigurada,
  sondarIaVercel,
  urlApiVercel,
} from "../config.js";
import { faixaDoDia } from "./contexto-tempo.js";
import { locale, localeTag } from "./i18n.js";

export function urlApiContexto() {
  return urlApiVercel(CONTEXTO_IA_API_URL);
}

export function contextoIaDisponivel() {
  return iaVercelConfigurada();
}

const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export function montarPayloadContextoIa({ contexto, opcoes, perfil, fala = "" }) {
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
    locale: locale(),
    fala: String(fala || opcoes?.fala || "").slice(0, 300),
    faixa: opcoes?.faixa || faixaDoDia(agora),
    horaLocal: agora.toLocaleTimeString(localeTag(), { hour: "2-digit", minute: "2-digit" }),
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
  const iaAtiva = iaVercelConfigurada() || (await sondarIaVercel());
  if (!iaAtiva || !url) {
    return { ok: false, erro: "IA indisponível — configure GROQ no Vercel." };
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
