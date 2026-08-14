/** Estado do dia — 4 níveis GPS + compatibilidade com estados anteriores. */

export const ESTADOS_GPS = ["sobrecarregado", "normal", "bem", "focado"];

/** @deprecated — mantido para dados antigos */
export const ESTADOS_MENTAIS = [
  "organizado",
  "motivado",
  "distraido",
  "ansioso",
  "cansado",
  "sobrecarregado",
  ...ESTADOS_GPS.filter((e) => e !== "sobrecarregado"),
];

const MAPA_LEGADO_GPS = {
  organizado: "normal",
  distraido: "normal",
  ansioso: "sobrecarregado",
  cansado: "sobrecarregado",
  sobrecarregado: "sobrecarregado",
  motivado: "bem",
  normal: "normal",
  bem: "bem",
  focado: "focado",
};

const NIVEL_GPS = {
  sobrecarregado: 3,
  normal: 0,
  bem: 0,
  focado: 0,
};

const UI_PADRAO = {
  showDepois: true,
  showSono: false,
  showCheguei: false,
  showHorarioFoco: false,
  showFocoRotulo: false,
  showEstadoChips: true,
  rodapeKey: "north.slogan",
};

const UI_POR_NIVEL = {
  0: { ...UI_PADRAO },
  1: {
    ...UI_PADRAO,
    showDepois: false,
  },
  2: {
    ...UI_PADRAO,
    showDepois: false,
    rodapeKey: "north.slogan",
  },
  3: {
    ...UI_PADRAO,
    showDepois: false,
    showEstadoChips: true,
    rodapeKey: "north.slogan",
  },
};

function chaveDia(data = new Date()) {
  return data.toISOString().slice(0, 10);
}

export function normalizarEstadoGps(estado) {
  const id = String(estado || "").trim();
  if (ESTADOS_GPS.includes(id)) return id;
  return MAPA_LEGADO_GPS[id] || "";
}

export function carregarEstadoMental(data = new Date()) {
  try {
    const id = localStorage.getItem(`mindos-estado-${chaveDia(data)}`) || "";
    return normalizarEstadoGps(id) || (ESTADOS_MENTAIS.includes(id) ? id : "");
  } catch {
    return "";
  }
}

export function salvarEstadoMental(estado, data = new Date()) {
  const gps = normalizarEstadoGps(estado) || String(estado || "").trim();
  if (!gps && !ESTADOS_MENTAIS.includes(String(estado))) return;
  const salvar = gps || String(estado);
  localStorage.setItem(`mindos-estado-${chaveDia(data)}`, salvar);
}

export function limparEstadoMental(data = new Date()) {
  localStorage.removeItem(`mindos-estado-${chaveDia(data)}`);
}

export function configUIEstado(estadoId) {
  const gps = normalizarEstadoGps(estadoId);
  const nivel = NIVEL_GPS[gps] ?? 0;
  return UI_POR_NIVEL[nivel] || UI_PADRAO;
}
