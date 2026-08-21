import { APP_VERSION, hostAtual } from "./config.js?v=2.36.0";
import { fraseFilosoficaDoDia } from "./lib/filosofia.js?v=2.36.0";
import {
  adicionarAviso,
  alternarAvisoFeito,
  avisosDoDia,
  avisosPendentes,
  carregarAvisos,
  proximoAvisoHoje,
  proximosAvisos,
  removerAviso,
  salvarAvisosStorage,
} from "./lib/avisos-agenda.js?v=2.36.0";
import {
  criarHabitoAgua,
  criarSelectImportancia,
  criarSelectMetaSemanal,
  detectarTextoAgua,
  ehHabitoAgua,
  ehAtivoHoje,
  ehMultiPassos,
  estaCompletoNoDia,
  horariosLembretes,
  listaMicroPassos,
  listaPreparar,
  microFeitosNoDia,
  microPassoFeito,
  migrarHabitosAgua,
  nomeAguaLimpo,
  normalizarHabito,
  normalizarImportancia,
  normalizarMetaSemanal,
  parseMicroPassosTexto,
  parsePrepararTexto,
  passosTotal,
  progressoNoDia,
  rotuloImportancia,
  rotuloMetaSemanal,
  textoHorariosLembretes,
  textoPlanoB,
  todosMicroFeitos,
} from "./lib/habitos.js?v=2.36.0";
import {
  carregarPerfil,
  marcarPerfilInicializado,
  perfilInicializado,
  salvarPerfil,
} from "./lib/perfil.js?v=2.36.0";
import {
  correspondePreset,
  habitosRotinaCompleta,
  marcarRotinaMontada,
  previewRotinaDoPerfil,
  prioridadesRotina,
  rotinaJaMontada,
  textosPlanejadorRotina,
} from "./lib/rotina-preset.js?v=2.36.0";
import {
  detectarHabitoAprender,
  MICRO_APRENDER,
  migrarHabitosAprendizado,
  PLANO_B_APRENDER,
  textoSugereAprender,
} from "./lib/aprender.js?v=2.36.0";
import {
  carregarEstudo,
  resetSessaoSeNovoDia,
  salvarEstudo,
} from "./lib/estudo-hub.js?v=2.36.0";
import { iniciarVozes } from "./lib/voz-sintese.js?v=2.36.0";
import {
  atualizarResultadoLivros,
  ligarPainelEstudo,
  renderPainelEstudo,
  renderResumoHoje,
} from "./lib/estudo-ui.js?v=2.36.0";
import {
  montarOpcoesCheguei,
  renderChegueiFeito,
  renderChegueiInicio,
  renderChegueiOpcoes,
} from "./lib/cheguei.js?v=2.36.0";
import {
  aplicarSugestaoIa,
  montarPayloadContextoIa,
  pedirOpcoesContexto,
} from "./lib/contexto-ia.js?v=2.36.0";
import { faixaDoDia } from "./lib/contexto-tempo.js?v=2.36.0";
import { registrarConclusao, resumoPadroesParaIA, alertaPreditivo } from "./lib/padroes.js?v=2.36.0";
import {
  mensagemStreakGlobal,
  mensagemStreakHabito,
  rotuloStreakInsights,
} from "./lib/streak-gentil.js?v=2.36.0";
import { modoBarulho, definirModoBarulho, filtrarModoBarulho } from "./lib/modo-barulho.js?v=2.36.0";
import { detectarTransicao, mensagemTransicao } from "./lib/transicao-coach.js?v=2.36.0";
import { aplicarPreparoNoite, textoPreparoManha } from "./lib/preparar-amanha.js?v=2.36.0";
import { interpretarFala, rotuloContextoVoz } from "./lib/voz-contexto.js?v=2.36.0";
import { pedirResumoDiario, pedirPlanoSemana } from "./lib/ia-servicos.js?v=2.36.0";
import {
  carregarSessaoParceiro,
  iniciarSessaoParceiro,
  avancarParaExplicar,
  finalizarSessaoParceiro,
  limparSessaoParceiro,
  renderPainelParceiro,
} from "./lib/estudo-parceiro.js?v=2.36.0";
import { escutarDictado, pararEscuta, suportaReconhecimentoVoz } from "./lib/estudo-fala.js?v=2.36.0";
import {
  arquivarVersaoNota,
  carregarHistoricoCompleto,
  formatarHoraVersao,
  historicoDaData,
  importarHistoricoNotas,
  limparHistoricoExcesso,
  mesclarNotasDoHistorico,
  restaurarVersaoHistorico,
  rotuloMotivoVersao,
} from "./lib/diario-historico.js?v=2.36.0";
import {
  aplicarExplicacoesNeuro,
  carregarExplicacoesNeuro,
  mesclarExplicacoesNeuro,
} from "./lib/neuro-explicar.js?v=2.36.0";
import { sondarIaNeuro, iaNeuroDisponivel } from "./lib/neuro-ia.js?v=2.36.0";
import {
  marcarGuiaVisto,
  marcarPassoGuia,
  guiaJaVisto,
  carregarProgressoGuia,
  passoDemoPorIndice,
  renderPainelGuia,
  resetarProgressoGuia,
  ROTEIRO_DEMO,
} from "./lib/guia-app.js?v=2.36.0";
import { obterDepois } from "./lib/mindos-hoje.js?v=2.36.0";
import { carregarEstadoMental, limparEstadoMental, salvarEstadoMental } from "./lib/mindos-estado.js?v=2.36.0";
import {
  htmlMemoriaHub,
  htmlNorthFocus,
  htmlNorthHome,
  parseMinutos,
} from "./lib/north-home.js?v=2.36.0";
import { htmlMindosRotina } from "./lib/mindos-rotina.js?v=2.36.0";
import { htmlMindosEmocional } from "./lib/mindos-emocional.js?v=2.36.0";
import { registrarPraticaEmocional } from "./lib/emocional-dados.js?v=2.36.0";
import { calcularCaminhoNorth } from "./lib/north-caminho.js?v=2.36.0";
import {
  registrarEstado as aprenderRegistrarEstado,
  registrarCaminho as aprenderRegistrarCaminho,
  registrarDesfecho as aprenderRegistrarDesfecho,
  registrarTroca as aprenderRegistrarTroca,
  resumoAprende,
} from "./lib/north-aprende.js?v=2.36.0";
import { htmlMindosSemana } from "./lib/mindos-semana.js?v=2.36.0";
import { htmlMindosInsights } from "./lib/mindos-insights.js?v=2.36.0";
import { htmlMindosEstudo } from "./lib/mindos-estudo.js?v=2.36.0";
import {
  carregarCognitivo,
  concluirBlocoCognitivo,
  definirObjetivoCognitivo,
  extrairObjetivoInbox,
  iniciarBlocoCognitivo,
  proximoPassoCognitivo,
  registrarDesempenhoBloco,
  resetSessaoCognitivoSeNovoDia,
  resumoSemanalCognitivo,
  salvarCognitivo,
  salvarConhecimentoCognitivo,
  salvarRascunhoBloco,
  sessaoCognitivaPendente,
} from "./lib/cognitivo-dados.js?v=2.36.0";
import {
  htmlCognitivoAgora,
  htmlCognitivoMetricas,
  htmlCognitivoSessao,
  htmlMindosCognitivo,
  processarFormRaciocinio,
} from "./lib/cognitivo-ui.js?v=2.36.0";
import { escolherConviteNorth } from "./lib/north-convite.js?v=2.36.0";
import { aplicarIdiomaHtml, definirCallbackIdioma, localeTag, setLocale, t } from "./lib/i18n.js?v=2.36.0";
import {
  esconderBannerMigracaoHost,
  ligarMigracaoHost,
  mostrarAvisoGithubParaVercel,
  mostrarBannerMigracaoHost,
  precisaConectarSyncNesteHost,
} from "./lib/migracao-host.js?v=2.36.0";
import {
  ehHorarioDificil,
  mensagemTarde,
  sugestaoTarde,
} from "./lib/tarde.js?v=2.36.0";
import {
  complementoCoachDiario,
  gerarResumoSemana,
  sugerirHabito,
  textoSugestao,
} from "./lib/inteligencia.js?v=2.36.0";
import {
  iniciarVerificacaoLembretes,
  lembretesAtivos,
  pedirPermissaoLembretes,
  verificarAvisosAgenda,
  verificarLembretes,
} from "./lib/lembretes.js?v=2.36.0";
import { sincronizarAgendaSW } from "./lib/agenda-notif.js?v=2.36.0";
import {
  cancelarTimer,
  cronometroAtivo,
  formatarTimer,
  horaFormatada,
  iniciarCronometro,
  iniciarTimer,
  minutosAte,
  pararCronometro,
  proximoHorarioPendente,
  segundosCronometro,
  segundosRestantesTimer,
  textoCountdown,
  timerAtivo,
} from "./lib/foco.js?v=2.36.0";
import {
  carregarPerfilRotina,
  gerarRotina,
  salvarPerfilRotina,
} from "./lib/rotina-local.js?v=2.36.0";
import {
  adicionarInbox,
  alternarPrioridade,
  aplicarLimiteDiario,
  arquivarInboxCompleta,
  carregarInbox,
  carregarPrioridades,
  carregarRevisaoManha,
  carregarRevisaoNoturna,
  carregarTemaSemana,
  definirLimiteDiario,
  definirModoCabecaLeve,
  definirModoCerebroVazio,
  definirRevisaoCampo,
  definirRevisaoManhaCampo,
  ehPrioridadeHoje,
  filtrarCerebroVazio,
  filtrarModoLeve,
  limiteDiarioAtivo,
  MAX_PRIORIDADES,
  modoCabecaLeve,
  modoCerebroVazio,
  moverInboxParaDepois,
  ordenarComPrioridades,
  prioridadesDoDia,
  removerInbox,
  revisaoDoDia,
  revisaoManhaDoDia,
  salvarPrioridades,
  salvarTemaSemana,
  sincronizarPrioridadesOrfas,
  sugestaoAgora,
} from "./lib/tdah.js?v=2.36.0";

// ---- Referências aos elementos da página (DOM) ----
const entradaHabito = document.getElementById("entrada-habito");
const entradaCategoria = document.getElementById("entrada-categoria");
const entradaMeta = document.getElementById("entrada-meta");
const entradaHorario = document.getElementById("entrada-horario");
const entradaImportancia = document.getElementById("entrada-importancia");
const entradaMicro = document.getElementById("entrada-micro");
const entradaContexto = document.getElementById("entrada-contexto");
const entradaPlanoB = document.getElementById("entrada-plano-b");
const entradaPreparar = document.getElementById("entrada-preparar");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaHabitos = document.getElementById("lista-habitos");
const mensagemVazia = document.getElementById("mensagem-vazia");
const contadorFeitos = document.getElementById("contador-feitos");
const contadorTotal = document.getElementById("contador-total");
const barraProgresso = document.getElementById("barra-progresso");
const dataHoje = document.getElementById("data-hoje");
const graficoBarras = document.getElementById("grafico-barras");
const graficoHoje = document.getElementById("grafico-hoje");
const graficoMedia = document.getElementById("grafico-media");
const botaoTema = document.getElementById("botao-tema");
const filtros = document.getElementById("filtros");
const notaHoje = document.getElementById("nota-hoje");
const notaHojeSalvar = document.getElementById("nota-hoje-salvar");
const notaHojeStatus = document.getElementById("nota-hoje-status");
const calendarioGrade = document.getElementById("calendario-grade");
const botaoExportar = document.getElementById("botao-exportar");
const entradaImportar = document.getElementById("entrada-importar");
const agendaResumo = document.getElementById("agenda-resumo");
const filosofiaDia = document.getElementById("filosofia-dia");
const listaMetasSemana = document.getElementById("lista-metas-semana");
const cardsInsights = document.getElementById("cards-insights");
const navPaineis = document.querySelector(".nav-paineis");
const botaoAjustes = document.getElementById("botao-ajustes");
const diarioData = document.getElementById("diario-data");
const diarioTexto = document.getElementById("diario-texto");
const diarioSalvar = document.getElementById("diario-salvar");
const diarioBuscarAntiga = document.getElementById("diario-buscar-antiga-btn");
const diarioUltimoSalvo = document.getElementById("diario-ultimo-salvo");
const listaHistoricoDiario = document.getElementById("lista-historico-diario");
const diarioStatus = document.getElementById("diario-status");
const diarioLegenda = document.getElementById("diario-data-legenda");
const diarioHojeBotao = document.getElementById("diario-hoje");
const diarioOntemBotao = document.getElementById("diario-ontem");
const listaDiario = document.getElementById("lista-diario");
const diarioVazio = document.getElementById("diario-vazio");
const resumoSemana = document.getElementById("resumo-semana");
const sugestaoHabito = document.getElementById("sugestao-habito");
const sugestaoTexto = document.getElementById("sugestao-texto");
const botaoUsarSugestao = document.getElementById("botao-usar-sugestao");
const feedbackAdicao = document.getElementById("feedback-adicao");
const feedbackGlobal = document.getElementById("feedback-global");
const tituloPainel = document.querySelector(".titulo-dia");
const rotinaPerfil = document.getElementById("rotina-perfil");
const rotinaHorarios = document.getElementById("rotina-horarios");
const rotinaObjetivos = document.getElementById("rotina-objetivos");
const botaoGerarRotina = document.getElementById("botao-gerar-rotina");
const rotinaStatus = document.getElementById("rotina-status");
const rotinaResultado = document.getElementById("rotina-resultado");
const rotinaMensagem = document.getElementById("rotina-mensagem");
const rotinaLista = document.getElementById("rotina-lista");
const rotinaSubstituir = document.getElementById("rotina-substituir");
const botaoAplicarRotina = document.getElementById("botao-aplicar-rotina");
const botaoRegenerarRotina = document.getElementById("botao-regenerar-rotina");
const botaoMontarAdicionar = document.getElementById("botao-montar-adicionar");
const dicaInicio = document.getElementById("dica-inicio");
const botaoDicaFechar = document.getElementById("dica-fechar");
const infoVersao = document.getElementById("info-versao");
const botaoAtualizarApp = document.getElementById("botao-atualizar-app");
const agoraConteudo = document.getElementById("agora-conteudo");
const mindosRoot = document.getElementById("mindos-hoje");
const northMemoriaRoot = document.getElementById("north-memoria-root");
const northFocusEl = document.getElementById("north-focus");
const mindosRotinaRoot = document.getElementById("mindos-rotina");
const mindosEmocionalRoot = document.getElementById("mindos-emocional");
const mindosSemanaRoot = document.getElementById("mindos-semana");
const mindosInsightsRoot = document.getElementById("mindos-insights");
const mindosEstudoRoot = document.getElementById("mindos-estudo");
const mindosCognitivoRoot = document.getElementById("mindos-cognitivo");
const cognitivoSessaoRoot = document.getElementById("cognitivo-sessao-root");
const estudoMais = document.getElementById("estudo-mais");
const estudoResumoConteudo = document.getElementById("estudo-resumo-conteudo");
const estudoPainelRoot = document.getElementById("estudo-painel-root");
const entradaInbox = document.getElementById("entrada-inbox");
const botaoInbox = document.getElementById("botao-inbox");
const listaInbox = document.getElementById("lista-inbox");
const inboxVazio = document.getElementById("inbox-vazio");
const rotuloFoco = document.getElementById("rotulo-foco");
const revisaoFeito = document.getElementById("revisao-feito");
const revisaoFicou = document.getElementById("revisao-ficou");
const revisaoAmanha = document.getElementById("revisao-amanha");
const botaoLembretes = document.getElementById("botao-lembretes");
const lembretesStatus = document.getElementById("lembretes-status");
const formAviso = document.getElementById("form-aviso");
const avisoTitulo = document.getElementById("aviso-titulo");
const avisoData = document.getElementById("aviso-data");
const avisoHora = document.getElementById("aviso-hora");
const listaAvisos = document.getElementById("lista-avisos");
const avisosVazio = document.getElementById("avisos-vazio");
const chegueiRoot = document.getElementById("cheguei-root");
const chegueiVoltarGuia = document.getElementById("cheguei-voltar-guia");
const guiaRoot = document.getElementById("guia-root");
const guiaChamada = document.getElementById("guia-chamada");
const relogioAtual = document.getElementById("relogio-atual");
const countdownProximo = document.getElementById("countdown-proximo");
const botaoArquivarInbox = document.getElementById("botao-arquivar-inbox");
const toggleCabecaLeve = document.getElementById("toggle-cabeca-leve");
const toggleLimiteDiario = document.getElementById("toggle-limite-diario");
const toggleCerebroVazio = document.getElementById("toggle-cerebro-vazio");
const toggleModoBarulho = document.getElementById("toggle-modo-barulho");
const bannerTarde = document.getElementById("banner-tarde");
const bannerTransicao = document.getElementById("banner-transicao");
const bannerPreditivo = document.getElementById("banner-preditivo");
const manhaFoco1 = document.getElementById("manha-foco1");
const manhaFoco2 = document.getElementById("manha-foco2");
const manhaFoco3 = document.getElementById("manha-foco3");
const resumoNaoEsqueci = document.getElementById("resumo-nao-esqueci");
const entradaTemaSemana = document.getElementById("entrada-tema-semana");
const perfilResumo = document.getElementById("perfil-resumo");
const formPerfilRotina = document.getElementById("form-perfil-rotina");
const perfilNome = document.getElementById("perfil-nome");
const perfilAcordar = document.getElementById("perfil-acordar");
const perfilDormir = document.getElementById("perfil-dormir");
const perfilChegada = document.getElementById("perfil-chegada");
const perfilTardeFim = document.getElementById("perfil-tarde-fim");
const perfilPraia = document.getElementById("perfil-praia");
const rotinaPreview = document.getElementById("rotina-preview");
const botaoRotinaPersonalizada = document.getElementById("botao-rotina-personalizada");
const rotinaAjustesStatus = document.getElementById("rotina-ajustes-status");
const diarioResumoIa = document.getElementById("diario-resumo-ia");
const diarioResumoPainel = document.getElementById("diario-resumo-painel");
const botaoPlanoSemana = document.getElementById("botao-plano-semana");
const planoSemanaPainel = document.getElementById("plano-semana-painel");

// ---- Estado (a "fonte da verdade" do app) ----
let habitos = [];
let notas = {};
let avisos = [];
let chegueiEstado = "inicio";
let chegueiExcluidos = [];
let chegueiOpcoesAtuais = null;
let chegueiContexto = "chegada";
let chegueiIaToken = 0;
let chegueiFalaTexto = "";
let chegueiVeioDoGuia = false;
let mindosLigado = false;
let northSessaoFeita = false;
let northCaminhoAtual = null;
let northFocusAtivo = null;
let northFocusLigado = false;
let mindosEstudoLigado = false;
let cognitivoLigado = false;
let guiaDemoIndice = null;
let agoraTraveiHabitoId = null;
let filtroCategoria = "Todas";
let idArrastando = null;
let painelAtivo = "hoje";
let intervaloRelogio = null;
let dataDiarioSelecionada = hojeStr();
let timerPersistenciaNotas = null;
const ultimoSalvoPorChave = {};
const motivoSalvoPorChave = {};
const chavesPendentesHistorico = new Set();
let sugestaoAtual = null;
let rotinaGerada = null;
let dadosEstudo = resetSessaoSeNovoDia(carregarEstudo(), hojeStr());
let dadosCognitivo = resetSessaoCognitivoSeNovoDia(carregarCognitivo(), hojeStr());

