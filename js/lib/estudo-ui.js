// UI da aba Estudo — renderização e eventos

import {
  adicionarLink,
  adicionarLinkSugerido,
  adicionarPalavra,
  avancarPalavra,
  falarTexto,
  htmlPlayer,
  linkAtivo,
  linkTemNota,
  linksPorTipo,
  marcarSessao,
  notaMidia,
  palavraAtual,
  parseMediaUrl,
  removerLink,
  resumoSessao,
  salvarNotaMidia,
} from "./estudo-hub.js?v=2.11.0";
import {
  escutarPronuncia,
  escutarDictado,
  pararEscuta,
  suportaReconhecimentoVoz,
} from "./estudo-fala.js";
import {
  listarVozesUI,
  rotuloVozAtual,
  salvarVozPreferida,
  vozSalva,
} from "./voz-sintese.js";
import {
  buscarLivros,
  carregarProgressoLivro,
  livroAtivo,
  META_PERGUNTAS_DIA,
  metaDiariaAtingida,
  moduloAtual,
  perguntaAtual,
  progressoGeral,
  registrarResposta,
  selecionarLivro,
} from "./livros-pratica.js?v=2.11.0";
import { trechosDoLivro } from "./livros-trechos.js?v=2.11.0";
import { CATEGORIAS_LIVRO, TEMAS_LIVRO } from "./livros-dados.js?v=2.11.0";
import {
  linkSugeridoPorId,
  linksSugeridosPorTipo,
  urlJaSalva,
} from "./estudo-links-sugeridos.js?v=2.11.0";
import {
  MODULOS_NEURO,
  moduloNeuroPorId,
  proximoModuloNeuro,
} from "./neuro-modulos.js";
import {
  avaliarExplicacao,
  explicacaoSalva,
  modulosExplicadosNoDia,
  salvarExplicacao,
} from "./neuro-explicar.js";
import { iaNeuroDisponivel, pedirFeedbackIaNeuro } from "./neuro-ia.js";
import { t } from "./i18n.js";
import {
  dictadoExplicacaoNeuro,
  falarPortugues,
  montarTextoFeedback,
  suportaReconhecimentoVoz as suportaVozNeuro,
} from "./neuro-voz.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function fraseVocab(p) {
  return (p.frase && p.frase.trim()) || `I use the word "${p.en}" today.`;
}

function renderTrechosLivro(livroId, { compacto = false, limite } = {}) {
  let trechos = trechosDoLivro(livroId);
  if (!trechos.length) return "";
  if (limite) trechos = trechos.slice(0, limite);

  const itens = trechos
    .map(
      (t) => `
    <blockquote class="livro-trecho">
      <p class="livro-trecho-texto">“${esc(t.texto)}”</p>
      <p class="livro-trecho-contexto">${esc(t.contexto)}</p>
    </blockquote>`
    )
    .join("");

  return `
    <div class="livro-trechos ${compacto ? "livro-trechos-compacto" : ""}">
      <p class="livro-trechos-titulo">Trechos-chave</p>
      <p class="livro-trechos-dica">Ideias centrais do autor — em linguagem direta, pra você entender o recado.</p>
      ${itens}
    </div>`;
}

/** Título + autor — exibido em todo o app de estudo */
function cabecalhoLivro(livro, { destaque = false } = {}) {
  const cls = destaque ? "estudo-livro-cabecalho estudo-livro-cabecalho-destaque" : "estudo-livro-cabecalho";
  const autor = livro.autor ? `<p class="estudo-livro-autor"><span class="estudo-por">por</span> ${esc(livro.autor)}</p>` : "";
  return `
    <div class="${cls}">
      <p class="estudo-livro-titulo">${esc(livro.titulo)}</p>
      ${autor}
    </div>`;
}

function renderSessao(dados, metaPratica) {
  const r = resumoSessao(dados, metaPratica);
  const livro = livroAtivo();
  const passosHtml = r.passos
    .map(
      (p) =>
        `<li class="estudo-passo ${p.ok ? "feito" : ""}"><span class="estudo-passo-icone">${p.ok ? "✓" : "○"}</span>${p.rotulo}</li>`
    )
    .join("");

  return `
    <section class="estudo-bloco estudo-sessao">
      <h2 class="bloco-titulo">Sessão de hoje</h2>
      ${cabecalhoLivro(livro, { destaque: true })}
      <p class="bloco-apoio">${r.feitos}/${r.total} etapas — vídeo, áudio, questões, falar e neuro.</p>
      <ul class="estudo-passos">${passosHtml}</ul>
      <div class="estudo-sessao-botoes">
        <button type="button" class="botao-secundario" data-estudo-aba="neuro">🧠 Neuro</button>
        <button type="button" class="botao-secundario" data-estudo-aba="livros">📚 Livros</button>
        <button type="button" class="botao-secundario" data-estudo-aba="assistir">▶ Assistir</button>
        <button type="button" class="botao-secundario" data-estudo-aba="ouvir">🎧 Ouvir</button>
        <button type="button" class="botao-secundario" data-estudo-aba="praticar">📖 Praticar</button>
        <button type="button" class="botao-secundario" data-estudo-aba="falar">🗣️ Falar</button>
      </div>
    </section>`;
}

function renderFormLink(placeholder) {
  return `
    <form class="estudo-form-link" data-estudo-form="link">
      <input type="text" name="titulo" class="campo-opcao" placeholder="Nome (ex.: Aula de inglês)" maxlength="60" />
      <input type="url" name="url" class="campo-opcao" placeholder="${esc(placeholder)}" required />
      <button type="submit" class="botao-secundario">Salvar link</button>
    </form>`;
}

function renderSugestoesLinks(dados, tipo) {
  const livro = livroAtivo();
  const todas = linksSugeridosPorTipo(tipo, livro.id).filter((s) => !urlJaSalva(dados, s.url));
  if (!todas.length) return "";

  const doLivro = todas.filter((s) => s.livroId === livro.id);
  const criadores = todas.filter((s) => !s.livroId);
  const icone = tipo === "video" ? "▶" : "🎧";

  const bloco = (titulo, itens) => {
    if (!itens.length) return "";
    return `
      <p class="estudo-form-rotulo">${esc(titulo)}</p>
      <ul class="estudo-sugestoes-lista">
        ${itens
          .map(
            (s) => `
          <li>
            <button type="button" class="estudo-sugestao-btn" data-estudo-sugerir="${s.id}">
              <span class="estudo-sugestao-icone">${icone}</span>
              <span class="estudo-sugestao-titulo">${esc(s.titulo)}</span>
              <span class="estudo-sugestao-add">+ Adicionar</span>
            </button>
          </li>`
          )
          .join("")}
      </ul>`;
  };

  return `
    <div class="estudo-sugestoes">
      ${bloco(`Sugestões para ${livro.titulo}`, doLivro)}
      ${bloco("Canais favoritos", criadores)}
    </div>`;
}

