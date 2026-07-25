/** Trilha Neuro — micro-módulos para ler e explicar com suas palavras. */

export const MODULOS_NEURO = [
  {
    id: "caminhada-cerebro",
    titulo: "Caminhada e o cérebro",
    tempo: "3 min",
    emoji: "🚶",
    texto: `Caminhar aumenta o fluxo de sangue e oxigênio no cérebro. Isso ajuda a liberar substâncias como o BDNF (fator de crescimento) e neurotransmissores ligados ao humor.

O resultado: mais neuroplasticidade — o cérebro fica mais capaz de criar e fortalecer conexões entre neurônios. Por isso muita gente pensa melhor depois de uma caminhada.`,
    pontosChave: [
      "Mais fluxo sanguíneo e oxigênio no cérebro",
      "Liberação de BDNF e neurotransmissores do humor",
      "Estimula neuroplasticidade (novas conexões sinápticas)",
      "Redes de controle executivo funcionam melhor",
    ],
    gabarito: [
      { id: "bdnf", rotulo: "BDNF / fator de crescimento", termos: ["bdnf", "fator de crescimento", "neurotrof"] },
      { id: "oxigenio", rotulo: "Oxigênio ou fluxo sanguíneo", termos: ["oxig", "sangue", "fluxo", "circul"] },
      { id: "plasticidade", rotulo: "Neuroplasticidade", termos: ["plastic", "conex", "sinap", "neurôn", "neuron"] },
      { id: "humor", rotulo: "Humor / neurotransmissores", termos: ["humor", "neurotrans", "dopamina", "serotonina"] },
    ],
    perguntaExplicar: "Explique com suas palavras: o que a caminhada faz no cérebro?",
    vocab: { en: "neuroplasticity", pt: "neuroplasticidade" },
    dicaApp: "Marque o hábito Caminhar na aba Hoje depois de estudar.",
  },
  {
    id: "hipocampo",
    titulo: "Hipocampo",
    tempo: "3 min",
    emoji: "🧠",
    texto: `O hipocampo é essencial para consolidar memórias — especialmente memória espacial (onde as coisas estão) e aprendizado novo.

Com uso regular (movimento, sono, estudo), o volume do hipocampo pode aumentar. Isso protege contra declínio cognitivo e melhora retenção do que você aprende.`,
    pontosChave: [
      "Consolida memórias e aprendizado",
      "Memória espacial (localização, mapas mentais)",
      "Pode aumentar de volume com hábitos saudáveis",
      "Ajuda a reter o que você estuda",
    ],
    gabarito: [
      { id: "memoria", rotulo: "Memória / consolidar", termos: ["memór", "memor", "consolid", "aprend", "reten"] },
      { id: "espacial", rotulo: "Memória espacial", termos: ["espacial", "local", "onde", "lugar", "mapa"] },
      { id: "volume", rotulo: "Volume / crescimento", termos: ["volume", "cres", "aument", "expand"] },
      { id: "hipocampo", rotulo: "Nome hipocampo", termos: ["hipocamp"] },
    ],
    perguntaExplicar: "O que o hipocampo faz e por que importa para quem estuda?",
    vocab: { en: "hippocampus", pt: "hipocampo" },
    dicaApp: "Use o Diário: anote em 2 linhas o que fixou hoje.",
  },
  {
    id: "pre-frontal",
    titulo: "Córtex pré-frontal",
    tempo: "3 min",
    emoji: "🎯",
    texto: `O córtex pré-frontal é a região da frente do cérebro responsável por planejar, focar, decidir e segurar impulsos.

Quando ele funciona bem, você escolhe o que importa em vez de reagir no automático. É o “CEO” do seu comportamento.`,
    pontosChave: [
      "Planejamento e metas",
      "Foco e tomada de decisão",
      "Controle de impulsos",
      "Comportamento voltado a objetivos",
    ],
    gabarito: [
      { id: "prefrontal", rotulo: "Córtex pré-frontal", termos: ["pré-frontal", "pre-frontal", "prefrontal", "frontal"] },
      { id: "planejar", rotulo: "Planejar / decidir", termos: ["plan", "decis", "meta", "objetiv"] },
      { id: "foco", rotulo: "Foco / atenção", termos: ["foco", "aten", "concentr"] },
      { id: "impulso", rotulo: "Impulsos / frear", termos: ["impuls", "frear", "inib", "automát"] },
    ],
    perguntaExplicar: "Para que serve o córtex pré-frontal no dia a dia?",
    vocab: { en: "executive function", pt: "função executiva" },
    dicaApp: "Use ☆ em Hoje para marcar até 3 prioridades.",
  },
  {
    id: "rede-executiva",
    titulo: "Rede executiva",
    tempo: "4 min",
    emoji: "🔗",
    texto: `As redes de controle executivo são circuitos que ligam áreas como o córtex pré-frontal e o parietal. Funcionam como o “gerente central” do cérebro.

Principais funções:
• Memória de trabalho — segurar informação na mente por um tempo curto
• Flexibilidade cognitiva — mudar de estratégia quando o contexto muda
• Controle inibitório — filtrar distrações e frear impulsos
• Planejamento — sequenciar passos e prever consequências`,
    pontosChave: [
      "Memória de trabalho",
      "Flexibilidade cognitiva",
      "Controle inibitório (menos distração)",
      "Planejamento de ações futuras",
    ],
    gabarito: [
      { id: "trabalho", rotulo: "Memória de trabalho", termos: ["trabalho", "temporár", "curto prazo", "manter na mente"] },
      { id: "flex", rotulo: "Flexibilidade cognitiva", termos: ["flex", "mudar", "estratég", "adapt"] },
      { id: "inibir", rotulo: "Controle inibitório", termos: ["inib", "distra", "impuls", "filtr", "foco"] },
      { id: "planejar", rotulo: "Planejamento", termos: ["plan", "sequên", "passo", "futur", "consequên"] },
      { id: "gerente", rotulo: "Gerente / coordenação", termos: ["gerente", "central", "coorden", "execut", "rede"] },
    ],
    perguntaExplicar: "O que a rede executiva controla? Dê exemplos com suas palavras.",
    vocab: { en: "working memory", pt: "memória de trabalho" },
    dicaApp: "Modo “Só o essencial” em Hoje reduz carga na memória de trabalho.",
  },
  {
    id: "caminhada-executiva",
    titulo: "Caminhada + rede executiva",
    tempo: "3 min",
    emoji: "⚡",
    texto: `Na caminhada, o cérebro integra movimento, equilíbrio, visão e decisões (para onde ir, desviar de obstáculos). Esse esforço ativa e fortalece a comunicação entre células da rede executiva.

Por isso, depois de caminhar, muitas pessoas processam pensamentos com mais clareza — é uma “janela de foco” natural.`,
    pontosChave: [
      "Integra movimento, equilíbrio e estímulos visuais",
      "Fortalece comunicação entre neurônios da rede executiva",
      "Processamento mais rápido e claro após o exercício",
      "Boa hora para estudar 10 minutos",
    ],
    gabarito: [
      { id: "integra", rotulo: "Integrar movimento / equilíbrio / visão", termos: ["moviment", "equilíb", "visual", "integr", "coorden"] },
      { id: "comunica", rotulo: "Comunicação entre neurônios", termos: ["comunic", "conex", "célula", "rede", "sinap"] },
      { id: "clareza", rotulo: "Clareza / foco depois", termos: ["clar", "foco", "rápid", "eficien", "depois"] },
      { id: "janela", rotulo: "Janela para estudar", termos: ["janela", "estud", "momento", "oportun"] },
    ],
    perguntaExplicar: "Por que caminhar pode ajudar a estudar logo depois?",
    vocab: { en: "cognitive control", pt: "controle cognitivo" },
    dicaApp: "Fluxo ideal: Caminhar → aba Neuro → 10 min de explicação.",
  },
];

export function moduloNeuroPorId(id) {
  return MODULOS_NEURO.find((m) => m.id === id) || MODULOS_NEURO[0];
}

export function proximoModuloNeuro(idAtual) {
  const i = MODULOS_NEURO.findIndex((m) => m.id === idAtual);
  if (i < 0 || i >= MODULOS_NEURO.length - 1) return null;
  return MODULOS_NEURO[i + 1];
}
