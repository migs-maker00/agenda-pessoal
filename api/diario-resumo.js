/** Vercel — resumo inteligente do diário (não substitui o texto). */

const { criarHandlerApi, contextoSegundoCerebro, instrucaoIdioma, localeDoCorpo } = require("./ia-shared");

function montarPrompt(corpo) {
  const locale = localeDoCorpo(corpo);
  const ctx = contextoSegundoCerebro(corpo, locale);
  const texto = String(corpo.texto || "").slice(0, 4000);
  const revisao = corpo.revisao || {};
  const lang = instrucaoIdioma(locale);
  if (locale === "en") {
    return `${ctx}
They wrote in their journal. Do NOT rewrite — only organize into bullets.
${lang}

Journal:
"""
${texto}
"""

Night review (if any):
- Done: ${revisao.feito || "(empty)"}
- On their mind: ${revisao.ficou || "(empty)"}
- Tomorrow: ${revisao.amanha || "(empty)"}

Respond ONLY JSON:
{
  "feito": ["up to 3 bullets to celebrate"],
  "pesou": ["up to 2 bullets of what weighed on them"],
  "amanha": "1 suggested sentence for tomorrow",
  "fraseApoio": "1 short encouraging sentence"
}`;
  }
  return `${ctx}
Escreveu no diário. NÃO reescreva o texto — só organize em bullets.

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
  "amanha": "1 frase sugerida para amanhã (baseada no que escreveu)",
  "fraseApoio": "1 frase curta e acolhedora"
}
${instrucaoIdioma("pt")}`;
}

function normalizar(raw) {
  return {
    feito: Array.isArray(raw.feito) ? raw.feito.map(String).slice(0, 4) : [],
    pesou: Array.isArray(raw.pesou) ? raw.pesou.map(String).slice(0, 3) : [],
    amanha: String(raw.amanha || "").slice(0, 200),
    fraseApoio: String(raw.fraseApoio || "Você escreveu — isso já é um passo.").slice(0, 200),
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
