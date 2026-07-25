/** Contexto de horário — o app só sugere o que faz sentido AGORA. */

import { carregarPerfil, hhmmParaMinutos, minutosAgora } from "./perfil.js";

export function faixaDoDia(data = new Date()) {
  const h = data.getHours();
  if (h >= 5 && h < 12) return "manha";
  if (h >= 12 && h < 18) return "tarde";
  if (h >= 18 && h < 23) return "noite";
  return "madrugada";
}

export function rotuloFaixa(faixa) {
  const mapa = {
    manha: "manhã",
    tarde: "tarde",
    noite: "noite",
    madrugada: "madrugada",
  };
  return mapa[faixa] || faixa;
}

/** Hábito faz sentido neste momento? (janela em torno do horário agendado) */
export function horarioRelevanteAgora(hhmm, { antesMin = 25, depoisMin = 90 } = {}) {
  if (!hhmm || !/^\d{1,2}:\d{2}$/.test(hhmm)) return true;
  const alvo = hhmmParaMinutos(hhmm);
  const agora = minutosAgora();
  return alvo >= agora - antesMin && alvo <= agora + depoisMin;
}

export function minutosAteHorario(hhmm) {
  if (!hhmm) return null;
  return hhmmParaMinutos(hhmm) - minutosAgora();
}

function nomeHabito(h) {
  return String(h?.nome || "").toLowerCase();
}

export function ehHabitoTrabalhoPraia(habito) {
  return /praia|trabalho na praia|preparar trabalho/i.test(nomeHabito(habito));
}

export function ehHabitoSonoDescanso(habito) {
  return /dormir|sono|descans|relax|meditar|meditação/i.test(nomeHabito(habito));
}

export function ehHabitoLeveNoturno(habito) {
  return (
    ehHabitoSonoDescanso(habito) ||
    /diário|diario|ler|leitura|revisão|revisao|journ/i.test(nomeHabito(habito))
  );
}

export function ehHabitoManha(habito) {
  return /acordar|manhã|manha|água|agua|café|cafe|organizar|mochila/i.test(nomeHabito(habito));
}

/** Filtra hábitos que não devem aparecer neste horário. */
export function habitoFazSentidoAgora(habito, faixa = faixaDoDia()) {
  const nome = nomeHabito(habito);

  if (habito.horario && !horarioRelevanteAgora(habito.horario)) {
    if (faixa === "madrugada" || faixa === "noite") {
      if (ehHabitoTrabalhoPraia(habito)) return false;
      if (/academia|jiu|escola|estud/i.test(nome) && !ehHabitoLeveNoturno(habito)) return false;
    }
    if (faixa === "manha" && ehHabitoSonoDescanso(habito) && hhmmParaMinutos(habito.horario) > 10 * 60) {
      return false;
    }
    return false;
  }

  if (faixa === "madrugada") {
    if (ehHabitoTrabalhoPraia(habito)) return false;
    if (/academia|jiu|escola|praia|trabalho/i.test(nome) && !ehHabitoLeveNoturno(habito)) return false;
  }

  return true;
}

export function introContextual(contexto, faixa = faixaDoDia()) {
  const perfil = carregarPerfil();
  const mapa = {
    chegada: "Boa chegada. Duas opções — escolha só uma.",
    tarefa: "Boa! Tarefa feita. O que vem agora?",
    acordar: `Bom dia. São ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} — comece leve.`,
    pausa: "Pausa merecida. Recarrega ou segue em algo pequeno?",
    noite: "Hora de desacelerar. Nada pesado agora.",
  };

  if (contexto && mapa[contexto]) return mapa[contexto];

  if (faixa === "madrugada") {
    return "É madrugada — nada de trabalho agora. Descanse ou anote no diário.";
  }
  if (faixa === "noite" && perfil.dormir) {
    return `Noite — perto de dormir (${perfil.dormir}). Só o essencial.`;
  }
  return "Escolha uma opção. Não precisa fazer as duas.";
}

export function opcaoDiarioNoturno() {
  return {
    id: "diario-noite",
    tipo: "painel",
    titulo: "Anotar no diário",
    passo: "2 minutos: o que rolou hoje e o que ficou na cabeça.",
    rotuloBotao: "Abrir Diário",
    painel: "diario",
    peso: 88,
    contexto: "Boa para agora",
  };
}

export function opcaoDescansoNoturno() {
  return {
    id: "descanso-noite",
    tipo: "descanso",
    titulo: "Descansar / preparar sono",
    passo: "Sem culpa. Amanhã o trabalho na praia espera no horário certo.",
    rotuloBotao: "Timer 10 min",
    timerSeg: 600,
    peso: 90,
    contexto: "Hora de desacelerar",
  };
}