function renderNotasMidia(ativo, dados) {
  if (!ativo) return "";
  const nota = notaMidia(dados, ativo.id);
  const rotulo = ativo.tipo === "video" ? "vídeo" : "áudio";
  return `
    <div class="estudo-notas-midia" data-estudo-notas-bloco="${ativo.id}">
      <label class="estudo-form-rotulo" for="estudo-nota-${ativo.id}">Anotações sobre este ${rotulo}</label>
      <p class="estudo-notas-dica">Ideias, citações, minutagem — salva sozinho enquanto você escreve.</p>
      <textarea
        id="estudo-nota-${ativo.id}"
        class="nota-campo estudo-nota-midia"
        data-estudo-nota-midia
        data-estudo-nota-link="${ativo.id}"
        rows="4"
        maxlength="2000"
        placeholder="Ex.: 5:20 — ideia sobre foco e distrações..."
      >${esc(nota)}</textarea>
      <p class="estudo-notas-status" data-estudo-nota-status hidden aria-live="polite">Salvo ✓</p>
    </div>`;
}

function renderListaLinks(links, ativoId, dados) {
  if (!links.length) {
    return `<p class="estudo-vazio">Nenhum link ainda. Cole um URL do YouTube, Spotify ou arquivo de áudio (.mp3).</p>`;
  }
  return `<ul class="estudo-links">
    ${links
      .map(
        (l) => `
      <li class="estudo-link-item ${l.id === ativoId ? "ativo" : ""}">
        <button type="button" class="estudo-link-btn" data-estudo-link="${l.id}">
          <span class="estudo-link-tipo">${l.tipo === "video" ? "▶" : "🎧"}</span>
          <span class="estudo-link-titulo">${esc(l.titulo)}</span>
          ${linkTemNota(dados, l.id) ? `<span class="estudo-link-nota" aria-label="Tem anotação">✎</span>` : ""}
        </button>
        <button type="button" class="estudo-link-remover" data-estudo-remover="${l.id}" aria-label="Remover">×</button>
      </li>`
      )
      .join("")}
  </ul>`;
}

function renderAssistir(dados) {
  const links = linksPorTipo(dados, "video");
  const ativo = linkAtivo(dados);
  const parsed = ativo ? parseMediaUrl(ativo.url) : null;
  const player = ativo && ativo.tipo === "video" ? htmlPlayer(parsed) : "";

  return `
    <section class="estudo-bloco">
      <h2 class="bloco-titulo">Assistir</h2>
      <p class="bloco-apoio">Vídeos do YouTube aqui dentro — sem sair do app.</p>
      ${player}
      ${renderNotasMidia(ativo, dados)}
      ${renderSugestoesLinks(dados, "video")}
      ${renderListaLinks(links, dados.linkAtivoId, dados)}
      ${renderFormLink("https://youtube.com/watch?v=...")}
      <div class="estudo-acoes-timer">
        <button type="button" class="botao-secundario" data-estudo-timer="15">Timer 15 min</button>
        <button type="button" class="botao-texto" data-estudo-marcar="assistir">Marcar como feito ✓</button>
      </div>
    </section>`;
}

function renderOuvir(dados) {
  const links = linksPorTipo(dados, "audio");
  const ativo = links.find((l) => l.id === dados.linkAtivoId) || links[0];
  const parsed = ativo ? parseMediaUrl(ativo.url) : null;
  const player =
    ativo && (ativo.tipo === "audio" || ativo.tipo === "podcast") ? htmlPlayer(parsed) : "";

  return `
    <section class="estudo-bloco">
      <h2 class="bloco-titulo">Ouvir</h2>
      <p class="bloco-apoio">Podcast, Spotify ou arquivo de áudio (.mp3).</p>
      ${player}
      ${renderNotasMidia(ativo, dados)}
      ${renderSugestoesLinks(dados, "audio")}
      ${renderListaLinks(links, ativo?.id, dados)}
      ${renderFormLink("https://open.spotify.com/episode/... ou link .mp3")}
      <div class="estudo-acoes-timer">
        <button type="button" class="botao-secundario" data-estudo-timer="10">Timer 10 min</button>
        <button type="button" class="botao-texto" data-estudo-marcar="ouvir">Marcar como feito ✓</button>
      </div>
    </section>`;
}

function renderPraticar(chaveDia) {
  const progresso = carregarProgressoLivro();
  const livro = livroAtivo();
  const g = progressoGeral(livro, progresso);

  if (metaDiariaAtingida(progresso, chaveDia)) {
    return `
      <section class="estudo-bloco estudo-pratica">
        <h2 class="bloco-titulo">Praticar ✓</h2>
        ${cabecalhoLivro(livro, { destaque: true })}
        <p class="bloco-apoio">Meta de hoje feita (${META_PERGUNTAS_DIA} questões). Progresso: ${g.pct}%.</p>
      </section>`;
  }

  const mod = moduloAtual(livro, progresso);
  const pergunta = perguntaAtual(livro, progresso);
  if (!pergunta) {
    return `
      <section class="estudo-bloco estudo-pratica">
        <h2 class="bloco-titulo">Praticar — completo!</h2>
        ${cabecalhoLivro(livro, { destaque: true })}
        <p class="bloco-apoio">Você terminou todos os módulos desta obra.</p>
      </section>`;
  }

  const hojeCount = progresso.ultimoDia === chaveDia ? progresso.perguntasHoje : 0;

  let interacao = "";
  if (pergunta.tipo === "reflexao") {
    interacao = `
      <textarea class="pratica-reflexao nota-campo estudo-pratica-input" rows="2" placeholder="Sua resposta..."></textarea>
      <button type="button" class="botao-secundario estudo-pratica-confirmar">Pronto</button>`;
  } else {
    interacao = `
      <div class="pratica-opcoes">
        ${pergunta.opcoes
          .map(
            (op, i) =>
              `<button type="button" class="botao-secundario pratica-opcao estudo-pratica-opcao" data-indice="${i}">${esc(op)}</button>`
          )
          .join("")}
      </div>`;
  }

  return `
    <section class="estudo-bloco estudo-pratica" data-estudo-pratica="1">
      <h2 class="bloco-titulo">Praticar</h2>
      <p class="estudo-pratica-trocar">
        <button type="button" class="botao-texto" data-estudo-aba="livros">Trocar livro →</button>
      </p>
      ${cabecalhoLivro(livro, { destaque: true })}
      ${renderTrechosLivro(livro.id, { limite: 2 })}
      <p class="pratica-modulo">${esc(mod.nome)}</p>
      <p class="pratica-ideia">${esc(mod.ideia)}</p>
      <p class="pratica-meta">Hoje: ${hojeCount}/${META_PERGUNTAS_DIA} · Livro: ${g.pct}%</p>
      <p class="pratica-pergunta">${esc(pergunta.pergunta)}</p>
      ${interacao}
    </section>`;
}

