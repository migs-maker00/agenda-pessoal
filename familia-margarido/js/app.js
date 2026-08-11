/* Família Margarido™ — Application */

(function () {
  'use strict';

  // ─── State ───
  let crestClicks = 0;
  let titleClicks = 0;
  let currentRankingCategory = 'default';
  let activeGenNode = null;

  // ─── DOM Refs ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ─── Init ───
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    renderMembers();
    renderDashboard();
    renderGenealogy();
    renderRanking();
    renderTimeline();
    renderDocuments();
    setupNavigation();
    setupScrollReveal();
    setupHeaderScroll();
    setupEasterEggs();
    setupFooterEaster();
  }

  // ─── Render Members ───
  function renderMembers() {
    const grid = $('#members-grid');
    if (!grid) return;

    grid.innerHTML = FAMILY_MEMBERS.map(m => `
      <article class="member-card reveal" data-id="${m.id}">
        ${m.badge ? `<span class="member-badge">${m.badge}</span>` : ''}
        <div class="member-card-photo">
          <div class="member-card-photo-bg" style="background: linear-gradient(135deg, ${m.color}, var(--black))">
            <span class="member-initials">${m.initials}</span>
          </div>
          ${m.hasBeltAnimation ? '<div class="belt-animation"></div>' : ''}
        </div>
        <div class="member-card-body">
          <div class="member-card-tier">${TIER_LABELS[m.tier]?.emoji || ''} ${m.relationship}</div>
          <h3 class="member-card-name">${m.name}</h3>
          <p class="member-card-role">${m.role}</p>
          <p class="member-card-desc">${m.description}</p>
          <div class="member-card-stats">
            ${m.stats.slice(0, 3).map(s => `<span class="stat-pill">${s.label}: ${s.value}%</span>`).join('')}
          </div>
          <button class="member-card-btn" data-id="${m.id}">VER PERFIL →</button>
        </div>
      </article>
    `).join('');

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.member-card');
      const btn = e.target.closest('.member-card-btn');
      if (card || btn) {
        const id = (btn || card).dataset.id;
        openProfile(id);
      }
    });

    observeReveal(grid.querySelectorAll('.reveal'));
  }

  // ─── Profile Modal ───
  function openProfile(id) {
    const member = getMemberById(id);
    if (!member) return;

    const content = $('#modal-content');
    content.innerHTML = `
      <div class="profile-hero">
        <div class="profile-hero-bg" style="background: linear-gradient(135deg, ${member.color}, var(--navy))"></div>
        <span class="profile-initials">${member.initials}</span>
      </div>
      <div class="profile-body">
        <h2 class="profile-name">${member.name}</h2>
        <p class="profile-role">${member.role}</p>
        <p class="profile-desc">${member.description}</p>
        <div class="profile-stats">
          ${member.stats.map(s => `
            <div class="profile-stat">
              <div class="profile-stat-header">
                <span>${s.label}</span>
                <span>${s.value}%</span>
              </div>
              <div class="profile-stat-bar">
                <div class="profile-stat-fill" data-value="${s.value}"></div>
              </div>
            </div>
          `).join('')}
        </div>
        ${member.quote ? `<blockquote class="profile-quote">"${member.quote}"</blockquote>` : ''}
        ${member.hoverQuote ? `<p style="font-size:0.8rem;opacity:0.5;font-style:italic;margin-bottom:1.5rem">${member.hoverQuote}</p>` : ''}
        <div>
          <span class="profile-classification">${member.classification}</span>
          ${member.badge ? `<span class="profile-badge">${member.badge}</span>` : ''}
        </div>
        ${member.easterEgg === 'confidential' ? '<div class="profile-confidential" id="confidential-btn">ARQUIVO CONFIDENCIAL</div>' : ''}
      </div>
    `;

    openModal('profile-modal');

    requestAnimationFrame(() => {
      content.querySelectorAll('.profile-stat-fill').forEach(bar => {
        bar.style.width = bar.dataset.value + '%';
      });
    });

    if (member.easterEgg === 'pedrinho-exe') {
      setTimeout(() => showPedrinhoExe(), 800);
    }

    if (member.easterEgg === 'taekwondo') {
      content.addEventListener('click', triggerTaekwondo, { once: true });
    }

    const confBtn = $('#confidential-btn');
    if (confBtn) {
      confBtn.addEventListener('click', () => {
        showEasterModal(
          '<h3>Acesso negado.</h3><p>Nem nós sabemos o que tem aqui.</p>'
        );
      });
    }
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  // Modal close handlers
  ['modal-close', 'modal-backdrop', 'doc-close', 'doc-backdrop', 'easter-backdrop'].forEach(elId => {
    const el = document.getElementById(elId);
    if (el) {
      el.addEventListener('click', () => {
        closeModal('profile-modal');
        closeModal('doc-modal');
        closeModal('easter-modal');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('profile-modal');
      closeModal('doc-modal');
      closeModal('easter-modal');
    }
  });

  // ─── Dashboard ───
  function renderDashboard() {
    const grid = $('#dashboard-grid');
    if (!grid) return;

    grid.innerHTML = DASHBOARD_STATS.map(s => `
      <div class="dashboard-card reveal">
        <div class="dashboard-label">${s.label}</div>
        <div class="dashboard-bar-wrap">
          ${s.special ? '' : `<div class="dashboard-bar"><div class="dashboard-bar-fill" data-value="${s.value}"></div></div>`}
          <div class="dashboard-value ${s.special ? 'infinity' : ''}" data-target="${s.value}" data-special="${s.special || ''}">${s.special || '0'}${s.suffix}</div>
        </div>
      </div>
    `).join('');

    observeReveal(grid.querySelectorAll('.reveal'));
  }

  function animateDashboard() {
    $$('.dashboard-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.value + '%';
    });
    $$('.dashboard-value:not(.infinity)').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;
      animateCounter(el, 0, target, 1500, el.textContent.includes('%') ? '%' : '');
    });
  }

  function animateCounter(el, start, end, duration, suffix) {
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ─── Genealogy ───
  function renderGenealogy() {
    const tree = $('#gen-tree');
    if (!tree) return;

    tree.innerHTML = GENEALOGY.generations.map(gen => `
      <div class="gen-generation">
        <div class="gen-gen-label">${gen.label}</div>
        <div class="gen-row">
          ${gen.members.map(id => {
            const m = getMemberById(id);
            const tier = TIER_LABELS[m.tier];
            return `
              <div class="gen-node" data-id="${id}" style="border-color: ${getTierColor(m.tier)}">
                <div class="gen-node-name">${m.name}</div>
                <div class="gen-node-role">${m.role.split(' ').slice(0, 3).join(' ')}…</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    tree.addEventListener('click', (e) => {
      const node = e.target.closest('.gen-node');
      if (!node) return;
      selectGenNode(node.dataset.id);
    });
  }

  function getTierColor(tier) {
    const colors = { core: '#22c55e44', extended: '#eab30844', council: '#3b82f644', chaos: '#ef444444' };
    return colors[tier] || 'var(--glass-border)';
  }

  function selectGenNode(id) {
    const member = getMemberById(id);
    if (!member) return;

    activeGenNode = id;
    $$('.gen-node').forEach(n => {
      n.classList.remove('active', 'highlighted', 'dimmed');
      if (n.dataset.id === id) {
        n.classList.add('active');
      } else if (GENEALOGY.relations[id]?.includes(n.dataset.id)) {
        n.classList.add('highlighted');
      } else {
        n.classList.add('dimmed');
      }
    });

    const detail = $('#gen-detail');
    const relations = (GENEALOGY.relations[id] || [])
      .map(rid => getMemberById(rid)?.name)
      .filter(Boolean);

    detail.innerHTML = `
      <strong>${member.name}</strong> — ${member.relationship}<br>
      <span style="opacity:0.7;font-size:0.85rem">${member.role}</span>
      ${relations.length ? `<br><span style="opacity:0.6;font-size:0.8rem;margin-top:0.5rem;display:inline-block">Conexões: ${relations.join(', ')}</span>` : ''}
      <br><button class="btn btn-outline" style="margin-top:1rem;min-width:auto;padding:0.5rem 1.5rem;font-size:0.6rem" onclick="document.dispatchEvent(new CustomEvent('open-profile', {detail:'${id}'}))">Ver perfil completo</button>
    `;
    detail.classList.add('visible');
  }

  document.addEventListener('open-profile', (e) => {
    openProfile(e.detail);
  });

  // ─── Ranking ───
  function renderRanking() {
    renderRankingTabs();
    renderRankingList('default');
  }

  function renderRankingTabs() {
    const tabs = $('#ranking-tabs');
    if (!tabs) return;

    const categories = [
      { key: 'default', label: 'GERAL' },
      ...Object.values(RANKING_CATEGORIES)
    ];

    tabs.innerHTML = categories.map(c => `
      <button class="ranking-tab ${c.key === 'default' ? 'active' : ''}" data-cat="${c.key}">${c.label}</button>
    `).join('');

    tabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.ranking-tab');
      if (!tab) return;
      $$('.ranking-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentRankingCategory = tab.dataset.cat;
      renderRankingList(currentRankingCategory);
    });
  }

  function renderRankingList(category) {
    const list = $('#ranking-list');
    if (!list) return;

    let items;
    if (category === 'default') {
      items = RANKING_DEFAULT.map((r, i) => ({
        ...r,
        member: getMemberById(r.id),
        position: i + 1,
        score: null
      }));
    } else {
      items = FAMILY_MEMBERS
        .map(m => ({
          id: m.id,
          member: m,
          category: RANKING_CATEGORIES[category]?.label || category,
          score: m.rankingCategories[category] || 0
        }))
        .sort((a, b) => b.score - a.score)
        .map((item, i) => ({ ...item, position: i + 1 }));
    }

    list.innerHTML = items.map(item => {
      const medal = item.position <= 3 ? `medal-${item.position}` : '';
      const medalEmoji = item.position === 1 ? '🥇' : item.position === 2 ? '🥈' : item.position === 3 ? '🥉' : `${item.position}º`;
      return `
        <div class="ranking-item" data-id="${item.id}" style="order: ${item.position}">
          <div class="ranking-pos ${medal}">${medalEmoji}</div>
          <div class="ranking-info">
            <div class="ranking-name">${item.member.name}</div>
            <div class="ranking-cat">${item.category || ''}</div>
          </div>
          ${item.score !== null && item.score !== undefined ? `<div class="ranking-score">${item.score}%</div>` : ''}
        </div>
      `;
    }).join('');

    list.querySelectorAll('.ranking-item').forEach(el => {
      el.addEventListener('click', () => openProfile(el.dataset.id));
    });
  }

  // ─── Timeline ───
  function renderTimeline() {
    const container = $('#timeline');
    if (!container) return;

    container.innerHTML = TIMELINE.map(item => `
      <div class="timeline-item">
        ${item.era ? `<div class="timeline-era">${item.era}</div>` : ''}
        ${item.year ? `<div class="timeline-year">${item.year}</div>` : ''}
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-desc">${item.description}</p>
      </div>
    `).join('');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.3 });

    container.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
  }

  // ─── Documents ───
  function renderDocuments() {
    const grid = $('#docs-grid');
    if (!grid) return;

    grid.innerHTML = DOCUMENTS.map(doc => `
      <div class="doc-card reveal" data-doc="${doc.id}">
        <div class="doc-id">DOCUMENTO ${doc.id}</div>
        <h3 class="doc-title">${doc.title}</h3>
      </div>
    `).join('');

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.doc-card');
      if (!card) return;
      const doc = DOCUMENTS.find(d => d.id === card.dataset.doc);
      if (doc) openDocument(doc);
    });

    observeReveal(grid.querySelectorAll('.reveal'));
  }

  function openDocument(doc) {
    $('#doc-content').innerHTML = `
      <div class="doc-modal-header">
        <div class="doc-id">DOCUMENTO ${doc.id}</div>
        <h3>${doc.title}</h3>
      </div>
      <div class="doc-modal-body">${doc.content}</div>
    `;
    openModal('doc-modal');
  }

  // ─── Navigation ───
  function setupNavigation() {
    const toggle = $('#nav-toggle');
    const menu = $('#nav-menu');

    toggle?.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
    });

    menu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
      });
    });
  }

  function setupHeaderScroll() {
    const header = $('#header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ─── Scroll Reveal ───
  function setupScrollReveal() {
    observeReveal($$('.reveal'));
  }

  function observeReveal(elements) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.closest('#dashboard-grid')) {
            animateDashboard();
          }
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  }

  // ─── Easter Eggs ───
  function setupEasterEggs() {
    // EE1: Crest 7 clicks
    $('#crest')?.addEventListener('click', () => {
      crestClicks++;
      if (crestClicks === 7) {
        showEasterModal(
          '<h3>Você desbloqueou o nível secreto da Família Margarido.</h3><p>Não muda absolutamente nada.</p>'
        );
        crestClicks = 0;
      }
    });

    // EE2: Hidden button
    $('#easter-hidden-btn')?.addEventListener('click', () => {
      showEasterModal(
        '<h3>Eu literalmente pedi para você não clicar.</h3><p>Curiosidade detectada: +10 pontos.</p>'
      );
    });

    // EE3: Title clicks
    const titleEl = $('#hero-title');
    titleEl?.addEventListener('click', () => {
      titleClicks++;
      if (titleClicks >= 5) {
        triggerChaosLoader();
        titleClicks = 0;
      }
    });

    $('#nav-logo')?.addEventListener('click', (e) => {
      e.preventDefault();
      titleClicks++;
      if (titleClicks >= 5) {
        triggerChaosLoader();
        titleClicks = 0;
      }
    });
  }

  function triggerChaosLoader() {
    const loader = $('#loader');
    const fill = loader.querySelector('.loader-fill');
    const percent = loader.querySelector('.loader-percent');
    let errorEl = loader.querySelector('.loader-error');

    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.className = 'loader-error';
      errorEl.textContent = 'Erro: organização não encontrada.';
      loader.querySelector('.loader-content').appendChild(errorEl);
    }

    loader.classList.add('active');
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        fill.style.width = '100%';
        percent.textContent = '100%';
        setTimeout(() => errorEl.classList.add('show'), 400);
        setTimeout(() => {
          loader.classList.remove('active');
          fill.style.width = '0%';
          percent.textContent = '0%';
          errorEl.classList.remove('show');
        }, 3000);
      } else {
        fill.style.width = progress + '%';
        percent.textContent = Math.round(progress) + '%';
      }
    }, 150);
  }

  function showPedrinhoExe() {
    closeModal('profile-modal');
    showEasterModal(
      '<h3>PEDRINHO.EXE PAROU DE FUNCIONAR.</h3><p>O estagiário oficial do caos encontrou um bug existencial.</p><button class="easter-btn" id="restart-pedrinho">REINICIAR PEDRINHO</button>'
    );
    setTimeout(() => {
      $('#restart-pedrinho')?.addEventListener('click', () => {
        showEasterModal('<h3>Ele voltou.</h3><p>Por quanto tempo, ninguém sabe.</p>');
        setTimeout(() => closeModal('easter-modal'), 2000);
      });
    }, 100);
  }

  function triggerTaekwondo() {
    const overlay = $('#taekwondo-overlay');
    overlay.classList.add('active');
    playImpactSound();
    setTimeout(() => overlay.classList.remove('active'), 2500);
  }

  function playImpactSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch (_) { /* audio optional */ }
  }

  function showEasterModal(html) {
    $('#easter-content').innerHTML = `<div class="easter-msg">${html}</div>`;
    openModal('easter-modal');
    setTimeout(() => {
      $('#easter-content').addEventListener('click', (e) => {
        if (e.target.classList.contains('easter-btn')) return;
        if (!e.target.closest('.easter-btn')) {
          // allow click outside to close after delay
        }
      });
    }, 100);
  }

  function setupFooterEaster() {
    const el = $('#footer-easter');
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.textContent = 'Por quê?';
          }, 3000);
        }
      });
    }, { threshold: 1 });

    observer.observe(el);
  }

})();
