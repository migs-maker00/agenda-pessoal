/** Vercel — texto do caminho North (enriquece a regra local, não a substitui). */

const { criarHandlerApi, contextoSegundoCerebro, instrucaoIdioma, localeDoCorpo } = require("./ia-shared");

function montarPrompt(corpo) {
  const locale = localeDoCorpo(corpo);
  const ctx = contextoSegundoCerebro(corpo, locale);
  const estado = corpo.estado || "";
  const faixa = corpo.faixa || "";
  const tipo = corpo.tipo || "";
  const prioridades = Array.isArray(corpo.prioridades) ? corpo.prioridades.slice(0, 4).join(", ") : "";
  const aprende = corpo.resumoAprende || {};
  const emocional = corpo.resumoEmocional || {};
  const atuais = corpo.atual || {};

  const padroesDia = Object.entries(aprende.estadoTipicoPorDia || {})
    .map(([d, e]) => `${d}:${e}`)
    .join(", ");
  const conclusao = Object.entries(aprende.conclusaoPorCaminho || {})
    .slice(0, 6)
    .map(([k, v]) => `${k} ${Math.round((v.taxa || 0) * 100)}%`)
    .join("; ");

  if (locale === "en") {
    return `${ctx}

Rewrite THREE short strings for the path already decided locally.
Do NOT change the type. Do NOT add a list. Do NOT invent urgency or guilt.

State: ${estado || "(none)"}. Time band: ${faixa}. Path type: ${tipo}.
What they want to grow: ${prioridades || "(unset)"}.
Typical weekday states: ${padroesDia || "(still learning)"}.
Path completion: ${conclusao || "(still learning)"}.
Emotional practices so far: ${emocional.total || 0}.

Current local copy (keep the meaning, make it more personal and calmer):
- title: ${atuais.titulo || ""}
- message: ${atuais.mensagem || ""}
- invite: ${atuais.convite || ""}

${instrucaoIdioma("en")}

JSON:
{
  "titulo": "max 6 words",
  "mensagem": "one calm sentence",
  "convite": "one short next-step sentence"
}`;
  }

  return `${ctx}

Reescreva TRÊS textos curtos para o caminho que já foi decidido localmente.
NÃO mude o tipo. NÃO faça lista. NÃO invente urgência nem culpa.

Estado: ${estado || "(nenhum)"}. Faixa: ${faixa}. Tipo do caminho: ${tipo}.
O que quer cultivar: ${prioridades || "(não definido)"}.
Estados típicos por dia da semana: ${padroesDia || "(ainda aprendendo)"}.
Conclusão de caminhos: ${conclusao || "(ainda aprendendo)"}.
Práticas emocionais até agora: ${emocional.total || 0}.

Textos locais atuais (mantenha o sentido, deixe mais pessoal e calmo):
- título: ${atuais.titulo || ""}
- mensagem: ${atuais.mensagem || ""}
- convite: ${atuais.convite || ""}

${instrucaoIdioma("pt")}

JSON:
{
  "titulo": "no máximo 6 palavras",
  "mensagem": "uma frase calma",
  "convite": "uma frase curta de próximo passo"
}`;
}

function normalizar(raw) {
  return {
    titulo: String(raw.titulo || "").slice(0, 80),
    mensagem: String(raw.mensagem || "").slice(0, 240),
    convite: String(raw.convite || "").slice(0, 200),
  };
}

module.exports = criarHandlerApi({
  servico: "north-caminho",
  montarPrompt,
  normalizar: (raw, _corpo, provedor) => ({ ...normalizar(raw), provedor }),
  validar: (corpo) => {
    if (!corpo?.tipo) return "Envie o tipo do caminho.";
    return null;
  },
});
