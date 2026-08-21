/**
 * Trilha emocional — habilidades que se cultivam com micro-práticas.
 *
 * Não é tarefa nem cobrança: quando o dia pede acolhimento ou descanso, o North
 * oferece um passo emocional curto (1–3 min) em vez de mais uma coisa a fazer.
 * Progresso guardado localmente, no espírito de docs/MINDOS.md.
 */

export const CHAVE_EMOCIONAL = "emocional-v1";

export const EIXOS = ["regulacao", "foco", "autocompaixao", "presenca"];

/** Micro-práticas por eixo (título/texto vêm do i18n via emocional.pratica.<id>). */
export const PRATICAS = [
  { eixo: "regulacao", id: "nomear", minutos: 1 },
  { eixo: "regulacao", id: "respiracao478", minutos: 2 },
  { eixo: "autocompaixao", id: "reframe", minutos: 2 },
  { eixo: "autocompaixao", id: "gentileza", minutos: 2 },
  { eixo: "presenca", id: "pausa", minutos: 1 },
  { eixo: "presenca", id: "cincoSentidos", minutos: 3 },
  { eixo: "foco", id: "ancora", minutos: 2 },
  { eixo: "foco", id: "monotarefa", minutos: 3 },
];

/** Preferência de eixo conforme o estado do dia. */
const EIXO_POR_ESTADO = {
  sobrecarregado: ["regulacao", "autocompaixao", "presenca"],
  normal: ["presenca", "foco", "regulacao"],
  bem: ["foco", "presenca", "autocompaixao"],
  focado: ["foco", "presenca", "regulacao"],
};

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_EMOCIONAL) || "{}");
    return dados && typeof dados === "object" ? dados : {};
  } catch {
    return {};
  }
}

function salvar(dados) {
  try {
    localStorage.setItem(CHAVE_EMOCIONAL, JSON.stringify(dados));
  } catch {
    /* localStorage indisponível — progresso só nesta sessão. */
  }
}

/** Nível do eixo derivado do total de práticas (a cada 3, sobe um nível). */
export function nivelEixo(eixo, dados = carregar()) {
  const feitos = dados.eixos?.[eixo]?.feitos || 0;
  return Math.floor(feitos / 3);
}

/** Registra a conclusão de uma micro-prática. */
export function registrarPraticaEmocional(eixo, id, data = new Date()) {
  if (!EIXOS.includes(eixo)) return;
  const dados = carregar();
  if (!dados.eixos) dados.eixos = {};
  if (!dados.eixos[eixo]) dados.eixos[eixo] = { feitos: 0, ultimoId: null };
  dados.eixos[eixo].feitos += 1;
  dados.eixos[eixo].ultimoId = id || dados.eixos[eixo].ultimoId;
  dados.total = (dados.total || 0) + 1;
  dados.ultimo = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(
    data.getDate()
  ).padStart(2, "0")}`;
  salvar(dados);
}

/**
 * Próxima micro-prática recomendada para o estado — evita repetir a última do
 * eixo escolhido quando há alternativa.
 */
export function proximaPraticaEmocional(estado = "", dados = carregar()) {
  const ordem = EIXO_POR_ESTADO[estado] || ["presenca", "regulacao", "foco"];
  const eixo = ordem[0];
  const doEixo = PRATICAS.filter((p) => p.eixo === eixo);
  if (!doEixo.length) return null;
  const ultimoId = dados.eixos?.[eixo]?.ultimoId;
  const candidata = doEixo.find((p) => p.id !== ultimoId) || doEixo[0];
  return {
    eixo,
    id: candidata.id,
    minutos: candidata.minutos,
    nivel: nivelEixo(eixo, dados),
  };
}

/** Resumo compacto e serializável — usado em Memória e (Passo 3) na IA. */
export function resumoEmocional(dados = carregar()) {
  const eixos = {};
  for (const eixo of EIXOS) {
    eixos[eixo] = {
      nivel: nivelEixo(eixo, dados),
      feitos: dados.eixos?.[eixo]?.feitos || 0,
    };
  }
  return { eixos, total: dados.total || 0 };
}

/** Limpa a trilha emocional (uso em testes/reset). */
export function limparEmocional() {
  try {
    localStorage.removeItem(CHAVE_EMOCIONAL);
  } catch {
    /* ignore */
  }
}
