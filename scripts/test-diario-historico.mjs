/**
 * Testa limite do histórico do diário (máx. 2 / sem duplicatas).
 * Roda com: node scripts/test-diario-historico.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:5173";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newContext({ locale: "pt-BR" }).then((c) => c.newPage());

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });

  const resumo = await page.evaluate(() => {
    const CHAVE = "notas-diarias-historico";
    const hoje = new Date().toISOString().slice(0, 10);
    const spam = [];
    for (let i = 0; i < 7; i++) {
      spam.push({
        id: `spam-${i}`,
        chave: hoje,
        texto: "texto repetido ao sair " + "x".repeat(50),
        em: Date.now() - i * 60000,
        chars: 70,
        motivo: "fechar",
      });
    }
    spam.push({
      id: "outro",
      chave: hoje,
      texto: "versao diferente do diario",
      em: Date.now() - 8 * 60000,
      chars: 26,
      motivo: "manual",
    });
    localStorage.setItem(CHAVE, JSON.stringify(spam));
    return { antes: spam.length };
  });

  await page.reload({ waitUntil: "networkidle" });

  const depois = await page.evaluate(() => {
    const lista = JSON.parse(localStorage.getItem("notas-diarias-historico") || "[]");
    const hoje = new Date().toISOString().slice(0, 10);
    const daData = lista.filter((v) => v.chave === hoje);
    const textos = [...new Set(daData.map((v) => v.texto))];
    return {
      total: lista.length,
      porHoje: daData.length,
      textosUnicos: textos.length,
      textos,
    };
  });

  await page.locator('button[data-painel="diario"], [data-painel="diario"]').first().click().catch(() => {});
  // Continuidade / diário — tenta abrir o painel diário
  const painelDiario = page.locator("#painel-diario, [id*='diario']").first();
  await page.evaluate(() => {
    const btn = document.querySelector('[data-painel="diario"]');
    if (btn) btn.click();
  });
  await page.waitForTimeout(400);

  const cards = await page.locator("#lista-historico-diario .historico-item, #historico-diario li, [data-historico-id]").count().catch(() => 0);
  const cardsAlt = await page.locator("#lista-historico button, #diario-historico-lista > *").count().catch(() => 0);

  console.log("seed antes:", resumo.antes);
  console.log("depois prune:", depois);
  console.log("cards UI:", cards || cardsAlt);

  const pass =
    depois.porHoje <= 2 &&
    depois.textosUnicos <= 2 &&
    depois.porHoje === depois.textosUnicos;

  if (!pass) {
    console.error("FALHOU: histórico deveria ter no máx. 2 versões únicas por dia");
    process.exitCode = 1;
  } else {
    console.log("✓ histórico limitado a ≤2 versões únicas por data");
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
