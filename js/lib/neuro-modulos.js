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
  {
    id: "tdah-atencao",
    titulo: "TDAH e atenção",
    tempo: "3 min",
    emoji: "⚡",
    texto: `No TDAH, o cérebro tem dificuldade em manter atenção sustentada em tarefas que parecem “chatas” ou longas. Não é preguiça — é diferença no sistema de recompensa e no controle inibitório.

Estratégias que ajudam: dividir em micro-passos, timer curto (2–5 min), mudar de ambiente e recompensa imediata depois de começar.`,
    pontosChave: [
      "Atenção sustentada é mais difícil — não é falta de vontade",
      "Sistema de recompensa (dopamina) responde melhor a tarefas novas",
      "Micro-passos e timers curtos reduzem a barreira de começar",
      "Ambiente e movimento ajudam a “ligar” o foco",
    ],
    gabarito: [
      { id: "tdah", rotulo: "TDAH / atenção", termos: ["tdah", "aten", "déficit", "hiperativ"] },
      { id: "nao-preguica", rotulo: "Não é preguiça", termos: ["pregui", "vontade", "não é", "diferen"] },
      { id: "dopamina", rotulo: "Recompensa / dopamina", termos: ["dopamin", "recompens", "motiv"] },
      { id: "micro", rotulo: "Micro-passos / timer", termos: ["micro", "passo", "timer", "divid", "curto"] },
    ],
    perguntaExplicar: "Por que tarefas longas custam mais no TDAH? O que ajuda?",
    vocab: { en: "sustained attention", pt: "atenção sustentada" },
    dicaApp: "Use timer de 2 min na aba Hoje — só começar já vale.",
  },
  {
    id: "sono-memoria",
    titulo: "Sono e memória",
    tempo: "3 min",
    emoji: "😴",
    texto: `Durante o sono profundo, o cérebro consolida o que você aprendeu de dia — transfere da memória de trabalho para memórias mais estáveis.

Dormir mal = aprender pior no dia seguinte. Não adianta só “puxar all-nighter”: o hipocampo precisa desse tempo offline.`,
    pontosChave: [
      "Sono consolida aprendizado",
      "Memória de trabalho → memória de longo prazo",
      "Sono ruim prejudica foco e retenção",
      "Rotina de dormir protege o estudo",
    ],
    gabarito: [
      { id: "consolid", rotulo: "Consolidar memória", termos: ["consolid", "fixar", "gravar", "reten"] },
      { id: "sono", rotulo: "Sono / dormir", termos: ["sono", "dormir", "noite", "descans"] },
      { id: "hipocampo", rotulo: "Hipocampo / cérebro", termos: ["hipocamp", "cérebr", "cerebr"] },
      { id: "mal", rotulo: "Mal dormir prejudica", termos: ["mal", "priv", "pior", "prejudic", "cans"] },
    ],
    perguntaExplicar: "Como o sono ajuda a fixar o que você estudou?",
    vocab: { en: "memory consolidation", pt: "consolidação da memória" },
    dicaApp: "Anote no Diário se dormiu mal — ajuda a entender dias difíceis.",
  },
  {
    id: "dopamina-motivacao",
    titulo: "Dopamina e motivação",
    tempo: "3 min",
    emoji: "🎯",
    texto: `A dopamina não é só “prazer” — ela sinaliza que algo vale a pena perseguir. No TDAH, o pico de dopamina costuma vir com novidade, urgência ou interesse pessoal.

Por isso começar é o maior desafio: antes do primeiro passo, o cérebro não “vê” a recompensa. Truque: recompensa imediata depois de 2 minutos de esforço.`,
    pontosChave: [
      "Dopamina liga motivação e ação",
      "Novidade e urgência ativam mais",
      "Começar é a parte mais difícil",
      "Recompensa imediata após micro-passo",
    ],
    gabarito: [
      { id: "dopamina", rotulo: "Dopamina", termos: ["dopamin"] },
      { id: "motiv", rotulo: "Motivação / recompensa", termos: ["motiv", "recompens", "vale"] },
      { id: "comecar", rotulo: "Dificuldade de começar", termos: ["começ", "iníc", "inici", "barreira"] },
      { id: "novidade", rotulo: "Novidade / interesse", termos: ["nov", "interess", "urgên"] },
    ],
    perguntaExplicar: "O que a dopamina tem a ver com começar tarefas?",
    vocab: { en: "dopamine", pt: "dopamina" },
    dicaApp: "Depois de marcar 1 hábito, celebre — mesmo pequeno.",
  },
  {
    id: "pausas-cerebro",
    titulo: "Pausas e descanso ativo",
    tempo: "3 min",
    emoji: "☕",
    texto: `O cérebro não aguenta foco intenso por horas seguidas. Pausas curtas (5–10 min) restauram a atenção e evitam “fritar” o córtex pré-frontal.

Descanso ativo — caminhar, água, alongar — é melhor que scroll infinito no celular, que cansa sem recuperar.`,
    pontosChave: [
      "Foco intenso tem limite de tempo",
      "Pausas restauram atenção",
      "Descanso ativo > celular",
      "Previne burnout cognitivo",
    ],
    gabarito: [
      { id: "pausa", rotulo: "Pausas", termos: ["pausa", "interval", "descans"] },
      { id: "limite", rotulo: "Limite de foco", termos: ["limite", "hora", "cans", "frit"] },
      { id: "ativo", rotulo: "Descanso ativo", termos: ["ativ", "caminh", "água", "along"] },
      { id: "celular", rotulo: "Evitar scroll / celular", termos: ["celular", "scroll", "tela", "rede"] },
    ],
    perguntaExplicar: "Por que pausas ajudam a estudar melhor?",
    vocab: { en: "cognitive rest", pt: "descanso cognitivo" },
    dicaApp: "Use o botão Travei ou timer de 10 min na aba Hoje.",
  },
  {
    id: "repeticao-espacada",
    titulo: "Repetição espaçada",
    tempo: "4 min",
    emoji: "📅",
    texto: `Rever material em intervalos crescentes (hoje, amanhã, 3 dias, 1 semana) fixa melhor na memória do que estudar tudo de uma vez — o “efeito spacing”.

O cérebro fortalece conexões quando quase esquece e precisa recuperar. Por isso explicar de novo com suas palavras (como aqui no Neuro) funciona tão bem.`,
    pontosChave: [
      "Revisar em intervalos crescentes",
      "Melhor que maratona de uma vez",
      "Recuperação ativa fortalece memória",
      "Explicar com suas palavras = revisão poderosa",
    ],
    gabarito: [
      { id: "espacad", rotulo: "Espaçada / intervalos", termos: ["espaç", "espac", "interval", "dias"] },
      { id: "melhor", rotulo: "Melhor que maratona", termos: ["maraton", "uma vez", "cram", "vésper"] },
      { id: "recuper", rotulo: "Recuperar / quase esquecer", termos: ["recuper", "esquec", "relembr"] },
      { id: "explicar", rotulo: "Explicar com palavras", termos: ["explic", "palavra", "ensin", "feynman"] },
    ],
    perguntaExplicar: "O que é repetição espaçada e por que funciona?",
    vocab: { en: "spaced repetition", pt: "repetição espaçada" },
    dicaApp: "Volte a este módulo em 3 dias — explique de novo.",
  },
  {
    id: "rede-default",
    titulo: "Rede default e ruminação",
    tempo: "4 min",
    emoji: "💭",
    fase: "D",
    texto: `A “rede default” liga quando a mente divaga — pensamentos sobre o passado, futuro ou preocupações. Um pouco é normal; muito tempo nela cansa e rouba foco.

No TDAH, voltar ao presente costuma exigir ação concreta: mover o corpo, timer curto ou anotar a preocupação na inbox para tirar da cabeça.`,
    pontosChave: [
      "Ativa quando a mente divaga",
      "Ruminação e preocupação consomem energia",
      "Ação concreta ajuda a sair do loop",
      "Anotar libera a memória de trabalho",
    ],
    gabarito: [
      { id: "default", rotulo: "Rede default / divagar", termos: ["default", "divag", "mente", "pensament"] },
      { id: "rumina", rotulo: "Ruminação / preocupação", termos: ["rumin", "preocup", "passado", "futur"] },
      { id: "presente", rotulo: "Voltar ao presente", termos: ["present", "agora", "foco", "atual"] },
      { id: "anotar", rotulo: "Anotar / inbox", termos: ["anot", "inbox", "escrev", "tirar"] },
    ],
    perguntaExplicar: "O que é a rede default e como ela atrapalha o foco?",
    vocab: { en: "default mode network", pt: "rede default" },
    dicaApp: "Jogue a preocupação na Inbox de Hoje — volte depois.",
  },
  {
    id: "efeito-teste",
    titulo: "Efeito teste (active recall)",
    tempo: "3 min",
    emoji: "✍️",
    fase: "D",
    texto: `Testar a memória — explicar, responder perguntas, fazer flashcards — fixa mais do que reler passivamente. O cérebro fortalece o que consegue recuperar.

Por isso o fluxo Neuro pede que você explique com suas palavras: isso é recuperação ativa, não só leitura.`,
    pontosChave: [
      "Recuperar > reler passivamente",
      "Explicar = teste de memória",
      "Erro na recuperação ajuda a aprender",
      "Flashcards e perguntas funcionam",
    ],
    gabarito: [
      { id: "teste", rotulo: "Efeito teste / testar", termos: ["teste", "test", "recuper", "active recall"] },
      { id: "passivo", rotulo: "Reler passivo (pior)", termos: ["passiv", "reler", "só ler", "highlight"] },
      { id: "explicar", rotulo: "Explicar / Feynman", termos: ["explic", "feynman", "palavra"] },
      { id: "flash", rotulo: "Flashcards / perguntas", termos: ["flash", "pergunt", "quiz"] },
    ],
    perguntaExplicar: "Por que explicar o módulo ajuda mais do que só ler de novo?",
    vocab: { en: "testing effect", pt: "efeito teste" },
    dicaApp: "Feche o texto e explique de memória antes de pedir feedback.",
  },
  {
    id: "intercalado",
    titulo: "Estudo intercalado",
    tempo: "3 min",
    emoji: "🔀",
    fase: "D",
    texto: `Alternar tipos de conteúdo (ex.: vocabulário → neuro → prática) numa sessão curta pode parecer mais difícil, mas fixa melhor a longo prazo do que bloques longos do mesmo tema.

Para TDAH, sessões de 10–15 min com variedade mantêm a dopamina e reduzem tédio.`,
    pontosChave: [
      "Alternar temas > maratonar um só",
      "Parece mais difícil, aprende melhor",
      "Sessões curtas com variedade",
      "Combina com pausas ativas",
    ],
    gabarito: [
      { id: "inter", rotulo: "Intercalado / alternar", termos: ["intercal", "altern", "mistur", "vari"] },
      { id: "bloque", rotulo: "Bloque longo (pior)", termos: ["bloque", "maraton", "só um", "mesmo tema"] },
      { id: "curto", rotulo: "Sessão curta 10–15 min", termos: ["curt", "10", "15", "minut"] },
      { id: "dopamina", rotulo: "Variedade / dopamina", termos: ["dopamin", "tédio", "nov"] },
    ],
    perguntaExplicar: "O que é estudo intercalado e por que ajuda?",
    vocab: { en: "interleaving", pt: "intercalado" },
    dicaApp: "Na aba Estudo, faça Neuro → Vocabulário → Prática na mesma sessão.",
  },
  {
    id: "estresse-memoria",
    titulo: "Estresse e memória",
    tempo: "3 min",
    emoji: "😰",
    fase: "D",
    texto: `Estresse agudo (prova amanhã) pode até focar por urgência; estresse crônico (semanas de pressão) libera cortisol em excesso e atrapalha hipocampo e sono.

Proteger rotina de sono, pausas e metas pequenas reduz o “modo ameaça” e libera espaço para aprender.`,
    pontosChave: [
      "Estresse crônico prejudica memória",
      "Cortisol alto afeta hipocampo",
      "Metas pequenas reduzem pressão",
      "Sono e pausa são proteção",
    ],
    gabarito: [
      { id: "cortisol", rotulo: "Cortisol / estresse", termos: ["cortisol", "estress", "press"] },
      { id: "cronico", rotulo: "Crônico vs agudo", termos: ["crôn", "cronic", "semana", "agud"] },
      { id: "hipocampo", rotulo: "Hipocampo / memória", termos: ["hipocamp", "memór"] },
      { id: "protecao", rotulo: "Sono / pausas / metas pequenas", termos: ["sono", "pausa", "pequen", "metas"] },
    ],
    perguntaExplicar: "Como estresse demais atrapalha o que você estuda?",
    vocab: { en: "chronic stress", pt: "estresse crônico" },
    dicaApp: "No Diário, anote o que gerou pressão — tira peso da cabeça.",
  },
  {
    id: "atencao-plena-curta",
    titulo: "Atenção plena em 2 min",
    tempo: "2 min",
    emoji: "🌬️",
    fase: "D",
    texto: `Mindfulness curto não é “parar pensamentos” — é notar que a mente saiu e gentilmente voltar (respiração, sensação dos pés, som).

Dois minutos antes de estudar reduzem o ruído inicial e preparam o córtex pré-frontal.`,
    pontosChave: [
      "Notar distração sem culpa",
      "Voltar ao respirar ou corpo",
      "2 minutos já ajudam",
      "Prepara foco antes do estudo",
    ],
    gabarito: [
      { id: "plena", rotulo: "Atenção plena / mindfulness", termos: ["plena", "mindful", "present"] },
      { id: "nao-parar", rotulo: "Não é parar pensamentos", termos: ["parar", "pensament", "culpa", "notar"] },
      { id: "respir", rotulo: "Respiração / corpo", termos: ["respir", "corpo", "pés", "som"] },
      { id: "antes", rotulo: "Antes de estudar", termos: ["antes", "prepar", "estud", "início"] },
    ],
    perguntaExplicar: "O que é uma pausa de atenção plena de 2 minutos?",
    vocab: { en: "mindfulness", pt: "atenção plena" },
    dicaApp: "Timer de 2 min em Hoje antes de abrir Estudo.",
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
