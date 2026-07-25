/** Memória de padrões — horários, dias da semana, lembretes ignorados. */

const CHAVE = "padroes-app";

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE) || "{}");
    return dados && typeof dados === "object" ? dados : {};
  } catch {
    return {};
  }
}

function salvar(dados) {
  localStorage.setItem(CHAVE, JSON.stringify(dados));
}

export function registrarConclusao(habito, data = new Date()) {
  if (!habito?.id) return;
  const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}`;
  const hora = data.getHours() * 60 + data.getMinutes();
  const diaSemana = data.getDay();
  const dados = carregar();
  const id = String(habito.id);
  if (!dados.habitos) dados.habitos = {};
  if (!dados.habitos[id]) {
    dados.habitos[id] = { nome: habito.nome, horas: [], dias: {}, ultimo: null };
  }
  const h = dados.habitos[id];
  h.nome = habito.nome || h.nome;
  h.horas.push(hora);
  if (h.horas.length > 60) h.horas = h.horas.slice(-60);
  h.dias[diaSemana] = (h.dias[diaSemana] || 0) + 1;
  h.ultimo = chave;
  salvar(dados);
}

export function registrarLembreteIgnorado(habitoId) {
  const dados = carregar();
  if (!dados.ignorados) dados.ignorados = {};
  const id = String(habitoId);
  dados.ignorados[id] = (dados.ignorados[id] || 0) + 1;
  salvar(dados);
}

export function horarioMedioHabito(habitoId, diaSemana = null) {
  const h = carregar().habitos?.[String(habitoId)];
  if (!h?.horas?.length) return null;
  const media = Math.round(h.horas.reduce((a, b) => a + b, 0) / h.horas.length);
  return `${String(Math.floor(media / 60)).padStart(2, "0")}:${String(media % 60).padStart(2, "0")}`;
}

export function diaMaisFrequente(habitoId) {
  const h = carregar().habitos?.[String(habitoId)];
  if (!h?.dias) return null;
  let melhor = null;
  let max = 0;
  for (const [dia, qtd] of Object.entries(h.dias)) {
    if (qtd > max) {
      max = qtd;
      melhor = Number(dia);
    }
  }
  return melhor;
}

export function diasDesdeUltimoFeito(habitoId) {
  const ultimo = carregar().habitos?.[String(habitoId)]?.ultimo;
  if (!ultimo) return null;
  const hoje = new Date();
  const [y, m, d] = ultimo.split("-").map(Number);
  const ult = new Date(y, m - 1, d);
  return Math.floor((hoje - ult) / 86400000);
}

export function resumoPadroesParaIA(habitos = []) {
  const dados = carregar();
  return habitos.slice(0, 12).map((h) => ({
    id: h.id,
    nome: h.nome,
    horarioMedio: horarioMedioHabito(h.id),
    diaFrequente: diaMaisFrequente(h.id),
    ignorados: dados.ignorados?.[String(h.id)] || 0,
    diasDesdeUltimo: diasDesdeUltimoFeito(h.id),
  }));
}

export function alertaPreditivo(habito, agora = new Date()) {
  const media = horarioMedioHabito(habito.id, agora.getDay());
  if (!media) return null;
  const [hh, mm] = media.split(":").map(Number);
  const alvo = hh * 60 + mm;
  const min = agora.getHours() * 60 + agora.getMinutes();
  const diff = alvo - min;
  if (diff >= 10 && diff <= 20) {
    return `Você costuma fazer "${habito.nome}" perto das ${media} — quer começar em ${diff} min?`;
  }
  return null;
}
