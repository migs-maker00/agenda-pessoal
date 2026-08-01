/** Vercel Serverless — feedback IA para trilha Neuro (Groq → Gemini). */

const { contextoSegundoCerebro } = require("./ia-shared");

const ORIGENS_PADRAO = [
  "https://migs-maker00.github.io",
  "https://projeto-1-criar.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
];

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

function montarPrompt({ titulo, textoModulo, pontosChave, explicacao, locale = "pt", perfil, nome }) {
  const ctx = contextoSegundoCerebro({ perfil, nome }, locale);
  const pontos = (pontosChave || []).map((p) => `- ${p}`).join("\n");
  if (locale === "en") {
    return `${ctx}
They learn by explaining in their own words (Feynman).

Module: "${titulo}"
Reference:
${String(textoModulo || "").slice(0, 1200)}

Key points:
${pontos}

Their explanation:
"""
${String(explicacao || "").slice(0, 2000)}
"""

Respond ONLY JSON:
{
  "ok": true,
  "pct": 75,
  "feedback": "1-2 short calm sentences — not a lecture",
  "acertos": ["up to 2 specifics they got"],
  "faltou": ["up to 1 missing idea — or empty"],
  "perguntaSeguinte": "ONE short follow-up — or empty"
}

Rules:
- ok=true if pct >= 55
- Never harsh. Never "you failed".
- Max 2 acertos, max 1 faltou`;
  }
  return `${ctx}
Aprende explicando com as próprias palavras (Feynman).

Módulo: "${titulo}"
Referência:
${String(textoModulo || "").slice(0, 1200)}

Pontos-chave:
${pontos}

Explicação:
"""
${String(explicacao || "").slice(0, 2000)}
"""

Responda APENAS JSON:
{
  "ok": true,
  "pct": 75,
  "feedback": "1-2 frases curtas e calmas — sem aula",
  "acertos": ["até 2 pontos concretos que acertou"],
  "faltou": ["até 1 ideia que faltou — ou vazio"],
  "perguntaSeguinte": "UMA pergunta curta — ou vazia"
}

Regras:
- ok=true se pct >= 55
- Nunca dureza. Nunca "você falhou".
- Máximo 2 acertos, máximo 1 faltou`;
}

function parseJsonResposta(texto) {
  const limpo = String(texto || "").trim();
  const jsonMatch = limpo.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch ? jsonMatch[0] : limpo);
}

async function chamarGroq(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const modelo = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

  const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelo,
      messages: [
        {
          role: "system",
          content: "Você é o North, segundo cérebro silencioso. Só JSON válido. Curto, calmo, zero culpa.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.35,
      response_format: { type: "json_object" },
    }),
  });

  if (!resposta.ok) {
    const err = new Error(`Groq: ${resposta.status}`);
    err.status = resposta.status;
    throw err;
  }

  const dados = await resposta.json();
  const texto = dados?.choices?.[0]?.message?.content;
  if (!texto) throw new Error("Resposta vazia (Groq)");

  return parseJsonResposta(texto);
}

const MODELOS_GEMINI = [
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
  "gemini-2.0-flash",
];

async function chamarGeminiModelo(apiKey, modelo, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`;

  const resposta = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.35,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!resposta.ok) {
    const err = new Error(`Gemini ${modelo}: ${resposta.status}`);
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

function normalizarFeedback(raw, provedor = "ia") {
  const pct = Math.max(0, Math.min(100, Number(raw.pct) || 0));
  return {
    ok: Boolean(raw.ok) || pct >= 55,
    pct,
    feedback: String(raw.feedback || "Revise o módulo e tente explicar de novo.").slice(0, 400),
    acertos: Array.isArray(raw.acertos) ? raw.acertos.map(String).slice(0, 2) : [],
    faltou: Array.isArray(raw.faltou) ? raw.faltou.map(String).slice(0, 1) : [],
    perguntaSeguinte: String(raw.perguntaSeguinte || "").slice(0, 160),
    fonte: "ia",
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
      servico: "neuro-feedback",
      ia: temGroq ? "groq" : temGemini ? "gemini" : "nenhuma",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Use POST" });
  }

  const corpo = lerCorpo(req);
  const explicacao = String(corpo.explicacao ?? "").trim();

  if (explicacao.length < 25) {
    return res.status(400).json({ erro: "Explique um pouco mais antes de pedir correção da IA." });
  }
  if (explicacao.length > 2500) {
    return res.status(400).json({ erro: "Texto muito longo." });
  }

  try {
    const prompt = montarPrompt({
      titulo: String(corpo.titulo || "Neurociência").slice(0, 120),
      textoModulo: String(corpo.textoModulo || "").slice(0, 3000),
      pontosChave: Array.isArray(corpo.pontosChave) ? corpo.pontosChave.slice(0, 12) : [],
      explicacao,
      locale: corpo.locale === "en" ? "en" : "pt",
      perfil: corpo.perfil,
      nome: corpo.nome,
    });

    const { raw, provedor } = await chamarIA(prompt);
    return res.status(200).json({ ok: true, avaliacao: normalizarFeedback(raw, provedor) });
  } catch (erro) {
    console.error("neuro-feedback:", erro);
    return res.status(503).json({
      erro: "IA temporariamente indisponível. Tente de novo em instantes.",
      codigo: "ia_indisponivel",
    });
  }
};
