/** Estado mental do dia — menos sobrecarga, menos interface. */

export const ESTADOS_MENTAIS = [
  "organizado",
  "motivado",
  "distraido",
  "ansioso",
  "cansado",
  "sobrecarregado",
];

const NIVEL = {
  organizado: 0,
  motivado: 0,
  distraido: 1,
  ansioso: 2,
  cansado: 2,
  sobrecarregado: 3,
};

const UI_PADRAO = {
  showDepois: true,
  showSono: true,
  showCheguei: true,
  showHorarioFoco: true,
  showFocoRotulo: true,
  showEstadoChips: true,
  rodapeKey: "mindos.rodape",
};

const UI_POR_NIVEL = {
  0: { ...UI_PADRAO },
  1: {
    ...UI_PADRAO,
    showDepois: false,
    showCheguei: false,
  },
  2: {
    ...UI_PADRAO,
    showDepois: false,
    showSono: false,
    showCheguei: false,
    rodapeKey: "mindos.rodape.leve",
  },
  3: {
    ...UI_PADRAO,
    showDepois: false,
    showSono: false,
    showCheguei: false,
    showFocoRotulo: false,
    showEstadoChips: false,
    rodapeKey: "mindos.rodape.minimo",
  },
};

function chaveDia(data = new Date()) {
  return data.toISOString().slice(0, 10);
}

export function carregarEstadoMental(data = new Date()) {
  try {
    const id = localStorage.getItem(`mindos-estado-${chaveDia(data)}`) || "";
    return ESTADOS_MENTAIS.includes(id) ? id : "";
  } catch {
    return "";
  }
}

export function salvarEstadoMental(estado, data = new Date()) {
  const id = String(estado || "").trim();
  if (!ESTADOS_MENTAIS.includes(id)) return;
  localStorage.setItem(`mindos-estado-${chaveDia(data)}`, id);
}

export function configUIEstado(estadoId) {
  const nivel = NIVEL[estadoId] ?? 0;
  return UI_POR_NIVEL[nivel] || UI_PADRAO;
}
