/** Vercel — agente de semana (plano leve em 5 linhas). */

const { criarHandlerApi } = require("./ia-shared");

function montarPrompt(corpo) {
  const stats = corpo.stats || {};
  const padroes = (corpo.padroes || []).slice(0, 8);
  return `Você é uma coach de produtividade para Erica, 16 anos, com TDAH.

Estatísticas da semana:
- Feitos: ${stats.feitosSemana ?? "?"}/${stats.totalPossivel ?? "?"}
- Taxa 30 dias: ${stats.taxa30 ?? "?"}%
- Sequência global: ${stats.streak ?? 0} dias
- Prioridades da semana: ${(stats.prioridades || []).join(", ") || "nenhuma"}

Padrões detectados:
${padroes.map((p) => `- ${p.nome}: horário médio ${p.horarioMedio || "?"}, ignorou lembretes ${p.ignorados || 0}x`).join("\n") || "(ainda aprendendo)"}

Monte um plano da SEMANA em no máximo 5 linhas curtas. Sem lista gigante. Tom acolhedor.

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