function alvoElemento(evento) {
  const t = evento.target;
  if (t instanceof Element) return t;
  if (t?.parentElement instanceof Element) return t.parentElement;
  return null;
}

function renderFalar(dados) {
  const p = palavraAtual(dados);
  if (!p) {
    return `<section class="estudo-bloco"><p class="estudo-vazio">Adicione palavras abaixo.</p></section>`;
  }

  const frase = fraseVocab(p);
  const fb = dados.falaFeedback;
  let feedbackHtml = "";
  if (fb?.mensagem) {
    const cls = fb.status === "ouvindo" ? "ouvindo" : fb.ok ? "ok" : "erro";
    feedbackHtml = `<p class="estudo-fala-feedback ${cls}" role="status">${esc(fb.mensagem)}</p>`;
  } else {
    feedbackHtml = `<p class="estudo-fala-feedback" hidden role="status"></p>`;
  }

  const avisoMic = suportaReconhecimentoVoz()
    ? `<p class="estudo-falar-mic-aviso">Toque no microfone, permita o acesso e fale em inglês. Funciona melhor no Chrome.</p>`
    : `<p class="estudo-falar-mic-aviso estudo-falar-mic-off">Reconhecimento de voz indisponível neste navegador — use Chrome no celular.</p>`;

  const botoesMic = suportaReconhecimentoVoz()
    ? `
        <button type="button" class="botao-secundario estudo-btn-mic" data-estudo-mic="en">🎤 Falar palavra</button>
        <button type="button" class="botao-secundario estudo-btn-mic" data-estudo-mic="frase">🎤 Falar frase</button>`
    : "";

  const vozesEn = listarVozesUI("en-US");
  const vozAtual = vozSalva("en-US");
  const opcoesVoz =
    vozesEn.length > 0
      ? vozesEn
          .map(
            (v) =>
              `<option value="${esc(v.uri)}" ${vozAtual === v.uri ? "selected" : ""}>${esc(v.nome)}</option>`
          )
          .join("")
      : "";

  const seletorVoz =
    vozesEn.length > 0
      ? `
      <div class="estudo-voz-linha">
        <label class="estudo-form-rotulo" for="estudo-voz-en">Voz ao ouvir (inglês)</label>
        <select id="estudo-voz-en" class="campo-opcao" data-estudo-voz="en-US" aria-label="Voz em inglês">
          <option value="">Automática — ${esc(rotuloVozAtual("en-US"))}</option>
          ${opcoesVoz}
        </select>
        <p class="estudo-voz-dica">Só vozes 🇺🇸 americanas ou 🇬🇧 britânicas — pra não sair “pro a c tive”. Use <strong>Google US English</strong> no Chrome.</p>
      </div>`
      : "";

  return `
    <section class="estudo-bloco estudo-falar">
      <h2 class="bloco-titulo">Falar em voz alta</h2>
      <p class="bloco-apoio">Ouça → fale no microfone → veja se acertou. Palavra ${p.indice + 1}/${p.total}.</p>
      <div class="estudo-vocab-card">
        <p class="estudo-vocab-en">${esc(p.en)}</p>
        <p class="estudo-vocab-pt">${esc(p.pt)}</p>
        <p class="estudo-vocab-frase">"${esc(frase)}"</p>
      </div>
      ${feedbackHtml}
      <div class="estudo-falar-botoes">
        <button type="button" class="botao-secundario" data-estudo-ouvir="en">🔊 Ouvir palavra</button>
        <button type="button" class="botao-secundario" data-estudo-ouvir="frase">🔊 Ouvir frase</button>
        ${botoesMic}
        <button type="button" class="botao-secundario estudo-btn-proxima" data-estudo-acao="proxima">Próxima →</button>
      </div>
      ${avisoMic}
      ${seletorVoz}
      <form class="estudo-form-vocab" data-estudo-form="vocab">
        <p class="estudo-form-rotulo">Adicionar palavra sua</p>
        ${dados.vocabErro ? `<p class="estudo-vocab-erro" role="alert">${esc(dados.vocabErro)}</p>` : ""}
        <input type="text" name="en" class="campo-opcao" placeholder="Inglês" maxlength="40" required />
        <input type="text" name="pt" class="campo-opcao" placeholder="Português" maxlength="40" />
        <input type="text" name="frase" class="campo-opcao" placeholder="Frase (opcional)" maxlength="120" />
        <button type="submit" class="botao-secundario">Adicionar</button>
      </form>
    </section>`;
}

