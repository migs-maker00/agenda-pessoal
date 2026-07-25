/** Neuro — fluxo de voz (explicar, ouvir feedback, responder pergunta). */

import { escutarDictado, pararEscuta, suportaReconhecimentoVoz } from "./estudo-fala.js";

export { suportaReconhecimentoVoz, pararEscuta };

export function falarPortugues(texto) {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !texto) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(String(texto).slice(0, 800));
  u.lang = "pt-BR";
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
  return true;
}

export function montarTextoFeedback(fb) {
  if (!fb) return "";
  const partes = [fb.feedback];
  if (fb.perguntaSeguinte) partes.push(fb.perguntaSeguinte);
  return partes.filter(Boolean).join(" ");
}

/**
 * Dictado para explicação Neuro.
 * @param {object} opts
 * @param {boolean} opts.substituir - se true, substitui texto; se false, acrescenta
 * @param {boolean} opts.autoVerificar - chama onProntoVerificar quando texto >= minChars
 * @param {number} opts.minChars
 */
export function dictadoExplicacaoNeuro(opts = {}) {
  const {
    onStatus,
    onError,
    onTexto,
    substituir = false,
    autoVerificar = false,
    minChars = 20,
  } = opts;

  if (!suportaReconhecimentoVoz()) {
    onError?.("Microfone não disponível neste navegador.");
    return;
  }

  pararEscuta();
  escutarDictado({
    lang: "pt-BR",
    onStatus: (msg) => onStatus?.(msg),
    onError: (msg) => onError?.(msg),
    onResult: (texto) => {
      const limpo = String(texto || "").trim();
      if (!limpo) {
        onError?.("Não ouvi — tente de novo.");
        return;
      }
      onTexto?.({ texto: limpo, substituir, autoVerificar, minChars });
    },
  });
}
