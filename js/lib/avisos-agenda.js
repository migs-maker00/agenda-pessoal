// Avisos com hora — lembretes tipo calendário (separados dos hábitos)

const CHAVE = "avisos-agenda-v1";

function dataHojeLocal() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function horaAtualLocal() {
  const agora = new Date();
  return `${String(agora.getHours()).padStart(2, "0")}:${String(agora.getMinutes()).padStart(2, "0")}`;
}

export function normalizarAviso(raw) {
  if (!raw || typeof raw.titulo !== "string") return null;
  const titulo = raw.titulo.trim();
  if (!titulo) return null;
  const data = /^\d{4}-\d{2}-\d{2}$/.test(raw.data || "") ? raw.data : dataHojeLocal();
  const hora = /^\d{2}:\d{2}$/.test(raw.hora || "") ? raw.hora : "09:00";
  return {
    id: raw.id || `av${Date.now()}`,
    titulo: titulo.slice(0, 120),
    data,
    hora,
    feito: Boolean(raw.feito),
    criadoEm: raw.criadoEm || Date.now(),
  };
}

export function carregarAvisos() {
  try {
    const raw = localStorage.getItem(CHAVE);
    if (!raw) return [];
    const lista = JSON.parse(raw);
    if (!Array.isArray(lista)) return [];
    return lista.map(normalizarAviso).filter(Boolean);
  } catch {
    return [];
  }
}

export function salvarAvisosStorage(lista) {
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

export function avisosDoDia(lista, data) {
  return lista.filter((a) => a.data === data).sort((a, b) => a.hora.localeCompare(b.hora));
}

export function avisosPendentes(lista, data) {
  return avisosDoDia(lista, data).filter((a) => !a.feito);
}

export function proximosAvisos(lista, data, limite = 5) {
  return lista
    .filter((a) => !a.feito && a.data > data)
    .sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora))
    .slice(0, limite);
}

export function proximoAvisoHoje(lista, data = dataHojeLocal()) {
  const hhmm = horaAtualLocal();
  return avisosPendentes(lista, data).find((a) => a.hora >= hhmm) || null;
}

export function adicionarAviso(lista, { titulo, data, hora }) {
  const aviso = normalizarAviso({ titulo, data: data || dataHojeLocal(), hora });
  if (!aviso) return { lista, erro: "Escreva o que você quer lembrar." };
  return { lista: [...lista, aviso], aviso, erro: null };
}

export function alternarAvisoFeito(lista, id) {
  return lista.map((a) => (a.id === id ? { ...a, feito: !a.feito } : a));
}

export function removerAviso(lista, id) {
  return lista.filter((a) => a.id !== id);
}

export { dataHojeLocal as dataHojeAviso, horaAtualLocal as horaAtualAviso };