// ============ DATAS (funções auxiliares) ============
function chaveData(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function hojeStr() {
  return chaveData(new Date());
}

function ontemStr() {
  const dia = new Date();
  dia.setDate(dia.getDate() - 1);
  return chaveData(dia);
}

function habitosDiarios() {
  return habitos.filter((h) => (h.metaSemanal || 7) >= 7).length;
}

// Converte "2026-07-18" em um objeto Date no fuso local
function parseData(str) {
  const [ano, mes, dia] = str.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

// Diferença em dias entre duas datas (texto)
function diffEmDias(strA, strB) {
  const ms = parseData(strB) - parseData(strA);
  return Math.round(ms / 86400000);
}

// Segunda-feira da semana atual
function inicioDaSemana() {
  const d = new Date();
  const diaDaSemana = (d.getDay() + 6) % 7; // transforma domingo(0) em 6
  d.setDate(d.getDate() - diaDaSemana);
  d.setHours(0, 0, 0, 0);
  return d;
}

function mostrarData() {
  const opcoes = { weekday: "long", day: "numeric", month: "long" };
  dataHoje.textContent = new Date().toLocaleDateString(localeTag(), opcoes);
}

// ============ TEMA (claro/escuro) ============
function aplicarTema(tema) {
  document.documentElement.setAttribute("data-tema", tema);
  if (botaoTema) botaoTema.textContent = tema === "escuro" ? "☀" : "☾";
  const metaTema = document.querySelector('meta[name="theme-color"]');
  if (metaTema) metaTema.content = tema === "escuro" ? "#0f0e0d" : "#e8dfd1";
  const metaStatus = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (metaStatus) metaStatus.content = tema === "escuro" ? "black" : "default";
  localStorage.setItem("tema", tema);
  if (!window.syncEstaAplicandoRemoto || !window.syncEstaAplicandoRemoto()) {
    if (typeof window.agendarSyncNuvem === "function") window.agendarSyncNuvem();
  }
}

function alternarTema() {
  const atual = document.documentElement.getAttribute("data-tema");
  aplicarTema(atual === "escuro" ? "claro" : "escuro");
}

// ============ PERSISTÊNCIA (salvar/carregar) ============
function salvarAvisos() {
  salvarAvisosStorage(avisos);
  if (!window.syncEstaAplicandoRemoto || !window.syncEstaAplicandoRemoto()) {
    if (typeof window.agendarSyncNuvem === "function") window.agendarSyncNuvem();
  }
  rodarLembretes();
}

function salvar() {
  localStorage.setItem("meus-habitos", JSON.stringify(habitos));
  if (!window.syncEstaAplicandoRemoto || !window.syncEstaAplicandoRemoto()) {
    if (typeof window.agendarSyncNuvem === "function") window.agendarSyncNuvem();
  }
  rodarLembretes();
  sincronizarLembretesSW();
}

function sincronizarLembretesSW() {
  const chave = hojeStr();
  const perfil = carregarPerfil();
  sincronizarAgendaSW(habitos, chave, {
    estaPendente: (h) => ehAtivoHoje(h) && !estaFeitoHoje(h),
    horariosDoHabito: horariosParaLembrete,
    prioridades: prioridadesDoDia(chave),
    prioridadesVida: perfil.prioridadesVida || [],
    avisos: avisosPendentes(avisos, chave),
  });
}

function chaveNotaValida(chave) {
  return typeof chave === "string" && /^\d{4}-\d{2}-\d{2}$/.test(chave);
}

function mesclarNotasDiario(local = {}, remoto = {}) {
  const resultado = { ...(local && typeof local === "object" ? local : {}) };
  if (!remoto || typeof remoto !== "object") return resultado;

  for (const [chave, texto] of Object.entries(remoto)) {
    if (!chaveNotaValida(chave)) continue;
    const remotoTxt = String(texto ?? "").trim();
    if (!remotoTxt) continue;
    const localTxt = String(resultado[chave] ?? "").trim();
    if (!localTxt || remotoTxt.length > localTxt.length) {
      resultado[chave] = texto;
    }
  }
  return resultado;
}

function migrarNotasDiario(mapa = {}) {
  const limpo = { ...(mapa && typeof mapa === "object" ? mapa : {}) };
  const orfa = limpo.undefined;
  if (orfa) {
    const hoje = hojeStr();
    limpo[hoje] = limpo[hoje] ? `${limpo[hoje]}\n${orfa}` : orfa;
    delete limpo.undefined;
  }
  Object.keys(limpo).forEach((chave) => {
    if (!chaveNotaValida(chave)) delete limpo[chave];
  });
  return limpo;
}

function garantirDataDiario() {
  if (!chaveNotaValida(dataDiarioSelecionada)) {
    dataDiarioSelecionada = hojeStr();
  }
  if (diarioData && !diarioData.value) {
    diarioData.value = dataDiarioSelecionada;
  }
  return dataDiarioSelecionada;
}

function contarNotasComTexto(mapa = {}) {
  return Object.keys(mapa).filter(
    (chave) => chaveNotaValida(chave) && String(mapa[chave] ?? "").trim()
  ).length;
}

function textoRevisaoParaDiario(dados) {
  if (!dados || typeof dados !== "object") return "";
  return [dados.feito, dados.ficou, dados.amanha]
    .map((t) => String(t ?? "").trim())
    .filter(Boolean)
    .join("\n");
}

function flushNotasParaDisco() {
  if (timerPersistenciaNotas) {
    clearTimeout(timerPersistenciaNotas);
    timerPersistenciaNotas = null;
  }
  salvarNotas();
}

function registrarHistoricoSalvamento() {
  chavesPendentesHistorico.forEach((chave) => {
    const texto = notas[chave];
    if (texto?.trim()) {
      arquivarVersaoNota(chave, texto, { motivo: motivoSalvoPorChave[chave] || "auto" });
    }
  });
  chavesPendentesHistorico.clear();
  desenharHistoricoDiario();
}

function agendarPersistenciaNotas(chave) {
  clearTimeout(timerPersistenciaNotas);
  timerPersistenciaNotas = setTimeout(() => {
    timerPersistenciaNotas = null;
    salvarNotas();
    ultimoSalvoPorChave[chave] = Date.now();
    atualizarIndicadorSalvoDiario(chave);
  }, 450);
}

function atualizarIndicadorSalvoDiario(chave) {
  if (!diarioUltimoSalvo || chave !== dataDiarioSelecionada) return;
  const em = ultimoSalvoPorChave[chave];
  const texto = notas[chave] || "";
  if (!em || !texto.trim()) {
    diarioUltimoSalvo.textContent = texto.trim() ? t("diario.salvando") : "";
    return;
  }
  diarioUltimoSalvo.textContent = t("diario.salvo", {
    hora: formatarHoraVersao(em),
    n: texto.length,
  });
}

function migrarNotasParaHistoricoInicial() {
  limparHistoricoExcesso();
  if (localStorage.getItem("diario-historico-migrado")) return;
  Object.entries(notas).forEach(([chave, texto]) => {
    if (chaveNotaValida(chave) && String(texto ?? "").trim()) {
      arquivarVersaoNota(chave, texto, { motivo: "manual" });
    }
  });
  localStorage.setItem("diario-historico-migrado", "1");
}

function buscarTextosEmValor(valor, caminho, achados) {
  if (typeof valor === "string") {
    const texto = valor.trim();
    if (texto.length >= 120) achados.push({ caminho, texto, tamanho: texto.length });
    return;
  }
  if (Array.isArray(valor)) {
    valor.forEach((item, indice) => buscarTextosEmValor(item, `${caminho}[${indice}]`, achados));
    return;
  }
  if (valor && typeof valor === "object") {
    Object.entries(valor).forEach(([chave, item]) =>
      buscarTextosEmValor(item, `${caminho}.${chave}`, achados)
    );
  }
}

function buscarTextosLongosNoNavegador() {
  const achados = [];
  for (let indice = 0; indice < localStorage.length; indice++) {
    const chave = localStorage.key(indice);
    if (!chave) continue;
    const raw = localStorage.getItem(chave);
    if (!raw) continue;
    if (raw.length >= 120 && !raw.startsWith("{") && !raw.startsWith("[")) {
      achados.push({ caminho: `localStorage.${chave}`, texto: raw, tamanho: raw.length });
      continue;
    }
    try {
      buscarTextosEmValor(JSON.parse(raw), `localStorage.${chave}`, achados);
    } catch {
      if (raw.trim().length >= 120) {
        achados.push({ caminho: `localStorage.${chave}`, texto: raw, tamanho: raw.length });
      }
    }
  }
  return achados.sort((a, b) => b.tamanho - a.tamanho);
}

function restaurarNotasPerdidas() {
  let recuperou = false;

  const historico = mesclarNotasDoHistorico({});
  const antesHistorico = contarNotasComTexto(notas);
  notas = mesclarNotasDiario(notas, historico);
  if (contarNotasComTexto(notas) > antesHistorico) recuperou = true;
  Object.keys(historico).forEach((chave) => {
    const txtHist = String(historico[chave] ?? "").trim();
    const txtAtual = String(notas[chave] ?? "").trim();
    if (txtHist.length > txtAtual.length) {
      notas[chave] = historico[chave];
      recuperou = true;
    }
  });

  try {
    const backupRaw = localStorage.getItem("notas-diarias-backup");
    if (backupRaw) {
      const payload = JSON.parse(backupRaw);
      const backup = migrarNotasDiario(payload.notas || payload);
      if (contarNotasComTexto(backup) > contarNotasComTexto(notas)) {
        notas = mesclarNotasDiario(notas, backup);
        recuperou = true;
      }
    }
  } catch {
    /* ignora backup inválido */
  }

  try {
    const prev = migrarNotasDiario(JSON.parse(localStorage.getItem("notas-diarias-prev") || "{}"));
    const antes = contarNotasComTexto(notas);
    notas = mesclarNotasDiario(notas, prev);
    if (contarNotasComTexto(notas) > antes) recuperou = true;
  } catch {
    /* ignora */
  }

  const revisao = carregarRevisaoNoturna();
  for (const [chave, dados] of Object.entries(revisao)) {
    if (!chaveNotaValida(chave)) continue;
    const textoRevisao = textoRevisaoParaDiario(dados);
    if (!textoRevisao) continue;
    const atual = String(notas[chave] ?? "").trim();
    if (!atual) {
      notas[chave] = textoRevisao;
      recuperou = true;
    }
  }

  if (recuperou) salvarNotas({ pularBackup: true, pularHistorico: true });
  return recuperou;
}

function coletarTextosRecuperaveis() {
  const vistos = new Set();
  const lista = [];

  function adicionar(item) {
    const id = `${item.chave}::${item.texto.slice(0, 100)}`;
    if (vistos.has(id)) return;
    vistos.add(id);
    lista.push(item);
  }

  carregarHistoricoCompleto().forEach((versao) => {
    const texto = String(versao.texto ?? "").trim();
    if (texto.length < 40) return;
    adicionar({
      rotulo: `Histórico · ${formatarDataCurtaBR(versao.chave)} · ${formatarHoraVersao(versao.em)}`,
      chave: versao.chave,
      texto,
      tamanho: versao.chars || texto.length,
      tipo: "historico",
      ref: versao.id,
    });
  });

  buscarTextosLongosNoNavegador()
    .filter((item) => item.tamanho >= 80)
    .forEach((item) => {
      const dataNoCaminho = item.caminho.match(/\d{4}-\d{2}-\d{2}/);
      adicionar({
        rotulo: `Navegador · ${item.caminho.replace("localStorage.", "")}`,
        chave: dataNoCaminho?.[0] || dataDiarioSelecionada || ontemStr(),
        texto: item.texto,
        tamanho: item.tamanho,
        tipo: "storage",
        ref: item.caminho,
      });
    });

  return lista.sort((a, b) => b.tamanho - a.tamanho);
}

function procurarTextoAntigoDiario() {
  const resultados = coletarTextosRecuperaveis();
  const container = document.getElementById("lista-busca-diario");
  const vazio = document.getElementById("diario-busca-vazio");

  if (!container) return;

  container.innerHTML = "";
  container.hidden = false;

  if (!resultados.length) {
    if (vazio) vazio.hidden = false;
    mostrarFeedback("Nenhum texto antigo encontrado neste navegador.");
    return;
  }

  if (vazio) vazio.hidden = true;

  resultados.slice(0, 25).forEach((item) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "historico-diario-item busca-diario-item";

    const meta = document.createElement("span");
    meta.className = "historico-diario-meta";
    meta.textContent = `${item.rotulo} · ${item.tamanho} caracteres`;

    const preview = document.createElement("span");
    preview.className = "historico-diario-preview";
    preview.textContent =
      item.texto.length > 140 ? `${item.texto.slice(0, 140)}…` : item.texto;

    botao.appendChild(meta);
    botao.appendChild(preview);
    botao.addEventListener("click", () => {
      const confirmar = confirm(
        `Restaurar este texto (${item.tamanho} caracteres) no diário de ${formatarDataCurtaBR(item.chave)}?`
      );
      if (!confirmar) return;

      if (item.tipo === "historico") {
        restaurarVersaoHistoricoDiario(item.ref);
      } else {
        definirNota(item.chave, item.texto, { motivo: "manual", imediato: true });
        carregarNotaDiario(item.chave);
        mostrarFeedback("Texto antigo restaurado.");
      }
    });
    container.appendChild(botao);
  });

  container.scrollIntoView({ behavior: "smooth", block: "nearest" });
  mostrarFeedback(`${resultados.length} texto(s) encontrado(s). Toque para restaurar.`);
}

function restaurarVersaoHistoricoDiario(id) {
  const versao = restaurarVersaoHistorico(id);
  if (!versao) return;
  definirNota(versao.chave, versao.texto, { motivo: "manual", imediato: true });
  carregarNotaDiario(versao.chave);
  mostrarFeedback("Versão anterior restaurada.");
}

function salvarNotas(opcoes = {}) {
  const { pularBackup = false, pularHistorico = false } = opcoes;
  if (!pularHistorico) registrarHistoricoSalvamento();
  if (!pularBackup) {
    try {
      const rawAtual = localStorage.getItem("notas-diarias");
      if (rawAtual) {
        const atualParse = migrarNotasDiario(JSON.parse(rawAtual));
        const novoContagem = contarNotasComTexto(notas);
        const atualContagem = contarNotasComTexto(atualParse);
        if (atualContagem > novoContagem || (atualContagem > 0 && novoContagem === 0)) {
          localStorage.setItem("notas-diarias-prev", rawAtual);
        }
      }
      if (contarNotasComTexto(notas) > 0) {
        localStorage.setItem(
          "notas-diarias-backup",
          JSON.stringify({ salvoEm: Date.now(), notas })
        );
      }
    } catch {
      /* ignora falha de backup */
    }
  }
  localStorage.setItem("notas-diarias", JSON.stringify(notas));
  if (!window.syncEstaAplicandoRemoto || !window.syncEstaAplicandoRemoto()) {
    if (typeof window.agendarSyncNuvem === "function") window.agendarSyncNuvem();
  }
}

function mostrarStatusCampo(elemento, texto, tipo = "ok") {
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.className = "diario-status diario-status-" + tipo;
  clearTimeout(mostrarStatusCampo._timers?.[elemento.id]);
  if (!mostrarStatusCampo._timers) mostrarStatusCampo._timers = {};
  if (texto) {
    mostrarStatusCampo._timers[elemento.id] = setTimeout(() => {
      elemento.textContent = "";
      elemento.className = "diario-status";
    }, 3500);
  }
}

function persistirNotaHojeAtual() {
  if (!notaHoje) return;
  definirNota(hojeStr(), notaHoje.value, { silencioso: true, motivo: "fechar", imediato: true });
}

function persistirNotaDiarioAtual() {
  if (!diarioTexto || !dataDiarioSelecionada) return;
  definirNota(dataDiarioSelecionada, diarioTexto.value, {
    silencioso: true,
    motivo: "fechar",
    imediato: true,
  });
}

function salvarNotaHojeExplicito() {
  if (!notaHoje) return;
  const chave = hojeStr();
  const texto = notaHoje.value;
  definirNota(chave, texto, { silencioso: true, motivo: "manual", imediato: true });
  if (texto.trim()) {
    mostrarStatusCampo(notaHojeStatus, "Anotações salvas ✓");
    mostrarFeedback("Anotações de hoje salvas.");
  } else {
    mostrarStatusCampo(notaHojeStatus, "Nada para salvar ainda", "aviso");
  }
}

function salvarDiarioExplicito() {
  if (!diarioTexto || !dataDiarioSelecionada) return;
  const texto = diarioTexto.value;
  definirNota(dataDiarioSelecionada, texto, { silencioso: true, motivo: "manual", imediato: true });
  if (texto.trim()) {
    mostrarStatusCampo(diarioStatus, "Entrada salva ✓");
    mostrarFeedback("Entrada do diário salva.");
  } else {
    mostrarStatusCampo(diarioStatus, "Escreva algo antes de salvar", "aviso");
  }
}

function definirNota(chave, texto, opcoes = {}) {
  if (!chaveNotaValida(chave)) return;
  const { silencioso = false, motivo = "auto", imediato = false } = opcoes;
  const limpo = texto.trim();
  const anterior = notas[chave];

  motivoSalvoPorChave[chave] = motivo;
  chavesPendentesHistorico.add(chave);

  if (!limpo && anterior?.trim()) {
    arquivarVersaoNota(chave, anterior, { motivo: "apagar" });
  }

  if (limpo) {
    notas[chave] = texto;
  } else {
    delete notas[chave];
  }

  if (imediato) flushNotasParaDisco();
  else agendarPersistenciaNotas(chave);

  if (chave === hojeStr() && notaHoje && document.activeElement !== notaHoje) {
    notaHoje.value = texto;
  }
  if (chave === dataDiarioSelecionada && diarioTexto && document.activeElement !== diarioTexto) {
    diarioTexto.value = texto;
  }
  desenharListaDiario();
  desenharHistoricoDiario();
  desenharResumoAgenda();
  desenharFilosofia();
  if (!silencioso) {
    agendarStatusAutoSalvo(chave);
  }
}

function agendarStatusAutoSalvo(chave) {
  if (!agendarStatusAutoSalvo._timers) agendarStatusAutoSalvo._timers = {};
  clearTimeout(agendarStatusAutoSalvo._timers[chave]);
  agendarStatusAutoSalvo._timers[chave] = setTimeout(() => {
    if (chave === dataDiarioSelecionada) {
      mostrarStatusCampo(diarioStatus, "Salvo automaticamente");
    }
    if (chave === hojeStr()) {
      mostrarStatusCampo(notaHojeStatus, "Salvo automaticamente");
    }
  }, 900);
}

function formatarDataBR(chave) {
  const data = parseData(chave);
  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatarDataCurtaBR(chave) {
  const [ano, mes, dia] = chave.split("-");
  return `${dia}/${mes}/${ano}`;
}

function carregarNotaDiario(chave) {
  if (!chaveNotaValida(chave)) chave = hojeStr();

  const trocandoData =
    dataDiarioSelecionada && chave !== dataDiarioSelecionada && diarioTexto;

  if (trocandoData) {
    definirNota(dataDiarioSelecionada, diarioTexto.value, {
      silencioso: true,
      motivo: "fechar",
      imediato: true,
    });
  }

  dataDiarioSelecionada = chave;
  if (diarioData) diarioData.value = chave;
  if (diarioTexto) diarioTexto.value = notas[chave] || "";
  const ehHoje = chave === hojeStr();
  if (diarioLegenda) {
    diarioLegenda.textContent = ehHoje
      ? `Hoje — ${formatarDataBR(chave)}`
      : formatarDataBR(chave);
  }
  atualizarIndicadorSalvoDiario(chave);
  desenharListaDiario();
  desenharHistoricoDiario();
}

function desenharHistoricoDiario() {
  if (!listaHistoricoDiario || !dataDiarioSelecionada) return;

  const versoes = historicoDaData(dataDiarioSelecionada);
  const vazio = document.getElementById("diario-historico-vazio");
  listaHistoricoDiario.innerHTML = "";

  if (vazio) vazio.hidden = versoes.length > 0;

  versoes.slice(0, 15).forEach((versao) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "historico-diario-item";

    const meta = document.createElement("span");
    meta.className = "historico-diario-meta";
    meta.textContent = t("diario.historico.meta", {
      hora: formatarHoraVersao(versao.em),
      n: versao.chars,
      motivo: rotuloMotivoVersao(versao.motivo),
    });

    const preview = document.createElement("span");
    preview.className = "historico-diario-preview";
    const texto = String(versao.texto ?? "").trim();
    preview.textContent = texto.length > 120 ? `${texto.slice(0, 120)}…` : texto;

    botao.appendChild(meta);
    botao.appendChild(preview);
    botao.addEventListener("click", () => {
      if (!confirm("Restaurar esta versão? O texto atual será substituído.")) return;
      restaurarVersaoHistoricoDiario(versao.id);
    });
    listaHistoricoDiario.appendChild(botao);
  });
}

function dataInicialDiario() {
  const hoje = hojeStr();
  if ((notas[hoje] || "").trim()) return hoje;

  const ontem = ontemStr();
  if ((notas[ontem] || "").trim()) return ontem;

  const chaves = Object.keys(notas)
    .filter((chave) => chaveNotaValida(chave) && (notas[chave] || "").trim())
    .sort()
    .reverse();
  return chaves[0] || hoje;
}

function desenharRecuperacaoDiario() {
  const banner = document.getElementById("diario-recuperar");
  if (!banner) return;

  const ontem = ontemStr();
  const temOntem = Boolean((notas[ontem] || "").trim());
  const temAlguma = contarNotasComTexto(notas) > 0;
  const temPrev = contarNotasComTexto(
    migrarNotasDiario(JSON.parse(localStorage.getItem("notas-diarias-prev") || "{}"))
  ) > contarNotasComTexto(notas);

  if (!temAlguma && temPrev) {
    banner.hidden = false;
    banner.innerHTML = `
      <p>Encontramos um backup local com entradas que sumiram. Toque para restaurar.</p>
      <button type="button" id="diario-recuperar-btn" class="botao-secundario">Restaurar anotações</button>`;
    banner.querySelector("#diario-recuperar-btn")?.addEventListener("click", () => {
      if (restaurarNotasPerdidas()) {
        mostrarFeedback("Anotações restauradas do backup local.");
        carregarNotaDiario(dataInicialDiario());
        desenharListaDiario();
        desenharRecuperacaoDiario();
      } else {
        mostrarFeedback("Não havia nada para restaurar.");
      }
    });
    return;
  }

  if (temOntem && dataDiarioSelecionada === hojeStr() && !(notas[hojeStr()] || "").trim()) {
    banner.hidden = false;
    banner.innerHTML = `
      <p>Sua entrada de <strong>ontem</strong> está salva. Toque para abrir.</p>
      <button type="button" id="diario-ir-ontem-btn" class="botao-secundario">Abrir nota de ontem</button>`;
    banner.querySelector("#diario-ir-ontem-btn")?.addEventListener("click", () => {
      carregarNotaDiario(ontem);
    });
    return;
  }

  banner.hidden = true;
  banner.innerHTML = "";
}

function desenharListaDiario() {
  if (!listaDiario) return;
  const chaves = Object.keys(notas)
    .filter((chave) => (notas[chave] || "").trim())
    .sort()
    .reverse();

  listaDiario.innerHTML = "";
  if (diarioVazio) diarioVazio.hidden = chaves.length > 0;

  chaves.forEach((chave) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className =
      "entrada-diario" + (chave === dataDiarioSelecionada ? " ativa" : "");

    const dataEl = document.createElement("span");
    dataEl.className = "entrada-diario-data";
    dataEl.textContent =
      formatarDataCurtaBR(chave) + (chave === hojeStr() ? " · hoje" : "");

    const preview = document.createElement("span");
    preview.className = "entrada-diario-preview";
    preview.textContent = notas[chave].trim();

    botao.appendChild(dataEl);
    botao.appendChild(preview);
    botao.addEventListener("click", () => carregarNotaDiario(chave));
    listaDiario.appendChild(botao);
  });

  desenharRecuperacaoDiario();
}

