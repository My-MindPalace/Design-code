// Password gate
(function() {
  const PASSWORD = '123';
  const gate = document.getElementById('gate');
  const input = document.getElementById('gate-input');
  const btn = document.getElementById('gate-btn');
  const hint = document.getElementById('gate-hint');

  if (sessionStorage.getItem('unlocked') === '1') {
    gate.classList.add('hidden');
    setTimeout(() => gate.remove(), 600);
    return;
  }

  function attempt() {
    if (input.value === PASSWORD) {
      sessionStorage.setItem('unlocked', '1');
      gate.classList.add('hidden');
      setTimeout(() => gate.remove(), 600);
    } else {
      input.classList.remove('wrong');
      void input.offsetWidth;
      input.classList.add('wrong');
      hint.textContent = 'nope. try again 🐾';
      input.value = '';
      setTimeout(() => input.classList.remove('wrong'), 400);
    }
  }

  btn.addEventListener('click', attempt);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });
})();

const cards = document.querySelectorAll('.work-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
  const vid = card.querySelector('video.work-card-img');
  if (vid) {
    card.addEventListener('mouseenter', () => { vid.play().catch(() => {}); });
    card.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.project-row, .work-card, .section-heading').forEach(el => {
  observer.observe(el);
});
