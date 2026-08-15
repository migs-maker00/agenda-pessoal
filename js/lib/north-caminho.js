/** North — motor de direção: guia o dia, não lista rotina. */

import { t } from "./i18n.js";
import { normalizarEstadoGps } from "./mindos-estado.js";
import { faixaDoDia, rotuloFaixa } from "./contexto-tempo.js";
import { carregarPerfil } from "./perfil.js";
import { BLOCOS } from "./cognitivo-dados.js";

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
 * Decide o "caminho" do momento — aprender, descansar, mover, acolher, organizar.
 * Usa estado GPS, horário, prioridades de vida e passo cognitivo.
 */
export function calcularCaminhoNorth({
  estadoMental = "",
  data = new Date(),
  perfil = carregarPerfil(),
  passoCognitivo = null,
  focoNome = "",
} = {}) {
  const estado = normalizarEstadoGps(estadoMental);
  const faixa = faixaDoDia(data);
  const cultivos = mapearPrioridades(perfil.prioridadesVida);
  const cultivoEmocional = escolherCultivoEmocional(estado);
  const faixaLabel = rotuloFaixa(faixa);

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
    return {
      tipo: "acolher",
      titulo: t("north.caminho.acolher.titulo"),
      mensagem: t("north.caminho.acolher.mensagem"),
      convite: t("north.caminho.acolher.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
    };
  }

  if (faixa === "madrugada" || (faixa === "noite" && data.getHours() >= 22)) {
    return {
      tipo: "descansar",
      titulo: t("north.caminho.descansar.titulo"),
      mensagem: t("north.caminho.descansar.mensagem", { faixa: faixaLabel }),
      convite: t("north.caminho.descansar.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
    };
  }

  if (estado === "focado" && passoCognitivo?.bloco) {
    const bloco = blocoCognitivoRotulo(passoCognitivo.bloco.id);
    return {
      tipo: "aprender",
      titulo: t("north.caminho.aprender.titulo"),
      mensagem: t("north.caminho.aprender.mensagem", { bloco }),
      convite: t("north.caminho.aprender.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
      blocoId: passoCognitivo.bloco.id,
    };
  }

  const cultivoConhecimento = cultivos.find((c) => c.eixo === "conhecimento");
  if ((estado === "focado" || estado === "bem") && (cultivoConhecimento || passoCognitivo)) {
    return {
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
    };
  }

  if (/academia|treino|corrida|gym|jiu|corpo/i.test(focoNome)) {
    return {
      tipo: "mover",
      titulo: t("north.caminho.mover.titulo"),
      mensagem: t("north.caminho.mover.mensagem"),
      convite: t("north.caminho.mover.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
    };
  }

  if (estado === "normal" && faixa === "tarde") {
    return {
      tipo: "organizar",
      titulo: t("north.caminho.organizar.titulo"),
      mensagem: t("north.caminho.organizar.mensagem"),
      convite: t("north.caminho.organizar.convite"),
      cultivos,
      cultivoEmocional,
      faixa,
      faixaLabel,
    };
  }

  return {
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
  };
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

  return `
    <section class="north-caminho north-caminho--${esc(caminho.tipo)}" aria-label="${esc(t("north.caminho.aria"))}">
      <p class="north-caminho-kicker">${esc(t("north.caminho.kicker"))}</p>
      <h2 class="north-caminho-titulo">${esc(caminho.titulo)}</h2>
      <p class="north-caminho-mensagem">${esc(caminho.mensagem)}</p>
      <p class="north-caminho-convite">${esc(caminho.convite)}</p>
      ${cultivosHtml}
      <p class="north-caminho-emocional">${esc(caminho.cultivoEmocional)}</p>
    </section>`;
}

export { TIPOS };