function carregar() {
  const salvos = localStorage.getItem("meus-habitos");
  if (salvos) {
    const dados = JSON.parse(salvos);
    habitos = migrarHabitosAgua(
      dados.map((h) =>
        normalizarHabito({
          ...h,
          historico: h.historico || (h.feito ? { [hojeStr()]: true } : {}),
        })
      ),
      hojeStr()
    );
    habitos = migrarHabitosAprendizado(habitos).map(normalizarHabito);
    salvar();
  }

  const notasSalvas = localStorage.getItem("notas-diarias");
  if (notasSalvas) {
    try {
      notas = migrarNotasDiario(JSON.parse(notasSalvas));
    } catch {
      notas = {};
    }
  }
  restaurarNotasPerdidas();
  migrarNotasParaHistoricoInicial();

  avisos = carregarAvisos();
}

function formatarDataAviso(dataStr) {
  const [ano, mes, dia] = dataStr.split("-").map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function criarItemAviso(aviso, { proximo = false } = {}) {
  const item = document.createElement("li");
  item.className = "item-aviso" + (aviso.feito ? " feito" : "") + (proximo ? " proximo" : "");

  const check = document.createElement("input");
  check.type = "checkbox";
  check.className = "checkbox-aviso";
  check.checked = aviso.feito;
  check.setAttribute("aria-label", `Marcar aviso: ${aviso.titulo}`);
  check.addEventListener("change", () => {
    avisos = alternarAvisoFeito(avisos, aviso.id);
    salvarAvisos();
    desenharAvisos();
    desenharResumoAgenda();
  });

  const corpo = document.createElement("div");
  corpo.className = "aviso-corpo";

  const hora = document.createElement("span");
  hora.className = "aviso-hora";
  hora.textContent = aviso.hora;

  const titulo = document.createElement("span");
  titulo.className = "aviso-titulo";
  titulo.textContent = aviso.titulo;

  corpo.appendChild(hora);
  corpo.appendChild(titulo);

  if (aviso.data !== hojeStr()) {
    const dataEl = document.createElement("span");
    dataEl.className = "aviso-data";
    dataEl.textContent = formatarDataAviso(aviso.data);
    corpo.appendChild(dataEl);
  }

  const remover = document.createElement("button");
  remover.type = "button";
  remover.className = "botao-remover aviso-remover";
  remover.textContent = "×";
  remover.setAttribute("aria-label", "Remover aviso");
  remover.addEventListener("click", () => {
    avisos = removerAviso(avisos, aviso.id);
    salvarAvisos();
    desenharAvisos();
    desenharResumoAgenda();
  });

  item.appendChild(check);
  item.appendChild(corpo);
  item.appendChild(remover);
  return item;
}

function desenharAvisos() {
  if (!listaAvisos) return;
  const hoje = hojeStr();
  if (avisoData && !avisoData.value) avisoData.value = hoje;

  const doDia = avisosDoDia(avisos, hoje);
  const futuros = proximosAvisos(avisos, hoje, 5);
  const proximo = proximoAvisoHoje(avisos, hoje);

  listaAvisos.innerHTML = "";

  if (!doDia.length && !futuros.length) {
    if (avisosVazio) {
      avisosVazio.hidden = false;
      avisosVazio.textContent = t("hoje.avisos.vazio.form");
    }
    return;
  }

  if (avisosVazio) avisosVazio.hidden = true;

  if (doDia.length) {
    const secao = document.createElement("li");
    secao.className = "avisos-secao-titulo";
    secao.textContent = t("hoje.avisos.secao.hoje");
    listaAvisos.appendChild(secao);
    doDia.forEach((a) => {
      listaAvisos.appendChild(criarItemAviso(a, { proximo: proximo?.id === a.id }));
    });
  }

  if (futuros.length) {
    const secao = document.createElement("li");
    secao.className = "avisos-secao-titulo";
    secao.textContent = t("hoje.avisos.secao.proximos");
    listaAvisos.appendChild(secao);
    futuros.forEach((a) => listaAvisos.appendChild(criarItemAviso(a)));
  }
}

function adicionarAvisoForm(evento) {
  evento.preventDefault();
  const titulo = avisoTitulo?.value?.trim();
  const data = avisoData?.value;
  const hora = avisoHora?.value;
  if (!titulo || !data || !hora) return;
  const resultado = adicionarAviso(avisos, { titulo, data, hora });
  if (resultado.erro) {
    mostrarFeedback(resultado.erro, "aviso");
    return;
  }
  avisos = resultado.lista;
  salvarAvisos();
  formAviso?.reset();
  if (avisoData) avisoData.value = hojeStr();
  desenharAvisos();
  desenharResumoAgenda();
  mostrarFeedback("Aviso adicionado!");
}

// ============ CÁLCULOS ============
function estaFeitoHoje(habito) {
  return estaCompletoNoDia(habito, hojeStr());
}

// Sequência atual: dias seguidos cumpridos, terminando hoje ou ontem
function calcularStreak(habito) {
  let streak = 0;
  const dia = new Date();
  if (!estaCompletoNoDia(habito, chaveData(dia))) {
    dia.setDate(dia.getDate() - 1);
  }
  while (estaCompletoNoDia(habito, chaveData(dia))) {
    streak++;
    dia.setDate(dia.getDate() - 1);
  }
  return streak;
}

// Recorde: a maior sequência de dias seguidos já registrada
function calcularRecorde(habito) {
  const dias = Object.keys(habito.historico)
    .filter((d) => estaCompletoNoDia(habito, d))
    .sort();

  let melhor = 0;
  let atual = 0;
  let anterior = null;

  for (const d of dias) {
    if (anterior && diffEmDias(anterior, d) === 1) {
      atual++;
    } else {
      atual = 1;
    }
    if (atual > melhor) melhor = atual;
    anterior = d;
  }
  return melhor;
}

// Um dia "conta" para a chama se pelo menos um hábito foi concluído nele
function diaConcluido(chave) {
  return habitos.some((h) => estaCompletoNoDia(h, chave));
}

// Sequência global: dias seguidos com pelo menos um hábito concluído
function streakGlobal() {
  if (habitos.length === 0) return 0;
  let streak = 0;
  const dia = new Date();
  if (!diaConcluido(chaveData(dia))) {
    dia.setDate(dia.getDate() - 1);
  }
  while (diaConcluido(chaveData(dia))) {
    streak++;
    dia.setDate(dia.getDate() - 1);
  }
  return streak;
}

// Quantos dias o hábito foi cumprido dentro da semana atual
function feitosNaSemana(habito) {
  const inicio = inicioDaSemana();
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const dia = new Date(inicio);
    dia.setDate(inicio.getDate() + i);
    if (estaCompletoNoDia(habito, chaveData(dia))) total++;
  }
  return total;
}

// ============ AÇÕES ============
function montarHabitoDoFormulario(texto) {
  const sugestao = sugerirHabito(texto);
  const habito = {
    id: novoIdHabito(),
    nome: texto,
    categoria: entradaCategoria.value || sugestao.categoria,
    metaSemanal: Number(entradaMeta.value) || sugestao.metaSemanal,
    horario: entradaHorario.value || sugestao.horario || "",
    importancia: normalizarImportancia(entradaImportancia?.value || 3),
    historico: {},
  };

  const contexto = entradaContexto?.value.trim();
  if (contexto) habito.contextoLembrete = contexto;

  const micro = parseMicroPassosTexto(entradaMicro?.value || "");
  if (micro.length) habito.microPassos = micro;

  const planoB = entradaPlanoB?.value.trim();
  if (planoB) habito.planoB = planoB;

  const preparar = parsePrepararTexto(entradaPreparar?.value || "");
  if (preparar.length) habito.preparar = preparar;

  if (detectarTextoAgua(texto) || sugestao.lembretes > 1) {
    habito.nome = nomeAguaLimpo();
    habito.categoria = "Saúde";
    habito.metaSemanal = 7;
    habito.importancia = 1;
    habito.lembretes = sugestao.lembretes || 6;
    habito.horariosLembretes = horariosLembretes({ lembretes: habito.lembretes });
    if (!habito.horario) habito.horario = habito.horariosLembretes[0] || "06:30";
    if (!habito.contextoLembrete) habito.contextoLembrete = "Beber um copo de água agora.";
  }

  if (textoSugereAprender(texto) && !micro.length) {
    habito.microPassos = [...MICRO_APRENDER];
    habito.planoB = habito.planoB || PLANO_B_APRENDER;
    habito.preparar = habito.preparar || ["Fone ou alto-falante", "Celular longe"];
    habito.diasAtivos = [1, 2, 3, 4, 5];
  }

  return habito;
}

function novoIdHabito() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function mostrarFeedback(texto, tipo = "ok") {
  const alvo = feedbackGlobal || feedbackAdicao;
  if (!alvo) return;
  alvo.textContent = texto;
  alvo.className = (feedbackGlobal ? "feedback-global" : "feedback-adicao") + " feedback-" + tipo;
  alvo.hidden = false;
  clearTimeout(mostrarFeedback._timer);
  mostrarFeedback._timer = setTimeout(() => {
    alvo.hidden = true;
  }, 3200);
}

function limparFormularioHabito() {
  entradaHabito.value = "";
  entradaHorario.value = "";
  entradaMeta.value = "7";
  entradaCategoria.value = "Geral";
  if (entradaImportancia) entradaImportancia.value = "3";
  if (entradaMicro) entradaMicro.value = "";
  if (entradaContexto) entradaContexto.value = "";
  if (entradaPlanoB) entradaPlanoB.value = "";
  if (entradaPreparar) entradaPreparar.value = "";
  sugestaoAtual = null;
  if (sugestaoHabito) sugestaoHabito.hidden = true;
}

function adicionarHabito() {
  const texto = entradaHabito.value.trim();
  if (texto === "") return;

  if (detectarTextoAgua(texto) && habitos.some(ehHabitoAgua)) {
    mostrarFeedback("Água já está na agenda — marque os lembretes na aba Hoje.", "aviso");
    return;
  }

  habitos.push(montarHabitoDoFormulario(texto));
  limparFormularioHabito();
  salvar();
  desenhar();
  mostrarFeedback("Hábito adicionado! Veja na aba Hoje.");
}

const ATALHOS_RAPIDOS = {
  agua: () => criarHabitoAgua(novoIdHabito()),
  academia: () => ({
    id: novoIdHabito(),
    nome: "Academia",
    categoria: "Saúde",
    metaSemanal: 5,
    horario: "18:00",
    importancia: 2,
    historico: {},
  }),
  estudo: () => ({
    id: novoIdHabito(),
    nome: "Aprender 15 min",
    categoria: "Estudo",
    metaSemanal: 5,
    horario: "19:00",
    importancia: 1,
    diasAtivos: [1, 2, 3, 4, 5],
    microPassos: [...MICRO_APRENDER],
    planoB: PLANO_B_APRENDER,
    preparar: ["Fone ou alto-falante", "Água por perto", "Celular longe"],
    contextoLembrete: "Vídeo, áudio ou falar em voz alta — sem precisar ler.",
    historico: {},
  }),
  vocabulario: () => ({
    id: novoIdHabito(),
    nome: "Vocabulário 5 min",
    categoria: "Estudo",
    metaSemanal: 5,
    horario: "19:20",
    importancia: 2,
    diasAtivos: [1, 2, 3, 4, 5],
    microPassos: ["Ouvir 3 palavras novas", "Repetir em voz alta", "Usar 1 numa frase"],
    planoB: "Ouvir só 1 palavra e repetir 3 vezes.",
    contextoLembrete: "Falar fixa mais que ler.",
    historico: {},
  }),
  praticalivro: () => ({
    id: novoIdHabito(),
    nome: "Prática do livro (10 min)",
    categoria: "Estudo",
    metaSemanal: 5,
    horario: "19:10",
    importancia: 2,
    diasAtivos: [1, 2, 3, 4, 5],
    microPassos: ["Abrir Estudo → Livros", "Responder 3 questões", "Aplicar 1 ideia hoje"],
    planoB: "Só 1 questão e pensar na resposta.",
    contextoLembrete: "Aprender na prática — sem precisar ler o capítulo.",
    historico: {},
  }),
  meditar: () => ({
    id: novoIdHabito(),
    nome: "Meditar 10 min",
    categoria: "Saúde",
    metaSemanal: 7,
    horario: "06:30",
    historico: {},
  }),
};

const ROTULOS_ATALHO = {
  agua: "Beber água",
  academia: "Academia",
  estudo: "Aprender 15 min",
  vocabulario: "Vocabulário 5 min",
  praticalivro: "Prática do livro",
  meditar: "Meditar 10 min",
};

function adicionarAtalho(tipo) {
  if (tipo === "agua" && habitos.some(ehHabitoAgua)) {
    mostrarFeedback("Água já está na agenda — marque os lembretes na aba Hoje.", "aviso");
    return;
  }

  const criar = ATALHOS_RAPIDOS[tipo];
  if (!criar) return;

  habitos.push(criar());
  limparFormularioHabito();
  salvar();
  desenhar();
  mostrarFeedback(`${ROTULOS_ATALHO[tipo] || "Hábito"} adicionado!`);
}

function avancarHabito(id) {
  const hoje = hojeStr();
  habitos = habitos.map((habito) => {
    if (habito.id !== id) return habito;
    const historico = { ...habito.historico };
    const total = passosTotal(habito);

    if (total > 1) {
      const atual = progressoNoDia(habito, hoje);
      if (atual >= total) {
        delete historico[hoje];
      } else {
        historico[hoje] = atual + 1;
      }
    } else if (historico[hoje] === true) {
      delete historico[hoje];
    } else {
      historico[hoje] = true;
    }

    return { ...habito, historico };
  });
  const habitoAtual = habitos.find((h) => h.id === id);
  if (habitoAtual && estaFeitoHoje(habitoAtual)) {
    registrarConclusao(habitoAtual);
  }
  salvar();
  desenhar();
}

function removerHabito(id) {
  habitos = habitos.filter((habito) => habito.id !== id);
  salvar();
  desenhar();
}

function renomearHabito(id, novoNome) {
  salvarHabitoEdicao(id, { nome: novoNome });
}

function salvarHabitoEdicao(id, { nome, metaSemanal, importancia, horario } = {}) {
  habitos = habitos.map((habito) => {
    if (habito.id !== id) return habito;
    const atualizado = { ...habito };
    if (typeof nome === "string" && nome.trim()) {
      atualizado.nome = nome.trim();
    }
    if (metaSemanal !== undefined) {
      atualizado.metaSemanal = normalizarMetaSemanal(metaSemanal);
    }
    if (importancia !== undefined) {
      atualizado.importancia = normalizarImportancia(importancia);
    }
    if (horario !== undefined) {
      const h = String(horario || "").trim();
      if (h && /^\d{2}:\d{2}$/.test(h)) atualizado.horario = h;
      else delete atualizado.horario;
    }
    return atualizado;
  });
  salvar();
  desenhar();
}

function reordenar(idOrigem, idDestino) {
  if (idOrigem === null || idOrigem === idDestino) return;
  const de = habitos.findIndex((h) => h.id === idOrigem);
  const para = habitos.findIndex((h) => h.id === idDestino);
  const [movido] = habitos.splice(de, 1);
  habitos.splice(para, 0, movido);
  salvar();
  desenhar();
}

function iniciarEdicao(habito, linha) {
  const form = document.createElement("div");
  form.className = "item-edicao";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "editar-nome";
  input.value = habito.nome;
  input.maxLength = 60;
  input.setAttribute("aria-label", "Nome do hábito");

  const rotuloMeta = document.createElement("label");
  rotuloMeta.className = "editar-meta-rotulo";
  rotuloMeta.textContent = "Na semana";

  const select = criarSelectMetaSemanal(habito.metaSemanal);

  const rotuloImp = document.createElement("label");
  rotuloImp.className = "editar-meta-rotulo";
  rotuloImp.textContent = "Importância";

  const selectImp = criarSelectImportancia(habito.importancia);

  const rotuloHora = document.createElement("label");
  rotuloHora.className = "editar-meta-rotulo";
  rotuloHora.textContent = "Horário";

  const inputHora = document.createElement("input");
  inputHora.type = "time";
  inputHora.className = "editar-horario campo-opcao";
  inputHora.value = habito.horario || "";
  inputHora.setAttribute("aria-label", "Horário do hábito");

  form.appendChild(input);
  form.appendChild(rotuloMeta);
  form.appendChild(select);
  form.appendChild(rotuloImp);
  form.appendChild(selectImp);
  form.appendChild(rotuloHora);
  form.appendChild(inputHora);

  const botaoSalvar = document.createElement("button");
  botaoSalvar.type = "button";
  botaoSalvar.className = "botao-secundario item-edicao-salvar";
  botaoSalvar.textContent = "Salvar";
  form.appendChild(botaoSalvar);

  let finalizado = false;
  function confirmar() {
    if (finalizado) return;
    finalizado = true;
    const novoNome = input.value.trim();
    if (novoNome) {
      salvarHabitoEdicao(habito.id, {
        nome: novoNome,
        metaSemanal: Number(select.value),
        importancia: Number(selectImp.value),
        horario: inputHora.value,
      });
      mostrarFeedback("Hábito atualizado.");
    } else {
      desenhar();
    }
  }

  botaoSalvar.addEventListener("click", confirmar);
  input.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") confirmar();
    if (evento.key === "Escape") {
      finalizado = true;
      desenhar();
    }
  });
  select.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") confirmar();
    if (evento.key === "Escape") {
      finalizado = true;
      desenhar();
    }
  });
  select.addEventListener("change", () => {
    mostrarFeedback("Frequência selecionada — toque Salvar.");
  });

  linha.replaceWith(form);
  input.focus();
  input.select();
}

function iniciarEdicaoMeta(habito, chip) {
  const select = criarSelectMetaSemanal(habito.metaSemanal, "meta-chip-select campo-opcao");
  let finalizado = false;

  function confirmar() {
    if (finalizado) return;
    finalizado = true;
    salvarHabitoEdicao(habito.id, { metaSemanal: Number(select.value) });
    mostrarFeedback("Frequência atualizada.");
  }

  select.addEventListener("change", confirmar);
  select.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      finalizado = true;
      desenhar();
    }
  });

  chip.replaceWith(select);
  if (typeof select.showPicker === "function") {
    try {
      select.showPicker();
    } catch {
      select.focus();
    }
  } else {
    select.focus();
  }
}

function impedirArrasteNoBotao(botao) {
  botao.type = "button";
  botao.addEventListener("mousedown", (evento) => evento.stopPropagation());
  botao.addEventListener("touchstart", (evento) => evento.stopPropagation(), { passive: true });
  botao.addEventListener("dragstart", (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
  });
}

// ============ EXPORTAR / IMPORTAR ============
function exportarDados() {
  flushNotasParaDisco();
  const dados = {
    versao: 7,
    habitos,
    notas,
    historicoNotas: carregarHistoricoCompleto(),
    neuroExplicacoes: carregarExplicacoesNeuro(),
    avisos,
    inbox: carregarInbox(),
    prioridades: carregarPrioridades(),
    revisao: carregarRevisaoNoturna(),
    cognitivo: carregarCognitivo(),
  };
  const blob = new Blob([JSON.stringify(dados, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "habitos-backup.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importarDados(evento) {
  const arquivo = evento.target.files[0];
  if (!arquivo) return;

  const leitor = new FileReader();
  leitor.onload = () => {
    try {
      const dados = JSON.parse(leitor.result);
      if (!Array.isArray(dados.habitos)) throw new Error("formato inválido");
      if (!confirm("Isso vai substituir seus dados atuais. Continuar?")) return;

      habitos = dados.habitos;
      notas = dados.notas || {};
      if (Array.isArray(dados.historicoNotas)) importarHistoricoNotas(dados.historicoNotas);
      if (dados.neuroExplicacoes && typeof dados.neuroExplicacoes === "object") {
        aplicarExplicacoesNeuro(dados.neuroExplicacoes);
      }
      if (Array.isArray(dados.inbox)) {
        localStorage.setItem("inbox-captura", JSON.stringify(dados.inbox));
      }
      if (dados.prioridades && typeof dados.prioridades === "object") {
        localStorage.setItem("prioridades-dia", JSON.stringify(dados.prioridades));
      }
      if (dados.revisao && typeof dados.revisao === "object") {
        localStorage.setItem("revisao-noturna", JSON.stringify(dados.revisao));
      }
      if (Array.isArray(dados.avisos)) {
        avisos = dados.avisos;
        salvarAvisosStorage(avisos);
      }
      if (dados.cognitivo && typeof dados.cognitivo === "object") {
        dadosCognitivo = resetSessaoCognitivoSeNovoDia({ ...carregarCognitivo(), ...dados.cognitivo }, hojeStr());
        salvarCognitivo(dadosCognitivo);
      }
      salvar();
      salvarNotas();
      carregarNotaHoje();
      carregarNotaDiario(dataInicialDiario());
      desenhar();
    } catch (erro) {
      alert("Arquivo inválido. Escolha um backup exportado por este app.");
    }
  };
  leitor.readAsText(arquivo);
  evento.target.value = ""; // permite importar o mesmo arquivo de novo
}

// ============ RENDERIZAÇÃO (desenhar na tela) ============
function atualizarResumo() {
  const total = habitos.length;
  const feitos = habitos.filter(estaFeitoHoje).length;
  contadorTotal.textContent = total;
  contadorFeitos.textContent = feitos;
  const porcentagem = total === 0 ? 0 : (feitos / total) * 100;
  barraProgresso.style.width = porcentagem + "%";
}

function desenharFiltros() {
  const categorias = [t("filtro.todas"), ...new Set(habitos.map((h) => h.categoria || t("categoria.geral")))];

  const filtroAtual =
    filtroCategoria === "Todas"
      ? t("filtro.todas")
      : filtroCategoria === "Geral"
        ? t("categoria.geral")
        : filtroCategoria;

  if (!categorias.includes(filtroAtual)) filtroCategoria = "Todas";

  filtros.innerHTML = "";
  filtros.style.display = habitos.length > 0 ? "flex" : "none";

  categorias.forEach((cat) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (filtroAtual === cat ? " ativo" : "");
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      if (cat === t("filtro.todas")) filtroCategoria = "Todas";
      else if (cat === t("categoria.geral")) filtroCategoria = "Geral";
      else filtroCategoria = cat;
      desenhar();
    });
    filtros.appendChild(chip);
  });
}

