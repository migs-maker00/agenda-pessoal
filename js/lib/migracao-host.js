/** Aviso ao abrir o app em um host novo — protege diário via sync. */

import { APP_URL_VERCEL, hostAtual } from "../config.js";
import { carregarExplicacoesNeuro } from "./neuro-explicar.js";

const CHAVE_SYNC = "habitos-sync-id";
const CHAVE_AVISO_GITHUB = "migracao-github-aviso-visto";

function contarNotasComTexto(notas = {}) {
  return Object.keys(notas).filter(
    (chave) => /^\d{4}-\d{2}-\d{2}$/.test(chave) && String(notas[chave] ?? "").trim()
  ).length;
}

function temDadosLocais(notas, habitos) {
  if (contarNotasComTexto(notas) > 0) return true;
  if (Array.isArray(habitos) && habitos.length > 0) return true;
  const neuro = carregarExplicacoesNeuro();
  return Object.keys(neuro).length > 0;
}

/** Host novo sem sync = risco de diário vazio até conectar. */
export function precisaConectarSyncNesteHost(notas, habitos) {
  if (localStorage.getItem(CHAVE_SYNC)) return false;
  if (temDadosLocais(notas, habitos)) return false;
  return hostAtual() === "vercel";
}

export function mostrarBannerMigracaoHost() {
  const el = document.getElementById("migracao-host");
  if (!el) return;
  el.hidden = false;
  document.body.classList.add("migracao-host-aberto");
}

export function esconderBannerMigracaoHost() {
  const el = document.getElementById("migracao-host");
  if (!el) return;
  el.hidden = true;
  document.body.classList.remove("migracao-host-aberto");
}

export function mostrarAvisoGithubParaVercel() {
  if (hostAtual() !== "github") return;
  if (localStorage.getItem(CHAVE_AVISO_GITHUB)) return;

  const el = document.getElementById("migracao-github-aviso");
  if (!el) return;
  el.hidden = false;

  const link = el.querySelector("[data-migracao-link-vercel]");
  if (link) link.href = APP_URL_VERCEL;
}

export function esconderAvisoGithubParaVercel() {
  localStorage.setItem(CHAVE_AVISO_GITHUB, "1");
  const el = document.getElementById("migracao-github-aviso");
  if (el) el.hidden = true;
}

export function ligarMigracaoHost({ ativarPainel, exportarDados }) {
  document.getElementById("migracao-ir-ajustes")?.addEventListener("click", () => {
    esconderBannerMigracaoHost();
    ativarPainel?.("ajustes");
    document.getElementById("sync-entrada-codigo")?.focus();
  });

  document.getElementById("migracao-exportar")?.addEventListener("click", () => {
    exportarDados?.();
  });

  document.getElementById("migracao-github-fechar")?.addEventListener("click", () => {
    esconderAvisoGithubParaVercel();
  });

  document.getElementById("migracao-github-ir-vercel")?.addEventListener("click", () => {
    esconderAvisoGithubParaVercel();
  });

  window.addEventListener("habitos-sync-conectado", () => {
    esconderBannerMigracaoHost();
  });
}