function htmlListaLivros(dados) {
  const progresso = carregarProgressoLivro();
  const ativo = livroAtivo();
  const termo = dados.buscaLivro || "";
  const cat = dados.categoriaLivro || "todos";
  const tema = dados.temaLivro || null;
  const resultados = buscarLivros(termo, cat, tema);

  if (resultados.length === 0) {
    return `<p class="estudo-vazio">Nenhum livro encontrado. Tente outro tema ou busque: <strong>frankl</strong>, <strong>foco</strong>, <strong>hesse</strong>.</p>`;
  }

  return `<ul class="estudo-livros-lista">
    ${resultados
      .map((livro) => {
        const prog = progressoGeral(livro, progresso);
        const selecionado = livro.id === ativo.id;
        return `
      <li class="estudo-livro-card ${selecionado ? "ativo" : ""}">
        <div class="estudo-livro-info">
          ${cabecalhoLivro(livro)}
          <p class="estudo-livro-sub">${esc(livro.subtitulo)}</p>
          <p class="estudo-livro-tags">${(livro.tags || []).map((t) => `#${esc(t)}`).join(" ")}</p>
          ${renderTrechosLivro(livro.id, { compacto: true, limite: 1 })}
          ${prog.pct > 0 ? `<p class="estudo-livro-prog">Progresso: ${prog.pct}%</p>` : ""}
        </div>
        <button type="button" class="botao-secundario" data-estudo-selecionar-livro="${livro.id}">
          ${selecionado ? "Estudando ✓" : "Estudar este"}
        </button>
      </li>`;
      })
      .join("")}
  </ul>`;
}

export function atualizarResultadoLivros(root, dados) {
  const wrap = root.querySelector("[data-estudo-livros-resultado]");
  if (!wrap) return;
  wrap.innerHTML = htmlListaLivros(dados);
}

function renderLivros(dados) {
  const progresso = carregarProgressoLivro();
  const ativo = livroAtivo();
  const g = progressoGeral(ativo, progresso);
  const termo = dados.buscaLivro || "";
  const cat = dados.categoriaLivro || "todos";
  const temaAtivo = dados.temaLivro || null;

  const chips = CATEGORIAS_LIVRO.map(
    (c) =>
      `<button type="button" class="estudo-cat-chip ${cat === c.id && !temaAtivo ? "ativo" : ""}" data-estudo-cat="${c.id}">${c.rotulo}</button>`
  ).join("");

  const temas = TEMAS_LIVRO.map(
    (t) => `
    <button type="button" class="estudo-tema-card ${temaAtivo === t.id ? "ativo" : ""}" data-estudo-tema="${t.id}">
      <span class="estudo-tema-titulo">${esc(t.titulo)}</span>
      <span class="estudo-tema-desc">${esc(t.descricao)}</span>
    </button>`
  ).join("");

  return `
    <section class="estudo-bloco estudo-biblioteca">
      <h2 class="bloco-titulo">Biblioteca</h2>
      <p class="bloco-apoio">Escolha um tema ou busque por autor — pratique com questões, no seu ritmo.</p>
      <div class="estudo-lendo-agora">
        <span class="estudo-lendo-rotulo">Lendo agora</span>
        ${cabecalhoLivro(ativo, { destaque: true })}
        <span class="estudo-lendo-pct">${g.pct}% do estudo</span>
      </div>
      ${renderTrechosLivro(ativo.id)}
      <div class="estudo-temas" role="list" aria-label="Coleções temáticas">
        ${temas}
      </div>
      <input
        type="search"
        class="campo-opcao estudo-busca-livro"
        data-estudo-busca-livro
        placeholder="Buscar: frankl, foco, hesse, essencialismo…"
        value="${esc(termo)}"
        maxlength="80"
        autocomplete="off"
        enterkeyhint="search"
      />
      <div class="estudo-categorias">${chips}</div>
      <div data-estudo-livros-resultado>${htmlListaLivros(dados)}</div>
    </section>`;
}

