// Lógica inteligente do app — sugestões, resumos e alertas (sem API externa)

import { t } from "./i18n.js";
const REGRAS_CATEGORIA = [
  {
    categoria: "Saúde",
    palavras: [
      "caminh", "correr", "corrida", "água", "agua", "dormir", "sono", "meditar",
      "meditação", "yoga", "exerc", "academia", "alongar", "vitamina", "fruta",
      "salada", "remédio", "remedio", "saúde", "saude", "hidrata",
    ],
  },
  {
    categoria: "Estudo",
    palavras: [
      "ler", "livro", "estud", "aprend", "vocabul", "vídeo", "video", "áudio", "audio", "podcast",
      "curso", "inglês", "ingles", "aprender", "revisar",
      "aula", "prova", "redação", "redacao", "matéria", "materia", "faculdade",
      "universidade", "código", "codigo", "programar",
    ],
  },
  {
    categoria: "Trabalho",
    palavras: [
      "trabalh", "email", "e-mail", "reunião", "reuniao", "projeto", "foco",
      "relatório", "relatorio", "cliente", "tarefa", "escritório", "escritorio",
      "deep work", "produtiv",
    ],
  },
  {
    categoria: "Lazer",
    palavras: [
      "tocar", "jogar", "música", "musica", "hobby", "desenhar", "pintar",
      "filme", "série", "serie", "amigos", "família", "familia", "passear",
      "viagem", "fotograf",
    ],
  },
];

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function sugerirHabito(nome) {
  const texto = normalizarTexto(nome);
  let categoria = "Geral";
  let metaSemanal = 7;
  let horario = "";
  let lembretes = 0;
  let dica = "";

  if (/agua|litro|hidrata/.test(texto)) {
    categoria = "Saúde";
    metaSemanal = 7;
    lembretes = 6;
    dica = "Um passo só, com vários toques leves — sem pressão.";
  } else {
    for (const regra of REGRAS_CATEGORIA) {
      if (regra.palavras.some((p) => texto.includes(normalizarTexto(p)))) {
        categoria = regra.categoria;
        break;
      }
    }
  }

  if (/\b(1x|uma vez|1 vez)\b/.test(texto) || /semanal/.test(texto)) {
    metaSemanal = 1;
  } else if (/\b(2x|duas vezes|2 vezes)\b/.test(texto) || /fim de semana/.test(texto)) {
    metaSemanal = 2;
  } else if (/\b(3x|três vezes|3 vezes)\b/.test(texto)) {
    metaSemanal = 3;
  } else if (/\b(4x|quatro vezes|4 vezes)\b/.test(texto)) {
    metaSemanal = 4;
  } else if (/\b(5x|cinco vezes|5 vezes)\b/.test(texto)) {
    metaSemanal = 5;
  } else if (/\b(6x|seis vezes|6 vezes)\b/.test(texto)) {
    metaSemanal = 6;
  } else if (/todo dia|diário|diario|diariamente/.test(texto)) {
    metaSemanal = 7;
  } else if (categoria === "Lazer") {
    metaSemanal = 3;
  } else if (categoria === "Saúde" && /caminh|correr|academia|exerc/.test(texto)) {
    metaSemanal = 5;
  }

  const horaMatch = nome.match(/(?:às|as)\s*(\d{1,2})(?::(\d{2}))?\s*h?/i);
  if (horaMatch) {
    const h = horaMatch[1].padStart(2, "0");
    const m = (horaMatch[2] || "00").padStart(2, "0");
    horario = `${h}:${m}`;
  } else if (!/agua|litro|hidrata/.test(texto)) {
    if (/manha|manhã|cedo|ao acordar|6h|7h|08:|07:|06:/.test(texto)) {
      horario = "07:00";
    } else if (/tarde|almoco|almoço|12h|13h|14:|15:/.test(texto)) {
      horario = "14:00";
    } else if (/noite|jantar|antes de dormir|20h|21h|22h|19:|20:|21:|22:/.test(texto)) {
      horario = "20:00";
    } else if (/medita|silencio/.test(texto)) {
      horario = "06:15";
    } else if (/video|vídeo|audio|áudio|podcast|vocabul/.test(texto)) {
      horario = "19:00";
    } else if (/caminh|correr|academia|exerc/.test(texto)) {
      horario = "07:00";
    } else if (categoria === "Estudo") {
      horario = "19:00";
    } else if (categoria === "Trabalho") {
      horario = "09:00";
    }
  }

  return { categoria, metaSemanal, horario, lembretes, dica };
}

