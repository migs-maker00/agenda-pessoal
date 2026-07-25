/** Modo parceiro de estudo — timer + explicar + feedback. */

const CHAVE = "estudo-parceiro-sessao";

export function carregarSessaoParceiro() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE) || "null");
  } catch {
    return null;
  }
}

export function salvarSessaoParceiro(sessao) {
  localStorage.setItem(CHAVE, JSON.stringify(sessao));
}

export function iniciarSessaoParceiro({ titulo = "Estudo", minutos = 25 } = {}) {
  const sessao = {
    inicio: Date.now(),
    titulo,
    minutos,
    fase: "foco",
    explicacao: "",
  };
  salvarSessaoParceiro(sessao);
  return sessao;
}

export function avancarParaExplicar() {
  const s = carregarSessaoParceiro();
  if (!s) return null;
  s.fase = "explicar";
  salvarSessaoParceiro(s);
  return s;
}

export function finalizarSessaoParceiro(explicacao = "") {
  const s = carregarSessaoParceiro() || {};
  s.fase = "feito";
  s.explicacao = explicacao;
  s.fim = Date.now();
  salvarSessaoParceiro(s);
  return s;
}

export function limparSessaoParceiro() {
  localStorage.removeItem(CHAVE);
}

export function renderPainelParceiro(sessao) {
  if (!sessao || sessao.fase === "feito") {
    return `
      <div class="parceiro-bloco">
        <p class="parceiro-titulo">Parceiro de estudo</p>
        <p class="parceiro-apoio">25 min foco → explique em 1 frase → feedback.</p>
        <button type="button" class="botao-primario" data-parceiro="iniciar">Começar sessão (25 min)</button>
      </div>`;
  }
  if (sessao.fase === "foco") {
    return `
      <div class="parceiro-bloco parceiro-ativo">
        <p class="parceiro-titulo">Foco: ${sessao.titulo}</p>
        <p class="parceiro-apoio">Timer ligado — estude até o fim ou toque abaixo.</p>
        <button type="button" class="botao-secundario" data-parceiro="explicar">Terminei — vou explicar</button>
      </div>`;
  }
  return `
    <div class="parceiro-bloco parceiro-ativo">
      <p class="parceiro-titulo">Explique com suas palavras</p>
      <textarea class="parceiro-texto" data-parceiro-texto rows="3" placeholder="O que você entendeu?">${sessao.explicacao || ""}</textarea>
      <button type="button" class="botao-primario" data-parceiro="enviar">Pedir feedback</button>
    </div>`;
}
