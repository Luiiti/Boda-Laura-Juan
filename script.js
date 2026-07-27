/* =========================================================
   CONFIGURACIÓN PRINCIPAL · Laura & Juan v1.3
   ========================================================= */
const CONFIG = {
  weddingDate: "2027-08-28T18:00:00+02:00",
  mapsUrl: "https://www.google.com/maps/place/36%C2%B020%2705.7%22N+5%C2%B049%2707.6%22W/@36.33491,-5.818775,17z/data=!4m4!3m3!8m2!3d36.3349167!4d-5.8187778",
  rsvpUrl: ""
};

const backgroundMusic = document.getElementById("backgroundMusic");
const musicControl = document.getElementById("musicControl");
const musicLabel = document.getElementById("musicLabel");
let fadeTimer;

backgroundMusic.volume = 0;

function fadeVolume(target, duration = 2400) {
  window.clearInterval(fadeTimer);
  const start = backgroundMusic.volume;
  const steps = 30;
  let current = 0;
  fadeTimer = window.setInterval(() => {
    current += 1;
    backgroundMusic.volume = Math.max(0, Math.min(1, start + (target - start) * current / steps));
    if (current >= steps) window.clearInterval(fadeTimer);
  }, duration / steps);
}

async function startMusic() {
  try {
    await backgroundMusic.play();
    musicControl.hidden = false;
    musicControl.classList.remove("paused");
    musicControl.setAttribute("aria-label", "Pausar música");
    musicLabel.textContent = "Música";
    fadeVolume(0.48);
  } catch (error) {
    musicControl.hidden = false;
    musicControl.classList.add("paused");
    musicControl.setAttribute("aria-label", "Reproducir música");
    musicLabel.textContent = "Reproducir";
  }
}

musicControl.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      fadeVolume(0.48, 900);
      musicControl.classList.remove("paused");
      musicControl.setAttribute("aria-label", "Pausar música");
      musicLabel.textContent = "Música";
    } catch (error) {
      musicLabel.textContent = "Reproducir";
    }
  } else {
    fadeVolume(0, 450);
    window.setTimeout(() => backgroundMusic.pause(), 480);
    musicControl.classList.add("paused");
    musicControl.setAttribute("aria-label", "Reproducir música");
    musicLabel.textContent = "Pausada";
  }
});

/* APERTURA DE LA CAJA */
const envelopeScreen = document.getElementById("envelopeScreen");
const invitation = document.getElementById("invitation");
const openInvitation = document.getElementById("openInvitation");
const openingPetals = document.getElementById("openingPetals");
let isOpening = false;

function createOpeningPetals() {
  const pieces = ["leaf", "flower", "leaf", "flower", "flower", "leaf"];
  openingPetals.innerHTML = "";
  pieces.forEach((type, index) => {
    const piece = document.createElement("i");
    piece.className = `opening-piece ${type}`;
    piece.style.setProperty("--x", `${20 + Math.random() * 60}%`);
    piece.style.setProperty("--drift", `${-55 + Math.random() * 110}px`);
    piece.style.setProperty("--delay", `${index * 65}ms`);
    piece.style.setProperty("--turn", `${120 + Math.random() * 260}deg`);
    openingPetals.appendChild(piece);
  });
}

openInvitation.addEventListener("click", () => {
  if (isOpening) return;
  isOpening = true;
  openInvitation.disabled = true;
  startMusic();
  createOpeningPetals();
  envelopeScreen.classList.add("seal-pressed");

  window.setTimeout(() => envelopeScreen.classList.add("opening"), 230);
  window.setTimeout(() => openingPetals.classList.add("active"), 320);

  window.setTimeout(() => {
    envelopeScreen.style.display = "none";
    invitation.classList.add("visible");
    invitation.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, behavior: "auto" });
    revealVisibleElements();
  }, 1320);
});

/* BOTONES */
function configureLink(id, url, fallbackMessage) {
  const element = document.getElementById(id);
  if (!element) return;
  if (url && url.trim() !== "") {
    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
    element.removeAttribute("aria-disabled");
    return;
  }
  element.addEventListener("click", event => {
    event.preventDefault();
    window.alert(fallbackMessage);
  });
}

configureLink("mapsButton", CONFIG.mapsUrl, "La ubicación se añadirá próximamente.");
configureLink("rsvpButton", CONFIG.rsvpUrl, "El formulario de asistencia estará disponible próximamente.");

/* CUENTA ATRÁS */
function updateCountdown() {
  const target = new Date(CONFIG.weddingDate).getTime();
  const distance = target - Date.now();
  const countdown = document.querySelector(".countdown");
  if (!countdown) return;
  if (distance <= 0) {
    countdown.innerHTML = "<div style='grid-column:1/-1'><strong>¡Hoy es el gran día!</strong></div>";
    return;
  }
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

/* ANIMACIONES AL HACER SCROLL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
function revealVisibleElements() {
  document.querySelectorAll(".reveal").forEach(element => {
    if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add("visible");
  });
}
