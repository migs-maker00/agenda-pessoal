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
They wrote in their journal. Do NOT rewrite — only organize lightly.
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
  "feito": ["up to 2 short bullets worth keeping"],
  "pesou": ["up to 1 short bullet if something weighed — or empty array"],
  "amanha": "ONE calm next-step sentence for tomorrow (or empty)",
  "fraseApoio": "ONE short calm sentence — no pep talk"
}`;
  }

  return `${ctx}
Escreveu no diário. NÃO reescreva — só organize de leve.
${lang}

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
  "feito": ["até 2 bullets curtos do que vale guardar"],
  "pesou": ["até 1 bullet se algo pesou — ou array vazio"],
  "amanha": "UMA frase calma de próximo passo para amanhã (ou vazia)",
  "fraseApoio": "UMA frase curta e calma — sem discurso motivacional"
}`;
}

function normalizar(raw) {
  return {
    feito: Array.isArray(raw.feito) ? raw.feito.map(String).slice(0, 2) : [],
    pesou: Array.isArray(raw.pesou) ? raw.pesou.map(String).slice(0, 1) : [],
    amanha: String(raw.amanha || "").slice(0, 160),
    fraseApoio: String(raw.fraseApoio || "Escrito. Já está fora da cabeça.").slice(0, 120),
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
