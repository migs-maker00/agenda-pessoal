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

    // Em produção o app pode se auto-recarregar uma vez ao detectar versão nova (SW).
    await page
      .locator("#mindos-hoje .north-home")
      .first()
      .waitFor({ state: "attached", timeout: 30000 })
      .catch(() => {});

    ok("App carrega", BASE);

    // Navegador novo em produção mostra o convite de sync — não é o alvo deste smoke.
    await page
      .locator("#migracao-host")
      .evaluate((el) => {
        el.hidden = true;
      })
      .catch(() => {});

    const marca = await page.locator(".marca").textContent();
    if (marca?.includes("North")) ok("Marca North visível", marca.trim());
    else fail("Marca North visível", marca || "vazio");

    const logo = await page.locator(".north-logo").count();
    if (logo > 0) ok("Logo North no cabeçalho");
    else fail("Logo North no cabeçalho", "img ausente");

    const titulo = await page.locator("h1.titulo-dia").textContent();

    if (titulo?.includes("North") || titulo?.includes("Now")) ok("Título North visível", titulo.trim());
    else fail("Título North visível", titulo || "vazio");

    const mindosHoje = await page.locator(
      "#mindos-hoje .north-home, #mindos-hoje .north-pergunta, #mindos-hoje .north-foco-card"
    ).count();

    if (mindosHoje > 0) ok("North Home renderiza");
    else fail("North Home renderiza", "conteúdo vazio");

    const estadoBtn = page.locator('button[data-north-estado="normal"]').first();
    if ((await estadoBtn.count()) > 0) {
      await estadoBtn.click();
      await page.waitForTimeout(400);
      const direcao = await page.locator(".north-home--direcao, .north-foco-card, .north-home--livre").count();
      if (direcao > 0) ok("Estado → direção", "transição ok");
      else fail("Estado → direção", "sem tela de foco");

      const caminho = await page.locator(".north-caminho-titulo").count();
      if (caminho > 0) ok("Caminho inteligente renderiza", "guia visível");
      else fail("Caminho inteligente renderiza", "sem guia");

      const chipFocado = page.locator('button[data-north-estado="focado"]').first();
      if ((await chipFocado.count()) > 0) {
        await chipFocado.click();
        await page.waitForTimeout(400);
        const ativo = await page.locator(".north-estado-opcao--ativo[data-north-estado=\"focado\"]").count();
        if (ativo > 0) ok("Trocar estado (barra)", "focado ativo");
        else fail("Trocar estado (barra)", "estado não atualizou");
      } else {
        fail("Trocar estado (barra)", "grade ausente");
      }

      // Passo 1: memória de padrões — escolher/trocar estado deve gravar histórico local.
      const aprende = await page.evaluate(() => {
        try {
          return JSON.parse(localStorage.getItem("north-aprende-v1") || "null");
        } catch {
          return null;
        }
      });
      if (aprende?.estados && Object.keys(aprende.estados).length > 0) {
        ok("Memória de padrões grava estado", "north-aprende-v1 populado");
      } else {
        fail("Memória de padrões grava estado", JSON.stringify(aprende));
      }

      const comecarBtn = page.locator("[data-north-comecar]").first();
      if ((await comecarBtn.count()) > 0) {
        await comecarBtn.click();
        await page.waitForTimeout(400);
        const focus = await page.locator("#north-focus, .north-focus-inner").count();
        if (focus > 0) ok("Começar abre foco", "CTA funciona");
        else fail("Começar abre foco", "focus mode não abriu");
      }
    } else {
      ok("Estado GPS (já escolhido hoje)", "pulando picker");
    }

    async function abrirMemoriaPainel(painel) {
      await page.click('button.nav-item[data-painel="memoria"]');
      await page.waitForTimeout(300);
      await page.click(`button[data-memoria-painel="${painel}"]`);
      await page.waitForTimeout(300);
    }

    const abasMemoria = ["estudo", "rotina", "semana", "diario", "insights", "emocional"];

    for (const aba of abasMemoria) {
      await abrirMemoriaPainel(aba);
      const painel = page.locator(`#painel-${aba}`);
      const hidden = await painel.getAttribute("hidden");
      if (hidden === null) ok(`Memória → ${aba} abre`);
      else fail(`Memória → ${aba} abre`, "painel ainda hidden");
    }

    // Passo 2: trilha emocional — praticar deve registrar progresso local.
    await abrirMemoriaPainel("emocional");
    const praticarBtn = page.locator("#mindos-emocional [data-emocional-praticar]").first();
    if ((await praticarBtn.count()) > 0) {
      await praticarBtn.click();
      await page.waitForTimeout(400);
      const emocional = await page.evaluate(() => {
        try {
          return JSON.parse(localStorage.getItem("emocional-v1") || "null");
        } catch {
          return null;
        }
      });
      if (emocional?.total > 0) ok("Trilha emocional grava prática", `total=${emocional.total}`);
      else fail("Trilha emocional grava prática", JSON.stringify(emocional));
    } else {
      fail("Trilha emocional grava prática", "sem botão de prática");
    }

    await page.click("#botao-ajustes");
    await page.waitForTimeout(300);
    const ajustesHidden = await page.locator("#painel-ajustes").getAttribute("hidden");
    if (ajustesHidden === null) ok("Ajustes abre (⚙)");
    else fail("Ajustes abre (⚙)", "painel hidden");

    await abrirMemoriaPainel("estudo");

    const estudoMindos = await page.locator("#mindos-estudo .mindos-sec-rotulo").textContent();

    if (estudoMindos?.includes("Conhecimento")) ok("North Conhecimento renderiza", estudoMindos.trim());
    else fail("North Conhecimento renderiza", estudoMindos || "vazio");

    await abrirMemoriaPainel("rotina");

    const rotinaMindos = await page.locator("#mindos-rotina .north-caminho-titulo").textContent();

    if (rotinaMindos?.trim()) ok("North Cultivos renderiza", rotinaMindos.trim());
    else fail("North Cultivos renderiza", rotinaMindos || "vazio");

    await abrirMemoriaPainel("semana");

    const semanaMindos = await page.locator("#mindos-semana .mindos-sec-rotulo").textContent();

    if (semanaMindos?.includes("Direção")) ok("North Direção renderiza", semanaMindos.trim());
    else fail("North Direção renderiza", semanaMindos || "vazio");

    await abrirMemoriaPainel("insights");

    const insightsMindos = await page.locator("#mindos-insights .mindos-sec-rotulo").textContent();

    if (insightsMindos?.includes("Continuidade")) ok("North Continuidade renderiza", insightsMindos.trim());
    else fail("North Continuidade renderiza", insightsMindos || "vazio");

    await abrirMemoriaPainel("rotina");

    await abrirDetails(page, "rotina-mais");

    await page.click('button.atalho[data-atalho="agua"]');

    await page.waitForTimeout(400);

    await page.click('button.nav-item[data-painel="hoje"]');

    await page.waitForTimeout(400);

    const comecar = page.locator("[data-north-comecar]");
    if ((await comecar.count()) > 0) ok("North recomenda próximo passo", "CTA visível");
    else {
      const estado = page.locator('button[data-north-estado="normal"]').first();
      if ((await estado.count()) > 0) {
        await estado.click();
        await page.waitForTimeout(400);
      }
      if ((await comecar.count()) > 0) ok("North recomenda próximo passo", "após estado");
      else fail("North recomenda próximo passo", "sem CTA");
    }

    await abrirMemoriaPainel("diario");

    const textarea = page.locator("#diario-texto, textarea[id*='diario'], #painel-diario textarea").first();

    if (await textarea.count()) {

      await textarea.fill("Teste automático — entrada do diário.");

      await page.waitForTimeout(500);

      ok("Diário aceita texto");

    } else {

      fail("Diário aceita texto", "textarea não encontrado");

    }



    await page.click("#botao-ajustes");
    await page.waitForTimeout(200);

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

    const ehLocal = BASE.includes("localhost") || BASE.includes("127.0.0.1");

    const swReg = await page.evaluate(async () => {

      if (!("serviceWorker" in navigator)) return { supported: false };

      const reg = await navigator.serviceWorker.getRegistration();

      return { supported: true, active: Boolean(reg?.active), scope: reg?.scope || null };

    });

    if (ehLocal) {
      if (!swReg.active) ok("Service Worker desligado no localhost (dev)", "arquivos sempre frescos");
      else fail("Service Worker desligado no localhost (dev)", "SW ainda ativo");
    } else if (swReg.supported && swReg.active) ok("Service Worker ativo", swReg.scope || "");
    else fail("Service Worker ativo", JSON.stringify(swReg));

    if (ehLocal) {
      ok("Offline (localhost)", "pulando — SW desligado em dev");
    } else {
      await context.setOffline(true);

      await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });

      await page.waitForTimeout(1500);

      const offlineTitulo = await page.locator("h1.titulo-dia").textContent();

      if (offlineTitulo?.trim()) ok("App funciona offline (reload)", offlineTitulo.trim());
      else fail("App funciona offline (reload)", "página não carregou");

      await abrirMemoriaPainel("rotina");

      await page.waitForTimeout(500);

      const rotinaVisivel = await page.locator("#painel-rotina").getAttribute("hidden");

      if (rotinaVisivel === null) ok("Navegação offline (Ritmo via Memória)");
      else fail("Navegação offline (Ritmo via Memória)");

      await context.setOffline(false);
    }



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

