/* =========================================================
   CONFIGURACIÓN PRINCIPAL
   Sustituye los valores vacíos cuando tengas los datos.
   ========================================================= */

const CONFIG = {
  weddingDate: "2027-08-28T18:00:00+02:00",
  mapsUrl: "https://www.google.com/maps/place/36%C2%B020%2705.7%22N+5%C2%B049%2707.6%22W/@36.33491,-5.818775,17z/data=!4m4!3m3!8m2!3d36.3349167!4d-5.8187778",
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


/* APERTURA CINEMATOGRÁFICA DEL SOBRE · v4.0 */
const envelopeScreen = document.getElementById("envelopeScreen");
const invitation = document.getElementById("invitation");
const openInvitation = document.getElementById("openInvitation");
const coverVideo = document.createElement("video");
let isOpening = false;

coverVideo.className = "door-video";
coverVideo.id = "coverVideo";
coverVideo.src = "assets/portada/puerta-mediterranea.mp4";
coverVideo.poster = "assets/portada/puerta-mediterranea-poster.jpg";
coverVideo.preload = "auto";
coverVideo.muted = true;
coverVideo.playsInline = true;
coverVideo.setAttribute("aria-hidden", "true");
envelopeScreen.prepend(coverVideo);
envelopeScreen.classList.add("door-cover");

function showInvitation() {
  invitation.classList.add("visible");
  invitation.setAttribute("aria-hidden", "false");
  window.scrollTo({ top: 0, behavior: "auto" });
  revealVisibleElements();
  envelopeScreen.classList.add("departing");

  window.setTimeout(() => {
    envelopeScreen.hidden = true;
    envelopeScreen.style.display = "none";
    envelopeScreen.setAttribute("aria-hidden", "true");
  }, 1050);
}

openInvitation.addEventListener("click", () => {
  if (isOpening) return;
  isOpening = true;
  openInvitation.disabled = true;
  startMusic();

  envelopeScreen.classList.add("video-playing");
  coverVideo.currentTime = 0;

  const finishFallback = window.setTimeout(showInvitation, 10200);
  coverVideo.addEventListener("ended", () => {
    window.clearTimeout(finishFallback);
    showInvitation();
  }, { once: true });

  coverVideo.play().catch(() => {
    window.clearTimeout(finishFallback);
    window.setTimeout(showInvitation, 900);
  });
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

/* =========================================================
   V1.4 · AÑADIR AL CALENDARIO
   ========================================================= */
const calendarCard = document.getElementById("calendarCard");
const calendarModal = document.getElementById("calendarModal");
const googleCalendarLink = document.getElementById("googleCalendarLink");
const calendarCloseButtons = document.querySelectorAll("[data-close-calendar]");

const googleCalendarUrl = new URL("https://calendar.google.com/calendar/render");
googleCalendarUrl.searchParams.set("action", "TEMPLATE");
googleCalendarUrl.searchParams.set("text", "Boda de Laura & Juan");
googleCalendarUrl.searchParams.set("dates", "20270828/20270829");
googleCalendarUrl.searchParams.set(
  "details",
  "Celebración de la boda de Laura y Juan. La hora de la ceremonia se comunicará próximamente."
);
googleCalendarUrl.searchParams.set(
  "location",
  "Fairplay Golf & Spa Resort, Calle La Torre 80, 11190 Benalup-Casas Viejas, Cádiz"
);
googleCalendarLink.href = googleCalendarUrl.toString();

function openCalendarModal() {
  calendarModal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => calendarModal.classList.add("visible"));
  window.setTimeout(() => {
    const closeButton = calendarModal.querySelector(".calendar-close");
    if (closeButton) closeButton.focus();
  }, 180);
}

function closeCalendarModal() {
  calendarModal.classList.remove("visible");
  document.body.classList.remove("modal-open");
  window.setTimeout(() => {
    calendarModal.hidden = true;
    if (calendarCard) calendarCard.focus();
  }, 260);
}

calendarCard?.addEventListener("click", openCalendarModal);
calendarCloseButtons.forEach(button => button.addEventListener("click", closeCalendarModal));

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && calendarModal && !calendarModal.hidden) {
    closeCalendarModal();
  }
});
