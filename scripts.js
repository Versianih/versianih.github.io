const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Expansão de descrição dos projetos
document.querySelectorAll('.toggle-desc').forEach(button => {
  button.addEventListener('click', () => {
    const desc = button.nextElementSibling;
    desc.classList.toggle('open');
    button.textContent = desc.classList.contains('open') ? 'Ver menos' : 'Ver mais';
  });
});

// Mostrar mais projetos
const verMaisProjetos = document.getElementById('ver-mais-projetos');
const projetosExtras = document.querySelectorAll('#projetos-lista .extra');
verMaisProjetos.addEventListener('click', () => {
  projetosExtras.forEach(p => p.classList.toggle('show'));
  verMaisProjetos.textContent =
    projetosExtras[0].classList.contains('show')
      ? 'Ver menos projetos'
      : 'Ver mais projetos';
});

// Mostrar mais premiações
const verMaisPremios = document.getElementById('ver-mais-premios');
const premiosExtras = document.querySelectorAll('#olimpiadas-lista .extra');
verMaisPremios.addEventListener('click', () => {
  premiosExtras.forEach(p => p.classList.toggle('show'));
  verMaisPremios.textContent =
    premiosExtras[0].classList.contains('show')
      ? 'Ver menos premiações'
      : 'Ver mais premiações';
});