function renderNeuro(dados, chaveDia) {
  const modId = dados.neuroModuloAtivo || MODULOS_NEURO[0].id;
  const mod = moduloNeuroPorId(modId);
  const salva = explicacaoSalva(mod.id, chaveDia);
  const rascunho = dados.neuroRascunho ?? salva?.texto ?? "";
  const fb = dados.neuroFeedback;
  const explicadosHoje = modulosExplicadosNoDia(chaveDia);

  const chips = MODULOS_NEURO.map((m) => {
    const feito = Boolean(explicacaoSalva(m.id, chaveDia));
    const fase =
      m.fase === "D"
        ? ` <span class="neuro-mod-fase" title="${esc(t("neuro.fase"))}">${esc(m.fase)}</span>`
        : "";
    return `<button type="button" class="neuro-mod-chip ${m.id === mod.id ? "ativo" : ""} ${feito ? "feito" : ""}" data-neuro-modulo="${m.id}">${m.emoji} ${esc(m.titulo)}${fase}${feito ? " ✓" : ""}</button>`;
  }).join("");

  const pontos = mod.pontosChave
    .map((p) => `<li>${esc(p)}</li>`)
    .join("");

  let feedbackHtml = "";
  if (dados.neuroIaCarregando) {
    feedbackHtml = `
      <div class="neuro-feedback neuro-feedback-ia-carregando" role="status">
        <p class="neuro-fb-msg">${esc(t("neuro.ia.carregando"))}</p>
      </div>`;
  } else if (fb) {
    const cls = fb.ok ? "ok" : fb.curto ? "aviso" : "parcial";
    const fonteIa = fb.fonte === "ia";
    const acertos =
      fb.acertos?.length > 0
        ? `<p class="neuro-fb-lista"><strong>${esc(t("neuro.fb.acertos"))}</strong> ${fb.acertos.map(esc).join(" · ")}</p>`
        : "";
    const faltou =
      fb.faltou?.length > 0
        ? `<p class="neuro-fb-lista neuro-fb-faltou"><strong>${esc(t("neuro.fb.faltou"))}</strong> ${fb.faltou.map(esc).join(" · ")}</p>`
        : "";
    const pergunta = fb.perguntaSeguinte
      ? `<p class="neuro-fb-pergunta"><strong>${esc(t("neuro.fb.pergunta"))}</strong> ${esc(fb.perguntaSeguinte)}</p>`
      : "";
    const acoesFb = `
      <div class="neuro-fb-acoes">
        <button type="button" class="botao-secundario" data-neuro-ouvir-feedback="1">${esc(t("neuro.fb.ouvir"))}</button>
        ${fb.perguntaSeguinte && suportaVozNeuro() ? `<button type="button" class="botao-secundario" data-neuro-responder-pergunta="1">${esc(t("neuro.fb.responder"))}</button>` : ""}
      </div>`;
    feedbackHtml = `
      <div class="neuro-feedback ${cls} ${fonteIa ? "neuro-feedback-ia" : ""}" role="status">
        ${fonteIa ? `<p class="neuro-fb-fonte">${esc(t("neuro.fb.fonte"))}</p>` : `<p class="neuro-fb-pct">${esc(t("neuro.fb.pct", { pct: fb.pct ?? 0 }))}</p>`}
        <p class="neuro-fb-msg">${esc(fb.feedback)}</p>
        ${acertos}
        ${faltou}
        ${pergunta}
        ${acoesFb}
      </div>`;
  }

  const micBtns = suportaVozNeuro()
    ? `<div class="neuro-voz-botoes">
        <button type="button" class="botao-primario neuro-voz-destaque" data-neuro-voz-completa="1">${esc(t("neuro.voz.completa"))}</button>
        <button type="button" class="botao-secundario" data-neuro-dictado="1">${esc(t("neuro.voz.dictado"))}</button>
      </div>`
    : `<p class="neuro-voz-indisponivel">${esc(t("neuro.voz.indisponivel"))}</p>`;

  const dictadoStatus =
    dados.neuroDictadoStatus
      ? `<p class="neuro-dictado-status" role="status">${esc(dados.neuroDictadoStatus)}</p>`
      : "";

  const prox = proximoModuloNeuro(mod.id);

  const trilhaApoio = t("neuro.trilha.apoio", {
    total: MODULOS_NEURO.length,
    hoje: explicadosHoje,
    ia: iaNeuroDisponivel() ? t("neuro.trilha.ia") : "",
  });

  return `
    <section class="estudo-bloco neuro-painel" data-neuro-painel="1">
      <h2 class="bloco-titulo">${esc(t("neuro.titulo"))}</h2>
      <p class="bloco-apoio">${esc(trilhaApoio)}</p>
      <div class="neuro-modulos-nav" role="tablist" aria-label="Módulos de neurociência">${chips}</div>
      <article class="neuro-modulo-card">
        <header class="neuro-modulo-cab">
          <span class="neuro-modulo-emoji">${mod.emoji}</span>
          <div>
            <h3 class="neuro-modulo-titulo">${esc(mod.titulo)}${mod.fase === "D" ? ` <span class="neuro-modulo-fase">${esc(t("neuro.fase"))}</span>` : ""}</h3>
            <p class="neuro-modulo-meta">${esc(mod.tempo)} · ${esc(mod.vocab.pt)} <span class="neuro-vocab-en">(${esc(mod.vocab.en)})</span></p>
          </div>
        </header>
        <div class="neuro-texto-leitura">${mod.texto
          .split("\n")
          .map((p) => `<p>${esc(p)}</p>`)
          .join("")}</div>
        <details class="neuro-pontos">
          <summary>${esc(t("neuro.pontos"))}</summary>
          <ul>${pontos}</ul>
        </details>
      </article>
      <div class="neuro-explicar">
        <label class="estudo-form-rotulo" for="neuro-explicacao">${esc(mod.perguntaExplicar)}</label>
        <p class="neuro-explicar-dica">${esc(t("neuro.explicar.dica"))}</p>
        ${micBtns}
        <textarea
          id="neuro-explicacao"
          class="nota-campo neuro-explicacao-campo"
          data-neuro-explicacao
          rows="5"
          maxlength="2500"
          placeholder="${esc(t("neuro.placeholder"))}"
        >${esc(rascunho)}</textarea>
        ${dictadoStatus}
        <div class="neuro-explicar-botoes">
          <button type="button" class="botao-primario" data-neuro-verificar="1" ${dados.neuroIaCarregando ? "disabled" : ""}>
            ${iaNeuroDisponivel() ? esc(t("neuro.verificar.ia")) : esc(t("neuro.verificar.local"))}
          </button>
          <button type="button" class="botao-secundario" data-estudo-timer="10">${esc(t("neuro.timer"))}</button>
          ${prox ? `<button type="button" class="botao-texto" data-neuro-proximo="${prox.id}">${esc(t("neuro.proximo", { titulo: prox.titulo }))}</button>` : ""}
        </div>
        ${feedbackHtml}
        <p class="neuro-dica-app">💡 ${esc(mod.dicaApp)}</p>
      </div>
    </section>`;
}

const ABAS = [
  { id: "sessao", rotulo: "Início", icone: "🏠" },
  { id: "neuro", rotulo: "Neuro", icone: "🧠" },
  { id: "livros", rotulo: "Livros", icone: "📚" },
  { id: "assistir", rotulo: "Assistir", icone: "▶" },
  { id: "ouvir", rotulo: "Ouvir", icone: "🎧" },
  { id: "praticar", rotulo: "Praticar", icone: "📖" },
  { id: "falar", rotulo: "Falar", icone: "🗣️" },
];

export function renderPainelEstudo(dados, chaveDia) {
  const aba = dados.abaAtiva || "sessao";
  const nav = ABAS.map(
    (a) =>
      `<button type="button" class="estudo-nav-item ${aba === a.id ? "ativo" : ""}" data-estudo-aba="${a.id}">${a.icone} ${a.rotulo}</button>`
  ).join("");

  let conteudo = "";
  if (aba === "sessao") conteudo = renderSessao(dados, META_PERGUNTAS_DIA);
  else if (aba === "neuro") conteudo = renderNeuro(dados, chaveDia);
  else if (aba === "livros") conteudo = renderLivros(dados);
  else if (aba === "assistir") conteudo = renderAssistir(dados);
  else if (aba === "ouvir") conteudo = renderOuvir(dados);
  else if (aba === "praticar") conteudo = renderPraticar(chaveDia);
  else if (aba === "falar") conteudo = renderFalar(dados);

  return `
    <nav class="estudo-nav" aria-label="Modos de estudo">${nav}</nav>
    <div class="estudo-conteudo">${conteudo}</div>`;
}

export function renderResumoHoje(dados, chaveDia) {
  const r = resumoSessao(dados, META_PERGUNTAS_DIA);
  const progresso = carregarProgressoLivro();
  const livro = livroAtivo();
  const praticaOk = metaDiariaAtingida(progresso, chaveDia);
  const pct = Math.round((r.feitos / r.total) * 100);

  return `
    <h2 class="bloco-titulo">Estudo de hoje</h2>
    ${cabecalhoLivro(livro, { destaque: true })}
    <p class="bloco-apoio">Vídeo, áudio, questões, falar e neurociência.</p>
    <div class="estudo-resumo-barra"><div class="estudo-resumo-fill" style="width:${pct}%"></div></div>
    <p class="estudo-resumo-texto">${r.feitos}/${r.total} etapas · Prática: ${praticaOk ? "✓" : "pendente"}</p>
    <button type="button" class="botao-secundario estudo-ir-aba" data-ir-painel="estudo">Abrir Estudo →</button>`;
}

