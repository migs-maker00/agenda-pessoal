import {
  CONTEXTO_APRENDER,
  MICRO_APRENDER,
  MICRO_VOCABULARIO,
  PLANO_B_APRENDER,
  PLANO_B_VOCABULARIO,
} from "./aprender.js";
import { PERFIL_PADRAO, hhmmParaMinutos } from "./perfil.js";

const HORARIOS_AGUA_FALLBACK = [
  "06:15", "09:30", "12:00", "15:30", "18:00", "21:00",
];

export function minutosParaHhmm(min) {
  const normalizado = ((Math.round(min) % 1440) + 1440) % 1440;
  const h = Math.floor(normalizado / 60);
  const m = normalizado % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function somarMinutos(hhmm, delta) {
  return minutosParaHhmm(hhmmParaMinutos(hhmm) + delta);
}

export function arredondar15(hhmm) {
  const m = hhmmParaMinutos(hhmm);
  return minutosParaHhmm(Math.round(m / 15) * 15);
}

function normalizarPerfil(perfil = {}) {
  return { ...PERFIL_PADRAO, ...perfil };
}

/** 6 lembretes de água entre acordar+30min e dormir−90min */
export function horariosAguaDoPerfil(perfil) {
  const p = normalizarPerfil(perfil);
  const inicio = hhmmParaMinutos(p.acordar) + 30;
  const fim = hhmmParaMinutos(p.dormir) - 90;
  if (fim <= inicio) return [...HORARIOS_AGUA_FALLBACK];

  const total = 6;
  const passo = (fim - inicio) / (total - 1);
  const slots = [];
  for (let i = 0; i < total; i++) {
    slots.push(arredondar15(minutosParaHhmm(inicio + passo * i)));
  }
  return [...new Set(slots)];
}

/** Prioridades do dia conforme o que a pessoa disse que importa */
export function prioridadesPresetDoPerfil(perfil) {
  const texto = (perfil?.prioridadesVida || []).join(" ").toLowerCase();
  const ordem = [];

  if (/organiz|rotina|ordem|estrutur/.test(texto)) ordem.push("organizar");
  if (/conhec|aprend|estud|saber/.test(texto)) ordem.push("aprender");
  if (/sa[uú]de|agua|água|corpo|sono/.test(texto)) ordem.push("agua");

  for (const pid of ["organizar", "aprender", "agua"]) {
    if (!ordem.includes(pid)) ordem.push(pid);
  }
  return ordem.slice(0, 3);
}

export function textosPlanejadorDoPerfil(perfil) {
  const p = normalizarPerfil(perfil);
  const prioridades = (p.prioridadesVida || []).join(", ");
  const diasEscola = (p.escolaDias || [1, 2, 3, 4, 5])
    .map((d) => ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"][d])
    .join(", ");

  return {
    perfil: `Prioridades: ${prioridades || "rotina equilibrada"}. Acordo às ${p.acordar}. Tenho TDAH — esqueço, demoro a começar e perco a noção do tempo.`,
    horarios: `Escola ${diasEscola}: ${p.escolaInicio}–${p.escolaFim}, chego ~${p.chegadaCasa}. Tarde difícil ${p.tardeDificilInicio}–${p.tardeDificilFim}. Durmo ~${p.dormir}.${
      p.trabalhoPraiaFimSemana ? " Trabalho na praia sáb/dom quando faz sol." : ""
    }`,
    objetivos:
      "Água ao longo do dia, organizar ao chegar, bloco de estudo após a tarde difícil, prática do livro, vocabulário, movimento e rotina de sono.",
  };
}

/**
 * Monta hábitos da rotina com horários e dias calculados do perfil.
 * @returns {Array<object>} modelos com `presetId`
 */
export function montarRotinaDoPerfil(perfil) {
  const p = normalizarPerfil(perfil);
  const diasEscola = p.escolaDias || [1, 2, 3, 4, 5];
  const horariosAgua = horariosAguaDoPerfil(p);

  const manha = arredondar15(somarMinutos(p.acordar, -15));
  const chegadaOrganizar = arredondar15(somarMinutos(p.chegadaCasa, 30));
  const aprender = arredondar15(p.tardeDificilFim);
  const praticaLivro = arredondar15(somarMinutos(aprender, 10));
  const vocabulario = arredondar15(somarMinutos(aprender, 20));
  const academia = arredondar15(somarMinutos(p.tardeDificilFim, 30));
  const telas = arredondar15(somarMinutos(p.dormir, -60));
  const sono = arredondar15(p.dormir);

  const habitos = [
    {
      presetId: "agua",
      nome: "Beber água",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: horariosAgua[0],
      importancia: 1,
      lembretes: horariosAgua.length,
      horariosLembretes: horariosAgua,
      contextoLembrete: `Um copo agora — ${horariosAgua.length} lembretes entre ${horariosAgua[0]} e ${horariosAgua[horariosAgua.length - 1]}.`,
    },
    {
      presetId: "organizar",
      nome: "Organizar ao chegar (10 min)",
      categoria: "Geral",
      metaSemanal: 5,
      horario: chegadaOrganizar,
      importancia: 1,
      diasAtivos: diasEscola,
      microPassos: [
        "Tirar mochila e material",
        "Separar o que precisa amanhã",
        "Mesa limpa para aprender",
      ],
      planoB: "Só tirar a mochila e pegar 1 coisa pra amanhã.",
      preparar: ["Mochila perto da porta", "Lista do que falta"],
      contextoLembrete: `Chegou ~${p.chegadaCasa} — 10 min antes de relaxar/jogar.`,
    },
    {
      presetId: "aprender",
      nome: "Aprender 15 min",
      categoria: "Estudo",
      metaSemanal: 5,
      horario: aprender,
      importancia: 1,
      diasAtivos: diasEscola,
      microPassos: [...MICRO_APRENDER],
      planoB: PLANO_B_APRENDER,
      preparar: ["Fone ou alto-falante", "Água por perto", "Celular longe"],
      contextoLembrete: `${CONTEXTO_APRENDER} Começa às ${aprender}, quando a tarde difícil acaba.`,
    },
    {
      presetId: "praticalivro",
      nome: "Prática do livro (10 min)",
      categoria: "Estudo",
      metaSemanal: 5,
      horario: praticaLivro,
      importancia: 2,
      diasAtivos: diasEscola,
      microPassos: ["Abrir Estudo → Livros", "Responder 3 questões", "Aplicar 1 ideia hoje"],
      planoB: "Só 1 questão e pensar na resposta.",
      contextoLembrete: "Aprender na prática — sem precisar ler o capítulo.",
    },
    {
      presetId: "vocabulario",
      nome: "Vocabulário 5 min",
      categoria: "Estudo",
      metaSemanal: 5,
      horario: vocabulario,
      importancia: 2,
      diasAtivos: diasEscola,
      microPassos: [...MICRO_VOCABULARIO],
      planoB: PLANO_B_VOCABULARIO,
      contextoLembrete: "Falar em voz alta fixa mais que ler.",
    },
    {
      presetId: "academia",
      nome: "Academia",
      categoria: "Saúde",
      metaSemanal: 3,
      horario: academia,
      importancia: 2,
      diasAtivos: [1, 3, 5],
      microPassos: ["Vestir roupa", "Ir até a academia", "15 min de movimento"],
      planoB: "Só se vestir e ir — 15 min na esteira já vale.",
      contextoLembrete: `Sem pressão — só aparecer às ${academia}.`,
    },
    {
      presetId: "telas",
      nome: "Desligar telas",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: telas,
      importancia: 2,
      planoB: "Celular em outro cômodo por 5 min.",
      contextoLembrete: `Hora de desacelerar — meta dormir às ${sono}.`,
    },
    {
      presetId: "sono",
      nome: "Dormir no horário",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: sono,
      importancia: 1,
      planoB: "Deitar e fechar os olhos — sem pressão para dormir já.",
      contextoLembrete: `Rotina de sono — deitar até ${sono}.`,
    },
    {
      presetId: "manha",
      nome: "Planejar o dia (2 min)",
      categoria: "Geral",
      metaSemanal: 5,
      horario: manha,
      importancia: 2,
      diasAtivos: diasEscola,
      microPassos: ["Abrir a agenda", "Escrever 3 focos do dia", "Fechar"],
      planoB: "Só abrir a agenda e ver o que tem hoje.",
      contextoLembrete: `2 minutos às ${manha} — o que importa hoje?`,
    },
  ];

  if (p.trabalhoPraiaFimSemana) {
    habitos.push({
      presetId: "praia",
      nome: "Preparar trabalho na praia",
      categoria: "Trabalho",
      metaSemanal: 2,
      horario: "09:15",
      importancia: 2,
      diasAtivos: [0, 6],
      microPassos: ["Ver o tempo", "Separar roupa e protetor", "Sair no horário"],
      planoB: "Só ver o tempo e separar a bolsa.",
      contextoLembrete: "Fim de semana — preparar com calma.",
    });
  }

  return habitos;
}

/** Linhas curtas para preview em Ajustes */
export function previewRotinaDoPerfil(perfil) {
  return montarRotinaDoPerfil(perfil).map((h) => ({
    presetId: h.presetId,
    nome: h.nome,
    horario: h.horario,
    dias:
      h.diasAtivos?.length === 7 || !h.diasAtivos
        ? "todo dia"
        : h.diasAtivos.length === 5 && h.diasAtivos.join() === "1,2,3,4,5"
          ? "seg–sex"
          : h.diasAtivos.length === 2 && h.diasAtivos.join() === "0,6"
            ? "sáb–dom"
            : `${h.diasAtivos.length}x/sem`,
  }));
}
