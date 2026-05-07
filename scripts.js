const navBtns = document.querySelectorAll('.nav-btn');
const pages   = document.querySelectorAll('.page');

function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navBtns.forEach(b => b.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  const targetBtn  = document.querySelector(`[data-page="${pageId}"]`);

  if (targetPage) {
    targetPage.classList.add('active');
    targetPage.querySelectorAll('.fade-in').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 50);
    });
  }
  if (targetBtn) targetBtn.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => showPage(btn.dataset.page));
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

function observeFadeIns() {
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
}
observeFadeIns();


const fotoEl = document.getElementById('foto-perfil');
const placeholderEl = document.getElementById('foto-placeholder');
if (fotoEl) {
  const mostrarFoto = () => {
    fotoEl.style.display = 'block';
    if (placeholderEl) placeholderEl.style.display = 'none';
  };
  const mostrarPlaceholder = () => {
    fotoEl.style.display = 'none';
    if (placeholderEl) placeholderEl.style.display = 'flex';
  };

  if (fotoEl.complete && fotoEl.naturalWidth > 0) {
    mostrarFoto();
  } else if (fotoEl.complete) {
    mostrarPlaceholder();
  } else {
    fotoEl.addEventListener('load', mostrarFoto);
    fotoEl.addEventListener('error', mostrarPlaceholder);
  }
}

const MEDAL_ORDER = { ouro: 0, prata: 1, bronze: 2, mencao: 3 };

function renderProjetos() {
  const container = document.getElementById('projetos-lista');
  if (!container || typeof PROJETOS === 'undefined') return;

  container.innerHTML = PROJETOS.map((p, i) => `
    <div class="card fade-in" style="animation-delay:${i * 0.07}s">
      <img src="${p.image}" alt="${p.title}" onerror="this.style.display='none'">
      <h3>${p.title}</h3>
      <p class="card-subtitle">${p.subtitle}</p>
      <button class="toggle-desc">Ver mais</button>
      <div class="descricao">
        <p>${p.desc}</p>
        ${p.link ? `<a href="${p.link}" target="_blank" class="card-link">↗ GitHub</a>` : ''}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.toggle-desc').forEach(btn => {
    btn.addEventListener('click', () => {
      const desc = btn.nextElementSibling;
      desc.classList.toggle('open');
      btn.textContent = desc.classList.contains('open') ? 'Ver menos' : 'Ver mais';
    });
  });

  observeFadeIns();
}


function renderOlimpiadas() {
  const container = document.getElementById('olimpiadas-por-ano');
  if (!container || typeof OLIMPIADAS === 'undefined') return;

  const porAno = {};
  OLIMPIADAS.forEach(o => {
    if (!porAno[o.ano]) porAno[o.ano] = [];
    porAno[o.ano].push(o);
  });

  const anos = Object.keys(porAno).map(Number).sort((a, b) => b - a);

  const medalhaLabel = {
    ouro:   '🥇 Ouro',
    prata:  '🥈 Prata',
    bronze: '🥉 Bronze',
    mencao: '✦ Menção Honrosa',
  };

  const html = anos.map(ano => {
    const premios = porAno[ano].slice().sort((a, b) => {
      if (a.tipo !== b.tipo) return a.tipo === 'nacional' ? -1 : 1;
      return MEDAL_ORDER[a.medalha] - MEDAL_ORDER[b.medalha];
    });

    const linhas = premios.map(p => `
      <tr class="medalha-${p.medalha}">
        <td class="olim-nome">${p.nome}</td>
        <td class="olim-medalha">${medalhaLabel[p.medalha]}</td>
        <td class="olim-tipo">${p.tipo === 'nacional' ? 'Nacional' : 'Regional'}</td>
      </tr>
    `).join('');

    return `
      <div class="ano-bloco fade-in">
        <h3 class="ano-titulo">${ano}</h3>
        <table class="olim-table">
          <thead>
            <tr>
              <th>Olimpíada</th>
              <th>Medalha</th>
              <th>Abrangência</th>
            </tr>
          </thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
  observeFadeIns();
}


renderProjetos();
renderOlimpiadas();


document.querySelectorAll('#page-sobre .fade-in').forEach(el => {
  setTimeout(() => el.classList.add('visible'), 100);
});