function atualizarIndicadorNotaLink(root, linkId, temNota) {
  const btn = root.querySelector(`[data-estudo-link="${linkId}"]`);
  if (!btn) return;
  let badge = btn.querySelector(".estudo-link-nota");
  if (temNota) {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "estudo-link-nota";
      badge.setAttribute("aria-label", "Tem anotação");
      badge.textContent = "✎";
      btn.appendChild(badge);
    }
  } else if (badge) {
    badge.remove();
  }
}

export function ligarPainelEstudo(root, getState, setState, opts = {}) {
  if (!root || root.dataset.estudoLigado === "1") return;
  root.dataset.estudoLigado = "1";

  const { chaveDia, onTimer, onAtualizarHoje, mostrarFeedback } = opts;

  root.addEventListener("click", (evento) => {
    const origem = alvoElemento(evento);
    if (!origem) return;

    const alvo = origem.closest(
      "[data-estudo-acao], [data-estudo-aba], [data-estudo-link], [data-estudo-remover], [data-estudo-sugerir], [data-estudo-timer], [data-estudo-marcar], [data-estudo-ouvir], [data-estudo-mic], [data-estudo-selecionar-livro], [data-estudo-cat], [data-estudo-tema], [data-neuro-modulo], [data-neuro-verificar], [data-neuro-proximo], [data-neuro-dictado], [data-neuro-voz-completa], [data-neuro-ouvir-feedback], [data-neuro-responder-pergunta], .estudo-pratica-confirmar, .estudo-pratica-opcao, [data-ir-painel]"
    );

    if (!alvo) return;

    if (alvo.dataset.irPainel === "estudo") {
      onAtualizarHoje?.("estudo");
      return;
    }

    let dados = getState();

    if (alvo.dataset.estudoAcao === "proxima") {
      pararEscuta();
      const prox = avancarPalavra(getState());
      setState({ ...prox, abaAtiva: "falar", falaFeedback: null });
      onAtualizarHoje?.();
      return;
    }

    if (alvo.dataset.estudoAba) {
      pararEscuta();
      const aba = alvo.dataset.estudoAba;
      if (aba === "neuro") {
        const mod = moduloNeuroPorId(dados.neuroModuloAtivo);
        const salva = explicacaoSalva(mod.id, chaveDia());
        setState({
          ...dados,
          abaAtiva: "neuro",
          neuroRascunho: salva?.texto || "",
          neuroFeedback: salva?.avaliacao || null,
          neuroDictadoStatus: null,
          falaFeedback: null,
        });
        return;
      }
      setState({ ...dados, abaAtiva: aba, falaFeedback: null, neuroDictadoStatus: null });
      return;
    }

    if (alvo.dataset.neuroModulo) {
      pararEscuta();
      const mod = moduloNeuroPorId(alvo.dataset.neuroModulo);
      const salva = explicacaoSalva(mod.id, chaveDia());
      setState({
        ...dados,
        abaAtiva: "neuro",
        neuroModuloAtivo: mod.id,
        neuroRascunho: salva?.texto || "",
        neuroFeedback: salva?.avaliacao || null,
        neuroDictadoStatus: null,
      });
      return;
    }

    if (alvo.dataset.neuroProximo) {
      pararEscuta();
      const prox = moduloNeuroPorId(alvo.dataset.neuroProximo);
      const salva = explicacaoSalva(prox.id, chaveDia());
      setState({
        ...dados,
        abaAtiva: "neuro",
        neuroModuloAtivo: prox.id,
        neuroRascunho: salva?.texto || "",
        neuroFeedback: salva?.avaliacao || null,
        neuroDictadoStatus: null,
      });
      return;
    }

    if (alvo.dataset.neuroVerificar !== undefined) {
      void processarVerificacaoNeuro(root, chaveDia, getState, setState, mostrarFeedback, onAtualizarHoje);
      return;
    }

    if (alvo.dataset.neuroDictado !== undefined) {
      iniciarDictadoNeuro(root, getState, setState, {
        substituir: false,
        autoVerificar: false,
        chaveDia,
        mostrarFeedback,
        onAtualizarHoje,
      });
      return;
    }

    if (alvo.dataset.neuroVozCompleta !== undefined) {
      iniciarDictadoNeuro(root, getState, setState, {
        substituir: true,
        autoVerificar: true,
        minChars: 25,
        chaveDia,
        mostrarFeedback,
        onAtualizarHoje,
      });
      return;
    }

    if (alvo.dataset.neuroOuvirFeedback !== undefined) {
      const fbAtual = getState().neuroFeedback;
      if (!falarPortugues(montarTextoFeedback(fbAtual))) {
        mostrarFeedback?.("Não foi possível ler em voz alta.", "aviso");
      }
      return;
    }

    if (alvo.dataset.neuroResponderPergunta !== undefined) {
      const fbAtual = getState().neuroFeedback;
      if (!fbAtual?.perguntaSeguinte) return;
      dictadoExplicacaoNeuro({
        onStatus: (msg) => setState({ ...getState(), neuroDictadoStatus: msg }),
        onError: (msg) => setState({ ...getState(), neuroDictadoStatus: msg }),
        onTexto: ({ texto }) => {
          const atual = getState();
          const campo = root.querySelector("[data-neuro-explicacao]");
          const prefixo = `[Resposta] `;
          const junto = `${prefixo}${texto}`;
          if (campo) campo.value = junto;
          setState({
            ...atual,
            neuroRascunho: junto,
            neuroDictadoStatus: "Resposta gravada — toque em Verificar.",
          });
        },
      });
      return;
    }

    if (alvo.dataset.estudoSelecionarLivro) {
      selecionarLivro(alvo.dataset.estudoSelecionarLivro);
      setState({ ...dados, abaAtiva: "praticar" });
      mostrarFeedback?.("Livro selecionado! Vá em Praticar.");
      onAtualizarHoje?.();
      return;
    }

    if (alvo.dataset.estudoCat) {
      setState({ ...dados, categoriaLivro: alvo.dataset.estudoCat, temaLivro: null });
      return;
    }

    if (alvo.dataset.estudoTema) {
      const id = alvo.dataset.estudoTema;
      const mesmo = dados.temaLivro === id;
      setState({
        ...dados,
        temaLivro: mesmo ? null : id,
        categoriaLivro: "todos",
        buscaLivro: "",
      });
      return;
    }

    if (alvo.dataset.estudoSugerir) {
      const sug = linkSugeridoPorId(alvo.dataset.estudoSugerir);
      if (!sug) return;
      const novo = adicionarLinkSugerido(dados, sug);
      const aba = sug.tipo === "video" ? "assistir" : "ouvir";
      setState({ ...novo, abaAtiva: aba });
      mostrarFeedback?.("Link adicionado! Toque nele para abrir.");
      return;
    }

    if (alvo.dataset.estudoLink) {
      setState({ ...dados, linkAtivoId: alvo.dataset.estudoLink });
      return;
    }

    if (alvo.dataset.estudoRemover) {
      setState(removerLink(dados, alvo.dataset.estudoRemover));
      return;
    }

    if (alvo.dataset.estudoTimer) {
      onTimer?.(Number(alvo.dataset.estudoTimer));
      return;
    }

    if (alvo.dataset.estudoMarcar) {
      setState(marcarSessao(dados, alvo.dataset.estudoMarcar));
      mostrarFeedback?.("Marcado! Boa sessão.");
      return;
    }

    if (alvo.dataset.estudoOuvir) {
      const p = palavraAtual(dados);
      if (!p) return;
      const texto = alvo.dataset.estudoOuvir === "frase" ? fraseVocab(p) : p.en;
      if (!falarTexto(texto, { lang: "en-US", tipo: "en" })) {
        mostrarFeedback?.("Seu navegador não suporta voz sintética.");
      }
      return;
    }

    if (alvo.dataset.estudoMic) {
      const p = palavraAtual(dados);
      if (!p) return;
      const ehFrase = alvo.dataset.estudoMic === "frase";
      const esperado = ehFrase ? fraseVocab(p) : p.en;

      setState({
        ...dados,
        falaFeedback: { status: "ouvindo", mensagem: "Preparando microfone…", ok: null },
      });

      escutarPronuncia(esperado, {
        frase: ehFrase,
        onStatus: (msg) => {
          setState({ ...getState(), falaFeedback: { status: "ouvindo", mensagem: msg, ok: null } });
        },
        onError: (msg) => {
          setState({ ...getState(), falaFeedback: { status: "erro", mensagem: msg, ok: false } });
        },
        onResult: (resultado) => {
          let atual = getState();
          if (resultado.ok) {
            const falar = (atual.sessao?.falar || 0) + 1;
            atual = marcarSessao(atual, "falar", falar);
          }
          setState({
            ...atual,
            falaFeedback: {
              status: resultado.ok ? "ok" : "erro",
              mensagem: resultado.mensagem,
              ok: resultado.ok,
            },
          });
          onAtualizarHoje?.();
        },
      });
      return;
    }

    if (alvo.classList.contains("estudo-pratica-confirmar")) {
      confirmarPratica(root, chaveDia(), mostrarFeedback, getState, setState, onAtualizarHoje);
      return;
    }

    if (alvo.classList.contains("estudo-pratica-opcao")) {
      confirmarPratica(root, chaveDia(), mostrarFeedback, getState, setState, onAtualizarHoje, Number(alvo.dataset.indice));
    }
  });

  root.addEventListener("change", (evento) => {
    const sel = evento.target.closest("[data-estudo-voz]");
    if (!sel) return;
    salvarVozPreferida(sel.dataset.estudoVoz || "en-US", sel.value);
    const dados = getState();
    setState({ ...dados, abaAtiva: "falar" });
    mostrarFeedback?.(sel.value ? "Voz salva!" : "Voz automática ativada.");
  });

  root.addEventListener("input", (evento) => {
    const campoBusca = evento.target.closest("[data-estudo-busca-livro]");
    if (campoBusca) {
      const dados = getState();
      const novo = { ...dados, buscaLivro: campoBusca.value, temaLivro: null };
      setState(novo, { somenteLivros: true });
      return;
    }

    const campoNeuro = evento.target.closest("[data-neuro-explicacao]");
    if (campoNeuro) {
      const dados = getState();
      setState({ ...dados, neuroRascunho: campoNeuro.value }, { somenteNeuro: true, semResumo: true });
      return;
    }

    const campoNota = evento.target.closest("[data-estudo-nota-midia]");
    if (campoNota) {
      const linkId = campoNota.dataset.estudoNotaLink;
      if (!linkId) return;
      const dados = getState();
      const novo = salvarNotaMidia({ ...dados }, linkId, campoNota.value);
      setState(novo, { somenteNotas: true, semResumo: true });
      const status = root.querySelector("[data-estudo-nota-status]");
      if (status) {
        status.hidden = false;
        status.textContent = "Salvando…";
      }
    }
  });

  root.addEventListener(
    "blur",
    (evento) => {
      const campoNota = evento.target.closest("[data-estudo-nota-midia]");
      if (!campoNota) return;
      const status = root.querySelector("[data-estudo-nota-status]");
      if (status) {
        status.hidden = false;
        status.textContent = "Salvo ✓";
      }
      const linkId = campoNota.dataset.estudoNotaLink;
      if (!linkId) return;
      const dados = getState();
      atualizarIndicadorNotaLink(root, linkId, linkTemNota(dados, linkId));
    },
    true
  );

  root.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const alvo = evento.target;
    const form =
      alvo instanceof HTMLFormElement && alvo.matches("[data-estudo-form]")
        ? alvo
        : alvo.closest?.("[data-estudo-form]");
    if (!form) return;

    const dados = getState();
    const fd = new FormData(form);

    if (form.dataset.estudoForm === "link") {
      const titulo = fd.get("titulo");
      const url = fd.get("url");
      if (!url) return;
      const novo = adicionarLink(dados, titulo, url);
      const parsed = parseMediaUrl(url);
      const aba =
        parsed?.tipo === "youtube" ? "assistir" : parsed?.tipo === "spotify" || parsed?.tipo === "audio" ? "ouvir" : dados.abaAtiva;
      setState({ ...novo, abaAtiva: aba });
      form.reset();
      mostrarFeedback?.("Link salvo!");
      return;
    }

    if (form.dataset.estudoForm === "vocab") {
      const antes = dados.vocabulario?.length || 0;
      const novo = adicionarPalavra(dados, fd.get("en"), fd.get("pt"), fd.get("frase"));
      if (novo.vocabErro) {
        setState({ ...novo, abaAtiva: "falar" });
        return;
      }
      if ((novo.vocabulario?.length || 0) <= antes) return;
      setState({ ...novo, abaAtiva: "falar" });
      form.reset();
      mostrarFeedback?.("Palavra adicionada!");
    }
  });
}

