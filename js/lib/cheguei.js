// Cheguei em casa — no máximo 2 opções (menos sobrecarga cognitiva)

import { PLANO_B_APRENDER, detectarHabitoAprender } from "./aprender.js";
import { avisosPendentes } from "./avisos-agenda.js";
import { listaMicroPassos, textoPlanoB } from "./habitos.js";
import { carregarPerfil, ehDiaEscola, minutosAgora } from "./perfil.js";
import { ehHorarioDificil } from "./tarde.js";
import { prioridadesDoDia } from "./tdah.js";

function ehOrganizarChegada(habito) {
  return /organizar|chegar|chegada|mochila/i.test(habito.nome || "");
}

function horarioProximo(hhmm, janelaMin = 90) {
  if (!hhmm || !/^\d{2}:\d{2}$/.test(hhmm)) return false;
  const [hh, mm] = hhmm.split(":").map(Number);
  const alvo = hh * 60 + mm;
  const agora = minutosAgora();
  return alvo >= agora - 20 && alvo <= agora + janelaMin;
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

export function montarOpcoesCheguei({
  habitos,
  avisos,
  chave,
  estaPendente,
  excluirIds = [],
}) {
  const perfil = carregarPerfil();
  const pendentes = habitos.filter(estaPendente);
  const excluir = new Set(excluirIds);

  const intro =
    ehDiaEscola(perfil) && ehHorarioDificil(perfil)
      ? "Boa chegada. O cérebro decide melhor com poucas opções — escolha só uma."
      : "Escolha uma opção. Não precisa fazer as duas.";

  const fila = [];

  avisosPendentes(avisos, chave).forEach((aviso) => {
    fila.push({
      id: `aviso-${aviso.id}`,
      tipo: "aviso",
      titulo: aviso.titulo,
      passo: `Lembrete às ${aviso.hora}`,
      rotuloBotao: "Ok, anotei",
      avisoId: aviso.id,
      peso: horarioProximo(aviso.hora) ? 100 : 55,
      contexto: "Aviso de hoje",
    });
  });

  prioridadesDoDia(chave).forEach((pid) => {
    const h = pendentes.find((p) => String(p.id) === String(pid));
    if (h) fila.push(habitoParaOpcao(h, "Sua prioridade de hoje", 92));
  });

  const organizar = pendentes.find(ehOrganizarChegada);
  if (organizar) fila.push(habitoParaOpcao(organizar, "Rotina ao chegar", 96));

  pendentes
    .filter((h) => Number(h.importancia) === 1 && h.horario && horarioProximo(h.horario))
    .forEach((h) => {
      if (!fila.some((f) => f.habitoId === h.id)) {
        fila.push(habitoParaOpcao(h, "Horário de agora", 85));
      }
    });

  const aprender = pendentes.find(detectarHabitoAprender);
  if (aprender) {
    fila.push({
      ...habitoParaOpcao(aprender, "Estudo leve", 72),
      passo: PLANO_B_APRENDER,
      rotuloBotao: "2 min de estudo",
      timerSeg: 120,
    });
  }

  pendentes.slice(0, 3).forEach((h) => {
    if (!fila.some((f) => f.habitoId === h.id)) {
      fila.push(habitoParaOpcao(h, "Pendente hoje", 40));
    }
  });

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
    opcaoB = opcaoDescanso();
    if (excluir.has(opcaoB.id)) opcaoB = null;
  }

  if (!opcaoA) {
    opcaoA = {
      id: "tudo-ok",
      tipo: "ok",
      titulo: "Tudo feito por agora",
      passo: "Pode relaxar sem culpa. Você já fez o que dava hoje.",
      rotuloBotao: "Ótimo",
      peso: 0,
      contexto: "Sem pendências",
    };
    opcaoB = {
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

  if (opcaoA && opcaoB && opcaoA.id === opcaoB.id) opcaoB = opcaoDescanso();

  return { intro, opcaoA, opcaoB };
}

export function renderChegueiInicio() {
  return `
    <section class="cheguei-bloco">
      <p class="cheguei-ola">Você chegou.</p>
      <p class="cheguei-apoio">Sem lista enorme — só o próximo passo, em duas opções no máximo.</p>
      <button type="button" class="botao-primario cheguei-cta" data-cheguei-acao="mostrar">
        Acabei de chegar em casa
      </button>
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

export function renderChegueiOpcoes({ intro, opcaoA, opcaoB }) {
  return `
    <section class="cheguei-bloco">
      <p class="cheguei-intro">${esc(intro)}</p>
      <div class="cheguei-dupla">
        ${renderOpcaoCard(opcaoA, "A")}
        ${opcaoB ? `<p class="cheguei-ou">ou</p>${renderOpcaoCard(opcaoB, "B")}` : ""}
      </div>
      <button type="button" class="botao-texto cheguei-reiniciar" data-cheguei-acao="reiniciar">
        Não é isso — mostrar de novo
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
        <button type="button" class="botao-texto" data-cheguei-acao="reiniciar">Cheguei de novo</button>
      </div>
    </section>`;
}
