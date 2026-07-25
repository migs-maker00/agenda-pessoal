/** Vercel — resumo inteligente do diário (não substitui o texto). */

const { criarHandlerApi } = require("./ia-shared");

function montarPrompt(corpo) {
  const texto = String(corpo.texto || "").slice(0, 4000);
  const revisao = corpo.revisao || {};
  return `Você é uma assistente empática para Erica, 16 anos, com TDAH.
Ela escreveu no diário. NÃO reescreva o texto — só organize em bullets.

Texto do diário:
"""
${texto}
"""

Revisão da noite (se houver):
- Feito: ${revisao.feito || "(vazio)"}
- Ficou na cabeça: ${revisao.ficou || "(vazio)"}
- Amanhã: ${revisao.amanha || "(vazio)"}

Responda APENAS JSON:
{
  "feito": ["até 3 bullets do que vale celebrar"],
  "pesou": ["até 2 bullets do que pesou ou ficou na cabeça"],
  "amanha": "1 frase sugerida para amanhã (baseada no que ela escreveu)",
  "fraseApoio": "1 frase curta e acolhedora"
}`;
}

function normalizar(raw) {
  return {
    feito: Array.isArray(raw.feito) ? raw.feito.map(String).slice(0, 4) : [],
    pesou: Array.isArray(raw.pesou) ? raw.pesou.map(String).slice(0, 3) : [],
    amanha: String(raw.amanha || "").slice(0, 200),
    fraseApoio: String(raw.fraseApoio || "Você escreveu — isso já é um passo.").slice(0, 200),
    provedor: raw.provedor,
  };
}

module.exports = criarHandlerApi({
  servico: "diario-resumo",
  montarPrompt,
  normalizar: (raw, _corpo, provedor) => ({ ...normalizar(raw), provedor }),
  validar: (corpo) => {
    if (String(corpo.texto || "").trim().length < 20) {
      return "Escreva um pouco mais no diário antes de pedir o resumo.";
    }
    return null;
  },
});
