/** Utilitários compartilhados — APIs IA no Vercel. */

const ORIGENS_PADRAO = [
  "https://migs-maker00.github.io",
  "https://projeto-1-criar.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
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

function localeDoCorpo(corpo) {
  return corpo?.locale === "en" ? "en" : "pt";
}

function nomeUsuario(corpo) {
  return String(corpo?.perfil?.nome || corpo?.nome || "North").trim() || "North";
}

/** Contexto MindOS compartilhado — prompts de IA alinhados ao produto. */
function contextoSegundoCerebro(corpo, locale = "pt") {
  const nome = nomeUsuario(corpo);
  if (locale === "en") {
    return `You are MindOS — a second brain for ${nome}, who has ADHD.
Mission: give clear direction — body, mind, and knowledge, with less mental effort. Reduce decisions; never guilt or pressure.`;
  }
  return `Você é o MindOS — um segundo cérebro para ${nome}, com TDAH.
Missão: dar direção clara — corpo, mente e conhecimento, com menos esforço mental. Reduza decisões; nunca culpe ou pressione.`;
}

function instrucaoIdioma(locale) {
  return locale === "en"
    ? "All user-facing strings in the JSON must be in English."
    : "Todos os textos para o usuário no JSON devem estar em português do Brasil.";
}

function systemGroq(locale = "pt") {
  return locale === "en"
    ? "Reply with valid JSON only. No markdown."
    : "Responda só JSON válido. Sem markdown.";
}

async function chamarGroq(prompt, maxTokens = 500, locale = "pt") {
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
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemGroq(locale) },
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

async function chamarGeminiModelo(apiKey, modelo, prompt, maxTokens = 500) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`;
  const resposta = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: maxTokens },
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

async function chamarGemini(prompt, maxTokens = 500) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const preferido = (process.env.GEMINI_MODEL || "").trim();
  const modelos = preferido
    ? [preferido, ...MODELOS_GEMINI.filter((m) => m !== preferido)]
    : MODELOS_GEMINI;

  for (const modelo of modelos) {
    try {
      return await chamarGeminiModelo(apiKey, modelo, prompt, maxTokens);
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

async function chamarIA(prompt, maxTokens = 500, locale = "pt") {
  if (process.env.GROQ_API_KEY) {
    try {
      return { raw: await chamarGroq(prompt, maxTokens, locale), provedor: "groq" };
    } catch (erro) {
      console.warn("Groq falhou:", erro.message);
      if (!process.env.GEMINI_API_KEY) throw erro;
    }
  }

  if (process.env.GEMINI_API_KEY) {
    return { raw: await chamarGemini(prompt, maxTokens), provedor: "gemini" };
  }

  const err = new Error("Configure GROQ_API_KEY no Vercel");
  err.status = 503;
  throw err;
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

function criarHandlerApi({ servico, montarPrompt, normalizar, validar }) {
  return async (req, res) => {
    const origin = req.headers.origin || "";
    aplicarCors(res, origin);

    if (req.method === "OPTIONS") return res.status(204).end();

    if (req.method === "GET") {
      const temGroq = Boolean(process.env.GROQ_API_KEY);
      const temGemini = Boolean(process.env.GEMINI_API_KEY);
      return res.status(200).json({
        ok: true,
        servico,
        ia: temGroq ? "groq" : temGemini ? "gemini" : "nenhuma",
      });
    }

    if (req.method !== "POST") return res.status(405).json({ erro: "Use POST" });

    const corpo = lerCorpo(req);
    const erroVal = validar?.(corpo);
    if (erroVal) return res.status(400).json({ erro: erroVal });

    try {
      const prompt = montarPrompt(corpo);
      const locale = localeDoCorpo(corpo);
      const { raw, provedor } = await chamarIA(prompt, 500, locale);
      return res.status(200).json({ ok: true, ...normalizar(raw, corpo, provedor) });
    } catch (erro) {
      const status = erro.status || 500;
      return res.status(status).json({ ok: false, erro: erro.message || "IA indisponível." });
    }
  };
}

module.exports = {
  aplicarCors,
  chamarIA,
  contextoSegundoCerebro,
  criarHandlerApi,
  instrucaoIdioma,
  lerCorpo,
  localeDoCorpo,
  nomeUsuario,
  parseJsonResposta,
};
