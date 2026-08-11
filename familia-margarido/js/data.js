/* Família Margarido™ — Data Layer */

const FAMILY_MEMBERS = [
  {
    id: 'monique',
    name: 'Monique',
    relationship: 'Núcleo Familiar',
    role: 'Diretora Executiva das Operações Familiares',
    description: 'Responsável por manter a organização funcionando enquanto o restante da equipe trabalha incansavelmente para impedir que isso aconteça.',
    stats: [
      { label: 'Autoridade', value: 98 },
      { label: 'Organização', value: 91 },
      { label: 'Paciência', value: 63 },
      { label: 'Conhecimento dos acontecimentos familiares', value: 100 }
    ],
    quote: 'Eu já falei isso.',
    classification: 'CEO DA FAMÍLIA',
    category: 'nucleo',
    tier: 'core',
    rankingCategories: { autoridade: 98, caos: 45, inteligencia: 88, experiencia: 85, misterio: 30, energia: 70 },
    color: '#1a2744',
    initials: 'MO'
  },
  {
    id: 'rafael',
    name: 'Rafael',
    relationship: 'Núcleo Familiar',
    role: 'Mestre Supremo do Taekwondo',
    description: 'Especialista em Taekwondo, disciplina e na arte ancestral de fazer todo mundo prestar atenção.',
    stats: [
      { label: 'Taekwondo', value: 100 },
      { label: 'Disciplina', value: 99 },
      { label: 'Autoridade', value: 100 },
      { label: 'Chance de ganhar uma discussão', value: 97 }
    ],
    quote: 'Vamos conversar.',
    hoverQuote: '…de preferência sem precisar demonstrar o Taekwondo.',
    classification: 'UNIDADE DE DEFESA DA FAMÍLIA',
    category: 'nucleo',
    tier: 'core',
    hasBeltAnimation: true,
    easterEgg: 'taekwondo',
    rankingCategories: { autoridade: 100, caos: 20, inteligencia: 75, experiencia: 90, misterio: 25, energia: 85 },
    color: '#0d1b2a',
    initials: 'RA'
  },
  {
    id: 'maria-antonia',
    name: 'Maria Antônia',
    relationship: 'Núcleo Familiar',
    role: 'Diretora de Inteligência e Informações Familiares',
    description: 'Se alguma coisa aconteceu, existe uma chance preocupantemente alta de Maria Antônia saber.',
    stats: [
      { label: 'Informação', value: 95 },
      { label: 'Curiosidade', value: 92 },
      { label: 'Velocidade para descobrir novidades', value: 96 }
    ],
    quote: 'Eu ouvi dizer que…',
    classification: 'INTELIGÊNCIA FAMILIAR',
    category: 'nucleo',
    tier: 'core',
    rankingCategories: { autoridade: 70, caos: 55, inteligencia: 96, experiencia: 80, misterio: 60, energia: 75 },
    color: '#2c3e6b',
    initials: 'MA'
  },
  {
    id: 'maria',
    name: 'Maria',
    relationship: 'Conselho Familiar',
    role: 'Conselheira Sênior de Assuntos Familiares',
    description: 'Experiência, conhecimento e participação estratégica nos acontecimentos da família.',
    stats: [
      { label: 'Experiência', value: 98 },
      { label: 'Opiniões', value: 94 },
      { label: 'Conhecimento familiar', value: 96 }
    ],
    quote: 'No meu tempo…',
    classification: 'CONSELHO ADMINISTRATIVO',
    category: 'conselho',
    tier: 'council',
    rankingCategories: { autoridade: 82, caos: 40, inteligencia: 90, experiencia: 98, misterio: 35, energia: 60 },
    color: '#3d4f7c',
    initials: 'MI'
  },
  {
    id: 'pedrinho',
    name: 'Pedrinho',
    relationship: 'Área de Caos',
    role: 'Estagiário Oficial do Caos',
    description: 'Entrou para a organização sem currículo e desde então vem acumulando experiência.',
    stats: [
      { label: 'Energia', value: 110 },
      { label: 'Caos', value: 97 },
      { label: 'Chance de fazer alguma coisa inesperada', value: 99 }
    ],
    quote: 'Eu não fiz nada.',
    classification: 'ESTAGIÁRIO',
    badge: 'PROMOVIDO A NADA',
    category: 'caos',
    tier: 'chaos',
    easterEgg: 'pedrinho-exe',
    rankingCategories: { autoridade: 15, caos: 97, inteligencia: 40, experiencia: 20, misterio: 50, energia: 110 },
    color: '#8b2942',
    initials: 'PE'
  },
  {
    id: 'toninho',
    name: 'Toninho',
    relationship: 'Área de Caos',
    role: 'Diretor de Situações Misteriosas',
    description: 'Uma figura cercada por histórias, versões diferentes e acontecimentos que ninguém consegue explicar direito.',
    stats: [
      { label: 'Mistério', value: 100 },
      { label: 'Histórias sem contexto', value: 98 },
      { label: 'Explicações convincentes', value: 42 }
    ],
    quote: 'Não foi bem assim.',
    classification: 'ARQUIVO CONFIDENCIAL',
    category: 'caos',
    tier: 'chaos',
    easterEgg: 'confidential',
    rankingCategories: { autoridade: 55, caos: 80, inteligencia: 70, experiencia: 75, misterio: 100, energia: 65 },
    color: '#1e1e2e',
    initials: 'TO'
  },
  {
    id: 'margarete',
    name: 'Margarete',
    relationship: 'Família Ampliada',
    role: 'Diretora de Relações Familiares',
    description: 'Uma das peças fundamentais da estrutura organizacional Margarido.',
    stats: [
      { label: 'Influência', value: 94 },
      { label: 'Experiência', value: 97 },
      { label: 'Participação em acontecimentos', value: 91 }
    ],
    quote: 'A família é a família.',
    classification: 'DIRETORIA',
    category: 'ampliada',
    tier: 'extended',
    rankingCategories: { autoridade: 78, caos: 35, inteligencia: 85, experiencia: 97, misterio: 45, energia: 55 },
    color: '#4a5568',
    initials: 'MG'
  },
  {
    id: 'sofia',
    name: 'Sofia',
    relationship: 'Área de Caos',
    role: 'Diretora de Entretenimento e Caos',
    description: 'Especialista em transformar situações completamente normais em acontecimentos memoráveis.',
    stats: [
      { label: 'Energia', value: 98 },
      { label: 'Caos', value: 96 },
      { label: 'Entretenimento', value: 99 },
      { label: 'Imprevisibilidade', value: 94 }
    ],
    quote: 'Espera, deixa eu contar uma coisa.',
    classification: 'DEPARTAMENTO DE ENTRETENIMENTO',
    category: 'caos',
    tier: 'chaos',
    rankingCategories: { autoridade: 40, caos: 96, inteligencia: 72, experiencia: 60, misterio: 55, energia: 98 },
    color: '#6b3a5c',
    initials: 'SO'
  },
  {
    id: 'evaristo',
    name: 'Evaristo',
    relationship: 'Conselho Familiar',
    role: 'Presidente Honorário do Conselho Familiar',
    description: 'Um dos membros mais experientes da organização e testemunha de várias gerações da história Margarido.',
    stats: [
      { label: 'Experiência', value: 100 },
      { label: 'Histórias', value: 100 },
      { label: 'Conhecimento histórico', value: 99 }
    ],
    quote: 'Isso me lembra uma história…',
    classification: 'MEMBRO FUNDADOR',
    badge: 'MEMBRO FUNDADOR',
    category: 'conselho',
    tier: 'council',
    rankingCategories: { autoridade: 88, caos: 30, inteligencia: 92, experiencia: 100, misterio: 70, energia: 45 },
    color: '#2d3748',
    initials: 'EV'
  },
  {
    id: 'ana-cristina',
    name: 'Ana Cristina',
    relationship: 'Conselho Familiar',
    role: 'Conselheira Sênior',
    description: 'Responsável por conhecimento, histórias e informações acumuladas ao longo de gerações.',
    stats: [
      { label: 'Sabedoria', value: 100 },
      { label: 'Experiência', value: 100 },
      { label: 'Histórias', value: 98 }
    ],
    quote: 'Já vi isso acontecer antes.',
    classification: 'CONSELHO SÊNIOR',
    category: 'conselho',
    tier: 'council',
    rankingCategories: { autoridade: 75, caos: 25, inteligencia: 94, experiencia: 100, misterio: 50, energia: 40 },
    color: '#374151',
    initials: 'AC'
  },
  {
    id: 'edileusa',
    name: 'Edileusa',
    relationship: 'Família Ampliada',
    role: 'Diretora de Tradições Margarido',
    description: 'Uma presença fundamental na continuidade das tradições familiares.',
    stats: [
      { label: 'Tradição', value: 100 },
      { label: 'Experiência', value: 98 },
      { label: 'Presença familiar', value: 99 }
    ],
    quote: 'Sempre foi assim na família.',
    classification: 'GUARDIÃ DAS TRADIÇÕES',
    category: 'ampliada',
    tier: 'extended',
    rankingCategories: { autoridade: 72, caos: 28, inteligencia: 88, experiencia: 98, misterio: 38, energia: 50 },
    color: '#4a3728',
    initials: 'ED'
  }
];

