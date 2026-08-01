/** Convites gentis do North — segundo cérebro, não cobrança. */

import { detectarHabitoAprender } from "./aprender.js";
import { carregarEstudo, resumoSessao } from "./estudo-hub.js";
import { t } from "./i18n.js";

/**
 * @returns {{ texto: string, acao: "estudo"|"diario"|"cheguei"|null }}
 */
export function escolherConviteNorth({ habitos, notas, chave, estaPendente }) {
  const h = new Date().getHours();
  const dadosEstudo = carregarEstudo();
  const sessao = resumoSessao(dadosEstudo);
  const estudoSessaoPendente = sessao.feitos < sessao.total;
  const habitoEstudo = habitos.find((hab) => detectarHabitoAprender(hab) && estaPendente(hab));

  if (habitoEstudo || estudoSessaoPendente) {
    return { texto: t("north.convite.estudo"), acao: "estudo" };
  }

  const notaHoje = (notas?.[chave] || "").trim();
  if (h >= 18 && !notaHoje) {
    return { texto: t("north.convite.diario"), acao: "diario" };
  }

  if (h >= 5 && h < 11) {
    return { texto: t("north.convite.manha"), acao: "cheguei" };
  }

  return { texto: t("north.convite.calmo"), acao: null };
}
