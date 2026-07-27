// Sincronização Mac ↔ iPhone via Firebase (código compartilhado)
(function () {
  const CHAVE_SYNC = "habitos-sync-id";
  let syncId = localStorage.getItem(CHAVE_SYNC) || "";
  let cancelarEscuta = null;
  let aplicandoRemoto = false;
  let timerSync = null;
  let db = null;
  let pronto = false;
  let ultimaChaveStatus = "sync.carregando";
  let ultimaVarsStatus = {};

  function $(id) {
    return document.getElementById(id);
  }

  function traduzir(chave, vars = {}) {
    if (typeof window.traduzir === "function") {
      return window.traduzir(chave, vars);
    }
    return chave;
  }

  function gerarCodigo() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let codigo = "";
    for (let i = 0; i < 8; i++) {
      codigo += chars[Math.floor(Math.random() * chars.length)];
    }
    return codigo;
  }

  function normalizarCodigo(texto) {
    return String(texto || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 12);
  }

  function atualizarUI(chave, vars = {}) {
    if (chave) {
      ultimaChaveStatus = chave;
      ultimaVarsStatus = vars;
    }
    const status = $("sync-status");
    const codigoEl = $("sync-codigo-atual");
    const painelConectado = $("sync-conectado");
    const painelDesconectado = $("sync-desconectado");
    const avisoConfig = $("sync-aviso-config");

    if (!status) return;

    if (!window.firebaseConfigurado || !window.firebaseConfigurado()) {
      status.textContent = traduzir("sync.status.firebase");
      if (avisoConfig) avisoConfig.hidden = false;
      if (painelConectado) painelConectado.hidden = true;
      if (painelDesconectado) painelDesconectado.hidden = true;
      return;
    }

    if (avisoConfig) avisoConfig.hidden = true;

    if (syncId) {
      if (painelConectado) painelConectado.hidden = false;
      if (painelDesconectado) painelDesconectado.hidden = true;
      if (codigoEl) codigoEl.textContent = syncId;
      const chave =
        ultimaChaveStatus === "sync.carregando" || ultimaChaveStatus === "sync.status.sem"
          ? "sync.status.ativo"
          : ultimaChaveStatus;
      status.textContent = traduzir(chave, ultimaVarsStatus);
    } else {
      if (painelConectado) painelConectado.hidden = true;
      if (painelDesconectado) painelDesconectado.hidden = false;
      status.textContent = traduzir(ultimaChaveStatus, ultimaVarsStatus);
    }
  }

  window.atualizarSyncIdioma = function () {
    atualizarUI();
  };

  function lerEstado() {
    if (typeof window.getEstadoHabitos === "function") {
      return window.getEstadoHabitos();
    }
    return { habitos: [], notas: {}, tema: "claro" };
  }

  function payloadAtual() {
    const estado = lerEstado();
    return {
      habitos: estado.habitos || [],
      notas: estado.notas || {},
      neuroExplicacoes: estado.neuroExplicacoes || {},
      tema: estado.tema || "claro",
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      versao: 2,
    };
  }

  async function enviarParaNuvem() {
    if (!pronto || !syncId || aplicandoRemoto) return;
    try {
      marcarEscritaLocal();
      await db.collection("sync").doc(syncId).set(payloadAtual(), { merge: true });
      atualizarUI("sync.status.sincronizado");
    } catch (erro) {
      console.error(erro);
      atualizarUI("sync.status.falha_envio");
    }
  }

  function agendarSyncNuvem() {
    if (!pronto || !syncId || aplicandoRemoto) return;
    clearTimeout(timerSync);
    timerSync = setTimeout(enviarParaNuvem, 700);
  }

  /** Envio imediato após mudança local importante (ex.: remontar rotina). */
  async function forcarSyncNuvem() {
    if (!pronto || !syncId || aplicandoRemoto) return;
    clearTimeout(timerSync);
    await enviarParaNuvem();
  }

  let ignorarRemotoAte = 0;

  function marcarEscritaLocal(ms = 2500) {
    ignorarRemotoAte = Date.now() + ms;
  }

  window.forcarSyncNuvem = forcarSyncNuvem;
  window.marcarEscritaLocalSync = marcarEscritaLocal;

  function aplicarDadosRemotos(dados) {
    if (Date.now() < ignorarRemotoAte) return;
    if (!dados || typeof window.aplicarEstadoRemoto !== "function") return;
    aplicandoRemoto = true;
    try {
      window.aplicarEstadoRemoto(dados);
    } finally {
      aplicandoRemoto = false;
    }
  }

  function escutarSync(codigo) {
    if (cancelarEscuta) {
      cancelarEscuta();
      cancelarEscuta = null;
    }
    cancelarEscuta = db.collection("sync").doc(codigo).onSnapshot(
      (snap) => {
        if (!snap.exists) return;
        aplicarDadosRemotos(snap.data());
        atualizarUI("sync.status.atualizado_nuvem");
      },
      (erro) => {
        console.error(erro);
        atualizarUI("sync.status.erro_ouvir");
      }
    );
  }

  async function conectar(codigo, { criar }) {
    const id = normalizarCodigo(codigo);
    if (id.length < 6) {
      atualizarUI("sync.status.codigo_invalido");
      return;
    }

    const ref = db.collection("sync").doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      if (!criar) {
        atualizarUI("sync.status.codigo_nao_encontrado");
        return;
      }
      await ref.set(payloadAtual());
    } else if (!criar) {
      aplicarDadosRemotos(snap.data());
    }

    syncId = id;
    localStorage.setItem(CHAVE_SYNC, syncId);
    escutarSync(syncId);
    await enviarParaNuvem();
    atualizarUI(criar ? "sync.status.criado" : "sync.status.conectado");
    window.dispatchEvent(new CustomEvent("habitos-sync-conectado"));
  }

  async function criarSync() {
    await conectar(gerarCodigo(), { criar: true });
  }

  async function entrarComCodigo() {
    const entrada = $("sync-entrada-codigo");
    await conectar(entrada ? entrada.value : "", { criar: false });
  }

  function desconectar() {
    if (cancelarEscuta) {
      cancelarEscuta();
      cancelarEscuta = null;
    }
    syncId = "";
    localStorage.removeItem(CHAVE_SYNC);
    atualizarUI("sync.status.desconectado");
  }

  async function copiarCodigo() {
    if (!syncId) return;
    try {
      await navigator.clipboard.writeText(syncId);
      atualizarUI("sync.status.copiado");
    } catch (erro) {
      atualizarUI("sync.status.copia_falha", { codigo: syncId });
    }
  }

  window.agendarSyncNuvem = agendarSyncNuvem;
  window.syncEstaAplicandoRemoto = function () {
    return aplicandoRemoto;
  };

  window.initHabitosSync = async function initHabitosSync() {
    if (initHabitosSync._feito) return;
    initHabitosSync._feito = true;

    atualizarUI("sync.carregando");

    $("botao-sync-criar")?.addEventListener("click", () => {
      criarSync().catch((e) => {
        console.error(e);
        atualizarUI("sync.status.erro_criar");
      });
    });
    $("botao-sync-entrar")?.addEventListener("click", () => {
      entrarComCodigo().catch((e) => {
        console.error(e);
        atualizarUI("sync.status.erro_conectar");
      });
    });
    $("botao-sync-desconectar")?.addEventListener("click", desconectar);
    $("botao-sync-copiar")?.addEventListener("click", () => {
      copiarCodigo().catch(() => {});
    });

    if (!window.firebaseConfigurado || !window.firebaseConfigurado()) return;
    if (typeof firebase === "undefined") {
      atualizarUI("sync.status.firebase_lib");
      return;
    }

    try {
      if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
      db = firebase.firestore();
      await firebase.auth().signInAnonymously();
      pronto = true;
      if (syncId) {
        await conectar(syncId, { criar: true });
      } else {
        atualizarUI("sync.status.sem");
      }
    } catch (erro) {
      console.error(erro);
      atualizarUI("sync.status.firebase_init");
    }
  };
})();
