/** Streaks gentis — sem culpa, celebra o retorno. */

import { diasDesdeUltimoFeito } from "./padroes.js";

export function mensagemStreakGlobal(streak) {
  if (streak <= 0) return "Hoje é um novo começo — um passo já conta.";
  if (streak === 1) return "1 dia seguido. Sem pressão pra manter — só celebre.";
  if (streak < 7) return `${streak} dias seguidos. Você tá construindo ritmo.`;
  if (streak < 30) return `${streak} dias! Isso é consistência de verdade.`;
  return `${streak} dias seguidos — impressionante, mas descanse se precisar.`;
}

export function mensagemStreakHabito(habito, streak, recorde = 0) {
  const diasOff = diasDesdeUltimoFeito(habito.id);
  if (streak === 0 && diasOff != null && diasOff > 1) {
    return `Voltou depois de ${diasOff} dias — isso também conta.`;
  }
  if (streak === 0) return "";
  if (streak === 1) return "1 dia — começo leve.";
  if (streak >= recorde && recorde > 1) return `Recorde! ${streak} dias seguidos.`;
  return `${streak} dias seguidos`;
}

export function rotuloStreakInsights(streak) {
  if (streak === 0) return "Recomeço";
  return streak === 1 ? "dia seguido" : "dias seguidos";
}