const RANKING_DEFAULT = [
  { id: 'rafael', category: 'Autoridade' },
  { id: 'monique', category: 'Poder Administrativo' },
  { id: 'evaristo', category: 'Experiência' },
  { id: 'maria-antonia', category: 'Inteligência' },
  { id: 'maria', category: 'Conselho' },
  { id: 'margarete', category: 'Influência' },
  { id: 'ana-cristina', category: 'Sabedoria' },
  { id: 'edileusa', category: 'Tradição' },
  { id: 'sofia', category: 'Caos' },
  { id: 'pedrinho', category: 'Energia' },
  { id: 'toninho', category: 'Mistério' }
];

const RANKING_CATEGORIES = {
  autoridade: { label: 'AUTORIDADE', key: 'autoridade' },
  caos: { label: 'CAOS', key: 'caos' },
  inteligencia: { label: 'INTELIGÊNCIA', key: 'inteligencia' },
  experiencia: { label: 'EXPERIÊNCIA', key: 'experiencia' },
  misterio: { label: 'MISTÉRIO', key: 'misterio' },
  energia: { label: 'ENERGIA', key: 'energia' }
};

const GENEALOGY = {
  generations: [
    {
      label: 'Conselho Superior',
      members: ['evaristo', 'ana-cristina']
    },
    {
      label: 'Diretoria Sênior',
      members: ['maria', 'margarete', 'edileusa']
    },
    {
      label: 'Operações Centrais',
      members: ['monique', 'rafael', 'maria-antonia']
    },
    {
      label: 'Unidades Especializadas',
      members: ['toninho', 'sofia', 'pedrinho']
    }
  ],
  relations: {
    'evaristo': ['ana-cristina', 'maria', 'margarete'],
    'ana-cristina': ['evaristo', 'maria', 'edileusa'],
    'maria': ['evaristo', 'monique', 'rafael'],
    'margarete': ['evaristo', 'maria-antonia'],
    'edileusa': ['ana-cristina', 'sofia'],
    'monique': ['maria', 'rafael', 'pedrinho'],
    'rafael': ['maria', 'monique', 'sofia'],
    'maria-antonia': ['margarete', 'toninho'],
    'toninho': ['maria-antonia', 'pedrinho'],
    'sofia': ['rafael', 'edileusa', 'pedrinho'],
    'pedrinho': ['monique', 'toninho', 'sofia']
  }
};