function calcularDadosGrafico7Dias() {
  const total = habitos.length;
  const dias = [];

  for (let i = 6; i >= 0; i--) {
    const dia = new Date();
    dia.setDate(dia.getDate() - i);
    const chave = chaveData(dia);
    const feitosNoDia = habitos.filter((h) => estaCompletoNoDia(h, chave)).length;
    const porcentagem = total === 0 ? 0 : (feitosNoDia / total) * 100;

    dias.push({
      porcentagem,
      rotulo: dia.toLocaleDateString(localeTag(), { weekday: "short" }).replace(".", ""),
      ehHoje: chave === hojeStr(),
    });
  }

  return dias;
}

function renderizarGraficoBarras(container, { compacto = false } = {}) {
  if (!container) return;

  const dias = calcularDadosGrafico7Dias();
  container.innerHTML = "";
  container.classList.toggle("grafico-compacto", compacto);

  dias.forEach((dia) => {
    const coluna = document.createElement("div");
    coluna.className = "grafico-coluna" + (dia.ehHoje ? " hoje" : "");

    const percentual = document.createElement("span");
    percentual.className = "grafico-percentual";
    percentual.textContent = Math.round(dia.porcentagem) + "%";

    const trilha = document.createElement("div");
    trilha.className = "grafico-trilha";
    const preenchimento = document.createElement("div");
    preenchimento.className = "grafico-preenchimento";
    preenchimento.style.height = dia.porcentagem + "%";
    trilha.appendChild(preenchimento);

    const rotulo = document.createElement("span");
    rotulo.className = "grafico-rotulo";
    rotulo.textContent = dia.rotulo;

    coluna.appendChild(percentual);
    coluna.appendChild(trilha);
    coluna.appendChild(rotulo);
    container.appendChild(coluna);
  });
}

function desenharGrafico() {
  renderizarGraficoBarras(graficoBarras);
  renderizarGraficoBarras(graficoHoje, { compacto: true });

  if (graficoMedia) {
    const dias = calcularDadosGrafico7Dias();
    const media = Math.round(
      dias.reduce((soma, dia) => soma + dia.porcentagem, 0) / dias.length
    );
    graficoMedia.textContent = habitos.length === 0 ? "—" : t("semana.grafico.media", { n: media });
  }
}

// Traduz uma porcentagem em um "nível" de cor (0 a 4)
function nivelPorPorcentagem(pct) {
  if (pct === 0) return 0;
  if (pct <= 33) return 1;
  if (pct <= 66) return 2;
  if (pct < 100) return 3;
  return 4;
}

function desenharCalendario() {
  calendarioGrade.innerHTML = "";
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const total = habitos.length;

  const primeiroDia = new Date(ano, mes, 1);
  const deslocamento = (primeiroDia.getDay() + 6) % 7; // quantas células vazias antes do dia 1
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  for (let i = 0; i < deslocamento; i++) {
    const vazia = document.createElement("div");
    vazia.className = "dia-cel vazia";
    calendarioGrade.appendChild(vazia);
  }

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const data = new Date(ano, mes, dia);
    const chave = chaveData(data);
    const cel = document.createElement("div");
    cel.className = "dia-cel";
    cel.textContent = dia;

    if (chaveData(data) === hojeStr()) cel.classList.add("hoje");

    if (data > hoje) {
      cel.classList.add("futuro");
    } else {
      const feitosNoDia = habitos.filter((h) => estaCompletoNoDia(h, chave)).length;
      const pct = total === 0 ? 0 : (feitosNoDia / total) * 100;
      cel.classList.add("nivel-" + nivelPorPorcentagem(pct));
    }

    calendarioGrade.appendChild(cel);
  }
}

function desenharMetasSemana() {
  listaMetasSemana.innerHTML = "";

  if (habitos.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "meta-vazia";
    vazio.textContent = t("semana.metas.vazio");
    listaMetasSemana.appendChild(vazio);
    return;
  }

  habitos.forEach((habito) => {
    const feitos = feitosNaSemana(habito);
    const alvo = habito.metaSemanal || 7;
    const pct = Math.min(100, (feitos / alvo) * 100);

    const item = document.createElement("div");
    item.className = "meta-item";

    const topo = document.createElement("div");
    topo.className = "meta-item-topo";

    const nome = document.createElement("span");
    nome.className = "meta-item-nome";
    nome.textContent = habito.nome;

    const valor = document.createElement("span");
    valor.className = "meta-item-valor";
    valor.textContent = `${feitos}/${alvo}`;

    topo.appendChild(nome);
    topo.appendChild(valor);

    const barraFundo = document.createElement("div");
    barraFundo.className = "barra-fundo";
    const barra = document.createElement("div");
    barra.className = "barra-progresso";
    barra.style.width = pct + "%";
    barraFundo.appendChild(barra);

    item.appendChild(topo);
    item.appendChild(barraFundo);
    listaMetasSemana.appendChild(item);
  });
}

function taxaConclusao30Dias() {
  if (habitos.length === 0) return 0;
  let possiveis = 0;
  let feitos = 0;
  const hoje = new Date();

  for (let i = 0; i < 30; i++) {
    const dia = new Date(hoje);
    dia.setDate(hoje.getDate() - i);
    const chave = chaveData(dia);
    possiveis += habitos.length;
    feitos += habitos.filter((h) => estaCompletoNoDia(h, chave)).length;
  }

  return possiveis === 0 ? 0 : Math.round((feitos / possiveis) * 100);
}

function calcularEstatisticasSemana() {
  const totalHabitos = habitos.length;
  if (totalHabitos === 0) {
    return { totalHabitos: 0 };
  }

  const dias = [];
  for (let i = 6; i >= 0; i--) {
    const dia = new Date();
    dia.setDate(dia.getDate() - i);
    const chave = chaveData(dia);
    const feitos = habitos.filter((h) => estaCompletoNoDia(h, chave)).length;
    const pct = Math.round((feitos / totalHabitos) * 100);
    dias.push({
      chave,
      pct,
      nome: dia.toLocaleDateString(localeTag(), { weekday: "long" }),
    });
  }

  const mediaConclusao = Math.round(
    dias.reduce((soma, d) => soma + d.pct, 0) / dias.length
  );

  const melhorDia = dias.reduce((a, b) => (b.pct > a.pct ? b : a), dias[0]);

  const categorias = {};
  habitos.forEach((h) => {
    const cat = h.categoria || "Geral";
    if (!categorias[cat]) categorias[cat] = { feitos: 0, possivel: 0 };
    for (let i = 0; i < 7; i++) {
      const dia = new Date();
      dia.setDate(dia.getDate() - i);
      const chave = chaveData(dia);
      categorias[cat].possivel++;
      if (estaCompletoNoDia(h, chave)) categorias[cat].feitos++;
    }
  });

  const listaCats = Object.entries(categorias).map(([nome, dados]) => ({
    nome,
    pct: dados.possivel
      ? Math.round((dados.feitos / dados.possivel) * 100)
      : 0,
  }));

  listaCats.sort((a, b) => b.pct - a.pct);
  const melhorCategoria = listaCats[0] || null;
  const fracaCategoria =
    listaCats.length > 1 ? listaCats[listaCats.length - 1] : null;

  let metasCumpridas = 0;
  const desempenhoHabitos = habitos.map((h) => {
    const feitos = feitosNaSemana(h);
    const alvo = h.metaSemanal || 7;
    if (feitos >= alvo) metasCumpridas++;
    return { nome: h.nome, pct: Math.round((feitos / alvo) * 100), feitos, alvo };
  });

  desempenhoHabitos.sort((a, b) => b.pct - a.pct);
  const habitoMaisForte =
    desempenhoHabitos[0] && desempenhoHabitos[0].feitos > 0
      ? desempenhoHabitos[0]
      : null;

  return {
    totalHabitos,
    mediaConclusao,
    melhorDia,
    melhorCategoria,
    fracaCategoria,
    metasCumpridas,
    metasTotal: habitos.length,
    habitoMaisForte,
  };
}

function desenharResumoSemana() {
  if (!resumoSemana) return;
  const stats = calcularEstatisticasSemana();
  resumoSemana.textContent = gerarResumoSemana(stats);
}

async function gerarPlanoSemanaIa() {
  if (!planoSemanaPainel) return;
  planoSemanaPainel.hidden = false;
  planoSemanaPainel.innerHTML = `<p class="plano-semana-carregando">${t("semana.plano.carregando")}</p>`;
  const stats = calcularEstatisticasSemana();
  const padroes = resumoPadroesParaIA(habitos);
  const resp = await pedirPlanoSemana(
    {
      feitosSemana: stats.feitosSemana,
      totalPossivel: stats.totalPossivel,
      taxa30: taxaConclusao30Dias(),
      streak: streakGlobal(),
      prioridades: prioridadesDoDia(hojeStr()).map(
        (id) => habitos.find((h) => h.id === id)?.nome || ""
      ),
    },
    padroes
  );
  if (!resp.ok) {
    planoSemanaPainel.innerHTML = `<p class="plano-semana-erro">${resp.erro || t("semana.plano.erro")}</p>`;
    return;
  }
  const linhas = (resp.linhas || []).map((l) => `<li>${l}</li>`).join("");
  planoSemanaPainel.innerHTML = `
    <div class="plano-semana-card">
      <p class="plano-semana-titulo">${resp.titulo || t("semana.plano.titulo.default")}</p>
      <ul class="plano-semana-lista">${linhas}</ul>
      ${resp.focoPrincipal ? `<p class="plano-semana-foco"><strong>${t("semana.plano.foco")}</strong> ${resp.focoPrincipal}</p>` : ""}
      ${resp.fraseMotivacao ? `<p class="plano-semana-motiv">${resp.fraseMotivacao}</p>` : ""}
      <p class="plano-semana-fonte">✨ IA</p>
    </div>`;
}

async function gerarResumoDiarioIa() {
  if (!diarioResumoPainel) return;
  const chave = garantirDataDiario();
  const texto = (notas[chave] || diarioTexto?.value || "").trim();
  const revisao = revisaoDoDia(chave);
  if (texto.length < 15) {
    mostrarFeedback("Escreva um pouco mais antes de organizar.", "aviso");
    return;
  }
  diarioResumoPainel.hidden = false;
  diarioResumoPainel.innerHTML = `<p class="diario-resumo-carregando">Organizando…</p>`;
  const resp = await pedirResumoDiario(texto, revisao);
  if (!resp.ok) {
    diarioResumoPainel.innerHTML = `<p class="diario-resumo-erro">${resp.erro || "IA indisponível."}</p>`;
    return;
  }
  const feito = (resp.feito || []).map((f) => `<li>${f}</li>`).join("");
  const pesou = (resp.pesou || []).map((p) => `<li>${p}</li>`).join("");
  diarioResumoPainel.innerHTML = `
    <div class="diario-resumo-card">
      <p class="diario-resumo-frase">${resp.fraseApoio || ""}</p>
      ${feito ? `<p class="diario-resumo-sec"><strong>Vale celebrar</strong></p><ul>${feito}</ul>` : ""}
      ${pesou ? `<p class="diario-resumo-sec"><strong>Ficou na cabeça</strong></p><ul>${pesou}</ul>` : ""}
      ${resp.amanha ? `<p class="diario-resumo-amanha"><strong>Amanhã:</strong> ${resp.amanha}</p>` : ""}
      <p class="diario-resumo-nota">Seu texto original não foi alterado.</p>
      <p class="diario-resumo-fonte">✨ IA</p>
    </div>`;
}

function tituloPainelAtual(nome) {
  const chaves = {
    rotina: "panel.rotina",
    emocional: "panel.emocional",
    hoje: "panel.hoje",
    memoria: "panel.memoria",
    guia: "panel.guia",
    cheguei: "panel.cheguei",
    estudo: "panel.estudo",
    semana: "panel.semana",
    diario: "panel.diario",
    insights: "panel.insights",
    ajustes: "panel.ajustes",
  };
  return t(chaves[nome] || "panel.default");
}

function aplicarIdiomaApp() {
  aplicarIdiomaHtml(document);
  if (tituloPainel) tituloPainel.textContent = tituloPainelAtual(painelAtivo);
  mostrarData();
  desenharRelogio();
  desenharMindosHoje();
  atualizarLembretesStatus();
  window.atualizarSyncIdioma?.();
  if (dataDiarioSelecionada) atualizarIndicadorSalvoDiario(dataDiarioSelecionada);
  atualizarInfoVersao();
  desenharPerfilAjustes();
}

function mudarIdioma(novo) {
  setLocale(novo);
  aplicarIdiomaApp();
  desenhar();
  mostrarFeedback(t("feedback.idioma"));
}

function processarParametrosUrl() {
  const params = new URLSearchParams(location.search);
  const painel = params.get("painel");
  if (painel && document.getElementById(`painel-${painel}`)) {
    ativarPainel(painel);
  }
}

function atualizarGuiaChamada() {
  if (!guiaChamada) return;
  guiaChamada.hidden = true;
  marcarGuiaVisto();
}

function desenharGuia() {
  if (!guiaRoot) return;
  guiaRoot.innerHTML = renderPainelGuia({
    iaAtiva: iaNeuroDisponivel(),
    demoIndice: guiaDemoIndice,
  });
}

function abrirChegueiDoApp({ opcoes = false, voltarGuia = false } = {}) {
  chegueiVeioDoGuia = voltarGuia;
  chegueiContexto = faixaDoDia() === "madrugada" ? "noite" : "chegada";
  if (!opcoes) {
    chegueiEstado = "inicio";
    chegueiExcluidos = [];
    chegueiMensagemFeito = "";
    chegueiFalaTexto = "";
    chegueiIaToken += 1;
  }
  ativarPainel("cheguei");
  if (opcoes) mostrarOpcoesCheguei();
}

function executarNavegacaoGuia({ painel, chegueiOpcoes, estudoAba, passoId, demo = false }) {
  if (passoId) marcarPassoGuia(passoId);
  marcarGuiaVisto();
  atualizarGuiaChamada();

  if (painel === "cheguei") {
    abrirChegueiDoApp({ opcoes: Boolean(chegueiOpcoes), voltarGuia: true });
    return;
  }

  chegueiVeioDoGuia = false;
  if (painel === "estudo" && estudoAba) {
    dadosEstudo = { ...dadosEstudo, abaAtiva: estudoAba };
    salvarEstudo(dadosEstudo);
  }
  ativarPainel(painel);

  if (demo && guiaDemoIndice != null) {
    const passo = passoDemoPorIndice(guiaDemoIndice);
    if (passo) {
      mostrarFeedback(t("feedback.demo.passo", { titulo: passo.titulo }), "ok");
    }
  }
}

function executarPassoDemo(indice) {
  const passo = passoDemoPorIndice(indice);
  if (!passo) return;
  guiaDemoIndice = indice;
  executarNavegacaoGuia({
    painel: passo.painel,
    chegueiOpcoes: passo.chegueiOpcoes,
    estudoAba: passo.estudoAba,
    passoId: passo.id,
    demo: true,
  });
}

function avancarDemoGuia() {
  if (guiaDemoIndice == null) return;
  const proximo = guiaDemoIndice + 1;
  if (proximo >= ROTEIRO_DEMO.length) {
    guiaDemoIndice = null;
    marcarGuiaVisto();
    ativarPainel("guia");
    mostrarFeedback(t("feedback.demo.fim"), "ok");
    return;
  }
  executarPassoDemo(proximo);
}

function atualizarSugestaoHabito() {
  const texto = entradaHabito.value.trim();
  if (!texto || texto.length < 3) {
    sugestaoAtual = null;
    if (sugestaoHabito) sugestaoHabito.hidden = true;
    return;
  }

  sugestaoAtual = sugerirHabito(texto);
  if (sugestaoTexto) sugestaoTexto.textContent = textoSugestao(sugestaoAtual);
  if (sugestaoHabito) sugestaoHabito.hidden = false;
}

function aplicarSugestaoHabito() {
  if (!sugestaoAtual) return;
  entradaCategoria.value = sugestaoAtual.categoria;
  entradaMeta.value = String(sugestaoAtual.metaSemanal);
  entradaHorario.value = sugestaoAtual.horario || "";
  if (sugestaoHabito) sugestaoHabito.hidden = true;

  if (sugestaoAtual.lembretes > 1 && detectarTextoAgua(entradaHabito.value)) {
    adicionarHabito();
  }
}

function carregarCamposRotina() {
  const salvo = carregarPerfilRotina();
  const padrao = textosPlanejadorRotina();
  if (rotinaPerfil) rotinaPerfil.value = salvo.perfil || padrao.perfil;
  if (rotinaHorarios) rotinaHorarios.value = salvo.horarios || padrao.horarios;
  if (rotinaObjetivos) rotinaObjetivos.value = salvo.objetivos || padrao.objetivos;
}

function salvarCamposRotina() {
  salvarPerfilRotina({
    perfil: rotinaPerfil?.value || "",
    horarios: rotinaHorarios?.value || "",
    objetivos: rotinaObjetivos?.value || "",
  });
}

function habitoJaExiste(nome) {
  const alvo = nome.toLowerCase();
  return habitos.some((h) => h.nome.toLowerCase() === alvo);
}

