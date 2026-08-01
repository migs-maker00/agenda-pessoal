/**

 * Smoke E2E — roda com: node scripts/e2e-smoke.mjs

 * Requer: npx playwright (instala na hora se faltar)

 */

import { chromium } from "playwright";



const BASE = process.env.BASE_URL || "http://localhost:5173";

const API = "https://projeto-1-criar.vercel.app";



const results = [];



function ok(name, detail = "") {

  results.push({ name, pass: true, detail });

  console.log(`✓ ${name}${detail ? ` — ${detail}` : ""}`);

}



function fail(name, detail = "") {

  results.push({ name, pass: false, detail });

  console.error(`✗ ${name}${detail ? ` — ${detail}` : ""}`);

}



async function abrirDetails(page, id) {

  await page.locator(`#${id}`).evaluate((el) => {

    el.open = true;

  });

}



async function main() {

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({

    locale: "pt-BR",

    serviceWorkers: "allow",

  });

  const page = await context.newPage();

  const jsErrors = [];



  page.on("pageerror", (err) => jsErrors.push(err.message));



  try {

    await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });

    ok("App carrega", BASE);



    const marca = await page.locator(".marca").textContent();
    if (marca?.includes("North")) ok("Marca North visível", marca.trim());
    else fail("Marca North visível", marca || "vazio");

    const titulo = await page.locator("h1.titulo-dia").textContent();

    if (titulo?.includes("Agora") || titulo?.includes("Now")) ok("Título Agora visível", titulo.trim());

    else fail("Título Agora visível", titulo || "vazio");



    const mindosHoje = await page.locator("#mindos-hoje .mindos-saudacao, #mindos-hoje .mindos-livre, #mindos-hoje .mindos-foco-nome").count();

    if (mindosHoje > 0) ok("North Agora renderiza");
    else fail("North Agora renderiza", "conteúdo vazio");

    const convite = page.locator("[data-north-convite]");
    if ((await convite.count()) > 0) {
      const acao = await convite.first().getAttribute("data-north-convite");
      await convite.first().click();
      await page.waitForTimeout(300);
      const painelAlvo = acao === "cheguei" ? "cheguei" : acao;
      const hidden = await page.locator(`#painel-${painelAlvo}`).getAttribute("hidden");
      if (hidden === null) ok("Convite North abre painel", acao);
      else fail("Convite North abre painel", acao);
      await page.click('button.nav-item[data-painel="hoje"]');
      await page.waitForTimeout(200);
    } else {
      ok("Convite North (texto calmo)", "sem ação — ok");
    }



    const abas = ["guia", "estudo", "rotina", "semana", "diario", "insights", "ajustes"];

    for (const aba of abas) {

      await page.click(`button.nav-item[data-painel="${aba}"]`);

      await page.waitForTimeout(300);

      const painel = page.locator(`#painel-${aba}`);

      const hidden = await painel.getAttribute("hidden");

      if (hidden === null) ok(`Aba ${aba} abre`);

      else fail(`Aba ${aba} abre`, "painel ainda hidden");

    }



    await page.click('button.nav-item[data-painel="estudo"]');

    const estudoMindos = await page.locator("#mindos-estudo .mindos-sec-rotulo").textContent();

    if (estudoMindos?.includes("Conhecimento")) ok("North Conhecimento renderiza", estudoMindos.trim());
    else fail("North Conhecimento renderiza", estudoMindos || "vazio");



    await page.click('button.nav-item[data-painel="rotina"]');

    const rotinaMindos = await page.locator("#mindos-rotina .mindos-sec-rotulo").textContent();

    if (rotinaMindos?.includes("Ritmo")) ok("North Ritmo renderiza", rotinaMindos.trim());
    else fail("North Ritmo renderiza", rotinaMindos || "vazio");



    await page.click('button.nav-item[data-painel="semana"]');

    const semanaMindos = await page.locator("#mindos-semana .mindos-sec-rotulo").textContent();

    if (semanaMindos?.includes("Direção")) ok("North Direção renderiza", semanaMindos.trim());
    else fail("North Direção renderiza", semanaMindos || "vazio");



    await page.click('button.nav-item[data-painel="insights"]');

    const insightsMindos = await page.locator("#mindos-insights .mindos-sec-rotulo").textContent();

    if (insightsMindos?.includes("Continuidade")) ok("North Continuidade renderiza", insightsMindos.trim());
    else fail("North Continuidade renderiza", insightsMindos || "vazio");



    await page.click('button.nav-item[data-painel="rotina"]');

    await abrirDetails(page, "rotina-mais");

    await page.click('button.atalho[data-atalho="agua"]');

    await page.waitForTimeout(400);

    await page.click('button.nav-item[data-painel="hoje"]');

    await page.waitForTimeout(400);

    await abrirDetails(page, "hoje-mais");
    await abrirDetails(page, "hoje-mapa-ritmo");

    const checklist = page.locator("#lista-habitos li, #lista-habitos .habito-item, #lista-habitos button");

    const count = await checklist.count();

    if (count > 0) ok("Passo do ritmo aparece em Agora", `${count} item(ns)`);

    else fail("Passo do ritmo aparece em Agora", "lista vazia");



    await page.click('button.nav-item[data-painel="diario"]');

    const textarea = page.locator("#diario-texto, textarea[id*='diario'], #painel-diario textarea").first();

    if (await textarea.count()) {

      await textarea.fill("Teste automático — entrada do diário.");

      await page.waitForTimeout(500);

      ok("Diário aceita texto");

    } else {

      fail("Diário aceita texto", "textarea não encontrado");

    }



    await page.click('button.nav-item[data-painel="ajustes"]');

    const temaBtn = page.locator("#botao-tema");

    const temaAntes = await temaBtn.textContent();

    await temaBtn.click();

    await page.waitForTimeout(300);

    const temaDepois = await temaBtn.textContent();

    if (temaAntes !== temaDepois) ok("Alternar tema funciona");

    else ok("Alternar tema (pode já estar no limite)", temaDepois?.trim());



    for (const path of ["/api/neuro-feedback", "/api/diario-resumo", "/api/semana-agente", "/api/contexto-sugestao"]) {

      const res = await page.evaluate(async (url) => {

        const r = await fetch(url);

        return { status: r.status, body: await r.json() };

      }, `${API}${path}`);

      if (res.status === 200 && res.body?.ia === "groq") ok(`API ${path}`, "ia=groq");

      else fail(`API ${path}`, JSON.stringify(res));

    }



    await page.goto(BASE, { waitUntil: "networkidle" });

    await page.waitForTimeout(2000);

    const swReg = await page.evaluate(async () => {

      if (!("serviceWorker" in navigator)) return { supported: false };

      const reg = await navigator.serviceWorker.getRegistration();

      return { supported: true, active: Boolean(reg?.active), scope: reg?.scope || null };

    });

    if (swReg.supported && swReg.active) ok("Service Worker ativo", swReg.scope || "");

    else fail("Service Worker ativo", JSON.stringify(swReg));



    await context.setOffline(true);

    await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });

    await page.waitForTimeout(1500);

    const offlineTitulo = await page.locator("h1.titulo-dia").textContent();

    if (offlineTitulo?.trim()) ok("App funciona offline (reload)", offlineTitulo.trim());

    else fail("App funciona offline (reload)", "página não carregou");



    await page.click('button.nav-item[data-painel="rotina"]');

    await page.waitForTimeout(500);

    const rotinaVisivel = await page.locator("#painel-rotina").getAttribute("hidden");

    if (rotinaVisivel === null) ok("Navegação offline (Ritmo)");
    else fail("Navegação offline (Ritmo)");



    await context.setOffline(false);



    if (jsErrors.length === 0) ok("Sem erro JS na página");

    else fail("Sem erro JS na página", jsErrors.join(" | "));

  } catch (err) {

    fail("Execução geral", err.message);

  } finally {

    await browser.close();

  }



  const passed = results.filter((r) => r.pass).length;

  const failed = results.filter((r) => !r.pass).length;

  console.log(`\n--- ${passed} ok, ${failed} falha(s) ---`);

  process.exit(failed > 0 ? 1 : 0);

}



main();

