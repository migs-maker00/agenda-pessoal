# MindOS

Segundo cérebro pessoal no navegador — **direção clara** para corpo, mente e conhecimento, sem peso na cabeça. Não é app de produtividade nem lista de tarefas.

**App principal (Vercel):** https://projeto-1-criar.vercel.app

**Espelho (GitHub Pages):** https://migs-maker00.github.io/agenda-pessoal/

- **Vercel** — deploy automático a cada push em `main` (PWA + APIs `/api/*` com Groq).
- Dados no `localStorage` do aparelho (sync Firebase opcional).

## O que é

MindOS organiza por baixo dos panos (ritmo, hábitos, estudo) e mostra na superfície **só o próximo passo**. Constituição do produto: [`docs/MINDOS.md`](docs/MINDOS.md).

## Áreas

- **Agora** — um foco, estado mental, o que vem depois
- **Guia** — roteiro de 5 min com North
- **Conhecimento** — estudo em um passo; ferramentas recolhidas
- **Ritmo** — mapa do dia; ajustes recolhidos
- **Direção** — tema da semana; números recolhidos
- **Diário** — captura e reflexão
- **Continuidade** — streak gentil; detalhes recolhidos

## Desenvolvimento local

```bash
npx serve -p 5173
```

Abra http://localhost:5173

Smoke E2E: `node scripts/e2e-smoke.mjs`
