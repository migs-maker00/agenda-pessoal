/** Vercel — direção da semana (leve, um foco). */

const { criarHandlerApi, contextoSegundoCerebro, instrucaoIdioma, localeDoCorpo } = require("./ia-shared");

function montarPrompt(corpo) {
  const locale = localeDoCorpo(corpo);
  const ctx = contextoSegundoCerebro(corpo, locale);
  const stats = corpo.stats || {};
  const padroes = (corpo.padroes || []).slice(0, 8);
  const padroesTxt =
    padroes
      .map(
        (p) =>
          `- ${p.nome}: ${locale === "en" ? "usual time" : "horário habitual"} ${p.horarioMedio || "?"}, ${locale === "en" ? "skipped nudges" : "avisos ignorados"} ${p.ignorados || 0}x`
      )
      .join("\n") || (locale === "en" ? "(still learning)" : "(ainda aprendendo)");

  if (locale === "en") {
    return `${ctx}

Week context (use lightly — do NOT turn this into a scoreboard):
- Steps held: ${stats.feitosSemana ?? "?"}/${stats.totalPossivel ?? "?"}
- Continuity: ${stats.streak ?? 0} days returning
- What matters: ${(stats.prioridades || []).join(", ") || "none set"}

Patterns:
${padroesTxt}

Give WEEK DIRECTION — not a productivity plan. At most 3 short lines. One main focus.
${instrucaoIdioma("en")}

JSON:
{
  "titulo": "short week direction title",
  "linhas": ["up to 3 calm lines"],
  "focoPrincipal": "ONE next direction (rhythm/theme) — not a habit checklist",
  "fraseMotivacao": "ONE guilt-free sentence"
}`;
  }

  return `${ctx}

Contexto da semana (use de leve — NÃO transforme em placar):
- Passos mantidos: ${stats.feitosSemana ?? "?"}/${stats.totalPossivel ?? "?"}
- Continuidade: ${stats.streak ?? 0} dias voltando
- O que importa: ${(stats.prioridades || []).join(", ") || "nada definido"}

Padrões:
${padroesTxt}

Dê DIREÇÃO da semana — não plano de produtividade. No máximo 3 linhas curtas. Um foco só.
${instrucaoIdioma("pt")}

JSON:
{
  "titulo": "título curto de direção da semana",
  "linhas": ["até 3 linhas calmas"],
  "focoPrincipal": "UMA direção (ritmo/tema) — não checklist",
  "fraseMotivacao": "UMA frase sem culpa"
}`;
}

function normalizar(raw) {
  return {
    titulo: String(raw.titulo || "Direção da semana").slice(0, 80),
    linhas: Array.isArray(raw.linhas) ? raw.linhas.map(String).slice(0, 3) : [],
    focoPrincipal: String(raw.focoPrincipal || "").slice(0, 120),
    fraseMotivacao: String(raw.fraseMotivacao || "Um passo de cada vez.").slice(0, 160),
  };
}

module.exports = criarHandlerApi({
  servico: "semana-agente",
  montarPrompt,
  normalizar: (raw, _corpo, provedor) => ({ ...normalizar(raw), provedor }),
  validar: () => null,
});
