/** Desenvolvimento cognitivo — dados, adaptação e continuidade (local-first). */

export const CHAVE_COGNITIVO = "cognitivo-v1";

export const BLOCOS = [
  { id: "raciocinio", minutos: 20 },
  { id: "aprendizagem", minutos: 15 },
  { id: "memoria", minutos: 10 },
  { id: "explicacao", minutos: 10 },
  { id: "reflexao", minutos: 5 },
];

export const AREAS = [
  "matematica",
  "logica",
  "programacao",
  "ingles",
  "ciencia",
  "geral",
];

const NIVEL_NOMES = ["Fundamentos", "Aplicação", "Integração", "Problemas complexos", "Transferência"];

const BANCO = {
  matematica: [
    { d: 2, topico: "aritmetica", enunciado: "Quanto é 17 × 4?", resposta: "68", opcoes: ["64", "68", "72", "56"] },
    { d: 3, topico: "probabilidade", enunciado: "Dado justo: probabilidade de sair par?", resposta: "1/2", opcoes: ["1/6", "1/3", "1/2", "2/3"] },
    { d: 4, topico: "probabilidade", enunciado: "Urna: 3 vermelhas, 2 azuis. P(azul)?", resposta: "2/5", opcoes: ["1/5", "2/5", "3/5", "1/2"] },
    { d: 5, topico: "probabilidade", enunciado: "Dois dados: P(soma = 7)?", resposta: "1/6", opcoes: ["1/12", "1/6", "1/4", "7/36"] },
    { d: 6, topico: "probabilidade", enunciado: "P(A)=0,3 e P(B)=0,5 independentes. P(A e B)?", resposta: "0,15", opcoes: ["0,08", "0,15", "0,35", "0,80"] },
    { d: 4, topico: "padroes", enunciado: "Sequência 2, 4, 8, 16… próximo?", resposta: "32", opcoes: ["24", "32", "20", "18"] },
    { d: 5, topico: "padroes", enunciado: "Sequência 1, 1, 2, 3, 5… próximo?", resposta: "8", opcoes: ["6", "7", "8", "9"] },
    { d: 7, topico: "estrategia", enunciado: "Caixas: 3 tipos, 2 iguais pesam igual. Quantas pesagens mínimas p/ achar a mais leve entre 9?", resposta: "2", opcoes: ["1", "2", "3", "4"] },
  ],
  logica: [
    { d: 3, topico: "silogismo", enunciado: "Todos A são B. X é A. Conclusão?", resposta: "X é B", opcoes: ["X é B", "X não é B", "Alguns B são A", "Indeterminado"] },
    { d: 4, topico: "silogismo", enunciado: "Nenhum peixe é mamífero. Baleia é mamífero. Baleia é peixe?", resposta: "Falso", opcoes: ["Verdadeiro", "Falso", "Talvez", "Indeterminado"] },
    { d: 5, topico: "deducao", enunciado: "Se chove, a rua fica molhada. Rua seca. Choveu?", resposta: "Não", opcoes: ["Sim", "Não", "Talvez", "Indeterminado"] },
    { d: 6, topico: "deducao", enunciado: "A→B, B→C, ¬C. Conclusão sobre A?", resposta: "¬A", opcoes: ["A", "¬A", "C", "Indeterminado"] },
    { d: 4, topico: "padroes", enunciado: "▲ ● ▲ ● ▲ … próximo?", resposta: "●", opcoes: ["▲", "●", "■", "◆"] },
  ],
  programacao: [
    { d: 3, topico: "logica", enunciado: "x=3; x+=2. Valor final?", resposta: "5", opcoes: ["3", "5", "6", "32"] },
    { d: 4, topico: "logica", enunciado: "for i 1..3: soma+=i. soma inicial 0. Resultado?", resposta: "6", opcoes: ["3", "6", "9", "0"] },
    { d: 5, topico: "estrategia", enunciado: "Busca em lista ordenada (100 itens): pior caso comparações (binária)?", resposta: "7", opcoes: ["10", "7", "50", "100"] },
    { d: 6, topico: "estrategia", enunciado: "Pilha LIFO: push 1,2,3; pop. Valor?", resposta: "3", opcoes: ["1", "2", "3", "Erro"] },
  ],
  ingles: [
    { d: 2, topico: "vocabulario", enunciado: '"Improve" significa…', resposta: "melhorar", opcoes: ["melhorar", "piorar", "esquecer", "copiar"] },
    { d: 4, topico: "gramatica", enunciado: "She ___ studying for two hours.", resposta: "has been", opcoes: ["is", "has been", "was", "will"] },
    { d: 5, topico: "compreensao", enunciado: '"Despite the rain" indica…', resposta: "contraste", opcoes: ["causa", "contraste", "tempo", "lugar"] },
  ],
  ciencia: [
    { d: 3, topico: "metodo", enunciado: "Hipótese testável vem antes de…", resposta: "experimento", opcoes: ["conclusão", "experimento", "publicação", "opinião"] },
    { d: 5, topico: "fisica", enunciado: "Objeto em repouso: força resultante?", resposta: "zero", opcoes: ["zero", "máxima", "desconhecida", "infinita"] },
    { d: 6, topico: "estatistica", enunciado: "Correlação alta implica causalidade?", resposta: "Não", opcoes: ["Sim", "Não", "Sempre", "Depende"] },
  ],
  geral: [
    { d: 3, topico: "estrategia", enunciado: "Problema grande: primeiro passo mais útil?", resposta: "Decompor", opcoes: ["Decompor", "Desistir", "Adivinhar", "Copiar"] },
    { d: 4, topico: "memoria", enunciado: "Recuperação ativa é mais eficaz que…", resposta: "releitura", opcoes: ["releitura", "descanso", "exercício", "sono"] },
    { d: 5, topico: "aprendizagem", enunciado: "Explicar com palavras próprias ajuda…", resposta: "compreensão", opcoes: ["compreensão", "velocidade", "memória fotográfica", "sorte"] },
  ],
};

