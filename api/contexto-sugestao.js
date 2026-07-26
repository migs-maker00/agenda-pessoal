/** Vercel Serverless — sugestões contextuais Cheguei / Agora (Groq → Gemini). */

const ORIGENS_PADRAO = [
  "https://migs-maker00.github.io",
  "https://projeto-1-criar.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
];

const MODELOS_GEMINI = ["gemini-2.0-flash-lite", "gemini-1.5-flash", "gemini-2.0-flash"];

function origensPermitidas() {
  const extra = (process.env.ALLOWED_ORIGIN || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  return [...new Set([...ORIGENS_PADRAO, ...extra])];
}

function corsOrigin(origin) {
  const permitidas = origensPermitidas();
  if (origin && (permitidas.includes(origin) || /\.vercel\.app$/i.test(origin))) {
    return origin;
  }
  return permitidas[0];
}

function aplicarCors(res, origin) {
  res.setHeader("Access-Control-Allow-Origin", corsOrigin(origin));
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function parseJsonResposta(texto) {
  const limpo = String(texto || "").trim();
  const jsonMatch = limpo.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch ? jsonMatch[0] : limpo);
}

function montarPrompt(corpo) {
  const opcoes = (corpo.opcoes || [])
    .slice(0, 8)
    .map((o) => `- id="${o.id}" | ${o.titulo} — ${o.passo || ""}`)
    .join("\n");

  if (corpo.locale === "en") {
    return `You are a productivity assistant for Erica, 16, with ADHD.
She just said: "${corpo.contexto || "arrival"}".
${corpo.fala ? `By voice: "${String(corpo.fala).slice(0, 200)}"` : ""}
Time band: ${corpo.faixa || "?"}. Local time: ${corpo.horaLocal || "?"} (${corpo.diaSemana || "?"}).
Profile: wakes ${corpo.perfil?.acordar || "?"}, sleeps ${corpo.perfil?.dormir || "?"}.

RULES:
- Late night (00–05): NEVER suggest beach work, school or heavy tasks.
- Weekends she works at the beach only near scheduled morning time.
- Max 2 options — she picks one.
- Short, warm tone, no guilt.

Candidate options (pick exactly 2 ids, order A then B):
${opcoes || "(none)"}

Respond ONLY valid JSON:
{
  "intro": "1-2 personalized sentences",
  "escolhidos": ["id-option-A", "id-option-B"]
}
All strings in English.`;
  }

  return `Você é uma assistente de produtividade para Erica, 16 anos, com TDAH.
Ela acabou de dizer: "${corpo.contexto || "chegada"}".
${corpo.fala ? `Na voz ela disse: "${String(corpo.fala).slice(0, 200)}"` : ""}
Faixa do dia: ${corpo.faixa || "?"}. Hora local: ${corpo.horaLocal || "?"} (${corpo.diaSemana || "?"}).
Perfil: acorda ${corpo.perfil?.acordar || "?"}, dorme ${corpo.perfil?.dormir || "?"}.

REGRAS IMPORTANTES:
- Madrugada (00h–05h): NUNCA sugira trabalho na praia, escola ou tarefas pesadas.
- Sábado/domingo ela trabalha na praia, mas só perto do horário agendado (manhã).
- Máximo 2 opções — ela escolhe só uma.
- Tom curto, acolhedor, sem culpa.

Opções candidatas (escolha exatamente 2 ids da lista, na ordem A depois B):
${opcoes || "(nenhuma)"}

Responda APENAS JSON válido, sem markdown:
{
  "intro": "1-2 frases personalizadas para o momento",
  "escolhidos": ["id-opcao-A", "id-opcao-B"]
}`;
}

async function chamarGroq(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const modelo = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
  const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelo,
      temperature: 0.4,
      max_tokens: 400,
      messages: [
        { role: "system", content: "Responda só JSON válido em português do Brasil." },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!resposta.ok) {
    const err = new Error(`Groq ${resposta.status}`);
    err.status = resposta.status;
    throw err;
  }

  const dados = await resposta.json();
  const texto = dados?.choices?.[0]?.message?.content;
  if (!texto) throw new Error("Resposta vazia (Groq)");
  return parseJsonResposta(texto);
}

async function chamarGeminiModelo(apiKey, modelo, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`;
  const resposta = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
    }),
  });

  if (!resposta.ok) {
    const err = new Error(`Gemini ${resposta.status}`);
    err.status = resposta.status;
    throw err;
  }

  const dados = await resposta.json();
  const texto = dados?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!texto) throw new Error(`Resposta vazia (${modelo})`);
  return parseJsonResposta(texto);
}

async function chamarGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const preferido = (process.env.GEMINI_MODEL || "").trim();
  const modelos = preferido
    ? [preferido, ...MODELOS_GEMINI.filter((m) => m !== preferido)]
    : MODELOS_GEMINI;

  for (const modelo of modelos) {
    try {
      return await chamarGeminiModelo(apiKey, modelo, prompt);
    } catch (erro) {
      const status = erro.status || 0;
      if (status === 429 || status === 404 || status === 400 || status >= 500) continue;
      throw erro;
    }
  }

  const err = new Error("Gemini indisponível");
  err.status = 503;
  throw err;
}

async function chamarIA(prompt) {
  if (process.env.GROQ_API_KEY) {
    try {
      return { raw: await chamarGroq(prompt), provedor: "groq" };
    } catch (erro) {
      console.warn("Groq falhou:", erro.message);
      if (!process.env.GEMINI_API_KEY) throw erro;
    }
  }

  if (process.env.GEMINI_API_KEY) {
    return { raw: await chamarGemini(prompt), provedor: "gemini" };
  }

  const err = new Error("Configure GROQ_API_KEY no Vercel");
  err.status = 503;
  throw err;
}

function normalizarSugestao(raw, opcoes, provedor) {
  const idsValidos = new Set((opcoes || []).map((o) => String(o.id)));
  const escolhidos = (Array.isArray(raw.escolhidos) ? raw.escolhidos : [])
    .map(String)
    .filter((id) => idsValidos.has(id))
    .slice(0, 2);

  return {
    intro: String(raw.intro || "").slice(0, 400),
    escolhidos,
    provedor,
  };
}

function lerCorpo(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

module.exports = async (req, res) => {
  const origin = req.headers.origin || "";
  aplicarCors(res, origin);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    const temGroq = Boolean(process.env.GROQ_API_KEY);
    const temGemini = Boolean(process.env.GEMINI_API_KEY);
    return res.status(200).json({
      ok: true,
      servico: "contexto-sugestao",
      ia: temGroq ? "groq" : temGemini ? "gemini" : "nenhuma",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Use POST" });
  }

  const corpo = lerCorpo(req);
  const opcoes = Array.isArray(corpo.opcoes) ? corpo.opcoes.slice(0, 8) : [];

  if (!opcoes.length) {
    return res.status(400).json({ erro: "Envie opcoes candidatas." });
  }

  try {
    const prompt = montarPrompt(corpo);
    const { raw, provedor } = await chamarIA(prompt);
    const sugestao = normalizarSugestao(raw, opcoes, provedor);
    return res.status(200).json({ ok: true, ...sugestao });
  } catch (erro) {
    const status = erro.status || 500;
    return res.status(status).json({
      ok: false,
      erro: erro.message || "IA indisponível.",
    });
  }
};