function renderizarRotinaGerada(resultado) {
  rotinaGerada = resultado;
  rotinaMensagem.textContent = resultado.mensagem;
  rotinaLista.innerHTML = "";

  if (!resultado.habitos.length) {
    rotinaResultado.hidden = true;
    return;
  }

  resultado.habitos.forEach((item, indice) => {
    const jaExiste = habitoJaExiste(item.nome);
    const label = document.createElement("label");
    label.className = "rotina-item" + (jaExiste ? " rotina-item-existente" : "");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "rotina-item-check";
    check.checked = !jaExiste;
    check.dataset.indice = String(indice);

    const corpo = document.createElement("div");
    corpo.className = "rotina-item-corpo";

    const topo = document.createElement("div");
    topo.className = "rotina-item-topo";

    const nome = document.createElement("span");
    nome.className = "rotina-item-nome";
    nome.textContent = item.nome;

    const hora = document.createElement("span");
    hora.className = "rotina-item-hora";
    hora.textContent = item.horario || "—";

    topo.appendChild(nome);
    topo.appendChild(hora);

    const meta = document.createElement("p");
    meta.className = "rotina-item-meta";
    meta.textContent =
      item.lembretes > 1
        ? `${item.categoria} · ${item.lembretes} lembretes/dia`
        : `${item.categoria} · ${item.metaSemanal === 7 ? "todo dia" : item.metaSemanal + "x/semana"}`;

    const motivo = document.createElement("p");
    motivo.className = "rotina-item-motivo";
    motivo.textContent = item.motivo;

    corpo.appendChild(topo);
    corpo.appendChild(meta);
    if (jaExiste) {
      const aviso = document.createElement("p");
      aviso.className = "rotina-item-aviso";
      aviso.textContent = "Já está na sua agenda";
      corpo.appendChild(aviso);
    }
    if (item.motivo) corpo.appendChild(motivo);

    label.appendChild(check);
    label.appendChild(corpo);
    rotinaLista.appendChild(label);
  });

  rotinaResultado.hidden = false;
  rotinaResultado.classList.add("rotina-resultado-revelado");
  rotinaResultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function executarGeracaoRotina() {
  salvarCamposRotina();

  const perfil = rotinaPerfil?.value.trim() || "";
  const horarios = rotinaHorarios?.value.trim() || "";
  const objetivos = rotinaObjetivos?.value.trim() || "";

  if (!botaoGerarRotina || !rotinaStatus) return;

  botaoGerarRotina.disabled = true;
  botaoGerarRotina.textContent = "Montando rotina…";
  rotinaStatus.textContent = "Organizando seus horários livres…";
  rotinaStatus.className = "rotina-status rotina-carregando";
  rotinaResultado?.classList.remove("rotina-resultado-revelado");

  try {
    const resultado = await gerarRotina({
      perfil,
      horarios,
      objetivos,
      habitosExistentes: habitos,
    });

    if (!resultado.habitos.length) {
      rotinaResultado.hidden = true;
      rotinaStatus.textContent = resultado.mensagem;
      rotinaStatus.className = "rotina-status rotina-erro";
      return;
    }

    renderizarRotinaGerada(resultado);
    const novos = resultado.habitos.filter((h) => !habitoJaExiste(h.nome)).length;
    rotinaStatus.textContent =
      novos > 0
        ? `Pronto! ${resultado.habitos.length} hábitos sugeridos (${novos} novos). Toque em "Adicionar selecionados" abaixo.`
        : `Pronto! ${resultado.habitos.length} sugeridos — todos já estão na agenda. Marque "Substituir" para trocar.`;
    rotinaStatus.className = "rotina-status rotina-ok";
  } catch (erro) {
    rotinaStatus.textContent = erro.message || "Erro ao gerar rotina.";
    rotinaStatus.className = "rotina-status rotina-erro";
  } finally {
    botaoGerarRotina.disabled = false;
    botaoGerarRotina.textContent = "Montar rotina completa";
  }
}

function aplicarRotinaGerada() {
  if (!rotinaGerada) return;

  const selecionados = [];
  rotinaLista.querySelectorAll(".rotina-item-check:checked").forEach((el) => {
    const item = rotinaGerada.habitos[Number(el.dataset.indice)];
    if (item) selecionados.push(item);
  });

  if (selecionados.length === 0) {
    rotinaStatus.textContent = "Selecione pelo menos um hábito.";
    rotinaStatus.className = "rotina-status rotina-erro";
    return;
  }

  if (rotinaSubstituir?.checked) {
    habitos = [];
  }

  const baseId = novoIdHabito();
  let adicionados = 0;
  let ignorados = 0;

  selecionados.forEach((item, i) => {
    if (habitoJaExiste(item.nome)) {
      ignorados++;
      return;
    }

    const habito = {
      id: baseId + i,
      nome: item.nome,
      categoria: item.categoria,
      metaSemanal: item.metaSemanal,
      horario: item.horario || "",
      historico: {},
    };
    if (item.lembretes > 1) habito.lembretes = item.lembretes;
    if (item.horariosLembretes?.length) habito.horariosLembretes = item.horariosLembretes;
    if (item.importancia) habito.importancia = item.importancia;
    if (item.microPassos?.length) habito.microPassos = item.microPassos;
    if (item.motivo && !habito.contextoLembrete) habito.contextoLembrete = item.motivo;
    habitos.push(habito);
    adicionados++;
  });

  if (adicionados === 0) {
    rotinaStatus.textContent =
      ignorados > 0
        ? "Esses hábitos já estão na agenda."
        : "Nenhum hábito novo para adicionar.";
    rotinaStatus.className = "rotina-status rotina-erro";
    return;
  }

  habitos = migrarHabitosAgua(habitos, hojeStr());
  salvar();
  desenhar();
  ativarPainel("hoje");
  rotinaStatus.textContent = `${adicionados} hábito(s) adicionados! Veja na aba Hoje.`;
  rotinaStatus.className = "rotina-status rotina-ok";
  mostrarFeedback(`${adicionados} hábito(s) da rotina adicionados!`);
  fecharDicaInicio();
}

async function montarEAdicionarRotina() {
  await executarGeracaoRotina();
  if (!rotinaGerada?.habitos?.length) return;

  rotinaLista.querySelectorAll(".rotina-item-check").forEach((el) => {
    const item = rotinaGerada.habitos[Number(el.dataset.indice)];
    el.checked = Boolean(item && !habitoJaExiste(item.nome));
  });

  aplicarRotinaGerada();
}

function fecharDicaInicio() {
  if (!dicaInicio) return;
  dicaInicio.hidden = true;
  localStorage.setItem("dica-inicio-vista", "1");
}

function mostrarDicaInicio() {
  if (!dicaInicio) return;
  dicaInicio.hidden = true;
  localStorage.setItem("dica-inicio-vista", "1");
}

function atualizarInfoVersao() {
  if (!infoVersao) return;
  const host = hostAtual();
  const rotulo =
    host === "vercel" ? " · Vercel" : host === "github" ? " · GitHub" : host === "local" ? " · local" : " · online";
  infoVersao.textContent = t("ajustes.versao", { v: APP_VERSION, host: rotulo });
}

async function buscarAtualizacaoApp() {
  if (typeof window.forcarAtualizacaoApp === "function") {
    mostrarFeedback(t("ajustes.buscando"));
    await window.forcarAtualizacaoApp();
    return;
  }
  const u = new URL(location.href);
  u.searchParams.set("v", APP_VERSION);
  u.searchParams.set("t", Date.now());
  location.replace(u.toString());
}

function desenharCardsInsights() {
  const streak = streakGlobal();
  const feitosHoje = habitos.filter(estaFeitoHoje).length;
  const total = habitos.length;
  const taxa = taxaConclusao30Dias();
  const melhorRecorde = habitos.reduce((max, h) => Math.max(max, calcularRecorde(h)), 0);
  const apoioStreak = mensagemStreakGlobal(streak);

  cardsInsights.innerHTML = `
    <article class="card-insight">
      <p class="card-insight-rotulo">${t("insights.card.sequencia")}</p>
      <p class="card-insight-valor">${streak}</p>
      <p class="card-insight-apoio">${rotuloStreakInsights(streak)}</p>
      <p class="card-insight-extra">${apoioStreak}</p>
    </article>
    <article class="card-insight">
      <p class="card-insight-rotulo">${t("insights.card.hoje")}</p>
      <p class="card-insight-valor">${feitosHoje}/${total}</p>
      <p class="card-insight-apoio">${t("insights.card.compromissos")}</p>
    </article>
    <article class="card-insight">
      <p class="card-insight-rotulo">${t("insights.card.30dias")}</p>
      <p class="card-insight-valor">${taxa}%</p>
      <p class="card-insight-apoio">${t("insights.card.taxa")}</p>
    </article>
    <article class="card-insight">
      <p class="card-insight-rotulo">${t("insights.card.recorde")}</p>
      <p class="card-insight-valor">${melhorRecorde}</p>
      <p class="card-insight-apoio">${t("insights.card.melhor")}</p>
    </article>`;
}

function ativarPainel(nome) {
  if (painelAtivo === "diario" && nome !== "diario") {
    persistirNotaDiarioAtual();
  }
  if (painelAtivo === "hoje" && nome !== "hoje") {
    persistirNotaHojeAtual();
  }

  painelAtivo = nome;

  const navDestaque = (() => {
    if (nome === "hoje") return "hoje";
    if (nome === "memoria") return "memoria";
    if (nome === "ajustes" || nome === "cheguei" || nome === "guia") return null;
    return "memoria";
  })();

  document.querySelectorAll(".nav-gps .nav-item").forEach((botao) => {
    const ativo = navDestaque !== null && botao.dataset.painel === navDestaque;
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-current", ativo ? "page" : "false");
    if (ativo) botao.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  });
  botaoAjustes?.classList.toggle("ativo", nome === "ajustes");

  document.querySelectorAll(".painel").forEach((painel) => {
    const ativo = painel.id === `painel-${nome}`;
    painel.hidden = !ativo;
    painel.classList.toggle("ativo", ativo);
  });

  const titulos = {
    rotina: tituloPainelAtual("rotina"),
    emocional: tituloPainelAtual("emocional"),
    hoje: tituloPainelAtual("hoje"),
    memoria: tituloPainelAtual("memoria"),
    guia: tituloPainelAtual("guia"),
    cheguei: tituloPainelAtual("cheguei"),
    estudo: tituloPainelAtual("estudo"),
    semana: tituloPainelAtual("semana"),
    diario: tituloPainelAtual("diario"),
    insights: tituloPainelAtual("insights"),
    ajustes: tituloPainelAtual("ajustes"),
  };
  if (tituloPainel) tituloPainel.textContent = titulos[nome] || t("panel.default");

  if (chegueiVoltarGuia) {
    chegueiVoltarGuia.hidden = nome !== "cheguei" || !chegueiVeioDoGuia;
  }

  if (nome === "memoria") {
    desenharMemoriaHub();
  }
  if (nome === "rotina") {
    carregarCamposRotina();
  }
  if (nome === "emocional") {
    desenharMindosEmocional();
  }
  if (nome === "estudo") {
    desenharPainelEstudo();
  }
  if (nome === "guia") {
    desenharGuia();
  }
  if (nome === "cheguei") {
    desenharCheguei();
  }
  if (nome === "diario") {
    restaurarNotasPerdidas();
    carregarNotaDiario(dataInicialDiario());
  }
}

function ordenarPorHorario(lista) {
  return [...lista].sort((a, b) => {
    if (a.horario && b.horario) return a.horario.localeCompare(b.horario);
    if (a.horario) return -1;
    if (b.horario) return 1;
    return 0;
  });
}

function ciclarImportancia(habitoId) {
  habitos = habitos.map((h) => {
    if (h.id !== habitoId) return h;
    const atual = normalizarImportancia(h.importancia);
    return { ...h, importancia: atual >= 3 ? 1 : atual + 1 };
  });
  salvar();
  desenhar();
}

function alternarMicroPasso(habitoId, indice) {
  const chave = hojeStr();
  habitos = habitos.map((habito) => {
    if (habito.id !== habitoId) return habito;
    const microHistorico = { ...(habito.microHistorico || {}) };
    const feitos = [...(microHistorico[chave] || [])];
    const pos = feitos.indexOf(indice);
    if (pos >= 0) feitos.splice(pos, 1);
    else feitos.push(indice);
    microHistorico[chave] = feitos.sort((a, b) => a - b);
    return { ...habito, microHistorico };
  });
  salvar();
  desenhar();
}

function horariosParaLembrete(habito) {
  const extras = horariosLembretes(habito);
  if (extras.length) return extras;
  return habito.horario ? [habito.horario] : [];
}

function rodarLembretes() {
  const chave = hojeStr();
  verificarLembretes(habitos, chave, {
    estaPendente: (h) => ehAtivoHoje(h) && !estaFeitoHoje(h),
    horariosDoHabito: horariosParaLembrete,
  });
  verificarAvisosAgenda(avisos, chave);
  sincronizarLembretesSW();
}

function atualizarLembretesStatus() {
  if (!lembretesStatus) return;
  if (!("Notification" in window)) {
    lembretesStatus.textContent = t("lembretes.status.indisponivel");
    return;
  }
  if (lembretesAtivos() && Notification.permission === "granted") {
    lembretesStatus.textContent = t("lembretes.status.ativo");
  } else if (Notification.permission === "denied") {
    lembretesStatus.textContent = t("lembretes.status.bloqueado");
  } else {
    lembretesStatus.textContent = t("lembretes.status.off");
  }
}

async function ativarLembretes() {
  const resultado = await pedirPermissaoLembretes();
  atualizarLembretesStatus();
  mostrarFeedback(resultado.mensagem, resultado.ok ? "ok" : "aviso");
  rodarLembretes();
}

function carregarRevisaoCampos() {
  const dados = revisaoDoDia(hojeStr());
  if (revisaoFeito) revisaoFeito.value = dados.feito;
  if (revisaoFicou) revisaoFicou.value = dados.ficou;
  if (revisaoAmanha) revisaoAmanha.value = dados.amanha;
}

function desenharRevisao() {
  carregarRevisaoCampos();
}

function proximoCompromisso() {
  const chave = hojeStr();
  const sugestao = sugestaoAgora(habitos, chave, {
    estaPendente: (h) => !estaFeitoHoje(h),
    ordenarPorHorario,
    prioridades: prioridadesDoDia(chave),
  });
  return sugestao?.habito || null;
}

function irParaHabito(id) {
  const item = document.querySelector(`.item-habito[data-habito-id="${id}"]`);
  if (!item) return;
  item.scrollIntoView({ behavior: "smooth", block: "center" });
  item.classList.add("item-destaque");
  setTimeout(() => item.classList.remove("item-destaque"), 1800);
}

function alternarFocoHabito(habitoId) {
  sincronizarPrioridadesOrfas(habitos, hojeStr());
  const resultado = alternarPrioridade(hojeStr(), habitoId, carregarPrioridades(), habitos);
  if (!resultado.ok) {
    mostrarFeedback(resultado.mensagem, "aviso");
    return;
  }
  desenhar();
  mostrarFeedback(resultado.mensagem);
}

function capturarInbox() {
  const texto = entradaInbox?.value || "";
  const item = adicionarInbox(texto);
  if (!item) return;
  if (entradaInbox) entradaInbox.value = "";
  desenharInbox();
  mostrarFeedback("Anotado na inbox — organize quando puder.");
}

function arquivarInbox() {
  const resultado = arquivarInboxCompleta();
  if (!resultado.ok) {
    mostrarFeedback(resultado.mensagem, "aviso");
    return;
  }
  desenharInbox();
  mostrarFeedback(resultado.mensagem);
}

function atualizarTimerUI(segundos) {
  const texto = formatarTimer(segundos);
  const el = document.getElementById("agora-timer-valor");
  if (el) el.textContent = texto;
  const mindosEl = mindosRoot?.querySelector(".mindos-timer-valor");
  if (mindosEl) mindosEl.textContent = texto;
  const northTimer = document.getElementById("north-focus-timer");
  if (northTimer) northTimer.textContent = texto;
  const barFill = northFocusEl?.querySelector(".north-focus-bar-fill");
  if (barFill && northFocusAtivo?.segundos) {
    const pct = Math.max(0, Math.min(100, (1 - segundos / northFocusAtivo.segundos) * 100));
    barFill.style.width = `${pct}%`;
  }
}

function comecarTimer(segundos, habito, rotulo) {
  const passos = listaMicroPassos(habito);
  const primeiroPasso = passos[0];
  iniciarTimer(
    segundos,
    { habitoId: habito.id, nome: habito.nome, rotulo },
    { onTick: atualizarTimerUI, onFim: onTimerFim }
  );
  desenharMindosHoje();
  desenharAgora();
  const dica =
    segundos <= 30
      ? primeiroPasso
        ? `Só abrir: "${primeiroPasso}"`
        : "Só 30 segundos para começar."
      : primeiroPasso
        ? `Só: "${primeiroPasso}" — ${rotulo}.`
        : `${rotulo}. Sem precisar terminar.`;
  mostrarFeedback(dica);
}

function comecar2minutos(habito) {
  comecarTimer(120, habito, "2 minutos");
}

function comecarCronometro(habito) {
  iniciarCronometro(
    { habitoId: habito.id, nome: habito.nome },
    { onTick: atualizarTimerUI }
  );
  desenharMindosHoje();
  desenharAgora();
  mostrarFeedback("Cronômetro ligado — veja quanto tempo passa.");
}

function onTimerFim(meta) {
  if (northFocusAtivo && !northFocusEl?.hidden) {
    finalizarNorthFocus(false);
    return;
  }
  if (lembretesAtivos() && Notification.permission === "granted") {
    try {
      new Notification(meta?.rotulo || "Tempo!", {
        body: meta?.nome
          ? `Como foi com "${meta.nome}"? Marque um passo ou continue.`
          : "Um passo já conta.",
        tag: "timer-foco",
        icon: "icon-192.png",
      });
    } catch {
      /* silencioso */
    }
  }
  mostrarFeedback("Tempo! Marque um passo ou continue — já vale.");
  desenharMindosHoje();
  desenharAgora();
  if (meta?.habitoId) irParaHabito(meta.habitoId);
}

function onTimer2minFim(meta) {
  onTimerFim(meta);
}

function desenharRelogio() {
  if (relogioAtual) relogioAtual.textContent = horaFormatada();

  if (!countdownProximo) return;

  const prox = proximoHorarioPendente(habitos, {
    estaPendente: (h) => ehAtivoHoje(h) && !estaFeitoHoje(h),
    horariosDoHabito: horariosParaLembrete,
  });

  if (!prox) {
    countdownProximo.textContent = "";
    return;
  }

  const min = minutosAte(prox.horario);
  const texto = textoCountdown(min);
  if (texto === "passou") {
    countdownProximo.textContent = "";
    return;
  }
  if (min != null && min <= 10 && min > 0) {
    countdownProximo.textContent = t("hoje.relogio.em.min", { nome: prox.habito.nome, min });
    return;
  }
  countdownProximo.textContent = t("hoje.relogio.proximo", {
    nome: prox.habito.nome,
    countdown: texto,
  });
}

function obterSugestaoAgora() {
  const chave = hojeStr();
  const pendente = (h) => ehAtivoHoje(h) && !estaFeitoHoje(h);

  if (ehHorarioDificil()) {
    const tarde = sugestaoTarde(habitos, {
      estaPendente: pendente,
      detectarEstudo: detectarHabitoAprender,
    });
    if (tarde) return tarde;
  }

  return sugestaoAgora(habitos, chave, {
    estaPendente: pendente,
    ordenarPorHorario,
    prioridades: prioridadesDoDia(chave),
  });
}

function mostrarPlanoBAgora(habito) {
  if (!habito) return;
  agoraTraveiHabitoId = habito.id;
  desenharAgora();
  document.getElementById("bloco-agora")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function fecharPlanoBAgora() {
  agoraTraveiHabitoId = null;
  desenharAgora();
}

function desenharMemoriaHub() {
  if (!northMemoriaRoot) return;
  northMemoriaRoot.innerHTML = htmlMemoriaHub();
}

function fecharNorthFocus() {
  if (!northFocusEl) return;
  northFocusEl.hidden = true;
  northFocusEl.innerHTML = "";
  document.body.classList.remove("north-focus-aberto");
}

function entrarNorthFocus({ titulo, segundos, habitoId, cognitivoBlocoId, virtual = false }) {
  northFocusAtivo = { titulo, segundos, habitoId, cognitivoBlocoId, virtual };
  if (!northFocusEl) return;
  northFocusEl.hidden = false;
  northFocusEl.innerHTML = htmlNorthFocus({ titulo, timerTexto: formatarTimer(segundos) });
  document.body.classList.add("north-focus-aberto");
  const hab = habitoId
    ? habitos.find((h) => String(h.id) === String(habitoId)) || { id: habitoId, nome: titulo, microPassos: [] }
    : { id: 0, nome: titulo, microPassos: [] };
  comecarTimer(segundos, hab, `${Math.round(segundos / 60)} min`);
}

function finalizarNorthFocus(manual = true) {
  cancelarTimer();
  pararCronometro();
  const meta = northFocusAtivo;
  fecharNorthFocus();

  if (meta?.habitoId && !meta?.virtual) {
    avancarHabito(meta.habitoId);
  }

  northFocusAtivo = null;
  northSessaoFeita = true;
  if (northCaminhoAtual?.tipo) {
    aprenderRegistrarDesfecho({
      tipo: northCaminhoAtual.tipo,
      faixa: northCaminhoAtual.faixa,
      concluiu: true,
    });
  }
  if (painelAtivo === "hoje") desenharMindosHoje();
  if (manual) mostrarFeedback(t("north.feito"));
}

function iniciarNorthComecar(btn) {
  const val = btn.dataset.northComecar || "";
  const foco = obterSugestaoAgora();

  if (northCaminhoAtual?.tipo) {
    aprenderRegistrarCaminho({
      tipo: northCaminhoAtual.tipo,
      faixa: northCaminhoAtual.faixa,
      comecou: true,
    });
  }

  if (val.startsWith("cognitivo:")) {
    const blocoId = val.split(":")[1];
    ativarPainel("estudo");
    renderizarSessaoCognitiva(blocoId);
    return;
  }

  const minutos = parseInt(btn.dataset.northMinutos, 10) || parseMinutos(foco?.habito?.nome) || 25;
  const titulo =
    foco?.habito?.nome?.replace(/\(\d+\s*min\)/i, "").trim() || t("north.foco.modo");

  if (val === "virtual") {
    entrarNorthFocus({ titulo, segundos: minutos * 60, virtual: true });
    return;
  }

  const hab = habitos.find((h) => String(h.id) === String(val)) || foco?.habito;
  entrarNorthFocus({
    titulo: hab?.nome?.replace(/\(\d+\s*min\)/i, "").trim() || titulo,
    segundos: minutos * 60,
    habitoId: hab?.id,
    virtual: !hab?.id,
  });
}

function ligarNorthFocus() {
  if (northFocusLigado) return;
  northFocusLigado = true;
  document.addEventListener("click", (evento) => {
    if (evento.target.closest("[data-north-focus-finalizar]")) {
      evento.preventDefault();
      finalizarNorthFocus(true);
      return;
    }
    if (evento.target.closest("[data-north-focus-pausar]")) {
      evento.preventDefault();
      cancelarTimer();
      fecharNorthFocus();
      northFocusAtivo = null;
      desenharMindosHoje();
    }
  });
}

let emocionalLigado = false;
function ligarEmocional() {
  if (emocionalLigado) return;
  emocionalLigado = true;
  document.addEventListener("click", (evento) => {
    const btn = evento.target.closest("[data-emocional-praticar]");
    if (!btn) return;
    evento.preventDefault();
    const eixo = btn.dataset.emocionalEixo;
    const id = btn.dataset.emocionalId;
    registrarPraticaEmocional(eixo, id);
    mostrarFeedback(t("emocional.feito"));
    if (painelAtivo === "emocional") desenharMindosEmocional();
    else if (painelAtivo === "hoje") desenharMindosHoje();
    else if (painelAtivo === "rotina") desenharMindosRotina();
  });
}

function ligarMemoriaHub() {
  if (!northMemoriaRoot || northMemoriaRoot.dataset.ligado) return;
  northMemoriaRoot.dataset.ligado = "1";
  northMemoriaRoot.addEventListener("click", (evento) => {
    const card = evento.target.closest("[data-memoria-painel]");
    if (!card) return;
    ativarPainel(card.dataset.memoriaPainel);
  });
}

function ligarMindosHoje() {
  if (!mindosRoot || mindosLigado) return;
  mindosLigado = true;
  mindosRoot.addEventListener("click", (evento) => {
    const northEstado = evento.target.closest("button[data-north-estado]");
    if (northEstado) {
      const novoEstado = northEstado.dataset.northEstado;
      const anterior = carregarEstadoMental();
      const faixa = faixaDoDia();
      if (anterior && anterior !== novoEstado) {
        aprenderRegistrarTroca({ faixa });
      }
      salvarEstadoMental(novoEstado);
      aprenderRegistrarEstado({ estado: novoEstado, faixa, diaSemana: new Date().getDay() });
      northSessaoFeita = false;
      desenharMindosHoje();
      return;
    }

    if (evento.target.closest("[data-north-continuar]")) {
      northSessaoFeita = false;
      desenharMindosHoje();
      return;
    }

    if (evento.target.closest("[data-north-encerrar]")) {
      if (northCaminhoAtual?.tipo) {
        aprenderRegistrarDesfecho({
          tipo: northCaminhoAtual.tipo,
          faixa: northCaminhoAtual.faixa,
          concluiu: false,
        });
      }
      northSessaoFeita = false;
      limparEstadoMental();
      desenharMindosHoje();
      return;
    }

    const comecarNorth = evento.target.closest("[data-north-comecar]");
    if (comecarNorth) {
      iniciarNorthComecar(comecarNorth);
      return;
    }

    if (evento.target.closest("[data-mindos-parar]")) {
      cancelarTimer();
      pararCronometro();
      fecharNorthFocus();
      northFocusAtivo = null;
      desenharMindosHoje();
      mostrarFeedback(t("agora.parar") + ".");
    }
  });
}

function desenharMindosHoje() {
  if (!mindosRoot) return;

  const chave = hojeStr();
  const pendente = (h) => ehAtivoHoje(h) && !estaFeitoHoje(h);
  const foco = obterSugestaoAgora();
  const depois = obterDepois(habitos, foco, {
    estaPendente: pendente,
    ordenarPorHorario,
    prioridades: prioridadesDoDia(chave),
  });

  const ativoTimer = timerAtivo() || cronometroAtivo();
  const timerTexto = ativoTimer
    ? formatarTimer(cronometroAtivo() ? segundosCronometro() : segundosRestantesTimer())
    : "";

  const caminho = calcularCaminhoNorth({
    estadoMental: carregarEstadoMental(),
    perfil: carregarPerfil(),
    passoCognitivo: obterPassoCognitivoAtual(),
    focoNome: foco?.habito?.nome || "",
    historico: resumoAprende(),
  });
  northCaminhoAtual = caminho;

  mindosRoot.innerHTML = htmlNorthHome({
    foco,
    depois,
    timerAtivo: ativoTimer,
    timerTexto,
    estadoMental: carregarEstadoMental(),
    passoCognitivo: obterPassoCognitivoAtual(),
    concluido: northSessaoFeita,
    caminho,
  });
}

function desenharMindosRotina() {
  if (!mindosRotinaRoot) return;
  const foco = obterSugestaoAgora();
  mindosRotinaRoot.innerHTML = htmlMindosRotina(
    calcularCaminhoNorth({
      estadoMental: carregarEstadoMental(),
      perfil: carregarPerfil(),
      passoCognitivo: obterPassoCognitivoAtual(),
      focoNome: foco?.habito?.nome || "",
      historico: resumoAprende(),
    })
  );
}

function desenharMindosEmocional() {
  if (!mindosEmocionalRoot) return;
  mindosEmocionalRoot.innerHTML = htmlMindosEmocional(carregarEstadoMental());
}

function desenharMindosSemana() {
  if (!mindosSemanaRoot) return;
  let feitosSemana = 0;
  for (let i = 0; i < 7; i++) {
    const dia = new Date();
    dia.setDate(dia.getDate() - i);
    const chave = chaveData(dia);
    feitosSemana += habitos.filter((h) => estaCompletoNoDia(h, chave)).length;
  }
  const totalPossivel = Math.max(habitos.length * 7, feitosSemana);
  const foco = obterSugestaoAgora();
  mindosSemanaRoot.innerHTML = htmlMindosSemana({
    tema: carregarTemaSemana(),
    feitosSemana,
    totalPossivel,
    focoNome: foco?.habito?.nome || "",
    cognitivoResumo: resumoSemanalCognitivo(dadosCognitivo),
  });
}

function desenharMindosInsights() {
  if (!mindosInsightsRoot) return;
  const streak = streakGlobal();
  let feitosSemana = 0;
  for (let i = 0; i < 7; i++) {
    const dia = new Date();
    dia.setDate(dia.getDate() - i);
    feitosSemana += habitos.filter((h) => estaCompletoNoDia(h, chaveData(dia))).length;
  }
  mindosInsightsRoot.innerHTML = htmlMindosInsights({
    mensagem: mensagemStreakGlobal(streak),
    feitosSemana,
    streakRotulo: rotuloStreakInsights(streak),
  });
}

function sincronizarObjetivoCognitivoInbox() {
  if (dadosCognitivo.objetivo) return;
  const obj = extrairObjetivoInbox(carregarInbox());
  if (obj) {
    dadosCognitivo = definirObjetivoCognitivo(dadosCognitivo, obj);
    salvarCognitivo(dadosCognitivo);
  }
}

function obterPassoCognitivoAtual() {
  dadosCognitivo = resetSessaoCognitivoSeNovoDia(dadosCognitivo, hojeStr());
  return proximoPassoCognitivo(dadosCognitivo);
}

function htmlCognitivoParaAgora() {
  if (!sessaoCognitivaPendente(dadosCognitivo)) return "";
  const passo = obterPassoCognitivoAtual();
  if (passo.tipo !== "acao") return "";
  return htmlCognitivoAgora(passo);
}

function desenharMindosCognitivo() {
  if (!mindosCognitivoRoot) return;
  dadosCognitivo = resetSessaoCognitivoSeNovoDia(dadosCognitivo, hojeStr());
  const passo = proximoPassoCognitivo(dadosCognitivo);
  mindosCognitivoRoot.innerHTML =
    htmlMindosCognitivo(passo, dadosCognitivo) + htmlCognitivoMetricas(dadosCognitivo);
}

function renderizarSessaoCognitiva(blocoId) {
  if (!cognitivoSessaoRoot) return;
  dadosCognitivo = iniciarBlocoCognitivo(dadosCognitivo, blocoId);
  salvarCognitivo(dadosCognitivo);
  const passo = proximoPassoCognitivo(dadosCognitivo);
  cognitivoSessaoRoot.hidden = false;
  cognitivoSessaoRoot.innerHTML = htmlCognitivoSessao(passo, dadosCognitivo);
  cognitivoSessaoRoot.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function fecharSessaoCognitivaUI() {
  if (cognitivoSessaoRoot) {
    cognitivoSessaoRoot.hidden = true;
    cognitivoSessaoRoot.innerHTML = "";
  }
}

function finalizarBlocoCognitivo(blocoId, extra = {}) {
  if (extra.acertos != null && extra.total != null) {
    dadosCognitivo = registrarDesempenhoBloco(dadosCognitivo, blocoId, extra.acertos, extra.total);
  }
  if (blocoId === "explicacao" && extra.tituloConhecimento && extra.textoExplicacao) {
    dadosCognitivo = salvarConhecimentoCognitivo(dadosCognitivo, {
      titulo: extra.tituloConhecimento,
      conteudo: extra.textoExplicacao,
      perguntas: [`O que é ${extra.tituloConhecimento}?`],
    });
  }
  if (blocoId === "reflexao" && extra.reflexao) {
    const linhas = Object.values(extra.reflexao).filter(Boolean).join("\n");
    if (linhas.trim()) salvarRascunhoBloco(dadosCognitivo, "reflexao", linhas);
  }
  dadosCognitivo = concluirBlocoCognitivo(dadosCognitivo, blocoId);
  salvarCognitivo(dadosCognitivo);
  fecharSessaoCognitivaUI();
  desenharMindosCognitivo();
  desenharMindosHoje();
  desenharMindosSemana();
  mostrarFeedback(t("cognitivo.bloco.concluir") + " ✓");
}

function ligarCognitivo() {
  if (cognitivoLigado) return;
  cognitivoLigado = true;

  document.addEventListener("click", (evento) => {
    const comecar = evento.target.closest("[data-cognitivo-comecar]");
    if (comecar) {
      evento.preventDefault();
      ativarPainel("estudo");
      renderizarSessaoCognitiva(comecar.dataset.cognitivoComecar);
      return;
    }

    const okBloco = evento.target.closest("[data-cognitivo-bloco-ok]");
    if (okBloco) {
      const blocoId = okBloco.dataset.cognitivoBlocoOk;
      const root = cognitivoSessaoRoot;
      let extra = {};
      if (blocoId === "aprendizagem") {
        const txt = root?.querySelector("[data-cognitivo-rascunho='aprendizagem']")?.value || "";
        salvarRascunhoBloco(dadosCognitivo, "aprendizagem", txt);
      }
      if (blocoId === "explicacao") {
        extra.textoExplicacao = root?.querySelector("[data-cognitivo-rascunho='explicacao']")?.value || "";
        extra.tituloConhecimento = root?.querySelector("[data-cognitivo-conhecimento-titulo]")?.value || "";
      }
      finalizarBlocoCognitivo(blocoId, extra);
    }
  });

  document.addEventListener("submit", (evento) => {
    const formObj = evento.target.closest("[data-cognitivo-objetivo]");
    if (formObj) {
      evento.preventDefault();
      const objetivo = formObj.objetivo?.value || "";
      const area = formObj.area?.value || dadosCognitivo.areaFoco;
      dadosCognitivo = definirObjetivoCognitivo(dadosCognitivo, objetivo);
      dadosCognitivo.areaFoco = area;
      salvarCognitivo(dadosCognitivo);
      desenharMindosCognitivo();
      desenharMindosHoje();
      mostrarFeedback(t("cognitivo.objetivo.salvar") + " ✓");
      return;
    }

    const formBloco = evento.target.closest("[data-cognitivo-bloco]");
    if (!formBloco || !cognitivoSessaoRoot?.contains(formBloco)) return;
    evento.preventDefault();
    const blocoId = formBloco.dataset.cognitivoBloco;

    if (blocoId === "raciocinio") {
      const { acertos, total } = processarFormRaciocinio(formBloco);
      finalizarBlocoCognitivo("raciocinio", { acertos, total });
      return;
    }

    if (blocoId === "reflexao") {
      const reflexao = {};
      formBloco.querySelectorAll("[data-cognitivo-reflexao]").forEach((el) => {
        reflexao[el.dataset.cognitivoReflexao] = el.value;
      });
      finalizarBlocoCognitivo("reflexao", { reflexao });
    }
  });

  cognitivoSessaoRoot?.addEventListener("input", (evento) => {
    const campo = evento.target.closest("[data-cognitivo-rascunho]");
    if (!campo) return;
    salvarRascunhoBloco(dadosCognitivo, campo.dataset.cognitivoRascunho, campo.value);
    salvarCognitivo(dadosCognitivo);
  });
}

function desenharMindosEstudo() {
  desenharMindosCognitivo();
  if (!mindosEstudoRoot) return;
  dadosEstudo = resetSessaoSeNovoDia(dadosEstudo, hojeStr());
  mindosEstudoRoot.innerHTML = htmlMindosEstudo(dadosEstudo);
}

function abrirFerramentasEstudo(aba) {
  if (aba) {
    dadosEstudo = { ...dadosEstudo, abaAtiva: aba };
    salvarEstudo(dadosEstudo);
  }
  if (estudoMais) estudoMais.open = true;
  desenharPainelEstudo();
  desenharMindosEstudo();
}

function ligarMindosEstudo() {
  if (mindosEstudoLigado) return;
  mindosEstudoLigado = true;
  document.addEventListener("click", (evento) => {
    const alvo = evento.target.closest("[data-mindos-estudo-aba]");
    if (!alvo) return;
    abrirFerramentasEstudo(alvo.dataset.mindosEstudoAba);
  });
}

function desenharAgora() {
  if (!agoraConteudo) return;

  const sugestao = obterSugestaoAgora();

  if (!sugestao) {
    agoraTraveiHabitoId = null;
    agoraConteudo.innerHTML = `
      <p class="agora-texto agora-vazio">${t("agora.vazio")}</p>`;
    return;
  }

  const { habito, motivo } = sugestao;
  const virtual = Boolean(sugestao.virtual) || !habito.id;
  const horario = habito.horario ? `<span class="agora-hora">${habito.horario}</span>` : "";
  const passos = listaMicroPassos(habito);
  const preparar = listaPreparar(habito);
  const dicaPasso = passos[0]
    ? `<p class="agora-micro">${t("agora.primeiro.passo.html", { passo: passos[0] })}</p>`
    : "";
  const prepHtml = preparar.length
    ? `<p class="agora-preparar">${t("agora.preparar", { lista: preparar.join(" · ") })}</p>`
    : "";

  const timerHtml =
    timerAtivo() || cronometroAtivo()
      ? `<div class="agora-timer" id="agora-timer">
        <span class="agora-timer-label">${cronometroAtivo() ? t("agora.timer.cronometro") : t("agora.timer.foco")}</span>
        <span class="agora-timer-valor" id="agora-timer-valor">${formatarTimer(
          cronometroAtivo() ? segundosCronometro() : segundosRestantesTimer()
        )}</span>
        <button type="button" class="agora-timer-cancelar" id="agora-cancelar-timer">${t("agora.parar")}</button>
      </div>`
      : "";

  const botaoPrincipal = virtual
    ? `<button type="button" class="agora-botao" id="agora-virtual">
        <span class="agora-nome">${habito.nome}</span>
      </button>`
    : `<button type="button" class="agora-botao" data-ir-habito="${habito.id}">
        ${horario}
        <span class="agora-nome">${habito.nome}</span>
      </button>`;

  const acoesExtras = virtual
    ? `<div class="agora-acoes">
        <button type="button" class="botao-secundario" id="agora-abrir-cheguei">${t("agora.mais")}</button>
      </div>`
    : `<div class="agora-acoes agora-timers">
        <button type="button" class="botao-secundario agora-timer-btn" data-seg="30">${t("agora.timer.so.abrir")}</button>
        <button type="button" class="botao-secundario agora-timer-btn" data-seg="120">${t("agora.timer.2min")}</button>
        <button type="button" class="botao-secundario agora-timer-btn" data-seg="300">${t("agora.timer.5min")}</button>
        <button type="button" class="botao-secundario agora-timer-btn" data-seg="600">${t("agora.timer.10min")}</button>
        <button type="button" class="botao-secundario agora-timer-btn" data-seg="1500">${t("agora.timer.25min")}</button>
      </div>
      <div class="agora-acoes">
        <button type="button" class="botao-secundario" id="agora-cronometro">${t("agora.cronometro")}</button>
        <button type="button" class="botao-secundario agora-travei" data-travei="${habito.id}">${t("agora.travei")}</button>
      </div>`;

  const traveiAberto = !virtual && agoraTraveiHabitoId != null && String(agoraTraveiHabitoId) === String(habito.id);
  const traveiHtml = traveiAberto
    ? `<div class="agora-travei-painel" role="status" aria-live="polite">
        <p class="agora-travei-titulo">${t("agora.travei.titulo")}</p>
        <p class="agora-travei-texto">${textoPlanoB(habito).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>
        <div class="agora-travei-acoes">
          <button type="button" class="botao-secundario" id="agora-travei-30s">${t("agora.travei.30s")}</button>
          <button type="button" class="botao-texto" id="agora-travei-fechar">${t("agora.travei.ok")}</button>
        </div>
      </div>`
    : "";

  agoraConteudo.innerHTML = `
    ${timerHtml}
    <p class="agora-motivo">${motivo}</p>
    ${botaoPrincipal}
    ${dicaPasso}
    ${prepHtml}
    ${acoesExtras}
    ${traveiHtml}
    <p class="agora-cheguei-wrap">
      <button type="button" class="botao-texto agora-link-cheguei">${t("agora.link.cheguei")}</button>
    </p>
    <p class="agora-dica">${t("agora.dica")}</p>`;

  agoraConteudo.querySelector(".agora-link-cheguei")?.addEventListener("click", () => {
    abrirChegueiDoApp({ opcoes: true, voltarGuia: false });
  });

  if (virtual) {
    agoraConteudo.querySelector("#agora-virtual")?.addEventListener("click", () => {
      comecarTimer(600, habito, "10 minutos de descanso");
    });
    agoraConteudo.querySelector("#agora-abrir-cheguei")?.addEventListener("click", () => {
      abrirChegueiDoApp({ opcoes: true, voltarGuia: false });
    });
  } else {
    agoraConteudo.querySelector(".agora-botao")?.addEventListener("click", () => {
      irParaHabito(habito.id);
    });
    agoraConteudo.querySelectorAll(".agora-timer-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const seg = Number(btn.dataset.seg);
        const rotulo =
          seg <= 30 ? "30 segundos" : seg === 120 ? "2 minutos" : `${Math.round(seg / 60)} minutos`;
        comecarTimer(seg, habito, rotulo);
      });
    });
    agoraConteudo.querySelector("#agora-cronometro")?.addEventListener("click", () => {
      comecarCronometro(habito);
    });
    agoraConteudo.querySelector(".agora-travei")?.addEventListener("click", () => {
      mostrarPlanoBAgora(habito);
    });
    agoraConteudo.querySelector("#agora-travei-30s")?.addEventListener("click", () => {
      fecharPlanoBAgora();
      comecarTimer(30, habito, "30 segundos");
    });
    agoraConteudo.querySelector("#agora-travei-fechar")?.addEventListener("click", () => {
      fecharPlanoBAgora();
    });
  }
  agoraConteudo.querySelector("#agora-cancelar-timer")?.addEventListener("click", () => {
    cancelarTimer();
    pararCronometro();
    desenharAgora();
    mostrarFeedback("Timer parado.");
  });
}

