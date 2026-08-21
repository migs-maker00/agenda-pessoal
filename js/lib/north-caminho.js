/** North — motor de direção: guia o dia, não lista rotina. */

import { t } from "./i18n.js";
import { normalizarEstadoGps } from "./mindos-estado.js";
import { faixaDoDia, rotuloFaixa } from "./contexto-tempo.js";
import { carregarPerfil } from "./perfil.js";
import { BLOCOS } from "./cognitivo-dados.js";
import { proximaPraticaEmocional } from "./emocional-dados.js";
import { htmlPraticaEmocionalCard } from "./mindos-emocional.js";

/** Caminhos que pedem um passo emocional em vez de uma tarefa. */
const TIPOS_EMOCIONAIS = new Set(["acolher", "descansar"]);

function anexarPraticaEmocional(caminho, estado) {
  if (!caminho || !TIPOS_EMOCIONAIS.has(caminho.tipo)) return caminho;
  const pratica = proximaPraticaEmocional(estado);
  if (!pratica) return caminho;
  return { ...caminho, praticaEmocional: pratica };
}

const TIPOS = ["aprender", "descansar", "mover", "acolher", "organizar"];

function escolherCultivoEmocional(estado) {
  if (estado === "sobrecarregado") {
    return t("north.caminho.cultivo.acolher");
  }
  if (estado === "normal") {
    return t("north.caminho.cultivo.presenca");
  }
  return t("north.caminho.cultivo.clareza");
}

function mapearPrioridades(prioridadesVida = []) {
  return prioridadesVida.slice(0, 4).map((texto) => ({
    texto,
    eixo: classificarEixo(texto),
  }));
}

function classificarEixo(texto) {
  const n = String(texto).toLowerCase();
  if (/conhec|aprend|estud|ingl|livro|skill|habil/.test(n)) return "conhecimento";
  if (/organiz|rotina|foco|clareza/.test(n)) return "clareza";
  if (/emocion|calma|ansied|presen|mindful|equil/.test(n)) return "emocional";
  if (/corpo|saúde|saude|treino|academ|sono|descans/.test(n)) return "corpo";
  return "direcao";
}

function blocoCognitivoRotulo(blocoId) {
  if (!blocoId) return "";
  return t(`cognitivo.bloco.${blocoId}`);
}

/**
 * Ajusta o caminho decidido pela regra ao seu histórico local (Passo 1).
 * Não inventa urgência nem culpa: só evita insistir no que raramente cola e
 * reconhece, com calma, um padrão forte do dia.
 */
function aplicarHistorico(base, { estado, faixa, diaSemana, historico }) {
  if (!historico) return base;

  let resultado = base;

  // Desvio suave: aprender que quase nunca é concluído nesta faixa vira descansar.
  const conclusao = historico.conclusaoPorCaminho?.[`${base.tipo}|${faixa}`];
  if (
    base.tipo === "aprender" &&
    conclusao &&
    conclusao.amostras >= 3 &&
    conclusao.taxa <= 0.2
  ) {
    resultado = {
      ...base,
      tipo: "descansar",
      titulo: t("north.caminho.descansar.titulo"),
      mensagem: t("north.caminho.descansar.mensagem", { faixa: base.faixaLabel }),
      convite: t("north.caminho.descansar.convite"),
      reconhecimento: t("north.caminho.reconhecimento.ajusteDescanso"),
    };
  }

  // Reconhecimento calmo quando o dia costuma chegar com o mesmo estado.
  const tipicoHoje = historico.estadoTipicoPorDia?.[String(diaSemana)];
  if (tipicoHoje && tipicoHoje === estado && !resultado.reconhecimento) {
    if (estado === "sobrecarregado") {
      resultado = { ...resultado, reconhecimento: t("north.caminho.reconhecimento.diaPesado") };
    } else if (estado === "focado") {
      resultado = { ...resultado, reconhecimento: t("north.caminho.reconhecimento.diaForte") };
    }
  }

  return resultado;
}

/**
 * Decide o "caminho" do momento — aprender, descansar, mover, acolher, organizar.
 * Usa estado GPS, horário, prioridades de vida, passo cognitivo e o histórico
 * local de padrões (quando fornecido).
 */