const CONCEITOS_ESTUDO = {
  matematica: [
    { d: 3, titulo: "Probabilidade básica", resumo: "P(evento) = casos favoráveis / casos possíveis (equiprovável)." },
    { d: 5, titulo: "Regra de Bayes (intuição)", resumo: "Atualize crença: evidência nova altera probabilidade anterior." },
    { d: 4, titulo: "Sequências e padrões", resumo: "Identifique regra (aritmética, geométrica, Fibonacci…) antes de extrapolar." },
  ],
  logica: [
    { d: 3, titulo: "Silogismo", resumo: "Premissas + regra → conclusão válida (ou inválida)." },
    { d: 5, titulo: "Contrapositiva", resumo: "A→B equivale a ¬B→¬A." },
  ],
  programacao: [
    { d: 3, titulo: "Variável e estado", resumo: "Nome para valor que muda ao longo do programa." },
    { d: 5, titulo: "Complexidade O(log n)", resumo: "Dobra entradas → +1 passo (busca binária)." },
  ],
  ingles: [
    { d: 3, titulo: "Present perfect continuous", resumo: "Ação começou no passado e continua ou acabou agora." },
  ],
  ciencia: [
    { d: 4, titulo: "Método científico", resumo: "Observar → hipótese → testar → revisar." },
  ],
  geral: [
    { d: 3, titulo: "Recuperação ativa", resumo: "Tentar lembrar sem olhar a fonte fixa melhor que reler." },
  ],
};

function hojeStr() {
  return new Date().toISOString().slice(0, 10);
}