function iniciarDictadoNeuro(root, getState, setState, opts) {
  const {
    substituir = false,
    autoVerificar = false,
    minChars = 25,
    chaveDia,
    mostrarFeedback,
    onAtualizarHoje,
  } = opts;

  dictadoExplicacaoNeuro({
    substituir,
    autoVerificar,
    minChars,
    onStatus: (msg) => setState({ ...getState(), neuroDictadoStatus: msg }),
    onError: (msg) => setState({ ...getState(), neuroDictadoStatus: msg }),
    onTexto: ({ texto }) => {
      const atual = getState();
      const campo = root.querySelector("[data-neuro-explicacao]");
      const anterior = campo?.value?.trim() || atual.neuroRascunho || "";
      const junto = substituir ? texto : anterior ? `${anterior} ${texto}` : texto;
      if (campo) campo.value = junto;
      setState({
        ...atual,
        neuroRascunho: junto,
        neuroDictadoStatus: autoVerificar
          ? "Verificando sua explicação…"
          : "Texto adicionado — revise e toque em Verificar.",
      });
      if (autoVerificar && junto.trim().length >= minChars) {
        void processarVerificacaoNeuro(
          root,
          chaveDia,
          getState,
          setState,
          mostrarFeedback,
          onAtualizarHoje
        );
      } else if (autoVerificar) {
        setState({
          ...getState(),
          neuroDictadoStatus: "Fale um pouco mais e toque em Verificar.",
        });
      }
    },
  });
}

