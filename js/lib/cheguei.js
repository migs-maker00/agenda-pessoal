// Cheguei / Acabei de… — no máximo 2 opções contextuais

import { PLANO_B_APRENDER, detectarHabitoAprender } from "./aprender.js";
import { avisosPendentes } from "./avisos-agenda.js";
import {
  ehHabitoManha,
  ehHabitoTrabalhoPraia,
  faixaDoDia,
  habitoFazSentidoAgora,
  horarioRelevanteAgora,
  introContextual,
  opcaoDescansoNoturno,
  opcaoDiarioNoturno,
  rotuloFaixa,
} from "./contexto-tempo.js";
import { listaMicroPassos, textoPlanoB } from "./habitos.js";
import { carregarPerfil, ehDiaEscola, minutosAgora } from "./perfil.js";
import { ehHorarioDificil } from "./tarde.js";
import { prioridadesDoDia } from "./tdah.js";

export const GATILHOS_CHEGUEI = [
  { id: "chegada", emoji: "🏠", rotulo: "Cheguei em casa" },
  { id: "tarefa", emoji: "✓", rotulo: "Completei uma tarefa" },
  { id: "acordar", emoji: "☀️", rotulo: "Acabei de acordar" },
  { id: "pausa", emoji: "☕", rotulo: "Preciso de uma pausa" },
  { id: "noite", emoji: "🌙", rotulo: "Vou desacelerar" },
];

function ehOrganizarChegada(habito) {
  return /organizar|chegar|chegada|mochila/i.test(habito.nome || "");
}

function habitoParaOpcao(habito, contexto, peso) {
  const passos = listaMicroPassos(habito);
  return {
    id: `habito-${habito.id}`,
    tipo: "habito",
    titulo: habito.nome,
    passo: passos[0] || textoPlanoB(habito),
    rotuloBotao: "Começar (2 min)",
    habitoId: habito.id,
    timerSeg: 120,
    peso,
    contexto,
  };
}

