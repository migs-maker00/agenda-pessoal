/** Voz → contexto Cheguei (local + IA opcional). */

const MAPA = [
  { re: /cheguei|chegando|entrei|casa|em casa/i, contexto: "chegada" },
  { re: /terminei|completei|fiz|acabei|finalizei|conclu/i, contexto: "tarefa" },
  { re: /acordei|acordando|bom dia|manhã|manha/i, contexto: "acordar" },
  { re: /pausa|descans|cansad|exaust|trav/i, contexto: "pausa" },
  { re: /noite|dormir|deitar|desaceler|sono/i, contexto: "noite" },
];

export function interpretarFala(texto) {
  const t = String(texto || "").trim();
  if (!t) return { contexto: "chegada", confianca: 0, texto: "" };

  for (const item of MAPA) {
    if (item.re.test(t)) {
      return { contexto: item.contexto, confianca: 0.85, texto: t };
    }
  }
  return { contexto: "chegada", confianca: 0.4, texto: t };
}

export function rotuloContextoVoz(contexto) {
  const mapa = {
    chegada: "Cheguei em casa",
    tarefa: "Completei uma tarefa",
    acordar: "Acabei de acordar",
    pausa: "Preciso de uma pausa",
    noite: "Vou desacelerar",
  };
  return mapa[contexto] || "E agora?";
}