function desenharInbox() {
  if (!listaInbox) return;

  const itens = carregarInbox();
  listaInbox.innerHTML = "";
  if (inboxVazio) inboxVazio.hidden = itens.length > 0;
  if (botaoArquivarInbox) botaoArquivarInbox.hidden = itens.length === 0;

  itens.forEach((item) => {
    const li = document.createElement("li");
    li.className = "inbox-item";

    const texto = document.createElement("span");
    texto.className = "inbox-texto";
    texto.textContent = item.texto;

    const acoes = document.createElement("div");
    acoes.className = "inbox-acoes";

    const btnHabito = document.createElement("button");
    btnHabito.type = "button";
    btnHabito.className = "inbox-acao";
    btnHabito.textContent = t("hoje.inbox.acao.habito");
    btnHabito.title = t("hoje.inbox.acao.habito.title");
    btnHabito.addEventListener("click", () => {
      removerInbox(item.id);
      ativarPainel("rotina");
      if (entradaHabito) {
        entradaHabito.value = item.texto;
        entradaHabito.focus();
      }
      desenharInbox();
      mostrarFeedback("Texto colocado em Rotina — ajuste e adicione.");
    });

    const btnNota = document.createElement("button");
    btnNota.type = "button";
    btnNota.className = "inbox-acao";
    btnNota.textContent = t("hoje.inbox.acao.nota");
    btnNota.title = t("hoje.inbox.acao.nota.title");
    btnNota.addEventListener("click", () => {
      const hoje = hojeStr();
      const atual = notas[hoje] || "";
      const novo = atual ? `${atual}\n• ${item.texto}` : `• ${item.texto}`;
      definirNota(hoje, novo);
      removerInbox(item.id);
      desenharInbox();
      mostrarFeedback("Adicionado às anotações de hoje.");
    });

    const btnDepois = document.createElement("button");
    btnDepois.type = "button";
    btnDepois.className = "inbox-acao";
    btnDepois.textContent = t("hoje.inbox.acao.depois");
    btnDepois.title = t("hoje.inbox.acao.depois.title");
    btnDepois.addEventListener("click", () => {
      moverInboxParaDepois(item.id);
      desenharInbox();
      mostrarFeedback("Guardado para depois.");
    });

    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "inbox-remover";
    remover.textContent = "×";
    remover.title = t("hoje.inbox.remover.title");
    remover.addEventListener("click", () => {
      removerInbox(item.id);
      desenharInbox();
    });

    acoes.appendChild(btnHabito);
    acoes.appendChild(btnNota);
    acoes.appendChild(btnDepois);
    acoes.appendChild(remover);

    li.appendChild(texto);
    li.appendChild(acoes);
    listaInbox.appendChild(li);
  });
}

function desenharManha() {
  const chave = hojeStr();
  const dados = revisaoManhaDoDia(chave);
  if (manhaFoco1) manhaFoco1.value = dados.foco1;
  if (manhaFoco2) manhaFoco2.value = dados.foco2;
  if (manhaFoco3) manhaFoco3.value = dados.foco3;

  if (!resumoNaoEsqueci) return;

  const perfil = carregarPerfil();
  const prio = prioridadesDoDia(chave);

  const focos = [dados.foco1, dados.foco2, dados.foco3].filter((t) => t.trim());
  const preparoOntem = textoPreparoManha(chave);
  const habitoNomes = prio
    .map((id) => habitos.find((h) => h.id === id)?.nome)
    .filter(Boolean);

  if (focos.length || habitoNomes.length) {
    const linhas = focos.length ? focos : habitoNomes;
    resumoNaoEsqueci.hidden = false;
    const extra = preparoOntem && !focos.includes(preparoOntem) ? ` · <em>${preparoOntem}</em>` : "";
    resumoNaoEsqueci.innerHTML = t("hoje.manha.nao.esquecer.html", {
      lista: `${linhas.slice(0, 3).join(" · ")}${extra}`,
    });
  } else if (preparoOntem) {
    resumoNaoEsqueci.hidden = false;
    resumoNaoEsqueci.innerHTML = t("hoje.manha.de.ontem.html", { texto: preparoOntem });
  } else if (perfil.prioridadesVida?.length) {
    resumoNaoEsqueci.hidden = false;
    resumoNaoEsqueci.innerHTML = t("hoje.manha.seu.foco.html", {
      lista: perfil.prioridadesVida.join(" · "),
    });
  } else {
    resumoNaoEsqueci.hidden = true;
  }

  if (entradaTemaSemana && entradaTemaSemana.value !== carregarTemaSemana()) {
    entradaTemaSemana.value = carregarTemaSemana();
  }
}

let chegueiMensagemFeito = "";

function iniciarVozCheguei() {
  if (!suportaReconhecimentoVoz()) {
    mostrarFeedback("Seu navegador não suporta voz. Use os botões.", "aviso");
    return;
  }
  pararEscuta();
  mostrarFeedback("Ouvindo… fale o que aconteceu.");
  escutarDictado({
    onStatus: (msg) => {
      if (chegueiRoot) {
        const apoio = chegueiRoot.querySelector(".cheguei-apoio");
        if (apoio) apoio.textContent = msg;
      }
    },
    onResult: (texto) => {
      const interp = interpretarFala(texto);
      chegueiContexto = interp.contexto;
      chegueiFalaTexto = interp.texto;
      mostrarFeedback(`Entendi: ${rotuloContextoVoz(interp.contexto)}`);
      mostrarOpcoesCheguei();
    },
    onError: () => mostrarFeedback("Não ouvi bem — tente de novo ou use os botões.", "aviso"),
  });
}

function desenharCheguei() {
  if (!chegueiRoot) return;
  if (chegueiEstado === "inicio") {
    chegueiRoot.innerHTML = renderChegueiInicio();
    return;
  }
  if (chegueiEstado === "opcoes") {
    chegueiOpcoesAtuais = montarOpcoesCheguei({
      habitos,
      avisos,
      chave: hojeStr(),
      estaPendente: (h) => ehAtivoHoje(h) && !estaFeitoHoje(h),
      excluirIds: chegueiExcluidos,
      contexto: chegueiContexto,
    });
    chegueiRoot.innerHTML = renderChegueiOpcoes(chegueiOpcoesAtuais);
    enriquecerChegueiComIa();
    return;
  }
  chegueiRoot.innerHTML = renderChegueiFeito(
    chegueiMensagemFeito || "Um passo já conta. Pode parar por aqui."
  );
}

