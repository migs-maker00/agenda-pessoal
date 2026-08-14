/** Versão do app — usada para cache-bust de CSS/JS no index.html */
export const APP_VERSION = "2.34.0";

/** URL principal no Vercel (app + APIs de IA). */
export const APP_URL_VERCEL = "https://projeto-1-criar.vercel.app";

export const APP_URL_GITHUB =
  "https://migs-maker00.github.io/agenda-pessoal/";

/** Caminhos das APIs serverless no Vercel. */
export const NEURO_IA_API_URL = "/api/neuro-feedback";
export const CONTEXTO_IA_API_URL = "/api/contexto-sugestao";
export const DIARIO_IA_API_URL = "/api/diario-resumo";
export const SEMANA_IA_API_URL = "/api/semana-agente";

let iaVercelOk = null;

/** Resolve rota /api/* sempre para o backend Vercel (funciona de GitHub Pages, local e iPhone). */
export function urlApiVercel(caminho) {
  const p = String(caminho || "").trim();
  if (!p) return "";
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  const path = p.startsWith("/") ? p : `/${p}`;
  return new URL(path, APP_URL_VERCEL).href;
}

/** Sonda Groq/Gemini configurados no Vercel (uma vez por sessão). */
export async function sondarIaVercel() {
  if (iaVercelOk !== null) return iaVercelOk;
  try {
    const resposta = await fetch(urlApiVercel(NEURO_IA_API_URL));
    const dados = await resposta.json().catch(() => ({}));
    iaVercelOk = Boolean(dados.ia && dados.ia !== "nenhuma");
  } catch {
    iaVercelOk = false;
  }
  return iaVercelOk;
}

export function iaVercelConfigurada() {
  return iaVercelOk === true;
}

export function hostAtual() {
  const h = typeof location !== "undefined" ? location.hostname : "";
  if (h.includes("vercel.app")) return "vercel";
  if (h.includes("github.io")) return "github";
  if (h === "localhost" || h === "127.0.0.1") return "local";
  return "outro";
}
