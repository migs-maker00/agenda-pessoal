/** Vercel — agente de semana (plano leve em 5 linhas). */

const { criarHandlerApi, instrucaoIdioma, localeDoCorpo } = require("./ia-shared");

function montarPrompt(corpo) {
  const locale = localeDoCorpo(corpo);
  const stats = corpo.stats || {};
  const padroes = (corpo.padroes || []).slice(0, 8);
  const padroesTxt =
    padroes
      .map(
        (p) =>
          `- ${p.nome}: ${locale === "en" ? "avg time" : "horário médio"} ${p.horarioMedio || "?"}, ${locale === "en" ? "ignored reminders" : "ignorou lembretes"} ${p.ignorados || 0}x`
      )
      .join("\n") || (locale === "en" ? "(still learning)" : "(ainda aprendendo)");

  if (locale === "en") {
    return `You are a productivity coach for Erica, 16, with ADHD.

Week stats:
- Done: ${stats.feitosSemana ?? "?"}/${stats.totalPossivel ?? "?"}
- 30-day rate: ${stats.taxa30 ?? "?"}%
- Streak: ${stats.streak ?? 0} days
- Weekly priorities: ${(stats.prioridades || []).join(", ") || "none"}

Patterns:
${padroesTxt}

Build a WEEK plan in at most 5 short lines. No giant list. Warm tone.
${instrucaoIdioma("en")}

JSON:
{
  "titulo": "short week title",
  "linhas": ["line 1", "up to 5"],
  "focoPrincipal": "1 habit or theme to prioritize",
  "fraseMotivacao": "1 guilt-free sentence"
}`;
  }

  return `Você é uma coach de produtividade para Erica, 16 anos, com TDAH.

Estatísticas da semana:
- Feitos: ${stats.feitosSemana ?? "?"}/${stats.totalPossivel ?? "?"}
- Taxa 30 dias: ${stats.taxa30 ?? "?"}%
- Sequência global: ${stats.streak ?? 0} dias
- Prioridades da semana: ${(stats.prioridades || []).join(", ") || "nenhuma"}

Padrões detectados:
${padroesTxt}

Monte um plano da SEMANA em no máximo 5 linhas curtas. Sem lista gigante. Tom acolhedor.
${instrucaoIdioma("pt")}

JSON:
{
  "titulo": "título curto da semana",
  "linhas": ["linha 1", "linha 2", "até 5"],
  "focoPrincipal": "1 hábito ou tema para priorizar",
  "fraseMotivacao": "1 frase sem culpa"
}`;
}

function normalizar(raw) {
  return {
    titulo: String(raw.titulo || "Sua semana").slice(0, 80),
    linhas: Array.isArray(raw.linhas) ? raw.linhas.map(String).slice(0, 5) : [],
    focoPrincipal: String(raw.focoPrincipal || "").slice(0, 120),
    fraseMotivacao: String(raw.fraseMotivacao || "").slice(0, 200),
  };
}

module.exports = criarHandlerApi({
  servico: "semana-agente",
  montarPrompt,
  normalizar: (raw, _corpo, provedor) => ({ ...normalizar(raw), provedor }),
  validar: () => null,
});