const DOCUMENTS = [
  {
    id: '001',
    title: 'Estatuto da Família',
    content: `<p><strong>Artigo 1º</strong> — A Família Margarido reconhece-se como entidade organizacional sem fins lucrativos, sem fins lucrativos mesmo.</p>
<p><strong>Artigo 2º</strong> — Toda reunião familiar deve ter pauta. A pauta será ignorada imediatamente após o primeiro comentário não relacionado.</p>
<p><strong>Artigo 3º</strong> — É proibido dizer "não conte para ninguém" dentro de um raio de 500 metros de qualquer membro da família.</p>
<p><strong>Artigo 4º</strong> — O estagiário oficial do caos possui imunidade parcial a consequências, desde que alegue inocência com convicção suficiente.</p>
<p><strong>Artigo 5º</strong> — Este estatuto pode ser alterado a qualquer momento, desde que ninguém perceba que foi alterado.</p>`
  },
  {
    id: '002',
    title: 'Relatório Anual de Caos',
    content: `<p><strong>Período:</strong> Ano fiscal Margarido (início e fim indeterminados)</p>
<p><strong>Resumo Executivo:</strong> O índice geral de caos manteve-se estável em níveis preocupantemente altos, com picos durante reuniões familiares e feriados.</p>
<p><strong>Incidentes Registrados:</strong> 847 (estimativa conservadora)</p>
<p><strong>Incidentes Explicados:</strong> 12</p>
<p><strong>Incidentes Atribuídos ao Pedrinho:</strong> 203 (ele nega todos)</p>
<p><strong>Recomendação:</strong> Manter Monique no comando. Reavaliar em nunca.</p>`
  },
  {
    id: '003',
    title: 'Registro de Fofocas',
    content: `<p><strong>Classificação:</strong> CONFIDENCIAL (mas todo mundo sabe)</p>
<p>Registro #2847 — Origem: desconhecida. Velocidade de propagação: 4,2 minutos. Versões circulando: 7.</p>
<p>Registro #2848 — Maria Antônia confirmou que "já sabia". Status: confirmado antes de acontecer.</p>
<p>Registro #2849 — Toninho possui versão alternativa. Coerência: 23%.</p>
<p><em>Nota: Este documento se auto-atualiza. Não tente imprimir.</em></p>`
  },
  {
    id: '004',
    title: 'Manual de Sobrevivência Familiar',
    content: `<p><strong>Capítulo 1:</strong> Nunca chegue atrasado. Chegue cedo o suficiente para ser questionado sobre por que chegou cedo.</p>
<p><strong>Capítulo 2:</strong> Em discussões, cite Rafael apenas se quiser encerrar o assunto imediatamente.</p>
<p><strong>Capítulo 3:</strong> Se Pedrinho disser "não fiz nada", verifique imediatamente.</p>
<p><strong>Capítulo 4:</strong> "No meu tempo" será dito. Prepare-se mentalmente.</p>
<p><strong>Capítulo 5:</strong> Não existe capítulo 5. Ninguém leu até aqui mesmo.</p>`
  },
  {
    id: '005',
    title: 'Ata da Última Reunião',
    content: `<p>A reunião começou às 19h.</p>
<p>Às 19h07, alguém começou uma discussão.</p>
<p>Às 19h14, ninguém mais lembrava qual era o assunto original.</p>
<p>Às 19h31, Maria Antônia informou um acontecimento que ninguém tinha pedido para saber.</p>
<p>Às 19h45, Pedrinho quebrou algo. Ele afirma que já estava quebrado.</p>
<p>Às 20h02, Rafael sugeriu "vamos conversar". A conversa foi encerrada.</p>
<p>Reunião encerrada.</p>
<p><em>Próxima reunião: data a definir. Provavelmente antes do combinado.</em></p>`
  }
];

