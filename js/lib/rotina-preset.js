import { PERFIL_PADRAO } from "./perfil.js";
import {
  horariosAguaDoPerfil,
  montarRotinaDoPerfil,
  prioridadesPresetDoPerfil,
  textosPlanejadorDoPerfil,
} from "./rotina-inteligente.js";

export const CHAVE_ROTINA_MONTADA = "rotina-montada-v1.9.0";

export const HORARIOS_AGUA_ROTINA = horariosAguaDoPerfil(PERFIL_PADRAO);

export function rotinaJaMontada() {
  return localStorage.getItem(CHAVE_ROTINA_MONTADA) === "1";
}

export function marcarRotinaMontada() {
  localStorage.setItem(CHAVE_ROTINA_MONTADA, "1");
}

function lerPerfilArmazenado() {
  try {
    const dados = JSON.parse(localStorage.getItem("perfil-usuario") || "null");
    return dados && typeof dados === "object" ? { ...PERFIL_PADRAO, ...dados } : { ...PERFIL_PADRAO };
  } catch {
    return { ...PERFIL_PADRAO };
  }
}

export function textosPlanejadorRotina(perfil) {
  try {
    return textosPlanejadorDoPerfil(perfil || lerPerfilArmazenado());
  } catch {
    return textosPlanejadorDoPerfil(PERFIL_PADRAO);
  }
}

/** @returns {Array<object>} modelos de hábito com campo `presetId` para merge */
export function habitosRotinaCompleta(perfil) {
  try {
    return montarRotinaDoPerfil(perfil || lerPerfilArmazenado());
  } catch {
    return montarRotinaDoPerfil(PERFIL_PADRAO);
  }
}

export function prioridadesRotina(perfil) {
  try {
    return prioridadesPresetDoPerfil(perfil || lerPerfilArmazenado());
  } catch {
    return prioridadesPresetDoPerfil(PERFIL_PADRAO);
  }
}

export { horariosAguaDoPerfil, montarRotinaDoPerfil, previewRotinaDoPerfil } from "./rotina-inteligente.js";

export const PRIORIDADES_PRESET = ["organizar", "aprender", "agua"];

export function correspondePreset(habito, presetId) {
  if (presetId === "agua") return /agua|água|hidrata/i.test(habito.nome || "");
  const padroes = {
    organizar: /organiz/i,
    aprender: /aprend|estud/i,
    vocabulario: /vocabul/i,
    praticalivro: /prática do livro|pratica do livro/i,
    estudo: /aprend|estud|vocabul/i,
    academia: /academia|treino/i,
    telas: /tela|desligar/i,
    sono: /dormir|sono/i,
    manha: /planejar|planej/i,
    praia: /praia|trabalho/i,
  };
  const re = padroes[presetId];
  return re ? re.test(habito.nome || "") : false;
}