function gerarId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function estadoInicialCognitivo() {
  return {
    objetivo: "",
    areaFoco: "matematica",
    dificuldade: 5,
    nivelCompetencia: 1,
    sessao: {
      data: hojeStr(),
      blocoAtual: null,
      blocos: Object.fromEntries(BLOCOS.map((b) => [b.id, false])),
      desempenho: {},
      rascunhos: {},
    },
    continuidade: { topico: "", area: "", ultimoDesempenho: "" },
    conhecimento: [],
    eventos: [],
    metricas: {
      sessoesConcluidas: 0,
      acertos: 0,
      total: 0,
      porArea: {},
    },
  };
}

export function carregarCognitivo() {
  try {
    const raw = JSON.parse(localStorage.getItem(CHAVE_COGNITIVO) || "null");
    if (!raw || typeof raw !== "object") return estadoInicialCognitivo();
    const base = estadoInicialCognitivo();
    return {
      ...base,
      ...raw,
      sessao: { ...base.sessao, ...(raw.sessao || {}) },
      continuidade: { ...base.continuidade, ...(raw.continuidade || {}) },
      metricas: { ...base.metricas, ...(raw.metricas || {}) },
      conhecimento: Array.isArray(raw.conhecimento) ? raw.conhecimento : [],
      eventos: Array.isArray(raw.eventos) ? raw.eventos.slice(-120) : [],
    };
  } catch {
    return estadoInicialCognitivo();
  }
}

export function salvarCognitivo(dados) {
  localStorage.setItem(CHAVE_COGNITIVO, JSON.stringify(dados));
}

export function resetSessaoCognitivoSeNovoDia(dados, chave = hojeStr()) {
  if (dados.sessao?.data === chave) return dados;
  const blocos = Object.fromEntries(BLOCOS.map((b) => [b.id, false]));
  return {
    ...dados,
    sessao: {
      data: chave,
      blocoAtual: null,
      blocos,
      desempenho: {},
      rascunhos: {},
    },
  };
}

export function nomeNivelCompetencia(n) {
  return NIVEL_NOMES[Math.max(0, Math.min(NIVEL_NOMES.length - 1, (n || 1) - 1))];
}

function blocosConcluidos(dados) {
  return BLOCOS.filter((b) => dados.sessao.blocos[b.id]).length;
}

export function sessaoCognitivaCompleta(dados) {
  return blocosConcluidos(dados) >= BLOCOS.length;
}

export function sessaoCognitivaPendente(dados) {
  return !sessaoCognitivaCompleta(dados);
}

function proximoBlocoId(dados) {
  const pendente = BLOCOS.find((b) => !dados.sessao.blocos[b.id]);
  return pendente?.id || null;
}

function filtrarProblemas(area, dificuldade, topico, limite = 3) {
  const pool = [...(BANCO[area] || []), ...(BANCO.geral || [])];
  const margem = 2;
  let candidatos = pool.filter(
    (p) => Math.abs(p.d - dificuldade) <= margem && (!topico || p.topico === topico)
  );
  if (candidatos.length < limite) {
    candidatos = pool.filter((p) => Math.abs(p.d - dificuldade) <= margem + 1);
  }
  candidatos.sort((a, b) => Math.abs(a.d - dificuldade) - Math.abs(b.d - dificuldade));
  const unicos = [];
  const vistos = new Set();
  for (const p of candidatos) {
    if (vistos.has(p.enunciado)) continue;
    vistos.add(p.enunciado);
    unicos.push(p);
    if (unicos.length >= limite) break;
  }
  return unicos;
}

function conceitoEstudo(area, dificuldade, topico) {
  const pool = [...(CONCEITOS_ESTUDO[area] || []), ...(CONCEITOS_ESTUDO.geral || [])];
  const match = pool.find(
    (c) =>
      Math.abs(c.d - dificuldade) <= 2 &&
      (!topico || c.titulo.toLowerCase().includes(String(topico).slice(0, 4)))
  );
  return match || pool.find((c) => Math.abs(c.d - dificuldade) <= 2) || pool[0];
}

