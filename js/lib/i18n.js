/** Internacionalização — PT (padrão) e EN. */

import { TRADUCOES } from "./traducoes.js";

const CHAVE_LOCALE = "app-locale-v1";
const IDIOMAS_SUPORTADOS = ["pt", "en"];

let localeAtual = carregarLocale();
let aoMudarIdioma = null;

function carregarLocale() {
  try {
    const salvo = localStorage.getItem(CHAVE_LOCALE);
    if (salvo && IDIOMAS_SUPORTADOS.includes(salvo)) return salvo;
  } catch {
    /* ignore */
  }
  return "pt";
}

export function locale() {
  return localeAtual;
}

export function localeTag() {
  return localeAtual === "en" ? "en-US" : "pt-BR";
}

export function definirCallbackIdioma(fn) {
  aoMudarIdioma = fn;
}

export function setLocale(novo) {
  const loc = IDIOMAS_SUPORTADOS.includes(novo) ? novo : "pt";
  localeAtual = loc;
  try {
    localStorage.setItem(CHAVE_LOCALE, loc);
  } catch {
    /* ignore */
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = loc === "en" ? "en" : "pt-BR";
    document.title = t("app.title");
  }
  aoMudarIdioma?.(loc);
  return loc;
}

export function t(chave, vars = {}) {
  const dict = TRADUCOES[localeAtual] || TRADUCOES.pt;
  const fallback = TRADUCOES.pt;
  let texto = dict[chave] ?? fallback[chave] ?? chave;
  for (const [k, v] of Object.entries(vars)) {
    texto = texto.replaceAll(`{{${k}}}`, String(v));
  }
  return texto;
}

/** Atualiza elementos com data-i18n, data-i18n-html, data-i18n-placeholder, data-i18n-aria. */
export function aplicarIdiomaHtml(raiz = document) {
  if (!raiz?.querySelectorAll) return;

  raiz.querySelectorAll("[data-i18n]").forEach((el) => {
    const chave = el.dataset.i18n;
    if (chave) el.textContent = t(chave);
  });

  raiz.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const chave = el.dataset.i18nHtml;
    if (chave) el.innerHTML = t(chave);
  });

  raiz.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const chave = el.dataset.i18nPlaceholder;
    if (chave) el.placeholder = t(chave);
  });

  raiz.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const chave = el.dataset.i18nAria;
    if (chave) el.setAttribute("aria-label", t(chave));
  });

  const navMap = {
    hoje: "nav.hoje",
    guia: "nav.guia",
    estudo: "nav.estudo",
    rotina: "nav.rotina",
    semana: "nav.semana",
    diario: "nav.diario",
    insights: "nav.insights",
    ajustes: "nav.ajustes",
  };

  raiz.querySelectorAll(".nav-item[data-painel]").forEach((btn) => {
    const chave = navMap[btn.dataset.painel];
    if (chave) btn.textContent = t(chave);
  });

  raiz.querySelectorAll("[data-idioma]").forEach((btn) => {
    btn.classList.toggle("ativo", btn.dataset.idioma === localeAtual);
    btn.setAttribute("aria-pressed", btn.dataset.idioma === localeAtual ? "true" : "false");
  });

  document.title = t("app.title");
}

export function rotuloFaixaI18n(faixa) {
  return t(`faixa.${faixa}`) || faixa;
}
