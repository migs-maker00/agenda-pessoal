/** Versão do app — usada para cache-bust de CSS/JS no index.html */
export const APP_VERSION = "2.21.0";

/** URL principal no Vercel (GitHub Pages continua como espelho). */
export const APP_URL_VERCEL = "https://projeto-1-criar.vercel.app";

export const APP_URL_GITHUB =
  "https://migs-maker00.github.io/agenda-pessoal/";

/**
 * API Neuro — caminho relativo (mesma origem no Vercel).
 * No GitHub Pages cai no fallback por palavras-chave.
 */
export const NEURO_IA_API_URL = "/api/neuro-feedback";

/** API Cheguei / Agora — sugestões contextuais (Groq no Vercel). */
export const CONTEXTO_IA_API_URL = "/api/contexto-sugestao";

export const DIARIO_IA_API_URL = "/api/diario-resumo";
export const SEMANA_IA_API_URL = "/api/semana-agente";

export function hostAtual() {
  const h = typeof location !== "undefined" ? location.hostname : "";
  if (h.includes("vercel.app")) return "vercel";
  if (h.includes("github.io")) return "github";
  if (h === "localhost" || h === "127.0.0.1") return "local";
  return "outro";
}
