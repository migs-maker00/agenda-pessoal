# North — Constituição do produto

**North** é a face do app (companheiro / segundo cérebro).  
**MindOS** é o nome interno da filosofia.  
**Usuário:** nome no perfil (ex.: Miguel) — North fala *com* você, não *por* você.

**Promessa:** Te dá direção — corpo, mente e conhecimento, sem peso na cabeça.

**Império pessoal** = direção de longo prazo (corpo, mente, conhecimento, continuidade). Não é metas, streaks nem produtividade.

Hábitos e rotina são **infraestrutura invisível**. A face do produto é **clareza e um próximo passo**.

Antes de qualquer decisão de design, código, copy ou IA: este documento manda.

---

## Missão

O North existe para **reduzir a carga mental**. Não existe para aumentar produtividade.

Produtividade é só consequência de uma mente organizada. O objetivo é o usuário sentir **menos caos na cabeça**.

Cinco segundos depois de abrir:

> "Agora eu sei exatamente o que fazer."

Esse sentimento vale mais do que qualquer funcionalidade.

---

## A constituição (regra única)

> Este aplicativo existe para reduzir carga mental, não para aumentar produtividade. Cada tela, mensagem, decisão, animação e resposta da IA deve fazer o usuário sentir que há menos coisas para pensar e apenas um próximo passo claro. Se uma funcionalidade aumenta a complexidade, ela não pertence ao projeto.

Não existem exceções.

---

## Sentimento-alvo

- Ao abrir (5 s): *"Agora eu sei exatamente o que fazer."*
- Ao fechar: *"Está tudo bem. Eu já sei qual é o próximo passo."*

Nunca fechar pensando: *"Tenho muita coisa para fazer."*

---

## Princípios (em conflito, vence o da esquerda)

1. Clareza > produtividade  
2. Simplicidade > funcionalidades  
3. Contexto > configuração  
4. Consistência > inovação  
5. Automação > esforço manual  
6. Continuidade > motivação  
7. Calma > urgência  
8. Redução de ansiedade > aumento de desempenho  

---

## Atrito zero

Menos cliques, leitura, opções, configuração e campos. Se uma ação exige muitos passos, redesenhar.

## Uma única decisão

Nunca várias prioridades ao mesmo tempo. Sempre um próximo passo. O app decide primeiro; o usuário confirma.

Não perguntar *"O que você quer fazer?"* — preferir *"Agora faça isso."*

---

## O papel da IA

A IA não existe para responder perguntas. Existe para **reduzir decisões**.

Organiza pensamentos, antecipa, remove atrito, protege do excesso. Segundo cérebro **silencioso** — nunca chatbot, coach, professor ou psicólogo.

## O app deve aprender

Horários, energia, padrões, sequência do ritmo, abandono, contexto emocional, estudo, treino, procrastinação. Depois de semanas, deixa de perguntar: organiza.

## O app deve esquecer

Resumir, arquivar, ocultar, compactar. Mostrar só o que ajuda **agora**. Ruído some.

## O app protege o usuário dele mesmo

Se o usuário estiver otimizando o sistema em vez de viver o dia, interromper com calma:

> "Essa melhoria pode esperar. Agora o mais importante é continuar seu dia."

---

## TDAH

Assumir TDAH: menos escolhas, distrações, texto, memória, decisões e notificações. Mais previsibilidade, continuidade, contexto, automação, clareza e foco.

Funcionar em dias ruins: cansado, ansioso, desmotivado, procrastinando, sobrecarregado.

## Sem culpa

Nunca: *"Você falhou."* / *"Você perdeu."* / *"Você está atrasado."*  
Sempre: *"Vamos continuar daqui."* / *"Hoje é um novo começo."* / *"O próximo passo já está preparado."*

## Linguagem

Calma, poucas palavras, muito contexto. Exemplos: *"Agora só isso."* · *"O resto pode esperar."* · *"Vamos por partes."* · *"Terminou?"* · *"Ótimo."* · *"Próximo passo."*

---

## Estados mentais

Organizado · Motivado · Distraído · Ansioso · Cansado · Sobrecarregado  

**Mais sobrecarga → menos informação na interface.** Nunca o contrário.

---

## Checklist antes de implementar

1. Isso reduz carga cognitiva?  
2. Isso exige decisão desnecessária?  
3. Uma pessoa com TDAH usaria isso num dia ruim?  
4. Isso diminui ansiedade?  
5. Deixa claro o próximo passo?  
6. Pode ser ainda mais simples?  
7. Estou criando feature ou resolvendo problema real?  

Se a maioria for não → simplificar ou não fazer.

Toda funcionalidade deve responder: qual ansiedade reduz? qual decisão elimina? o que fica mais simples?

## O que o app **não** vende

Produtividade, listas, disciplina, organização como fim, hábitos como produto.  
Vende **clareza, direção e tranquilidade**.

---

## Módulos da constituição (estudos North)

| # | Módulo | O que significa | Status | Onde no código |
|---|--------|-----------------|--------|----------------|
| 1 | **Identidade** | North = app; usuário = Miguel | ✅ | `north.js`, header, manifest |
| 2 | **Agora** | Um foco, depois alívio — não checklist | ✅ | `mindos-hoje.js`, `#hoje-mais` |
| 3 | **Estados mentais** | Mais sobrecarga → menos UI | ✅ | `mindos-estado.js` |
| 4 | **Linguagem + convites** | Tom calmo; convite acionável | ✅ | `north-convite.js`, `traducoes.js` |
| 5 | **Paineis recolhidos** | Infra sob “Ferramentas” | ✅ | `index.html` (`details`) |
| 6 | **Nav por áreas** | Agora, Conhecimento, Ritmo, Direção… | ✅ | `traducoes.js` `nav.*` |
| 7 | **IA silenciosa** | North nas APIs; sem chat nem cobrança | ✅ | `api/ia-shared.js` + APIs |
| 8 | **Memória / continuidade** | Diário, insights — sem streak de culpa | 🔄 | `diario-historico.js`, `mindos-insights.js` |
| 9 | **Sync entre aparelhos** | Mesmo North em celular e PC | 🔄 | Firebase sync |
| 10 | **Proatividade** | North avisa antes de você abrir | ⏳ | notificações + contexto |

**Próximo após IA silenciosa:** módulo 8 — memória/continuidade (diário alimenta o próximo passo sem dashboard).