function rotuloMeta(meta) {
  if (meta === 7) return "todo dia";
  if (meta === 1) return "1x/semana";
  return `${meta}x/semana`;
}

function textoSugestao(sugestao) {
  const partes = [`Categoria: ${sugestao.categoria}`, `Meta: ${rotuloMeta(sugestao.metaSemanal)}`];
  if (sugestao.lembretes > 1) {
    partes.push(`${sugestao.lembretes} lembretes no mesmo hábito`);
  } else if (sugestao.horario) {
    partes.push(`Horário: ${sugestao.horario}`);
  } else if (!sugestao.dica) {
    partes.push("Horário: você escolhe");
  }
  if (sugestao.dica) partes.push(sugestao.dica);
  return partes.join(" · ");
}

function gerarResumoSemana(stats) {
  if (stats.totalHabitos === 0) {
    return t("semana.resumo.vazio");
  }

  const partes = [];

  partes.push(t("semana.resumo.media", { pct: stats.mediaConclusao }));

  if (stats.melhorDia.pct > 0) {
    partes.push(
      t("semana.resumo.melhor.dia", { dia: stats.melhorDia.nome, pct: stats.melhorDia.pct })
    );
  }

  if (stats.melhorCategoria && stats.melhorCategoria.pct > 0) {
    partes.push(
      t("semana.resumo.melhor.categoria", {
        nome: stats.melhorCategoria.nome,
        pct: stats.melhorCategoria.pct,
      })
    );
  }

  if (stats.fracaCategoria && stats.fracaCategoria.pct < stats.melhorCategoria.pct) {
    partes.push(
      t("semana.resumo.fraca.categoria", {
        nome: stats.fracaCategoria.nome,
        pct: stats.fracaCategoria.pct,
      })
    );
  }

  if (stats.metasCumpridas > 0) {
    partes.push(
      t("semana.resumo.metas", { cumpridas: stats.metasCumpridas, total: stats.metasTotal })
    );
  }

  if (stats.habitoMaisForte) {
    partes.push(t("semana.resumo.habito.forte", { nome: stats.habitoMaisForte.nome }));
  }

  if (stats.mediaConclusao >= 80) {
    partes.push(t("semana.resumo.nota.alta"));
  } else if (stats.mediaConclusao >= 50) {
    partes.push(t("semana.resumo.nota.media"));
  } else if (stats.mediaConclusao > 0) {
    partes.push(t("semana.resumo.nota.baixa"));
  }

  return partes.join(" ");
}

function complementoCoachDiario(notaOntem) {
  if (!notaOntem) return "";

  const texto = normalizarTexto(notaOntem);
  const negativos = ["cansad", "difícil", "dificil", "estresse", "ansied", "mal", "pesad", "trav"];
  const positivos = ["bem", "ótimo", "otimo", "feliz", "produtiv", "leve", "grato", "motivad", "fácil", "facil"];

  if (negativos.some((p) => texto.includes(p))) {
    return t("hoje.filosofia.coach.pesado");
  }
  if (positivos.some((p) => texto.includes(p))) {
    return t("hoje.filosofia.coach.bom");
  }
  if (notaOntem.length > 40) {
    return t("hoje.filosofia.coach.reflexao");
  }
  return "";
}

export {
  sugerirHabito,
  textoSugestao,
  gerarResumoSemana,
  complementoCoachDiario,
};