export function calcularCaminhoNorth({
  estadoMental = "",
  data = new Date(),
  perfil = carregarPerfil(),
  passoCognitivo = null,
  focoNome = "",
  historico = null,
} = {}) {
  const estado = normalizarEstadoGps(estadoMental);
  const faixa = faixaDoDia(data);
  const diaSemana = data.getDay();
  const cultivos = mapearPrioridades(perfil.prioridadesVida);
  const cultivoEmocional = escolherCultivoEmocional(estado);
  const faixaLabel = rotuloFaixa(faixa);
  const comHistorico = (base) =>
    anexarPraticaEmocional(aplicarHistorico(base, { estado, faixa, diaSemana, historico }), estado);

  if (!estado) {
    return {
      tipo: "organizar",
      titulo: t("north.caminho.semEstado.titulo"),
      mensagem: t("north.caminho.semEstado.mensagem"),
      convite: t("north.caminho.semEstado.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
    };
  }

  if (estado === "sobrecarregado") {
    return comHistorico({
      tipo: "acolher",
      titulo: t("north.caminho.acolher.titulo"),
      mensagem: t("north.caminho.acolher.mensagem"),
      convite: t("north.caminho.acolher.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
    });
  }

  if (faixa === "madrugada" || (faixa === "noite" && data.getHours() >= 22)) {
    return comHistorico({
      tipo: "descansar",
      titulo: t("north.caminho.descansar.titulo"),
      mensagem: t("north.caminho.descansar.mensagem", { faixa: faixaLabel }),
      convite: t("north.caminho.descansar.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
    });
  }

  if (estado === "focado" && passoCognitivo?.bloco) {
    const bloco = blocoCognitivoRotulo(passoCognitivo.bloco.id);
    return comHistorico({
      tipo: "aprender",
      titulo: t("north.caminho.aprender.titulo"),
      mensagem: t("north.caminho.aprender.mensagem", { bloco }),
      convite: t("north.caminho.aprender.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
      blocoId: passoCognitivo.bloco.id,
    });
  }

  const cultivoConhecimento = cultivos.find((c) => c.eixo === "conhecimento");
  if ((estado === "focado" || estado === "bem") && (cultivoConhecimento || passoCognitivo)) {
    return comHistorico({
      tipo: "aprender",
      titulo: t("north.caminho.aprender.titulo"),
      mensagem: cultivoConhecimento
        ? t("north.caminho.aprender.prioridade", { meta: cultivoConhecimento.texto })
        : t("north.caminho.aprender.mensagem", {
            bloco: blocoCognitivoRotulo(BLOCOS[0]?.id) || t("north.foco.aprender"),
          }),
      convite: t("north.caminho.aprender.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
    });
  }

  if (/academia|treino|corrida|gym|jiu|corpo/i.test(focoNome)) {
    return comHistorico({
      tipo: "mover",
      titulo: t("north.caminho.mover.titulo"),
      mensagem: t("north.caminho.mover.mensagem"),
      convite: t("north.caminho.mover.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
    });
  }

  if (estado === "normal" && faixa === "tarde") {
    return comHistorico({
      tipo: "organizar",
      titulo: t("north.caminho.organizar.titulo"),
      mensagem: t("north.caminho.organizar.mensagem"),
      convite: t("north.caminho.organizar.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
    });
  }

  return comHistorico({
    tipo: "organizar",
    titulo: t("north.caminho.hoje.titulo"),
    mensagem: t("north.caminho.hoje.mensagem", { faixa: faixaLabel }),
    convite: focoNome
      ? t("north.caminho.hoje.foco", { passo: focoNome.replace(/\(\d+\s*min\)/i, "").trim() })
      : t("north.caminho.hoje.convite"),
    cultivos,
    cultivoEmocional,
    faixa,
    faixaLabel,
  });
}

export function htmlCaminhoNorth(caminho) {
  if (!caminho) return "";
  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");

  const cultivosHtml =
    caminho.cultivos?.length > 0
      ? `<ul class="north-caminho-cultivos" aria-label="${esc(t("north.caminho.cultivos.aria"))}">
          ${caminho.cultivos
            .map(
              (c) =>
                `<li class="north-caminho-cultivo north-caminho-cultivo--${esc(c.eixo)}">${esc(c.texto)}</li>`
            )
            .join("")}
        </ul>`
      : "";

  const reconhecimentoHtml = caminho.reconhecimento
    ? `<p class="north-caminho-reconhecimento">${esc(caminho.reconhecimento)}</p>`
    : "";

  const praticaHtml = caminho.praticaEmocional
    ? htmlPraticaEmocionalCard(caminho.praticaEmocional)
    : "";

  return `
    <section class="north-caminho north-caminho--${esc(caminho.tipo)}" aria-label="${esc(t("north.caminho.aria"))}">
      <p class="north-caminho-kicker">${esc(t("north.caminho.kicker"))}</p>
      ${reconhecimentoHtml}
      <h2 class="north-caminho-titulo">${esc(caminho.titulo)}</h2>
      <p class="north-caminho-mensagem">${esc(caminho.mensagem)}</p>
      <p class="north-caminho-convite">${esc(caminho.convite)}</p>
      ${praticaHtml}
      ${cultivosHtml}
      <p class="north-caminho-emocional">${esc(caminho.cultivoEmocional)}</p>
    </section>`;
}

export { TIPOS };
