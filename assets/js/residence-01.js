(() => {
  const reveals = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reveals.forEach((item) => observer.observe(item));
  } else { reveals.forEach((item) => item.classList.add('visible')); }

  const figures = [...document.querySelectorAll('[data-lightbox]')];
  const box = document.querySelector('.lightbox');
  const image = box.querySelector('img');
  const count = box.querySelector('.lightbox-count');
  let current = 0;
  const show = (index) => {
    current = (index + figures.length) % figures.length;
    const figure = figures[current];
    const source = figure.dataset.lightbox;
    image.src = source;
    image.alt = figure.querySelector('img')?.alt || '';
    count.textContent = `${current + 1} / ${figures.length}`;
  };
  const open = (index) => { show(index); box.classList.add('open'); box.setAttribute('aria-hidden','false'); document.body.classList.add('lightbox-open'); };
  const close = () => { box.classList.remove('open'); box.setAttribute('aria-hidden','true'); document.body.classList.remove('lightbox-open'); image.removeAttribute('src'); };
  figures.forEach((figure,index) => {
    figure.tabIndex = 0; figure.setAttribute('role','button');
    figure.addEventListener('click',() => open(index));
    figure.addEventListener('keydown',(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(index); } });
  });
  box.querySelector('.lightbox-close').addEventListener('click',close);
  box.querySelector('.lightbox-prev').addEventListener('click',(e) => { e.stopPropagation(); show(current-1); });
  box.querySelector('.lightbox-next').addEventListener('click',(e) => { e.stopPropagation(); show(current+1); });
  box.addEventListener('click',(e) => { if (e.target === box) close(); });
  document.addEventListener('keydown',(e) => { if (!box.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(current-1); if (e.key === 'ArrowRight') show(current+1); });
})();
