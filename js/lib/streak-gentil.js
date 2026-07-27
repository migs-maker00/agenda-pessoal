/** Streaks gentis — sem culpa, celebra o retorno. */

import { t } from "./i18n.js";
import { diasDesdeUltimoFeito } from "./padroes.js";

export function mensagemStreakGlobal(streak) {
  if (streak <= 0) return t("streak.global.0");
  if (streak === 1) return t("streak.global.1");
  if (streak < 7) return t("streak.global.curto", { n: streak });
  if (streak < 30) return t("streak.global.medio", { n: streak });
  return t("streak.global.longo", { n: streak });
}

export function mensagemStreakHabito(habito, streak, recorde = 0) {
  const diasOff = diasDesdeUltimoFeito(habito.id);
  if (streak === 0 && diasOff != null && diasOff > 1) {
    return t("streak.habito.voltou", { n: diasOff });
  }
  if (streak === 0) return "";
  if (streak === 1) return t("streak.habito.1");
  if (streak >= recorde && recorde > 1) return t("streak.habito.recorde", { n: streak });
  return t("streak.habito.normal", { n: streak });
}

export function rotuloStreakInsights(streak) {
  if (streak === 0) return t("streak.rotulo.0");
  return streak === 1 ? t("streak.rotulo.1") : t("streak.rotulo.n");
}