function perguntasRecuperacao(dados, area) {
  const hoje = hojeStr();
  const revisao = dados.conhecimento.filter((c) => c.proximaRevisao && c.proximaRevisao <= hoje);
  if (revisao.length) {
    const c = revisao[0];
    return (c.perguntas || []).slice(0, 2).map((p) => ({ pergunta: p, conceitoId: c.id, titulo: c.titulo }));
  }
  const conceito = conceitoEstudo(area, dados.dificuldade, dados.continuidade.topico);
  return conceito
    ? [{ pergunta: `Explique com suas palavras: ${conceito.titulo}`, conceitoId: null, titulo: conceito.titulo }]
    : [];
}

export function revisaoEspacadaPendente(dados) {
  const hoje = hojeStr();
  return dados.conhecimento.find((c) => c.proximaRevisao && c.proximaRevisao <= hoje) || null;
}

function avaliarFaixaDesempenho(taxa) {
  if (taxa >= 0.9) return "muito_facil";
  if (taxa >= 0.75) return "facil";
  if (taxa >= 0.5) return "adequado";
  if (taxa >= 0.3) return "dificil";
  return "muito_dificil";
}

export function ajustarDificuldade(atual, faixa) {
  switch (faixa) {
    case "muito_facil":
      return Math.min(10, atual + 2);
    case "facil":
      return Math.min(10, atual + 1);
    case "adequado":
      return atual;
    case "dificil":
      return Math.max(1, atual - 1);
    case "muito_dificil":
      return Math.max(1, atual - 2);
    default:
      return atual;
  }
}

function atualizarNivelCompetencia(dados, taxa, dificuldade) {
  let nivel = dados.nivelCompetencia || 1;
  if (taxa >= 0.8 && dificuldade >= nivel + 3) nivel = Math.min(5, nivel + 1);
  if (taxa < 0.35 && dificuldade <= nivel + 1) nivel = Math.max(1, nivel - 1);
  return nivel;
}

export function registrarEventoCognitivo(dados, tipo, extra = {}) {
  const evento = { id: gerarId(), tipo, em: Date.now(), chave: hojeStr(), ...extra };
  dados.eventos = [...(dados.eventos || []), evento].slice(-120);
  return evento;
}

export function registrarDesempenhoBloco(dados, blocoId, acertos, total) {
  if (!total) return dados;
  const taxa = acertos / total;
  dados.sessao.desempenho[blocoId] = { acertos, total, taxa };
  dados.metricas.acertos = (dados.metricas.acertos || 0) + acertos;
  dados.metricas.total = (dados.metricas.total || 0) + total;
  const area = dados.areaFoco;
  if (!dados.metricas.porArea[area]) dados.metricas.porArea[area] = { acertos: 0, total: 0 };
  dados.metricas.porArea[area].acertos += acertos;
  dados.metricas.porArea[area].total += total;

  if (blocoId === "raciocinio") {
    const faixa = avaliarFaixaDesempenho(taxa);
    dados.dificuldade = ajustarDificuldade(dados.dificuldade, faixa);
    dados.nivelCompetencia = atualizarNivelCompetencia(dados, taxa, dados.dificuldade);
    dados.continuidade.ultimoDesempenho = `${acertos}/${total}`;
  }
  return dados;
}

export function concluirBlocoCognitivo(dados, blocoId) {
  dados.sessao.blocos[blocoId] = true;
  dados.sessao.blocoAtual = null;
  registrarEventoCognitivo(dados, "bloco_concluido", { bloco: blocoId });
  if (sessaoCognitivaCompleta(dados)) {
    dados.metricas.sessoesConcluidas = (dados.metricas.sessoesConcluidas || 0) + 1;
    registrarEventoCognitivo(dados, "sessao_concluida");
  }
  return dados;
}

export function iniciarBlocoCognitivo(dados, blocoId) {
  dados.sessao.blocoAtual = blocoId;
  registrarEventoCognitivo(dados, "bloco_iniciado", { bloco: blocoId });
  return dados;
}