async function enriquecerChegueiComIa() {
  const token = ++chegueiIaToken;
  const base = chegueiOpcoesAtuais;
  if (!base) return;

  const payload = montarPayloadContextoIa({
    contexto: chegueiContexto,
    opcoes: base,
    perfil: carregarPerfil(),
    fala: chegueiFalaTexto,
  });
  const resp = await pedirOpcoesContexto(payload);
  if (token !== chegueiIaToken || chegueiEstado !== "opcoes") return;
  if (!resp.ok || !resp.escolhidos?.length) return;

  chegueiOpcoesAtuais = aplicarSugestaoIa(base, resp);
  if (chegueiRoot && chegueiEstado === "opcoes") {
    chegueiRoot.innerHTML = renderChegueiOpcoes(chegueiOpcoesAtuais);
  }
}

function mostrarOpcoesCheguei() {
  chegueiEstado = "opcoes";
  desenharCheguei();
}

function reiniciarCheguei() {
  chegueiEstado = "inicio";
  chegueiExcluidos = [];
  chegueiMensagemFeito = "";
  chegueiContexto = "chegada";
  chegueiFalaTexto = "";
  chegueiIaToken += 1;
  desenharCheguei();
}

function aplicarEscolhaCheguei(opcaoId) {
  if (!chegueiOpcoesAtuais) return;
  const { opcaoA, opcaoB } = chegueiOpcoesAtuais;
  const opcao = [opcaoA, opcaoB].find((o) => o && o.id === opcaoId);
  if (!opcao) return;

  chegueiExcluidos.push(opcao.id);

  if (opcao.tipo === "habito") {
    const habito = habitos.find((h) => h.id === opcao.habitoId);
    if (habito) {
      const seg = opcao.timerSeg || 120;
      comecarTimer(seg, habito, seg <= 150 ? "2 minutos" : "10 minutos");
      chegueiMensagemFeito = `Foco: ${opcao.passo}. Timer ligado — veja em Hoje se quiser.`;
    }
  } else if (opcao.tipo === "descanso") {
    comecarTimer(
      opcao.timerSeg || 600,
      { id: 0, nome: "Descanso", microPassos: [] },
      "10 minutos de descanso"
    );
    chegueiMensagemFeito = "Descanse sem culpa. 10 minutos.";
  } else if (opcao.tipo === "aviso") {
    chegueiMensagemFeito = `${opcao.titulo} — ${opcao.passo}.`;
  } else if (opcao.tipo === "painel") {
    reiniciarCheguei();
    ativarPainel(opcao.painel || "estudo");
    mostrarFeedback("Só se tiver vontade — sem pressão.");
    return;
  } else if (opcao.tipo === "ok") {
    chegueiMensagemFeito = "Nada pendente. Aproveite.";
  }

  chegueiEstado = "feito";
  desenharCheguei();
}

function desenharBannerTransicao() {
  if (!bannerTransicao) return;
  const trans = detectarTransicao();
  if (!trans) {
    bannerTransicao.hidden = true;
    return;
  }
  bannerTransicao.hidden = false;
  const texto = bannerTransicao.querySelector(".banner-transicao-texto");
  if (texto) texto.textContent = mensagemTransicao(trans);
}

function desenharBannerPreditivo() {
  if (!bannerPreditivo) return;
  const pendente = habitos.find((h) => ehAtivoHoje(h) && !estaFeitoHoje(h));
  const alerta = pendente ? alertaPreditivo(pendente) : null;
  if (!alerta) {
    bannerPreditivo.hidden = true;
    return;
  }
  bannerPreditivo.hidden = false;
  const texto = bannerPreditivo.querySelector(".banner-preditivo-texto");
  if (texto) texto.textContent = alerta;
}

function desenharBannerTarde() {
  if (!bannerTarde) return;
  const ativo = ehHorarioDificil();
  bannerTarde.hidden = !ativo;
  if (ativo) {
    const texto = bannerTarde.querySelector(".banner-tarde-texto");
    if (texto) texto.textContent = mensagemTarde();
  }
}

function lerPerfilDoFormulario() {
  const base = carregarPerfil();
  return {
    ...base,
    nome: (perfilNome?.value || base.nome || "").trim(),
    acordar: perfilAcordar?.value || base.acordar,
    dormir: perfilDormir?.value || base.dormir,
    chegadaCasa: perfilChegada?.value || base.chegadaCasa,
    tardeDificilFim: perfilTardeFim?.value || base.tardeDificilFim,
    trabalhoPraiaFimSemana: perfilPraia?.checked ?? base.trabalhoPraiaFimSemana,
  };
}

function preencherFormularioPerfil(perfil = carregarPerfil()) {
  if (perfilNome) perfilNome.value = perfil.nome || "";
  if (perfilAcordar) perfilAcordar.value = perfil.acordar || "05:45";
  if (perfilDormir) perfilDormir.value = perfil.dormir || "23:30";
  if (perfilChegada) perfilChegada.value = perfil.chegadaCasa || "17:00";
  if (perfilTardeFim) perfilTardeFim.value = perfil.tardeDificilFim || "20:00";
  if (perfilPraia) perfilPraia.checked = perfil.trabalhoPraiaFimSemana !== false;
}

function salvarPerfilDoFormulario() {
  const perfil = lerPerfilDoFormulario();
  salvarPerfil(perfil);
  return perfil;
}

function desenharPreviewRotina() {
  if (!rotinaPreview) return;
  const perfil = lerPerfilDoFormulario();
  const itens = previewRotinaDoPerfil(perfil);
  const titulo = document.createElement("p");
  titulo.className = "rotina-preview-titulo";
  titulo.textContent = t("ajustes.rotina.preview");
  const lista = document.createElement("ul");
  lista.className = "rotina-preview-lista";
  itens.forEach((item) => {
    const li = document.createElement("li");
    const nome = document.createElement("span");
    nome.textContent = `${item.nome} · ${item.dias}`;
    const hora = document.createElement("span");
    hora.className = "rotina-preview-hora";
    hora.textContent = item.horario;
    li.appendChild(nome);
    li.appendChild(hora);
    lista.appendChild(li);
  });
  rotinaPreview.replaceChildren(titulo, lista);
}

function desenharPerfilAjustes() {
  preencherFormularioPerfil();
  if (perfilResumo) {
    const perfil = lerPerfilDoFormulario();
    perfilResumo.textContent = t("ajustes.rotina.perfil", {
      acordar: perfil.acordar,
      tardeIni: perfil.tardeDificilInicio || "17:00",
      tardeFim: perfil.tardeDificilFim,
      prioridades: (perfil.prioridadesVida || []).join(", "),
    });
  }
  desenharPreviewRotina();
}

function mostrarStatusRotinaAjustes(texto, tipo = "ok") {
  if (!rotinaAjustesStatus) return;
  rotinaAjustesStatus.textContent = texto;
  rotinaAjustesStatus.className = `rotina-ajustes-status rotina-ajustes-status--${tipo}`;
  rotinaAjustesStatus.hidden = !texto;
}

function aplicarRotinaCompleta(silencioso = false, perfilArg) {
  const perfil = perfilArg || carregarPerfil();
  const modelos = habitosRotinaCompleta(perfil);
  let adicionados = 0;
  let atualizados = 0;

  modelos.forEach((modelo) => {
    const { presetId, ...campos } = modelo;
    const existente = habitos.find((h) => correspondePreset(h, presetId));

    if (presetId === "agua") {
      const horariosAgua = campos.horariosLembretes || [];
      if (existente) {
        habitos = habitos.map((h) => {
          if (!correspondePreset(h, "agua")) return h;
          return normalizarHabito({
            ...h,
            horariosLembretes: horariosAgua,
            lembretes: horariosAgua.length || 6,
            horario: horariosAgua[0] || campos.horario,
            importancia: 1,
            contextoLembrete: campos.contextoLembrete,
          });
        });
        atualizados++;
      } else {
        const agua = criarHabitoAgua(novoIdHabito(), horariosAgua);
        agua.importancia = 1;
        agua.contextoLembrete = campos.contextoLembrete;
        habitos.push(normalizarHabito(agua));
        adicionados++;
      }
      return;
    }

    if (existente) {
      const atualizado = normalizarHabito({
        ...existente,
        ...campos,
        id: existente.id,
        historico: existente.historico || {},
      });
      habitos = habitos.map((h) => (h.id === existente.id ? atualizado : h));
      atualizados++;
    } else {
      habitos.push(
        normalizarHabito({
          ...campos,
          id: novoIdHabito(),
          historico: {},
        })
      );
      adicionados++;
    }
  });

  const chave = hojeStr();
  const idsPrioridade = prioridadesRotina(perfil)
    .map((pid) => habitos.find((h) => correspondePreset(h, pid))?.id)
    .filter((id) => Number.isFinite(id))
    .slice(0, MAX_PRIORIDADES);

  if (idsPrioridade.length) {
    salvarPrioridades({ ...carregarPrioridades(), [chave]: idsPrioridade });
  }

  const manha = revisaoManhaDoDia(chave);
  const prioridadesVida = carregarPerfil().prioridadesVida || [];
  if (!manha.foco1 && prioridadesVida[0]) {
    definirRevisaoManhaCampo(chave, "foco1", prioridadesVida[0]);
  }
  if (!manha.foco2 && prioridadesVida[1]) {
    definirRevisaoManhaCampo(chave, "foco2", prioridadesVida[1]);
  }
  if (!manha.foco3 && prioridadesVida[2]) {
    definirRevisaoManhaCampo(chave, "foco3", prioridadesVida[2]);
  }

  if (!carregarTemaSemana()) {
    salvarTemaSemana("Conhecimento, organização e rotina");
  }

  salvarPerfilRotina(textosPlanejadorRotina(perfil));
  habitos = migrarHabitosAprendizado(habitos).map(normalizarHabito);
  marcarRotinaMontada();
  marcarPerfilInicializado();
  salvarPerfil(perfil);
  salvar();
  carregarCamposRotina();
  desenhar();

  if (!silencioso) {
    if (typeof window.marcarEscritaLocalSync === "function") {
      window.marcarEscritaLocalSync(4000);
    }
    if (typeof window.forcarSyncNuvem === "function") {
      void window.forcarSyncNuvem();
    }
    const msg = t("ajustes.rotina.ok", {
      novos: adicionados,
      atualizados,
    });
    mostrarStatusRotinaAjustes(msg, "ok");
    mostrarFeedback(msg, "ok");
  }
  return { adicionados, atualizados };
}

function aplicarRotinaPersonalizada() {
  const perfil = salvarPerfilDoFormulario();
  const preview = previewRotinaDoPerfil(perfil);
  const estudo = preview.find((p) => p.presetId === "aprender");
  const msgConfirm = t("ajustes.rotina.confirmar", {
    total: preview.length,
    estudo: estudo?.horario || "—",
  });
  if (!confirm(msgConfirm)) return;

  const botao = botaoRotinaPersonalizada;
  if (botao) botao.disabled = true;

  try {
    const { adicionados, atualizados } = aplicarRotinaCompleta(false, perfil);
    desenharPerfilAjustes();
    ativarPainel("hoje");
    if (adicionados === 0 && atualizados === 0) {
      mostrarStatusRotinaAjustes(t("ajustes.rotina.ok", { novos: 0, atualizados: 0 }), "ok");
    }
  } catch (erro) {
    console.error("aplicarRotinaPersonalizada:", erro);
    mostrarStatusRotinaAjustes(t("ajustes.rotina.erro"), "erro");
    mostrarFeedback(t("ajustes.rotina.erro"), "aviso");
  } finally {
    if (botao) botao.disabled = false;
  }
}

function salvarEstudoLocal(novo, opts = {}) {
  dadosEstudo = novo;
  salvarEstudo(dadosEstudo);
  if (!opts.semResumo) desenharEstudoResumo();
  desenharMindosEstudo();
  if (painelAtivo !== "estudo") return;
  if (opts.somenteLivros && estudoPainelRoot) {
    atualizarResultadoLivros(estudoPainelRoot, dadosEstudo);
    return;
  }
  if (opts.somenteNeuro) return;
  if (opts.somenteNotas) return;
  if (opts.semPainel) return;
  desenharPainelEstudo();
}

function desenharEstudoResumo() {
  if (!estudoResumoConteudo) return;
  dadosEstudo = resetSessaoSeNovoDia(dadosEstudo, hojeStr());
  estudoResumoConteudo.innerHTML = renderResumoHoje(dadosEstudo, hojeStr());
}

function desenharPainelEstudo() {
  if (!estudoPainelRoot) return;
  dadosEstudo = resetSessaoSeNovoDia(dadosEstudo, hojeStr());
  const parceiro = renderPainelParceiro(carregarSessaoParceiro());
  estudoPainelRoot.innerHTML = parceiro + renderPainelEstudo(dadosEstudo, hojeStr());
  desenharMindosEstudo();
}

function processarHashHabito() {
  const hash = location.hash;
  if (!hash.startsWith("#habito-")) return;
  const id = Number(hash.replace("#habito-", ""));
  if (!Number.isFinite(id)) return;
  ativarPainel("hoje");
  setTimeout(() => irParaHabito(id), 300);
}

function desenharResumoAgenda() {
  if (!agendaResumo) return;

  const total = habitos.length;
  const feitos = habitos.filter((h) => estaFeitoHoje(h)).length;
  const pendente = total - feitos;
  const proximoHabito = proximoCompromisso();
  const proximoAv = proximoAvisoHoje(avisos);
  let proximo = null;
  if (proximoHabito?.horario && proximoAv?.hora) {
    proximo =
      proximoHabito.horario <= proximoAv.hora
        ? { horario: proximoHabito.horario, nome: proximoHabito.nome }
        : { horario: proximoAv.hora, nome: proximoAv.titulo };
  } else if (proximoHabito?.horario) {
    proximo = { horario: proximoHabito.horario, nome: proximoHabito.nome };
  } else if (proximoAv) {
    proximo = { horario: proximoAv.hora, nome: proximoAv.titulo };
  }

  const avisosHoje = avisosPendentes(avisos, hojeStr()).length;

  let texto = "";
  if (total === 0 && avisosHoje === 0) {
    texto = t("hoje.agenda.livre");
  } else if (pendente === 0 && avisosHoje === 0) {
    texto = t("hoje.agenda.concluido");
  } else if (proximo) {
    texto = t("hoje.agenda.proximo.html", { horario: proximo.horario, nome: proximo.nome });
  } else {
    const partes = [];
    if (pendente > 0) {
      partes.push(
        t(pendente > 1 ? "hoje.agenda.parte.habitos" : "hoje.agenda.parte.habito", { n: pendente })
      );
    }
    if (avisosHoje > 0) {
      partes.push(
        t(avisosHoje > 1 ? "hoje.agenda.parte.avisos" : "hoje.agenda.parte.aviso", { n: avisosHoje })
      );
    }
    texto = t("hoje.agenda.restante", { partes: partes.join(" · ") });
  }

  agendaResumo.innerHTML = `<p class="agenda-resumo-texto">${texto}</p>`;
  desenharFilosofia();
  desenharManha();
  desenharBannerTarde();
  desenharBannerTransicao();
  desenharBannerPreditivo();
  desenharMindosHoje();
  desenharAgora();
  desenharEstudoResumo();
  desenharInbox();
  desenharRevisao();
}

function desenharFilosofia() {
  if (!filosofiaDia) return;
  const citacao = fraseFilosoficaDoDia(hojeStr());
  const notaOntem = (notas[ontemStr()] || "").trim();
  const extra = complementoCoachDiario(notaOntem);

  filosofiaDia.innerHTML = `
    <p class="filosofia-texto">"${citacao.texto}"</p>
    <cite class="filosofia-autor">— ${citacao.autor}</cite>
    ${extra ? `<p class="filosofia-reflexao">${extra.trim()}</p>` : ""}`;
}

function criarItem(habito) {
  const hoje = hojeStr();
  const feito = estaFeitoHoje(habito);
  const streak = calcularStreak(habito);
  const recorde = calcularRecorde(habito);
  const multi = ehMultiPassos(habito);
  const progresso = progressoNoDia(habito, hoje);
  const totalPassos = passosTotal(habito);

  const item = document.createElement("li");
  const emFoco = ehPrioridadeHoje(hoje, habito.id);
  item.className = "item-habito" + (feito ? " feito" : "") + (emFoco ? " item-foco" : "");
  item.draggable = true;
  item.dataset.habitoId = String(habito.id);

  let controle;
  if (multi) {
    controle = document.createElement("button");
    controle.type = "button";
    controle.className = "botao-passos" + (feito ? " completo" : "");
    controle.textContent = `${progresso}/${totalPassos}`;
    controle.title = t("hoje.item.passos.title");
    controle.addEventListener("click", () => avancarHabito(habito.id));
  } else {
    controle = document.createElement("input");
    controle.type = "checkbox";
    controle.className = "checkbox-habito";
    controle.checked = feito;
    controle.addEventListener("change", () => avancarHabito(habito.id));
  }

  // Bloco central: nome + linha de informações
  const conteudo = document.createElement("div");
  conteudo.className = "item-conteudo";

  const linha = document.createElement("div");
  linha.className = "item-linha";

  if (habito.horario) {
    const hora = document.createElement("span");
    hora.className = "item-horario";
    hora.textContent = habito.horario;
    linha.appendChild(hora);
  }

  const nome = document.createElement("span");
  nome.className = "nome-habito";
  nome.textContent = habito.nome;
  linha.appendChild(nome);

  const imp = normalizarImportancia(habito.importancia);
  const badgeImp = document.createElement("button");
  badgeImp.type = "button";
  badgeImp.className = "badge-importancia imp-" + imp;
  badgeImp.textContent = rotuloImportancia(habito);
  badgeImp.title = t("hoje.item.importancia.title");
  badgeImp.addEventListener("click", () => ciclarImportancia(habito.id));
  linha.appendChild(badgeImp);

  const meta = document.createElement("div");
  meta.className = "item-meta";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = habito.categoria || t("categoria.geral");
  meta.appendChild(tag);

  const chipMeta = document.createElement("button");
  chipMeta.type = "button";
  chipMeta.className = "meta-chip";
  chipMeta.textContent = rotuloMetaSemanal(habito.metaSemanal);
  chipMeta.title = t("hoje.item.meta.title");
  chipMeta.setAttribute("aria-label", t("hoje.item.meta.aria", { freq: rotuloMetaSemanal(habito.metaSemanal) }));
  impedirArrasteNoBotao(chipMeta);
  chipMeta.addEventListener("click", (evento) => {
    evento.stopPropagation();
    iniciarEdicaoMeta(habito, chipMeta);
  });
  meta.appendChild(chipMeta);

  if (multi) {
    const passos = document.createElement("div");
    passos.className = "passos-pontos";
    passos.setAttribute("aria-hidden", "true");
    for (let i = 1; i <= totalPassos; i++) {
      const ponto = document.createElement("span");
      ponto.className = "passo-ponto" + (i <= progresso ? " ativo" : "");
      passos.appendChild(ponto);
    }
    meta.appendChild(passos);

    const lembrete = document.createElement("span");
    lembrete.className = "meta-info";
    lembrete.textContent =
      progresso === 0
        ? t("hoje.item.lembretes.total", { n: totalPassos })
        : feito
          ? t("hoje.item.lembretes.feitos")
          : t("hoje.item.lembrete.progresso", { atual: progresso, total: totalPassos });
    meta.appendChild(lembrete);

    const horariosTxt = textoHorariosLembretes(habito);
    if (horariosTxt) {
      const horariosEl = document.createElement("span");
      horariosEl.className = "meta-horarios-lembretes";
      horariosEl.textContent = horariosTxt;
      meta.appendChild(horariosEl);
    }
  }

  const metaAlvo = normalizarMetaSemanal(habito.metaSemanal);
  if (metaAlvo < 7) {
    const feitosSemana = feitosNaSemana(habito);
    const alvo = metaAlvo;
    const semana = document.createElement("span");
    semana.className = "meta-info" + (feitosSemana >= alvo ? " cumprida" : "");
    semana.textContent = t("hoje.item.semana.progresso", { feitos: feitosSemana, alvo });
    meta.appendChild(semana);
  }

  if (recorde > 0) {
    const rec = document.createElement("span");
    rec.className = "meta-info";
    rec.textContent = t("hoje.item.recorde", { n: recorde });
    meta.appendChild(rec);
  }

  conteudo.appendChild(linha);
  conteudo.appendChild(meta);

  const microLista = listaMicroPassos(habito);
  if (microLista.length && !multi) {
    const blocoMicro = document.createElement("ul");
    blocoMicro.className = "micro-lista";
    microLista.forEach((passo, indice) => {
      const li = document.createElement("li");
      li.className = "micro-item";

      const check = document.createElement("input");
      check.type = "checkbox";
      check.checked = microPassoFeito(habito, hoje, indice);
      check.addEventListener("change", () => alternarMicroPasso(habito.id, indice));

      const label = document.createElement("span");
      label.textContent = passo;

      li.appendChild(check);
      li.appendChild(label);
      blocoMicro.appendChild(li);
    });
    conteudo.appendChild(blocoMicro);

    if (todosMicroFeitos(habito, hoje) && !feito) {
      const dica = document.createElement("p");
      dica.className = "micro-completo-dica";
      dica.textContent = t("hoje.item.micro.dica");
      conteudo.appendChild(dica);
    }
  }

  const marcaStreak = document.createElement("span");
  marcaStreak.className = "streak" + (streak > 0 ? " ativa" : "");
  const msgStreak = mensagemStreakHabito(habito, streak, calcularRecorde(habito));
  marcaStreak.textContent =
    msgStreak ||
    (streak > 0 ? t(streak === 1 ? "hoje.item.streak.dia" : "hoje.item.streak.dias", { n: streak }) : "—");
  if (msgStreak) marcaStreak.title = msgStreak;

  const botaoEditar = document.createElement("button");
  botaoEditar.className = "botao-editar";
  botaoEditar.textContent = "✎";
  botaoEditar.title = t("hoje.item.editar.title");
  botaoEditar.setAttribute("aria-label", t("hoje.item.editar.aria"));
  impedirArrasteNoBotao(botaoEditar);
  botaoEditar.addEventListener("click", (evento) => {
    evento.stopPropagation();
    iniciarEdicao(habito, linha);
  });

  const botaoRemover = document.createElement("button");
  botaoRemover.className = "botao-remover";
  botaoRemover.textContent = "×";
  botaoRemover.title = t("hoje.item.remover.title");
  botaoRemover.setAttribute("aria-label", t("hoje.item.remover.aria"));
  impedirArrasteNoBotao(botaoRemover);
  botaoRemover.addEventListener("click", (evento) => {
    evento.stopPropagation();
    removerHabito(habito.id);
  });

  const botaoFoco = document.createElement("button");
  botaoFoco.className = "botao-foco" + (emFoco ? " ativo" : "");
  botaoFoco.textContent = emFoco ? "★" : "☆";
  botaoFoco.title = t("hoje.item.prioridade.title", { max: MAX_PRIORIDADES });
  botaoFoco.setAttribute(
    "aria-label",
    emFoco ? t("hoje.item.prioridade.remover") : t("hoje.item.prioridade.marcar")
  );
  botaoFoco.setAttribute("data-acao-habito", "prioridade");
  impedirArrasteNoBotao(botaoFoco);
  botaoFoco.addEventListener("click", (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    alternarFocoHabito(habito.id);
  });

  // Arrastar para reordenar (Drag and Drop API)
  item.addEventListener("dragstart", () => {
    idArrastando = habito.id;
    item.classList.add("arrastando");
  });
  item.addEventListener("dragend", () => {
    idArrastando = null;
    item.classList.remove("arrastando");
  });
  item.addEventListener("dragover", (evento) => {
    evento.preventDefault();
    item.classList.add("alvo");
  });
  item.addEventListener("dragleave", () => item.classList.remove("alvo"));
  item.addEventListener("drop", (evento) => {
    evento.preventDefault();
    item.classList.remove("alvo");
    reordenar(idArrastando, habito.id);
  });

  item.appendChild(controle);
  item.appendChild(conteudo);
  item.appendChild(marcaStreak);
  item.appendChild(botaoFoco);
  item.appendChild(botaoEditar);
  item.appendChild(botaoRemover);
  return item;
}

