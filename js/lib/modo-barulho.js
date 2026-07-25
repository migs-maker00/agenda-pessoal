/** Modo cabeça em barulho — só 1 coisa + timer. */

import { idHabitoIgual, prioridadesDoDia } from "./tdah.js";

export function modoBarulho() {
  return localStorage.getItem("modo-barulho") === "1";
}

export function definirModoBarulho(ativo) {
  localStorage.setItem("modo-barulho", ativo ? "1" : "0");
  if (ativo) {
    localStorage.setItem("modo-cerebro-vazio", "1");
    localStorage.setItem("modo-cabeca-leve", "1");
  }
}

export function filtrarModoBarulho(lista, chave, mapa) {
  const prio = prioridadesDoDia(chave, mapa);
  if (prio.length) {
    const h = lista.find((item) => idHabitoIgual(item.id, prio[0]));
    return h ? [h] : lista.slice(0, 1);
  }
  const essencial = lista.find((h) => Number(h.importancia) === 1);
  return essencial ? [essencial] : lista.slice(0, 1);
}