export function salvarRascunhoBloco(dados, blocoId, texto) {
  if (!dados.sessao.rascunhos) dados.sessao.rascunhos = {};
  dados.sessao.rascunhos[blocoId] = texto;
  return dados;
}

export function salvarConhecimentoCognitivo(dados, { titulo, conteudo, exemplos = [], perguntas = [] }) {
  const item = {
    id: gerarId(),
    titulo: String(titulo || "").trim(),
    conteudo: String(conteudo || "").trim(),
    exemplos: exemplos.filter(Boolean).slice(0, 3),
    perguntas: perguntas.filter(Boolean).slice(0, 3),
    criadoEm: Date.now(),
    proximaRevisao: addDias(hojeStr(), 3),
    dominio: "parcial",
  };
  if (!item.titulo || !item.conteudo) return dados;
  dados.conhecimento = [item, ...(dados.conhecimento || [])].slice(0, 80);
  registrarEventoCognitivo(dados, "conhecimento_criado", { titulo: item.titulo });
  return dados;
}

function addDias(chave, dias) {
  const d = new Date(chave + "T12:00:00");
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}

export function registrarRecuperacao(dados, conceitoId, acertou) {
  const idx = dados.conhecimento.findIndex((c) => c.id === conceitoId);
  if (idx < 0) return dados;
  const c = { ...dados.conhecimento[idx] };
  c.proximaRevisao = addDias(hojeStr(), acertou ? 7 : 2);
  c.dominio = acertou ? "bom" : "revisar";
  dados.conhecimento[idx] = c;
  return dados;
}

export function definirObjetivoCognitivo(dados, texto) {
  const limpo = String(texto || "").trim().slice(0, 120);
  if (!limpo) return dados;
  dados.objetivo = limpo;
  const area = inferirAreaObjetivo(limpo);
  if (area) dados.areaFoco = area;
  registrarEventoCognitivo(dados, "objetivo_definido", { objetivo: limpo });
  return dados;
}

export function inferirAreaObjetivo(texto) {
  const t = String(texto).toLowerCase();
  if (/matem|probabil|calculo|cálculo|álgebra|algebra/.test(t)) return "matematica";
  if (/program|cod|código|code|dev/.test(t)) return "programacao";
  if (/ingl|english|vocab/.test(t)) return "ingles";
  if (/físic|fisic|ciência|ciencia|quím|quim/.test(t)) return "ciencia";
  if (/lógic|logic|raciocínio|raciocinio/.test(t)) return "logica";
  return "geral";
}

/** Detecta objetivos na inbox (CAPTURE → OBJETIVO). */
export function extrairObjetivoInbox(itens) {
  if (!Array.isArray(itens)) return "";
  const padrao = /quero\s+(?:melhorar|aprender|estudar|desenvolver|dominar)\s+(.+)/i;
  for (const item of itens) {
    const m = String(item?.texto || "").match(padrao);
    if (m) return m[0].trim();
  }
  return "";
}

export function proximoPassoCognitivo(dados) {
  dados = resetSessaoCognitivoSeNovoDia(dados);
  if (sessaoCognitivaCompleta(dados)) {
    return { tipo: "concluido", blocosFeitos: BLOCOS.length, total: BLOCOS.length };
  }

  const revisao = revisaoEspacadaPendente(dados);
  const blocoId = dados.sessao.blocoAtual || proximoBlocoId(dados);
  const bloco = BLOCOS.find((b) => b.id === blocoId);
  if (!bloco) return { tipo: "concluido", blocosFeitos: BLOCOS.length, total: BLOCOS.length };

  const area = dados.areaFoco || "geral";
  const topico = dados.continuidade.topico || "";
  const motivo = motivoProximoPasso(dados, blocoId);

  const payload = {
    tipo: "acao",
    bloco,
    blocoId,
    area,
    dificuldade: dados.dificuldade,
    nivel: dados.nivelCompetencia,
    nivelNome: nomeNivelCompetencia(dados.nivelCompetencia),
    motivo,
    revisao,
    blocosFeitos: blocosConcluidos(dados),
    total: BLOCOS.length,
    objetivo: dados.objetivo,
    continuidade: dados.continuidade,
  };

  if (blocoId === "raciocinio") {
    payload.problemas = filtrarProblemas(area, dados.dificuldade, topico, 3);
    if (payload.problemas[0]) {
      dados.continuidade.topico = payload.problemas[0].topico;
      dados.continuidade.area = area;
    }
  } else if (blocoId === "aprendizagem") {
    payload.conceito = conceitoEstudo(area, dados.dificuldade, topico);
  } else if (blocoId === "memoria") {
    payload.perguntas = perguntasRecuperacao(dados, area);
  } else if (blocoId === "explicacao") {
    const aprend = dados.sessao.rascunhos?.aprendizagem || payload.conceito?.resumo || "";
    payload.promptExplicacao = aprend || conceitoEstudo(area, dados.dificuldade, topico)?.titulo || "o que estudou hoje";
  }

  return payload;
}

