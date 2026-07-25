/** Preparar o eu de amanhã — noite → manhã. */

import {
  definirRevisaoManhaCampo,
  revisaoDoDia,
  revisaoManhaDoDia,
  carregarRevisaoManha,
} from "./tdah.js";

function amanhaStr(hoje = new Date()) {
  const d = new Date(hoje);
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function aplicarPreparoNoite(chaveHoje, mapaNoite, mapaManha = carregarRevisaoManha()) {
  const noite = revisaoDoDia(chaveHoje, mapaNoite);
  const amanha = amanhaStr();
  const manha = revisaoManhaDoDia(amanha, mapaManha);
  let mudou = false;

  if (noite.amanha?.trim() && !manha.foco1?.trim()) {
    definirRevisaoManhaCampo(amanha, "foco1", noite.amanha.trim(), mapaManha);
    mudou = true;
  }
  if (noite.ficou?.trim() && !manha.foco2?.trim()) {
    definirRevisaoManhaCampo(amanha, "foco2", `Não esquecer: ${noite.ficou.trim().slice(0, 80)}`, mapaManha);
    mudou = true;
  }
  return mudou;
}

export function textoPreparoManha(chaveHoje) {
  const manha = revisaoManhaDoDia(chaveHoje);
  const partes = [manha.foco1, manha.foco2, manha.foco3].filter(Boolean);
  if (!partes.length) return "";
  return partes[0];
}

export function perguntasPreparoNoite() {
  return [
    { id: "feito", pergunta: "O que você fez hoje que vale celebrar?" },
    { id: "ficou", pergunta: "O que ficou na cabeça?" },
    { id: "amanha", pergunta: "Uma coisa só pra amanhã?" },
  ];
}
