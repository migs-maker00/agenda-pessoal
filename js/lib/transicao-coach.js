/** Coach de transição — detecta mudanças do dia e sugere 1 passo. */

import { carregarPerfil, ehDiaEscola, hhmmParaMinutos, minutosAgora } from "./perfil.js";
import { faixaDoDia, horarioRelevanteAgora, ehHabitoTrabalhoPraia } from "./contexto-tempo.js";

export function detectarTransicao(data = new Date()) {
  const perfil = carregarPerfil();
  const min = minutosAgora(data);
  const faixa = faixaDoDia(data);
  const dia = data.getDay();
  const acordar = hhmmParaMinutos(perfil.acordar);
  const chegada = hhmmParaMinutos(perfil.chegadaCasa || "17:00");
  const tardeIni = hhmmParaMinutos(perfil.tardeDificilInicio || "17:00");
  const tardeFim = hhmmParaMinutos(perfil.tardeDificilFim || "20:00");
  const dormir = hhmmParaMinutos(perfil.dormir || "23:30");

  if (min >= acordar - 15 && min <= acordar + 45) {
    return { id: "acordar", titulo: "Bom dia", acao: "Água + 1 micro-passo de 2 min." };
  }
  if (ehDiaEscola(perfil, data) && min >= hhmmParaMinutos(perfil.escolaInicio) - 30 && min <= hhmmParaMinutos(perfil.escolaInicio)) {
    return { id: "escola", titulo: "Hora da escola", acao: "Mochila pronta? Só conferir 1 coisa." };
  }
  if (min >= chegada - 20 && min <= chegada + 40) {
    return { id: "chegada", titulo: "Chegando em casa", acao: "Abra o app em Agora — 2 opções só." };
  }
  if (min >= tardeIni && min <= tardeFim) {
    return { id: "tarde_dificil", titulo: "Tarde difícil", acao: "Modo leve: 1 hábito ou descanso sem culpa." };
  }
  if ((dia === 0 || dia === 6) && min >= 8 * 60 + 30 && min <= 10 * 60) {
    return { id: "praia", titulo: "Dia de trabalho na praia", acao: "Separar bolsa e água — 2 min." };
  }
  if (min >= dormir - 60 && min <= dormir + 15) {
    return { id: "desacelerar", titulo: "Hora de desacelerar", acao: "Diário ou descanso — nada pesado." };
  }
  if (faixa === "madrugada") {
    return { id: "madrugada", titulo: "Madrugada", acao: "Só descanso. Amanhã resolve." };
  }
  return null;
}

export function mensagemTransicao(transicao) {
  if (!transicao) return "";
  return `${transicao.titulo}: ${transicao.acao}`;
}

export function coachParaHabito(habito, data = new Date()) {
  const trans = detectarTransicao(data);
  if (!trans) return null;
  if (ehHabitoTrabalhoPraia(habito) && trans.id === "praia" && horarioRelevanteAgora(habito.horario)) {
    return `Pertinho do horário da praia — ${habito.horario || "manhã"}. Só preparar.`;
  }
  if (trans.id === "tarde_dificil") {
    return "Tarde difícil: versão mínima vale.";
  }
  return null;
}