function motivoProximoPasso(dados, blocoId) {
  if (dados.continuidade.topico && blocoId === "raciocinio") {
    return `Continuando ${dados.continuidade.topico} — desempenho anterior: ${dados.continuidade.ultimoDesempenho || "início"}.`;
  }
  const area = dados.areaFoco;
  const stats = dados.metricas.porArea[area];
  if (stats && stats.total >= 6) {
    const taxa = stats.acertos / stats.total;
    if (taxa < 0.5) return `Dificuldade em ${area} nas últimas sessões — foco em fundamentos.`;
    if (taxa > 0.8) return `Bom desempenho em ${area} — subindo um degrau.`;
  }
  if (dados.objetivo) return `Alinhado ao seu objetivo: ${dados.objetivo}`;
  return "Sessão diária de ~60 min — um bloco de cada vez.";
}

export function resumoCognitivoParaIA(dados) {
  return {
    objetivo: dados.objetivo,
    areaFoco: dados.areaFoco,
    dificuldade: dados.dificuldade,
    nivel: nomeNivelCompetencia(dados.nivelCompetencia),
    sessoesConcluidas: dados.metricas.sessoesConcluidas,
    taxaGeral:
      dados.metricas.total > 0
        ? Math.round((dados.metricas.acertos / dados.metricas.total) * 100)
        : null,
    continuidade: dados.continuidade,
    conceitos: (dados.conhecimento || []).slice(0, 5).map((c) => c.titulo),
  };
}

export function resumoSemanalCognitivo(dados) {
  const semanaAtras = Date.now() - 7 * 86400000;
  const eventos = (dados.eventos || []).filter((e) => e.em >= semanaAtras);
  const sessoes = eventos.filter((e) => e.tipo === "sessao_concluida").length;
  const porArea = { ...dados.metricas.porArea };
  let melhorArea = "";
  let piorArea = "";
  let melhorTaxa = -1;
  let piorTaxa = 2;
  for (const [area, s] of Object.entries(porArea)) {
    if (!s.total) continue;
    const taxa = s.acertos / s.total;
    if (taxa > melhorTaxa) {
      melhorTaxa = taxa;
      melhorArea = area;
    }
    if (taxa < piorTaxa) {
      piorTaxa = taxa;
      piorArea = area;
    }
  }
  const direcao =
    piorArea && piorTaxa < 0.5
      ? `Na próxima semana, mantenha ${piorArea} como foco principal.`
      : dados.objetivo
        ? `Continue alinhado a: ${dados.objetivo}.`
        : "Mantenha a sessão diária — consistência importa mais que intensidade.";

  return {
    sessoes,
    melhorArea,
    piorArea,
    melhorTaxa: melhorTaxa >= 0 ? Math.round(melhorTaxa * 100) : null,
    piorTaxa: piorTaxa <= 1 ? Math.round(piorTaxa * 100) : null,
    direcao,
  };
}
