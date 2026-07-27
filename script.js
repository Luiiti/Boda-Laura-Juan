/* =========================================================
   CONFIGURACIÓN PRINCIPAL
   Sustituye los valores vacíos cuando tengas los datos.
   ========================================================= */

const CONFIG = {
  weddingDate: "2027-08-28T18:00:00+02:00",
  mapsUrl: "",
  rsvpUrl: ""
};


/* MÚSICA: comienza al pulsar el sello, permitido por iPhone */
const backgroundMusic = document.getElementById("backgroundMusic");
const musicControl = document.getElementById("musicControl");
const musicLabel = document.getElementById("musicLabel");

backgroundMusic.volume = 0;

async function startMusic() {
  try {
    await backgroundMusic.play();
    musicControl.hidden = false;
    musicControl.classList.remove("paused");
    musicControl.setAttribute("aria-label", "Pausar música");
    musicLabel.textContent = "Música";

    // Entrada suave de 2,5 segundos.
    const targetVolume = 0.48;
    const steps = 25;
    let step = 0;
    const fade = window.setInterval(() => {
      step += 1;
      backgroundMusic.volume = Math.min(targetVolume, targetVolume * step / steps);
      if (step >= steps) window.clearInterval(fade);
    }, 100);
  } catch (error) {
    // Algunos navegadores pueden pedir un segundo toque.
    musicControl.hidden = false;
    musicControl.classList.add("paused");
    musicControl.setAttribute("aria-label", "Reproducir música");
    musicLabel.textContent = "Reproducir";
  }
}

musicControl.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    await backgroundMusic.play();
    backgroundMusic.volume = 0.48;
    musicControl.classList.remove("paused");
    musicControl.setAttribute("aria-label", "Pausar música");
    musicLabel.textContent = "Música";
  } else {
    backgroundMusic.pause();
    musicControl.classList.add("paused");
    musicControl.setAttribute("aria-label", "Reproducir música");
    musicLabel.textContent = "Pausada";
  }
});


/* APERTURA DE LA INVITACIÓN */
const envelopeScreen = document.getElementById("envelopeScreen");
const invitation = document.getElementById("invitation");
const openInvitation = document.getElementById("openInvitation");

openInvitation.addEventListener("click", () => {
  startMusic();
  envelopeScreen.classList.add("opening");

  window.setTimeout(() => {
    envelopeScreen.style.display = "none";
    invitation.classList.add("visible");
    invitation.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, behavior: "instant" });
    revealVisibleElements();
  }, 760);
});

/* BOTONES */
function configureLink(id, url, fallbackMessage) {
  const element = document.getElementById(id);

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

configureLink(
  "mapsButton",
  CONFIG.mapsUrl,
  "La ubicación se añadirá en cuanto confirmemos el hotel."
);

configureLink(
  "rsvpButton",
  CONFIG.rsvpUrl,
  "El formulario de asistencia estará disponible próximamente."
);

/* CUENTA ATRÁS */
function updateCountdown() {
  const target = new Date(CONFIG.weddingDate).getTime();
  const now = Date.now();
  const distance = target - now;

  if (distance <= 0) {
    document.querySelector(".countdown").innerHTML =
      "<div style='grid-column:1/-1'><strong>¡Hoy es el gran día!</strong></div>";
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
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

function revealVisibleElements() {
  document.querySelectorAll(".reveal").forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      element.classList.add("visible");
    }
  });
}