function desenhar() {
  desenharFiltros();

  const chave = hojeStr();
  sincronizarPrioridadesOrfas(habitos, chave);
  let base =
    filtroCategoria === "Todas"
      ? habitos
      : habitos.filter((h) => (h.categoria || "Geral") === filtroCategoria);

  base = base.filter((h) => ehAtivoHoje(h));

  if (modoCabecaLeve()) {
    base = filtrarModoLeve(base, chave);
  }
  if (modoCerebroVazio()) {
    base = filtrarCerebroVazio(base, chave);
  }
  if (modoBarulho()) {
    base = filtrarModoBarulho(base, chave);
  }

  document.body.classList.toggle("modo-barulho-ativo", modoBarulho());

  let visiveis = ordenarComPrioridades(ordenarPorHorario(base), chave);
  visiveis = aplicarLimiteDiario(visiveis, chave);

  if (toggleCabecaLeve) {
    toggleCabecaLeve.classList.toggle("ativo", modoCabecaLeve());
    toggleCabecaLeve.setAttribute("aria-pressed", modoCabecaLeve() ? "true" : "false");
  }
  if (toggleLimiteDiario) {
    toggleLimiteDiario.classList.toggle("ativo", limiteDiarioAtivo());
    toggleLimiteDiario.setAttribute("aria-pressed", limiteDiarioAtivo() ? "true" : "false");
  }
  if (toggleCerebroVazio) {
    toggleCerebroVazio.classList.toggle("ativo", modoCerebroVazio());
    toggleCerebroVazio.setAttribute("aria-pressed", modoCerebroVazio() ? "true" : "false");
  }
  if (toggleModoBarulho) {
    toggleModoBarulho.classList.toggle("ativo", modoBarulho());
    toggleModoBarulho.setAttribute("aria-pressed", modoBarulho() ? "true" : "false");
  }

  if (rotuloFoco) {
    const totalPrioridades = prioridadesDoDia(chave).length;
    rotuloFoco.textContent = t("hoje.prioridades.rotulo", {
      atual: totalPrioridades,
      max: MAX_PRIORIDADES,
    });
    rotuloFoco.hidden = habitos.length === 0;
  }

  listaHabitos.innerHTML = "";
  if (habitos.length === 0) {
    mensagemVazia.style.display = "block";
    mensagemVazia.innerHTML = t("hoje.lista.vazio.html");
  } else if (visiveis.length === 0 && (modoCabecaLeve() || modoCerebroVazio() || limiteDiarioAtivo())) {
    mensagemVazia.style.display = "block";
    mensagemVazia.textContent = t("hoje.lista.filtro");
  } else {
    mensagemVazia.style.display = "none";
  }

  visiveis.forEach((habito) => listaHabitos.appendChild(criarItem(habito)));

  desenharResumoAgenda();
  desenharAvisos();
  desenharRelogio();
  desenharMindosHoje();
  desenharMindosRotina();
  desenharMindosSemana();
  desenharMindosInsights();
  desenharMindosEstudo();
  atualizarResumo();
  desenharGrafico();
  desenharMetasSemana();
  desenharCardsInsights();
  desenharResumoSemana();
  desenharCalendario();
  desenharListaDiario();
  desenharPerfilAjustes();
}

function carregarNotaHoje() {
  notaHoje.value = notas[hojeStr()] || "";
}

// ============ LIGAÇÕES DE EVENTOS ============
function ligarEventosRotina() {
  const painelRotina = document.getElementById("painel-rotina");
  if (!painelRotina) return;

  painelRotina.addEventListener("click", (evento) => {
    const alvo = evento.target;

    if (alvo.closest("#botao-gerar-rotina")) {
      evento.preventDefault();
      executarGeracaoRotina();
      return;
    }
    if (alvo.closest("#botao-montar-adicionar")) {
      evento.preventDefault();
      montarEAdicionarRotina();
      return;
    }
    if (alvo.closest("#botao-regenerar-rotina")) {
      executarGeracaoRotina();
      return;
    }
    if (alvo.closest("#botao-aplicar-rotina")) {
      aplicarRotinaGerada();
      return;
    }

    const atalho = alvo.closest(".atalho[data-atalho]");
    if (atalho) adicionarAtalho(atalho.dataset.atalho);
  });

  [rotinaPerfil, rotinaHorarios, rotinaObjetivos].forEach((campo) => {
    campo?.addEventListener("input", salvarCamposRotina);
  });
}

function ligarTodosEventos() {
  ligarEventosRotina();

  botaoAdicionar?.addEventListener("click", adicionarHabito);
  entradaHabito?.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") adicionarHabito();
  });
  entradaHabito?.addEventListener("input", atualizarSugestaoHabito);
  botaoUsarSugestao?.addEventListener("click", aplicarSugestaoHabito);
  botaoTema?.addEventListener("click", alternarTema);
  botaoExportar?.addEventListener("click", exportarDados);
  entradaImportar?.addEventListener("change", importarDados);
  notaHoje?.addEventListener("input", () => {
    definirNota(hojeStr(), notaHoje.value);
  });
  notaHoje?.addEventListener("blur", persistirNotaHojeAtual);
  notaHojeSalvar?.addEventListener("click", salvarNotaHojeExplicito);
  diarioTexto?.addEventListener("input", () => {
    const chave = garantirDataDiario();
    definirNota(chave, diarioTexto.value);
  });
  diarioTexto?.addEventListener("blur", persistirNotaDiarioAtual);
  diarioSalvar?.addEventListener("click", salvarDiarioExplicito);
  diarioBuscarAntiga?.addEventListener("click", procurarTextoAntigoDiario);
  diarioData?.addEventListener("change", () => {
    if (diarioData.value) carregarNotaDiario(diarioData.value);
  });
  diarioHojeBotao?.addEventListener("click", () => {
    carregarNotaDiario(hojeStr());
  });
  diarioOntemBotao?.addEventListener("click", () => {
    carregarNotaDiario(ontemStr());
  });
  navPaineis?.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".nav-item");
    if (!botao) return;
    ativarPainel(botao.dataset.painel);
  });
  botaoAjustes?.addEventListener("click", () => ativarPainel("ajustes"));
  botaoDicaFechar?.addEventListener("click", fecharDicaInicio);
  botaoInbox?.addEventListener("click", capturarInbox);
  entradaInbox?.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") capturarInbox();
  });
  revisaoFeito?.addEventListener("input", () => {
    definirRevisaoCampo(hojeStr(), "feito", revisaoFeito.value);
  });
  revisaoFicou?.addEventListener("input", () => {
    definirRevisaoCampo(hojeStr(), "ficou", revisaoFicou.value);
  });
  revisaoAmanha?.addEventListener("input", () => {
    definirRevisaoCampo(hojeStr(), "amanha", revisaoAmanha.value);
  });
  revisaoAmanha?.addEventListener("blur", () => {
    if (aplicarPreparoNoite(hojeStr())) {
      mostrarFeedback("Prioridade de amanhã copiada para a revisão da manhã.");
    }
  });
  diarioResumoIa?.addEventListener("click", () => {
    void gerarResumoDiarioIa();
  });
  botaoPlanoSemana?.addEventListener("click", () => {
    void gerarPlanoSemanaIa();
  });
  estudoPainelRoot?.addEventListener("click", (evento) => {
    const alvo = evento.target.closest("[data-parceiro]");
    if (!alvo) return;
    const acao = alvo.dataset.parceiro;
    if (acao === "iniciar") {
      iniciarSessaoParceiro({ titulo: "Estudo", minutos: 25 });
      comecarTimer(1500, { id: 0, nome: "Estudo focado", microPassos: [] }, "25 minutos");
      desenharPainelEstudo();
      return;
    }
    if (acao === "explicar") {
      avancarParaExplicar();
      desenharPainelEstudo();
      return;
    }
    if (acao === "enviar") {
      const texto = estudoPainelRoot.querySelector("[data-parceiro-texto]")?.value || "";
      finalizarSessaoParceiro(texto);
      mostrarFeedback("Boa sessão! Veja feedback na trilha Neuro se quiser.");
      limparSessaoParceiro();
      desenharPainelEstudo();
    }
  });
  toggleModoBarulho?.addEventListener("click", () => {
    definirModoBarulho(!modoBarulho());
    desenhar();
    mostrarFeedback(
      modoBarulho() ? "Modo barulho: só 1 coisa na tela." : "Mostrando visão normal."
    );
  });
  botaoLembretes?.addEventListener("click", ativarLembretes);
  chegueiRoot?.addEventListener("click", (evento) => {
    if (evento.target.closest("[data-cheguei-voz]")) {
      iniciarVozCheguei();
      return;
    }
    const gatilho = evento.target.closest("[data-cheguei-contexto]");
    if (gatilho) {
      chegueiContexto = gatilho.dataset.chegueiContexto || "chegada";
      mostrarOpcoesCheguei();
      return;
    }
    const alvo = evento.target.closest("[data-cheguei-acao], [data-cheguei-escolha]");
    if (!alvo) return;
    if (alvo.dataset.chegueiAcao === "mostrar") {
      mostrarOpcoesCheguei();
      return;
    }
    if (alvo.dataset.chegueiAcao === "reiniciar") {
      reiniciarCheguei();
      return;
    }
    if (alvo.dataset.chegueiAcao === "mais") {
      chegueiEstado = "opcoes";
      desenharCheguei();
      return;
    }
    if (alvo.dataset.chegueiEscolha) {
      aplicarEscolhaCheguei(alvo.dataset.chegueiEscolha);
    }
  });
  chegueiVoltarGuia?.addEventListener("click", () => {
    chegueiVeioDoGuia = false;
    ativarPainel("guia");
  });
  guiaRoot?.addEventListener("click", (evento) => {
    const alvo = evento.target.closest(
      "[data-guia-ir], [data-guia-marcar], [data-guia-demo-iniciar], [data-guia-demo-proximo], [data-guia-demo-parar], [data-guia-reset]"
    );
    if (!alvo) return;

    if (alvo.dataset.guiaReset !== undefined) {
      resetarProgressoGuia();
      guiaDemoIndice = null;
      desenharGuia();
      mostrarFeedback(t("feedback.guia.reset"));
      return;
    }
    if (alvo.dataset.guiaDemoParar !== undefined) {
      guiaDemoIndice = null;
      desenharGuia();
      return;
    }
    if (alvo.dataset.guiaDemoIniciar !== undefined) {
      guiaDemoIndice = 0;
      desenharGuia();
      executarPassoDemo(0);
      return;
    }
    if (alvo.dataset.guiaDemoProximo !== undefined) {
      avancarDemoGuia();
      return;
    }
    if (alvo.dataset.guiaMarcar) {
      const id = alvo.dataset.guiaMarcar;
      const feito = Boolean(carregarProgressoGuia()[id]);
      marcarPassoGuia(id, !feito);
      desenharGuia();
      return;
    }
    if (alvo.dataset.guiaIr) {
      executarNavegacaoGuia({
        painel: alvo.dataset.guiaIr,
        chegueiOpcoes: alvo.dataset.guiaCheguei !== undefined,
        estudoAba: alvo.dataset.guiaEstudoAba || "",
        passoId: alvo.dataset.guiaPassoId || "",
      });
    }
  });
  document.getElementById("guia-chamada-abrir")?.addEventListener("click", () => {
    marcarGuiaVisto();
    atualizarGuiaChamada();
    ativarPainel("guia");
  });
  document.getElementById("guia-chamada-fechar")?.addEventListener("click", () => {
    marcarGuiaVisto();
    atualizarGuiaChamada();
  });
  document.querySelectorAll("[data-idioma]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const loc = btn.dataset.idioma;
      if (loc) mudarIdioma(loc);
    });
  });
  formAviso?.addEventListener("submit", adicionarAvisoForm);
  botaoAtualizarApp?.addEventListener("click", buscarAtualizacaoApp);
  botaoArquivarInbox?.addEventListener("click", arquivarInbox);
  toggleCabecaLeve?.addEventListener("click", () => {
    definirModoCabecaLeve(!modoCabecaLeve());
    desenhar();
    mostrarFeedback(
      modoCabecaLeve()
        ? "Mostrando só essenciais e prioridades."
        : "Mostrando todos os hábitos."
    );
  });
  toggleLimiteDiario?.addEventListener("click", () => {
    definirLimiteDiario(!limiteDiarioAtivo());
    desenhar();
    mostrarFeedback(limiteDiarioAtivo() ? "Hoje só 5 compromissos visíveis." : "Mostrando todos.");
  });
  toggleCerebroVazio?.addEventListener("click", () => {
    definirModoCerebroVazio(!modoCerebroVazio());
    desenhar();
    mostrarFeedback(modoCerebroVazio() ? "Só 1 coisa na tela." : "Mostrando todos.");
  });
  manhaFoco1?.addEventListener("input", () => {
    definirRevisaoManhaCampo(hojeStr(), "foco1", manhaFoco1.value);
    desenharManha();
  });
  manhaFoco2?.addEventListener("input", () => {
    definirRevisaoManhaCampo(hojeStr(), "foco2", manhaFoco2.value);
    desenharManha();
  });
  manhaFoco3?.addEventListener("input", () => {
    definirRevisaoManhaCampo(hojeStr(), "foco3", manhaFoco3.value);
    desenharManha();
  });
  entradaTemaSemana?.addEventListener("input", () => {
    salvarTemaSemana(entradaTemaSemana.value);
    desenharMindosSemana();
  });
  botaoRotinaPersonalizada?.addEventListener("click", aplicarRotinaPersonalizada);
  formPerfilRotina?.addEventListener("change", () => {
    salvarPerfilDoFormulario();
    desenharPerfilAjustes();
    desenharMindosHoje();
  });
  formPerfilRotina?.addEventListener("input", (evento) => {
    if (evento.target === perfilNome || evento.target?.name === "nome") {
      salvarPerfilDoFormulario();
      desenharMindosHoje();
      if (painelAtivo === "guia") desenharGuia();
    }
    desenharPreviewRotina();
    if (perfilResumo) {
      const perfil = lerPerfilDoFormulario();
      perfilResumo.textContent = t("ajustes.rotina.perfil", {
        acordar: perfil.acordar,
        tardeIni: perfil.tardeDificilInicio || "17:00",
        tardeFim: perfil.tardeDificilFim,
        prioridades: (perfil.prioridadesVida || []).join(", "),
      });
    }
  });
}

// ============ INICIALIZAÇÃO ============
export function initApp() {
  window.traduzir = t;

  if (!perfilInicializado()) {
    salvarPerfil(carregarPerfil());
    marcarPerfilInicializado();
  }

  aplicarTema(localStorage.getItem("tema") || "escuro");
  mostrarData();
  carregar();
  if (avisoData) avisoData.value = hojeStr();
  carregarCamposRotina();
  carregarNotaHoje();
  carregarNotaDiario(dataInicialDiario());
  ligarTodosEventos();
  ligarMindosHoje();
  ligarNorthFocus();
  ligarEmocional();
  ligarMemoriaHub();
  ligarMindosEstudo();
  ligarCognitivo();
  sincronizarObjetivoCognitivoInbox();
  definirCallbackIdioma(() => aplicarIdiomaApp());
  aplicarIdiomaApp();
  window.initHabitosSync?.();
  iniciarVozes(() => {
    if (painelAtivo === "estudo") desenharPainelEstudo();
  });
  ligarPainelEstudo(document.querySelector(".app"), () => dadosEstudo, salvarEstudoLocal, {
    chaveDia: hojeStr,
    onTimer: (min) => {
      iniciarTimer(min);
      mostrarFeedback(`Timer de ${min} min iniciado.`);
      ativarPainel("hoje");
    },
    onAtualizarHoje: (painel) => {
      if (painel === "estudo") ativarPainel("estudo");
      else {
        desenharEstudoResumo();
        if (painelAtivo === "estudo") desenharPainelEstudo();
      }
    },
    mostrarFeedback,
  });
  ativarPainel(painelAtivo);
  atualizarInfoVersao();
  mostrarDicaInicio();
  atualizarLembretesStatus();
  iniciarVerificacaoLembretes(rodarLembretes);
  if (intervaloRelogio) clearInterval(intervaloRelogio);
  intervaloRelogio = setInterval(() => {
    desenharRelogio();
    if (timerAtivo()) atualizarTimerUI(segundosRestantesTimer());
    else if (cronometroAtivo()) atualizarTimerUI(segundosCronometro());
  }, 1000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      persistirNotaHojeAtual();
      persistirNotaDiarioAtual();
      return;
    }
    if (document.visibilityState === "visible") rodarLembretes();
  });
  window.addEventListener("pagehide", () => {
    persistirNotaHojeAtual();
    persistirNotaDiarioAtual();
  });
  processarParametrosUrl();
  processarHashHabito();

  void sondarIaNeuro().then(() => {
    if (painelAtivo === "estudo") desenharPainelEstudo();
    if (painelAtivo === "guia") desenharGuia();
  });

  atualizarGuiaChamada();

  ligarMigracaoHost({
    ativarPainel,
    exportarDados: () => document.getElementById("botao-exportar")?.click(),
  });

  const aguardandoSync = precisaConectarSyncNesteHost(notas, habitos);
  if (aguardandoSync) {
    mostrarBannerMigracaoHost();
  } else if (!rotinaJaMontada()) {
    aplicarRotinaCompleta(true);
  }

  mostrarAvisoGithubParaVercel();

  window.addEventListener("habitos-sync-conectado", () => {
    esconderBannerMigracaoHost();
    if (!rotinaJaMontada()) aplicarRotinaCompleta(true);
    carregarNotaHoje();
    carregarNotaDiario(dataDiarioSelecionada || hojeStr());
    desenhar();
    mostrarFeedback("Dados restaurados da nuvem. Seu diário está seguro.");
  });

  desenhar();
}

export function getEstadoExportavel() {
  return {
    habitos,
    notas,
    avisos,
    neuroExplicacoes: carregarExplicacoesNeuro(),
    tema: localStorage.getItem("tema") || "claro",
  };
}

export function aplicarEstadoRemoto(dados) {
  try {
    if (contarNotasComTexto(notas) > 0) {
      localStorage.setItem("notas-diarias-prev", JSON.stringify(notas));
    }
  } catch {
    /* ignora */
  }

  habitos = migrarHabitosAgua(
    Array.isArray(dados.habitos) ? dados.habitos.map(normalizarHabito) : [],
    hojeStr()
  );
  notas = mesclarNotasDiario(notas, dados.notas);
  notas = migrarNotasDiario(notas);
  avisos = Array.isArray(dados.avisos) ? dados.avisos : carregarAvisos();
  const neuroMesclado = mesclarExplicacoesNeuro(
    carregarExplicacoesNeuro(),
    dados.neuroExplicacoes
  );
  aplicarExplicacoesNeuro(neuroMesclado);
  localStorage.setItem("meus-habitos", JSON.stringify(habitos));
  localStorage.setItem("notas-diarias", JSON.stringify(notas));
  salvarAvisosStorage(avisos);
  if (dados.tema) aplicarTema(dados.tema);
  carregarNotaHoje();
  carregarNotaDiario(dataDiarioSelecionada || hojeStr());
  if (painelAtivo === "estudo") desenharPainelEstudo();
  desenhar();
}

export {
  aplicarTema,
  carregarNotaDiario,
  carregarNotaHoje,
  desenhar,
  hojeStr,
};
