/** Histórico de versões do diário — uma entrada a cada salvamento. */

import { localeTag, t } from "./i18n.js";

export const CHAVE_HISTORICO_NOTAS = "notas-diarias-historico";
const MAX_VERSOES = 200;

const ultimoArquivoPorChave = new Map();

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

function salvarHistoricoCompleto(lista) {
  localStorage.setItem(CHAVE_HISTORICO_NOTAS, JSON.stringify(lista.slice(-MAX_VERSOES)));
}

export function historicoDaData(chave, lista = carregarHistoricoCompleto()) {
  if (!chaveNotaDiarioValida(chave)) return [];
  return lista
    .filter((item) => item?.chave === chave && String(item.texto ?? "").trim())
    .sort((a, b) => (b.em || 0) - (a.em || 0));
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

/** Guarda versão a cada salvamento. Só ignora se for idêntica à última da mesma data. */
export function arquivarVersaoNota(chave, texto, { motivo = "auto" } = {}) {
  if (!chaveNotaDiarioValida(chave)) return false;
  const limpo = String(texto ?? "").trim();
  if (!limpo) return false;

  const ultimo = ultimoArquivoPorChave.get(chave);
  if (ultimo?.texto === limpo) return false;

  const lista = carregarHistoricoCompleto();
  const versao = {
    id: gerarIdVersao(),
    chave,
    texto: limpo,
    em: Date.now(),
    chars: limpo.length,
    motivo,
  };
  lista.push(versao);
  salvarHistoricoCompleto(lista);
  ultimoArquivoPorChave.set(chave, { texto: limpo, em: versao.em });
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
