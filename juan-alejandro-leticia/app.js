(() => {
  'use strict';
  const config = window.WEDDING_CONFIG || {};
  const cover = document.getElementById('cover');
  const invitation = document.getElementById('invitation');
  const opener = document.getElementById('open-invitation');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let opening = false;
  let focusTimer;

  function openInvitation() {
    if (opening) return;
    opening = true;
    cover.classList.add('is-opening');
    opener.setAttribute('aria-expanded', 'true');
    document.getElementById('open-prompt').disabled = true;
    window.setTimeout(() => {
      invitation.inert = false;
      invitation.setAttribute('aria-hidden', 'false');
      document.body.classList.remove('envelope-visible');
      document.body.classList.add('invitation-open');
      window.WeddingStory?.start();
      window.scrollTo({ top: 0, behavior: 'instant' });
      cover.inert = true;
      cover.setAttribute('aria-hidden', 'true');
      focusTimer = window.setTimeout(() => {
        const title = document.getElementById('names-heading');
        title.tabIndex = -1;
        title.focus({ preventScroll: true });
      }, reducedMotion.matches ? 0 : 700);
    }, reducedMotion.matches ? 80 : 2250);
  }
  function replayEnvelope() {
    window.clearTimeout(focusTimer);
    window.WeddingStory?.reset();
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.classList.remove('invitation-open');
    document.body.classList.add('envelope-visible');
    invitation.inert = true;
    invitation.setAttribute('aria-hidden', 'true');
    cover.inert = false;
    cover.removeAttribute('aria-hidden');
    cover.classList.remove('is-opening');
    opener.setAttribute('aria-expanded', 'false');
    document.getElementById('open-prompt').disabled = false;
    opening = false;
    opener.focus({ preventScroll: true });
  }
  opener.addEventListener('click', openInvitation);
  document.getElementById('open-prompt').addEventListener('click', openInvitation);
  document.getElementById('replay').addEventListener('click', replayEnvelope);
  document.getElementById('footer-replay').addEventListener('click', replayEnvelope);

  const weddingTime = new Date(config.weddingDate || '2027-04-24T12:00:00+02:00').getTime();
  function updateCountdown() {
    const remaining = Math.max(0, weddingTime - Date.now());
    const seconds = Math.floor(remaining / 1000);
    document.getElementById('days').textContent = String(Math.floor(seconds / 86400)).padStart(2, '0');
    document.getElementById('hours').textContent = String(Math.floor(seconds / 3600) % 24).padStart(2, '0');
    document.getElementById('minutes').textContent = String(Math.floor(seconds / 60) % 60).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds % 60).padStart(2, '0');
    if (remaining === 0) {
      document.getElementById('countdown-title').textContent = '¡Ha llegado nuestro día!';
      document.getElementById('countdown-caption').textContent = 'Gracias por formar parte de nuestra historia.';
    }
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  function validHttpsUrl(value) {
    try { return new URL(value).protocol === 'https:'; } catch { return false; }
  }
  if (validHttpsUrl(config.mapsUrl)) document.getElementById('directions').href = config.mapsUrl;
  const rsvpButton = document.getElementById('rsvp-button');
  const dialog = document.getElementById('rsvp-dialog');
  if (validHttpsUrl(config.googleFormUrl)) {
    rsvpButton.href = config.googleFormUrl;
    rsvpButton.target = '_blank';
    rsvpButton.rel = 'noopener noreferrer';
    rsvpButton.removeAttribute('aria-haspopup');
    document.getElementById('rsvp-status').textContent = 'Solo te llevará un momento. ¡Gracias por acompañarnos!';
  } else {
    rsvpButton.addEventListener('click', event => { event.preventDefault(); dialog.showModal(); });
  }
  document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
  document.getElementById('dialog-understood').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  }});

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('can-reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
})();