function opcaoDescanso() {
  return {
    id: "descanso",
    tipo: "descanso",
    titulo: "Descansar primeiro",
    passo: "Sem culpa — 10 min. Depois você decide de novo.",
    rotuloBotao: "Timer 10 min",
    timerSeg: 600,
    peso: 5,
    contexto: "Opção leve",
  };
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function pendentesRelevantes(pendentes, faixa) {
  return pendentes.filter((h) => habitoFazSentidoAgora(h, faixa));
}

export function montarOpcoesCheguei({
  habitos,
  avisos,
  chave,
  estaPendente,
  excluirIds = [],
  contexto = "chegada",
}) {
  const perfil = carregarPerfil();
  const faixa = faixaDoDia();
  const pendentes = pendentesRelevantes(habitos.filter(estaPendente), faixa);
  const excluir = new Set(excluirIds);

  let intro = introContextual(contexto, faixa);
  if (contexto === "chegada" && ehDiaEscola(perfil) && ehHorarioDificil(perfil)) {
    intro = "Boa chegada. O cérebro decide melhor com poucas opções — escolha só uma.";
  }

  const fila = [];

  if (faixa === "madrugada" || contexto === "noite") {
    fila.push(opcaoDescansoNoturno());
    fila.push(opcaoDiarioNoturno());
  }

  avisosPendentes(avisos, chave).forEach((aviso) => {
    if (!horarioRelevanteAgora(aviso.hora, { antesMin: 15, depoisMin: 60 }) && faixa === "madrugada") {
      return;
    }
    fila.push({
      id: `aviso-${aviso.id}`,
      tipo: "aviso",
      titulo: aviso.titulo,
      passo: `Lembrete às ${aviso.hora}`,
      rotuloBotao: "Ok, anotei",
      avisoId: aviso.id,
      peso: horarioRelevanteAgora(aviso.hora) ? 100 : 40,
      contexto: "Aviso de hoje",
    });
  });

  prioridadesDoDia(chave).forEach((pid) => {
    const h = pendentes.find((p) => String(p.id) === String(pid));
    if (h) fila.push(habitoParaOpcao(h, "Sua prioridade de hoje", 92));
  });

  if (contexto === "chegada") {
    const organizar = pendentes.find(ehOrganizarChegada);
    if (organizar) fila.push(habitoParaOpcao(organizar, "Rotina ao chegar", 96));
  }

  if (contexto === "acordar") {
    pendentes.filter(ehHabitoManha).slice(0, 2).forEach((h) => {
      fila.push(habitoParaOpcao(h, "Bom começo de dia", 94));
    });
  }

  if (contexto === "tarefa") {
    const aprender = pendentes.find(detectarHabitoAprender);
    if (aprender) {
      fila.push({
        ...habitoParaOpcao(aprender, "Estudo leve", 80),
        passo: PLANO_B_APRENDER,
        rotuloBotao: "2 min de estudo",
      });
    }
    fila.push(opcaoDescanso());
  }

  pendentes
    .filter((h) => Number(h.importancia) === 1 && h.horario && horarioRelevanteAgora(h.horario))
    .forEach((h) => {
      if (!fila.some((f) => f.habitoId === h.id)) {
        const ctx = ehHabitoTrabalhoPraia(h) ? "Horário do trabalho" : "Horário de agora";
        fila.push(habitoParaOpcao(h, ctx, 85));
      }
    });

  if (contexto !== "noite" && faixa !== "madrugada") {
    const aprender = pendentes.find(detectarHabitoAprender);
    if (aprender && !fila.some((f) => f.habitoId === aprender.id)) {
      fila.push({
        ...habitoParaOpcao(aprender, "Estudo leve", 72),
        passo: PLANO_B_APRENDER,
        rotuloBotao: "2 min de estudo",
        timerSeg: 120,
      });
    }
  }

  pendentes
    .filter((h) => !ehHabitoTrabalhoPraia(h) || horarioRelevanteAgora(h.horario))
    .slice(0, 4)
    .forEach((h) => {
      if (!fila.some((f) => f.habitoId === h.id)) {
        fila.push(habitoParaOpcao(h, `Pendente · ${rotuloFaixa(faixa)}`, 35));
      }
    });

  if (faixa === "madrugada") {
    const praia = habitos.filter(estaPendente).find(ehHabitoTrabalhoPraia);
    if (praia?.horario) {
      fila.push({
        id: "lembrete-praia",
        tipo: "aviso",
        titulo: `${praia.nome} não é agora`,
        passo: `Isso é para perto das ${praia.horario}. Agora descanse — são ${String(minutosAgora()).padStart(2, "0")} min da meia-noite.`,
        rotuloBotao: "Entendi",
        peso: 70,
        contexto: "Contexto",
      });
    }
  }

  fila.sort((a, b) => b.peso - a.peso);

  const unicos = [];
  const vistos = new Set();
  for (const item of fila) {
    if (excluir.has(item.id)) continue;
    const key = item.habitoId || item.avisoId || item.id;
    if (vistos.has(key)) continue;
    vistos.add(key);
    unicos.push(item);
  }

  let opcaoA = unicos[0] || null;
  let opcaoB = unicos[1] || null;

  if (opcaoA && !opcaoB) {
    opcaoB = faixa === "madrugada" || contexto === "noite" ? opcaoDiarioNoturno() : opcaoDescanso();
    if (excluir.has(opcaoB.id)) opcaoB = null;
  }

  if (!opcaoA) {
    opcaoA =
      faixa === "madrugada"
        ? opcaoDescansoNoturno()
        : {
            id: "tudo-ok",
            tipo: "ok",
            titulo: "Tudo feito por agora",
            passo: "Pode relaxar sem culpa.",
            rotuloBotao: "Ótimo",
            peso: 0,
            contexto: "Sem pendências",
          };
    opcaoB =
      faixa === "madrugada"
        ? opcaoDiarioNoturno()
        : {
            id: "estudo-opcional",
            tipo: "painel",
            titulo: "Quer aprender um pouco?",
            passo: "Só se tiver vontade — 2 min na aba Estudo.",
            rotuloBotao: "Abrir Estudo",
            painel: "estudo",
            peso: 0,
            contexto: "Opcional",
          };
    if (excluir.has(opcaoB.id)) opcaoB = null;
  }

  if (opcaoA && opcaoB && opcaoA.id === opcaoB.id) {
    opcaoB = opcaoDescanso();
  }

  return { intro, opcaoA, opcaoB, contexto, faixa };
}

export function renderChegueiInicio() {
  const faixa = faixaDoDia();
  const apoio =
    faixa === "madrugada"
      ? "É madrugada — nada de trabalho pesado. Diga o que acabou de acontecer:"
      : "Sem lista enorme — diga o que acabou de acontecer e eu monto 2 opções.";

  const botoes = GATILHOS_CHEGUEI.map(
    (g) =>
      `<button type="button" class="cheguei-gatilho" data-cheguei-contexto="${g.id}">
        <span class="cheguei-gatilho-emoji">${g.emoji}</span>
        <span class="cheguei-gatilho-rotulo">${esc(g.rotulo)}</span>
      </button>`
  ).join("");

  const vozBtn = `<button type="button" class="cheguei-voz" data-cheguei-voz aria-label="Falar o que aconteceu">
      <span class="cheguei-voz-emoji">🎤</span>
      <span class="cheguei-voz-rotulo">Falar — eu entendo</span>
    </button>`;

  return `
    <section class="cheguei-bloco">
      <p class="cheguei-ola">E agora?</p>
      <p class="cheguei-apoio">${apoio}</p>
      ${vozBtn}
      <p class="cheguei-ou-voz">ou escolha:</p>
      <div class="cheguei-gatilhos" role="list">${botoes}</div>
    </section>`;
}

function renderOpcaoCard(opcao, letra) {
  if (!opcao) return "";
  const ctx = opcao.contexto ? `<span class="cheguei-opcao-ctx">${esc(opcao.contexto)}</span>` : "";
  return `
    <button type="button" class="cheguei-opcao" data-cheguei-escolha="${esc(opcao.id)}">
      <span class="cheguei-opcao-letra">${letra}</span>
      ${ctx}
      <span class="cheguei-opcao-titulo">${esc(opcao.titulo)}</span>
      <span class="cheguei-opcao-passo">${esc(opcao.passo)}</span>
      <span class="cheguei-opcao-btn">${esc(opcao.rotuloBotao)}</span>
    </button>`;
}

export function renderChegueiOpcoes({ intro, opcaoA, opcaoB, ia }) {
  const badge = ia ? '<span class="cheguei-intro-ia">✨ ajustado pela IA</span>' : "";
  return `
    <section class="cheguei-bloco">
      <p class="cheguei-intro">${esc(intro)}${badge}</p>
      <div class="cheguei-dupla">
        ${renderOpcaoCard(opcaoA, "A")}
        ${opcaoB ? `<p class="cheguei-ou">ou</p>${renderOpcaoCard(opcaoB, "B")}` : ""}
      </div>
      <button type="button" class="botao-texto cheguei-reiniciar" data-cheguei-acao="reiniciar">
        Outra situação
      </button>
    </section>`;
}

export function renderChegueiFeito(mensagem) {
  return `
    <section class="cheguei-bloco cheguei-feito">
      <p class="cheguei-feito-titulo">Boa.</p>
      <p class="cheguei-feito-texto">${esc(mensagem)}</p>
      <div class="cheguei-feito-acoes">
        <button type="button" class="botao-secundario" data-cheguei-acao="mais">Ver mais 2 opções</button>
        <button type="button" class="botao-texto" data-cheguei-acao="reiniciar">Outra situação</button>
      </div>
    </section>`;
}