async function processarVerificacaoNeuro(root, chaveDia, getState, setState, mostrarFeedback, onAtualizarHoje) {
  const dados = getState();
  const campo = root.querySelector("[data-neuro-explicacao]");
  const texto = campo?.value?.trim() || dados.neuroRascunho?.trim() || "";
  const mod = moduloNeuroPorId(dados.neuroModuloAtivo);
  const chave = chaveDia();

  if (texto.length < 25) {
    const avaliacao = avaliarExplicacao(texto, mod);
    setState({
      ...dados,
      neuroRascunho: texto,
      neuroFeedback: avaliacao,
      neuroIaCarregando: false,
      neuroDictadoStatus: null,
    });
    mostrarFeedback?.("Escreva um pouco mais antes de verificar.", "aviso");
    return;
  }

  if (!iaNeuroDisponivel()) {
    const avaliacao = avaliarExplicacao(texto, mod);
    salvarExplicacao(mod.id, chave, texto, avaliacao);
    finalizarVerificacaoNeuro(getState, setState, texto, avaliacao, chave, mostrarFeedback, onAtualizarHoje);
    return;
  }

  setState({
    ...dados,
    neuroRascunho: texto,
    neuroIaCarregando: true,
    neuroDictadoStatus: null,
  });

  const resultado = await pedirFeedbackIaNeuro(mod, texto);

  let avaliacao;
  if (resultado.ok && resultado.avaliacao) {
    avaliacao = resultado.avaliacao;
  } else {
    avaliacao = avaliarExplicacao(texto, mod);
    avaliacao.feedback = `${resultado.erro || "IA indisponível."} ${avaliacao.feedback}`;
  }

  salvarExplicacao(mod.id, chave, texto, avaliacao);
  finalizarVerificacaoNeuro(getState, setState, texto, avaliacao, chave, mostrarFeedback, onAtualizarHoje);
}

function finalizarVerificacaoNeuro(getState, setState, texto, avaliacao, chave, mostrarFeedback, onAtualizarHoje) {
  let atual = {
    ...getState(),
    neuroRascunho: texto,
    neuroFeedback: avaliacao,
    neuroIaCarregando: false,
    neuroDictadoStatus: null,
  };

  if (avaliacao.ok) {
    const neuro = Math.max(atual.sessao?.neuro || 0, 1);
    atual = marcarSessao({ ...atual, sessao: { ...atual.sessao, data: chave, neuro } }, "neuro", neuro);
    mostrarFeedback?.(
      avaliacao.fonte === "ia"
        ? "Boa explicação! A IA confirmou o essencial."
        : "Boa explicação! Ensinar fixa o conhecimento."
    );
    onAtualizarHoje?.();
  } else if (avaliacao.curto) {
    mostrarFeedback?.("Escreva um pouco mais antes de verificar.", "aviso");
  } else {
    mostrarFeedback?.("Quase lá — use o feedback e tente de novo.", "aviso");
  }

  setState(atual);
}

function confirmarPratica(root, chave, mostrarFeedback, getState, setState, onAtualizarHoje, indiceEscolhido) {
  const progresso = carregarProgressoLivro();
  const livro = livroAtivo();
  const pergunta = perguntaAtual(livro, progresso);
  if (!pergunta) return;

  if (pergunta.tipo !== "reflexao" && indiceEscolhido === undefined) return;

  if (pergunta.tipo === "reflexao") {
    const texto = root.querySelector(".estudo-pratica-input")?.value?.trim();
    if (!texto) {
      mostrarFeedback?.("Escreva algo — pode ser curto.");
      return;
    }
    mostrarFeedback?.(pergunta.dica);
  } else if (indiceEscolhido !== undefined) {
    const certa = pergunta.correta === indiceEscolhido;
    mostrarFeedback?.(
      certa ? `Certo! ${pergunta.dica}` : pergunta.dica,
      certa ? "ok" : "aviso"
    );
  }

  registrarResposta(progresso, livro, pergunta.id, chave);

  let dados = getState();
  const praticar = (dados.sessao?.praticar || 0) + 1;
  dados = marcarSessao({ ...dados, sessao: { ...dados.sessao, data: chave, praticar } }, "praticar", praticar);
  setState(dados);
  onAtualizarHoje?.();
}
