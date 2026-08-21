/**
 * North aprende — memória local dos seus padrões.
 *
 * Grava, sem cobrança e sem servidor, como você chega (estado por dia da
 * semana), o que o North propôs (caminho por faixa do dia) e como terminou
 * (começou / concluiu). A partir disso o motor de direção passa a te entender:
 * evita insistir no que raramente cola e reconhece dias que costumam pesar.
 */

const CHAVE = "north-aprende-v1";

/** Amostras mínimas antes de confiar num padrão (evita adivinhação precoce). */
const MIN_AMOSTRAS_DIA = 3;
const MIN_AMOSTRAS_CAMINHO = 3;

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE) || "{}");
    return dados && typeof dados === "object" ? dados : {};
  } catch {
    return {};
  }
}

function salvar(dados) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
  } catch {
    /* localStorage indisponível — memória apenas nesta sessão. */
  }
}

function chaveDia(data = new Date()) {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(
    data.getDate()
  ).padStart(2, "0")}`;
}

function chaveCaminho(tipo, faixa) {
  return `${tipo || "?"}|${faixa || "?"}`;
}

/** Registra o estado escolhido, agregando por dia da semana. */
export function registrarEstado({ estado, faixa, diaSemana } = {}, data = new Date()) {
  if (!estado) return;
  const dia = diaSemana ?? data.getDay();
  const dados = carregar();
  if (!dados.estados) dados.estados = {};
  const chaveSemana = String(dia);
  if (!dados.estados[chaveSemana]) dados.estados[chaveSemana] = {};
  dados.estados[chaveSemana][estado] = (dados.estados[chaveSemana][estado] || 0) + 1;

  if (faixa) {
    if (!dados.estadosPorFaixa) dados.estadosPorFaixa = {};
    if (!dados.estadosPorFaixa[faixa]) dados.estadosPorFaixa[faixa] = {};
    dados.estadosPorFaixa[faixa][estado] = (dados.estadosPorFaixa[faixa][estado] || 0) + 1;
  }

  dados.ultimaAtualizacao = chaveDia(data);
  salvar(dados);
}

/** Registra que um caminho foi iniciado ("Começar"). */
export function registrarCaminho({ tipo, faixa, comecou = true } = {}, data = new Date()) {
  if (!tipo) return;
  const dados = carregar();
  if (!dados.caminhos) dados.caminhos = {};
  const k = chaveCaminho(tipo, faixa);
  if (!dados.caminhos[k]) dados.caminhos[k] = { mostrado: 0, comecou: 0, concluiu: 0 };
  dados.caminhos[k].mostrado += 1;
  if (comecou) dados.caminhos[k].comecou += 1;
  dados.ultimaAtualizacao = chaveDia(data);
  salvar(dados);
}

/** Registra o desfecho de uma sessão (concluída ou não). */
export function registrarDesfecho({ tipo, faixa, concluiu = false } = {}, data = new Date()) {
  if (!tipo) return;
  const dados = carregar();
  if (!dados.caminhos) dados.caminhos = {};
  const k = chaveCaminho(tipo, faixa);
  if (!dados.caminhos[k]) dados.caminhos[k] = { mostrado: 0, comecou: 0, concluiu: 0 };
  if (concluiu) dados.caminhos[k].concluiu += 1;
  dados.ultimaAtualizacao = chaveDia(data);
  salvar(dados);
}

/** Registra uma troca de estado (sinal de que a 1ª leitura não bateu). */
export function registrarTroca({ faixa } = {}, data = new Date()) {
  const dados = carregar();
  if (!dados.trocas) dados.trocas = {};
  const f = faixa || "?";
  dados.trocas[f] = (dados.trocas[f] || 0) + 1;
  dados.ultimaAtualizacao = chaveDia(data);
  salvar(dados);
}

/** Estado mais frequente num dia da semana (só com amostras suficientes). */
export function estadoTipicoDoDia(diaSemana, dados = carregar()) {
  const mapa = dados.estados?.[String(diaSemana)];
  if (!mapa) return null;
  let total = 0;
  let melhor = null;
  let max = 0;
  for (const [estado, qtd] of Object.entries(mapa)) {
    total += qtd;
    if (qtd > max) {
      max = qtd;
      melhor = estado;
    }
  }
  if (total < MIN_AMOSTRAS_DIA || max < 2) return null;
  return melhor;
}

/**
 * Taxa de conclusão de um tipo de caminho numa faixa do dia.
 * @returns {{amostras:number, taxa:number}|null}
 */
export function taxaConclusao(tipo, faixa, dados = carregar()) {
  const c = dados.caminhos?.[chaveCaminho(tipo, faixa)];
  if (!c || c.comecou < MIN_AMOSTRAS_CAMINHO) return null;
  return { amostras: c.comecou, taxa: c.concluiu / c.comecou };
}

/** Quantas vezes você trocou de estado numa faixa do dia. */
export function trocasDeEstado(faixa, dados = carregar()) {
  return carregarNumero(dados.trocas?.[faixa || "?"]);
}

function carregarNumero(v) {
  return Number.isFinite(v) ? v : 0;
}

/**
 * Resumo compacto e serializável dos padrões — usado para adaptar o caminho
 * (Passo 1) e, mais tarde, alimentar a IA (Passo 3).
 */
export function resumoAprende(dados = carregar()) {
  const estadoTipicoPorDia = {};
  for (let dia = 0; dia < 7; dia++) {
    const tipico = estadoTipicoDoDia(dia, dados);
    if (tipico) estadoTipicoPorDia[String(dia)] = tipico;
  }

  const conclusaoPorCaminho = {};
  for (const [k, c] of Object.entries(dados.caminhos || {})) {
    if (c.comecou >= MIN_AMOSTRAS_CAMINHO) {
      conclusaoPorCaminho[k] = {
        amostras: c.comecou,
        taxa: Number((c.concluiu / c.comecou).toFixed(2)),
      };
    }
  }

  return {
    estadoTipicoPorDia,
    conclusaoPorCaminho,
    trocasPorFaixa: { ...(dados.trocas || {}) },
  };
}

/** Limpa a memória de padrões (uso em testes/reset). */
export function limparAprende() {
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    /* ignore */
  }
}

export { CHAVE as CHAVE_APRENDE, chaveCaminho };
