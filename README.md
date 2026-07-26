# Agenda Pessoal

Agenda pessoal no navegador — compromissos do dia, anotações e visão da semana. Os dados ficam no `localStorage` do aparelho (sync Firebase opcional).

**App principal (Vercel):** https://projeto-1-criar.vercel.app  
**Espelho (GitHub Pages):** https://migs-maker00.github.io/agenda-pessoal/

## Deploy

- **Vercel** — deploy automático a cada push em `main` (app estático + APIs `/api/*` com Groq/Gemini).
- **GitHub Pages** — espelho estático; as APIs de IA chamam o backend Vercel.

Configure no Vercel: `GROQ_API_KEY`, opcional `GEMINI_API_KEY`, `ALLOWED_ORIGIN`.

## Funcionalidades

- **Hoje** — compromissos com horário, checklist do dia, sugestão rápida ao adicionar
- **Semana** — gráfico dos últimos 7 dias e metas semanais
- **Diário** — anotações por data
- **Insights** — sequência, taxa de 30 dias, resumo da semana, calendário
- **Ajustes** — sync Firebase, backup, tema

## Arquitetura

```
.
├── index.html              # Shell da aplicação
├── style.css               # Estilos e temas
├── firebase-config.js      # Config Firebase (sync)
├── sync.js                 # Sincronização Mac ↔ iPhone
├── js/
│   ├── config.js           # Versão do app (cache-bust)
│   ├── main.js             # Entrada — inicializa e expõe API pro sync
│   ├── app.js              # UI, estado, renderização, eventos
│   └── lib/
│       └── inteligencia.js # Sugestões, resumo, alertas
└── manifest.webmanifest    # PWA
```

- **ES Modules** — `main.js` importa `app.js` e as libs
- **Sem build** — GitHub Pages serve os arquivos direto
- **sync.js** usa `window.getEstadoHabitos` etc., expostos por `main.js`

## Desenvolvimento local

```bash
cd agenda-pessoal
npx serve -p 5173
```

Abra http://localhost:5173

## Privacidade

Compromissos e notas ficam no seu navegador. O sync Firebase é opcional.
