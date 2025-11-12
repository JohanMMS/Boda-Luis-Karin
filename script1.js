// --- Preloader ---
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) setTimeout(() => preloader.classList.add("hidden"), 800);
});

// --- Cuenta regresiva ---
const weddingDate = new Date("Dec 18, 2025 00:00:00").getTime();
const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown").innerHTML = "<h3>¡Llegó el gran día!</h3>";
  }
}, 1000);

// --- Guardar y mostrar confirmaciones ---
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("#asistencia-formulario");

  if (!formulario) return; // evita error si el formulario no existe

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const asistencia = document.getElementById("asistencia").value;
    const acompanantes = document.getElementById("acompanantes").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validación básica
  if (!nombre.trim() || !asistencia  || !acompanantes.trim()) {
  alert("Por favor completa todos los campos requeridos.");
  return;
  }

    // Guardar datos en localStorage
    const nuevaRespuesta = {
      nombre,
      asistencia,
      acompanantes,
      mensaje,
      fecha: new Date().toLocaleString()
    };

    const respuestas = JSON.parse(localStorage.getItem("respuestasBoda") || "[]");
    respuestas.push(nuevaRespuesta);
    localStorage.setItem("respuestasBoda", JSON.stringify(respuestas));

    // Mostrar en consola (verificas en Inspeccionar → Console)
    console.log("✅ Datos guardados:", nuevaRespuesta);

    alert("💌 Gracias por confirmar tu asistencia 💍");
    formulario.reset();
  });
});


// Modal para ver imagen en grande
const modal = document.createElement("div");
modal.id = "modal";
modal.style.display = "none";
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.background = "rgba(0,0,0,0.8)";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
modal.style.zIndex = "1000";

const imgGrande = document.createElement("img");
imgGrande.style.maxWidth = "80%";
imgGrande.style.maxHeight = "80%";
imgGrande.style.border = "8px solid white";
imgGrande.style.borderRadius = "20px";
modal.appendChild(imgGrande);

document.body.appendChild(modal);

document.querySelectorAll(".galeria-fotos img").forEach(img => {
  img.addEventListener("click", () => {
    imgGrande.src = img.src;
    modal.style.display = "flex";
  });
});

modal.addEventListener("click", () => {
  modal.style.display = "none";
});




