const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

const demoVideos = document.querySelectorAll('.demo-video');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(({ target: video, isIntersecting }) => {
      if (isIntersecting && !reduceMotion.matches) video.play().catch(() => {});
      else video.pause();
    });
  }, { rootMargin: '100px 0px', threshold: 0.3 });
  demoVideos.forEach(video => videoObserver.observe(video));
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
  lightboxImage.src = button.dataset.lightbox;
  lightboxImage.alt = button.dataset.caption || 'Expanded figure';
  lightboxCaption.textContent = button.dataset.caption || '';
  lightbox.showModal();
}));
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
document.getElementById('year').textContent = String(new Date().getFullYear());
