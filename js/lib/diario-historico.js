/** Histórico do diário — no máximo 2 versões por data; só quando o texto muda. */

import { localeTag, t } from "./i18n.js";

export const CHAVE_HISTORICO_NOTAS = "notas-diarias-historico";
const MAX_VERSOES_TOTAL = 60;
const MAX_POR_DATA = 2;

function gerarIdVersao() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function chaveNotaDiarioValida(chave) {
  return typeof chave === "string" && /^\d{4}-\d{2}-\d{2}$/.test(chave);
}

export function carregarHistoricoCompleto() {
  try {
    const lista = JSON.parse(localStorage.getItem(CHAVE_HISTORICO_NOTAS) || "[]");
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

/** Mantém só as N versões mais recentes por data. */
export function podarHistorico(lista = carregarHistoricoCompleto(), maxPorData = MAX_POR_DATA) {
  const porData = new Map();
  for (const item of lista) {
    if (!item?.chave || !chaveNotaDiarioValida(item.chave)) continue;
    if (!String(item.texto ?? "").trim()) continue;
    const arr = porData.get(item.chave) || [];
    arr.push(item);
    porData.set(item.chave, arr);
  }

  const resultado = [];
  for (const [, versoes] of porData) {
    const unicas = [];
    const textos = new Set();
    for (const v of versoes.sort((a, b) => (b.em || 0) - (a.em || 0))) {
      const txt = String(v.texto ?? "").trim();
      if (textos.has(txt)) continue;
      textos.add(txt);
      unicas.push(v);
      if (unicas.length >= maxPorData) break;
    }
    unicas.forEach((v) => resultado.push(v));
  }

  return resultado.sort((a, b) => (a.em || 0) - (b.em || 0)).slice(-MAX_VERSOES_TOTAL);
}

function salvarHistoricoCompleto(lista) {
  localStorage.setItem(CHAVE_HISTORICO_NOTAS, JSON.stringify(podarHistorico(lista)));
}

/** Limpa excesso já gravado (ex.: vários “ao sair” iguais). */
export function limparHistoricoExcesso() {
  const antes = carregarHistoricoCompleto();
  const depois = podarHistorico(antes);
  if (depois.length !== antes.length) {
    localStorage.setItem(CHAVE_HISTORICO_NOTAS, JSON.stringify(depois));
    return antes.length - depois.length;
  }
  return 0;
}

export function historicoDaData(chave, lista = carregarHistoricoCompleto()) {
  if (!chaveNotaDiarioValida(chave)) return [];
  return lista
    .filter((item) => item?.chave === chave && String(item.texto ?? "").trim())
    .sort((a, b) => (b.em || 0) - (a.em || 0))
    .slice(0, MAX_POR_DATA);
}

export function mesclarNotasDoHistorico(mapa = {}, lista = carregarHistoricoCompleto()) {
  const resultado = { ...mapa };
  lista.forEach((item) => {
    if (!item?.chave || !chaveNotaDiarioValida(item.chave)) return;
    const txt = String(item.texto ?? "").trim();
    if (!txt) return;
    const atual = String(resultado[item.chave] ?? "").trim();
    if (!atual || txt.length > atual.length) resultado[item.chave] = item.texto;
  });
  return resultado;
}

/**
 * Guarda versão só se o texto mudou em relação à última.
 * Ignora salvamentos "auto" (digitação) — histórico fica para manual / sair / apagar.
 */
export function arquivarVersaoNota(chave, texto, { motivo = "auto" } = {}) {
  if (!chaveNotaDiarioValida(chave)) return false;
  if (motivo === "auto") return false;

  const limpo = String(texto ?? "").trim();
  if (!limpo) return false;

  const lista = carregarHistoricoCompleto();
  const daData = historicoDaData(chave, lista);
  if (daData[0] && String(daData[0].texto ?? "").trim() === limpo) return false;

  lista.push({
    id: gerarIdVersao(),
    chave,
    texto: limpo,
    em: Date.now(),
    chars: limpo.length,
    motivo,
  });
  salvarHistoricoCompleto(lista);
  return true;
}

export function restaurarVersaoHistorico(id) {
  const item = carregarHistoricoCompleto().find((v) => v.id === id);
  if (!item?.chave || !chaveNotaDiarioValida(item.chave)) return null;
  return { chave: item.chave, texto: item.texto };
}

export function importarHistoricoNotas(lista) {
  if (!Array.isArray(lista)) return;
  const atual = carregarHistoricoCompleto();
  const ids = new Set(atual.map((v) => v.id));
  const novas = lista.filter((v) => v?.id && !ids.has(v.id));
  if (!novas.length) return;
  salvarHistoricoCompleto([...atual, ...novas]);
}

export function formatarHoraVersao(em) {
  if (!em) return "";
  return new Date(em).toLocaleTimeString(localeTag(), {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function rotuloMotivoVersao(motivo) {
  if (motivo === "manual") return t("diario.motivo.manual");
  if (motivo === "apagar") return t("diario.motivo.apagar");
  if (motivo === "fechar") return t("diario.motivo.fechar");
  return t("diario.motivo.auto");
}
