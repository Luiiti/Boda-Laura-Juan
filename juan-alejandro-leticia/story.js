/* A single, cancellable drawing sequence. Real SVG strokes reveal the original
   handwriting through individual curved masks; no rectangular wipe is used. */
(() => {
  'use strict';
  const hero = document.getElementById('inicio');
  const entry = document.getElementById('arriving-thread');
  const hands = [...hero.querySelectorAll('.hand-stroke')];
  const lettering = [...hero.querySelectorAll('.writing-stroke')];
  const outlines = [...hero.querySelectorAll('.signature-ink')];
  const allPaths = [entry, ...hands, ...lettering];
  const control = document.getElementById('story-control');
  const tip = document.getElementById('thread-tip');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  let generation = 0;
  let running = false;
  let frame = 0;

  function stop() {
    generation += 1;
    active.forEach(animation => animation.cancel());
    active.clear();
    cancelAnimationFrame(frame);
    tip.setAttribute('opacity', '0');
    running = false;
  }
  function reset() {
    stop();
    hero.classList.add('story-ready');
    hero.classList.remove('story-finished', 'hands-finished', 'is-writing');
    allPaths.forEach(path => {
      path.style.strokeDasharray = '1 1';
      path.style.strokeDashoffset = '1';
    });
    outlines.forEach((outline,i) => outline.setAttribute('mask', `url(#write-name-${i})`));
    control.querySelector('span').textContent = 'Saltar animación';
    control.setAttribute('aria-label', 'Saltar la animación del dibujo y la escritura');
  }
  function finish() {
    stop();
    allPaths.forEach(path => { path.style.strokeDashoffset = '0'; });
    outlines.forEach(outline => outline.removeAttribute('mask'));
    hero.classList.add('hands-finished', 'story-finished');
    hero.classList.remove('is-writing');
    control.querySelector('span').textContent = 'Volver a dibujar';
    control.setAttribute('aria-label', 'Repetir el hilo, el dibujo de las manos y la escritura');
  }
  async function draw(path, duration, token, follow = false) {
    if (token !== generation) return false;
    const animation = path.animate([{strokeDashoffset:'1'}, {strokeDashoffset:'0'}], {
      duration, easing:'linear', fill:'forwards'
    });
    active.add(animation);
    if (follow) {
      const started = performance.now();
      const total = path.getTotalLength();
      const hand = path.classList.contains('hand-stroke');
      tip.setAttribute('opacity', '.8');
      const tick = now => {
        if (token !== generation) return;
        const progress = Math.min(1, Math.max(0,(now-started)/duration));
        const point = path.getPointAtLength(total*progress);
        tip.setAttribute('cx', String(hand ? point.x*.5+275 : point.x));
        tip.setAttribute('cy', String(hand ? point.y*.5+10 : point.y));
        if (progress<1) frame=requestAnimationFrame(tick);
      };
      frame=requestAnimationFrame(tick);
    }
    try { await animation.finished; }
    catch { return false; }
    if (token !== generation) return false;
    path.style.strokeDashoffset='0';
    animation.cancel();
    active.delete(animation);
    cancelAnimationFrame(frame);
    return true;
  }
  async function pause(duration, token) {
    const animation=hero.animate([{opacity:1},{opacity:1}],{duration});
    active.add(animation);
    try { await animation.finished; } catch { return false; }
    active.delete(animation);
    return token===generation;
  }
  async function start() {
    reset();
    if (reduce.matches || !Element.prototype.animate) { finish(); return; }
    running = true;
    const token = generation;
    if (!await pause(350, token)) return;
    if (!await draw(entry, 1250, token, true)) return;
    const handTotal = hands.reduce((sum,path) => sum+Number(path.dataset.length),0);
    for (const path of hands) {
      if (!await draw(path, Math.max(35, 2950*Number(path.dataset.length)/handTotal),token,true)) return;
    }
    tip.setAttribute('opacity','0');
    hero.classList.add('hands-finished');
    if (!await pause(300,token)) return;
    hero.classList.add('is-writing');
    const nameTotal = lettering.reduce((sum,path) => sum+Number(path.dataset.length),0);
    for (const path of lettering) {
      if (!await draw(path, Math.max(18,3650*Number(path.dataset.length)/nameTotal),token)) return;
    }
    if (token===generation) finish();
  }
  control.addEventListener('click', () => running ? finish() : start());
  reduce.addEventListener?.('change', () => { if (reduce.matches) finish(); });
  window.WeddingStory = { start, reset, finish };
  reset();
})();