const TIMELINE = [
  { era: 'ERA I', title: 'OS FUNDADORES', description: 'O início da linhagem.', year: null },
  { era: 'ERA II', title: 'A EXPANSÃO', description: 'Novos membros chegaram.', year: null },
  { era: 'ERA III', title: 'O CAOS', description: 'Em algum momento, ninguém sabia mais o que estava acontecendo.', year: null },
  { era: 'ERA IV', title: 'A ERA MODERNA', description: 'A família ganhou um site.', year: null },
  { era: null, title: 'O INCIDENTE', description: 'Alguém teve a ideia de criar este site.', year: '2026' }
];

const DASHBOARD_STATS = [
  { label: 'ÍNDICE GERAL DE CAOS', value: 91, max: 100, suffix: '%' },
  { label: 'PROBABILIDADE DE UMA REUNIÃO VIRAR FOFOCA', value: 99, max: 100, suffix: '%' },
  { label: 'ORGANIZAÇÃO', value: 38, max: 100, suffix: '%' },
  { label: 'NÍVEL DE DRAMA', value: 84, max: 100, suffix: '%' },
  { label: 'HISTÓRIAS SEM CONTEXTO', value: null, max: 100, suffix: '', special: '∞' },
  { label: 'CHANCE DE ALGUÉM DIZER "NO MEU TEMPO"', value: 93, max: 100, suffix: '%' }
];

const TIER_LABELS = {
  core: { emoji: '🟢', label: 'Núcleo familiar' },
  extended: { emoji: '🟡', label: 'Família ampliada' },
  council: { emoji: '🔵', label: 'Conselho familiar' },
  chaos: { emoji: '🔴', label: 'Área de caos' }
};

function getMemberById(id) {
  return FAMILY_MEMBERS.find(m => m.id === id);
}
