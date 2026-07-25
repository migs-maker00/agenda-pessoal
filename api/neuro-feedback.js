/** Vercel Serverless — feedback IA para trilha Neuro (Gemini). */

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

function corsHeaders(origin) {
  const permitidas = origensPermitidas();
  const ok =
    origin &&
    (permitidas.includes(origin) || /\.vercel\.app$/i.test(origin));
  return {
    "Access-Control-Allow-Origin": ok ? origin : permitidas[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin),
    },
  });
}

function montarPrompt({ titulo, textoModulo, pontosChave, explicacao }) {
  const pontos = (pontosChave || []).map((p) => `- ${p}`).join("\n");
  return `Você é uma tutora de neurociência para uma estudante de 16 anos (Erica), com TDAH.
Ela aprende melhor EXPLICANDO com as próprias palavras (técnica Feynman).

Módulo: "${titulo}"
Texto de referência:
${textoModulo || ""}

Pontos-chave que ela deveria cobrir:
${pontos}

Explicação dela:
"""
${explicacao}
"""

Avalie com empatia e clareza. Responda APENAS em JSON válido, sem markdown, neste formato:
{
  "ok": true ou false,
  "pct": número de 0 a 100,
  "feedback": "2-4 frases em português, tom encorajador",
  "acertos": ["o que ela acertou"],
  "faltou": ["conceitos que faltaram ou confundiu"],
  "perguntaSeguinte": "uma pergunta curta para ela pensar mais"
}

Regras:
- ok=true se pct >= 55
- Seja específica: cite o que ela disse bem e o que melhorar
- Não seja dura; celebre o esforço
- Máximo 4 itens em acertos e faltou`;
}

async function chamarGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY não configurada no Vercel");

  const modelo = process.env.GEMINI_MODEL || "gemini-2.0-flash";
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
    const erro = await resposta.text();
    console.error("Gemini erro:", resposta.status, erro);
    throw new Error("Falha ao consultar a IA");
  }

  const dados = await resposta.json();
  const texto = dados?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!texto) throw new Error("Resposta vazia da IA");

  return JSON.parse(texto);
}

function normalizarFeedback(raw) {
  const pct = Math.max(0, Math.min(100, Number(raw.pct) || 0));
  return {
    ok: Boolean(raw.ok) || pct >= 55,
    pct,
    feedback: String(raw.feedback || "Revise o módulo e tente explicar de novo.").slice(0, 1200),
    acertos: Array.isArray(raw.acertos) ? raw.acertos.map(String).slice(0, 6) : [],
    faltou: Array.isArray(raw.faltou) ? raw.faltou.map(String).slice(0, 6) : [],
    perguntaSeguinte: String(raw.perguntaSeguinte || "").slice(0, 300),
    fonte: "ia",
  };
}

export default async function handler(request) {
  const origin = request.headers.get("origin") || "";

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== "POST") {
    return jsonResponse({ erro: "Use POST" }, 405, origin);
  }

  let corpo;
  try {
    corpo = await request.json();
  } catch {
    return jsonResponse({ erro: "JSON inválido" }, 400, origin);
  }

  const explicacao = String(corpo.explicacao ?? "").trim();
  if (explicacao.length < 25) {
    return jsonResponse({ erro: "Explique um pouco mais antes de pedir correção da IA." }, 400, origin);
  }
  if (explicacao.length > 2500) {
    return jsonResponse({ erro: "Texto muito longo." }, 400, origin);
  }

  try {
    const prompt = montarPrompt({
      titulo: String(corpo.titulo || "Neurociência").slice(0, 120),
      textoModulo: String(corpo.textoModulo || "").slice(0, 3000),
      pontosChave: Array.isArray(corpo.pontosChave) ? corpo.pontosChave.slice(0, 12) : [],
      explicacao,
    });

    const avaliacao = normalizarFeedback(await chamarGemini(prompt));
    return jsonResponse({ ok: true, avaliacao }, 200, origin);
  } catch (erro) {
    console.error("neuro-feedback:", erro);
    return jsonResponse(
      { erro: "Não foi possível gerar feedback agora. Tente de novo em instantes." },
      500,
      origin
    );
  }
}
