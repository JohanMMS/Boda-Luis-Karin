
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader.classList.add("hidden"), 800);
});

// --- Helper: cargar imágenes desde data-src ---
document.addEventListener('DOMContentLoaded',()=>{
document.querySelectorAll('#gallery img').forEach(img => {
img.src = img.dataset.src;
});
loadResponses();
});

// -- Cuenta regresiva ---
// Configura la fecha de la boda (ajusta aquí)
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
// --- RSVP: guardar en localStorage y mostrar en lista ---
const form = document.getElementById('rsvpForm');
const feedback = document.getElementById('rsvpFeedback');
const listaDiv = document.getElementById('listaRespuestas');


form.addEventListener('submit', (e)=>{
e.preventDefault();
const nombre = document.getElementById('nombre').value.trim();
const email = document.getElementById('email').value.trim();
const asiste = document.getElementById('asiste').value;
const invitados = document.getElementById('invitados').value || '0';
const mensaje = document.getElementById('mensaje').value.trim();


const respuesta = {nombre,email,asiste,invitados,mensaje,fecha:new Date().toISOString()};
const arr = JSON.parse(localStorage.getItem('rsvps')||'[]');
arr.push(respuesta);
localStorage.setItem('rsvps',JSON.stringify(arr));
feedback.style.display='block';
setTimeout(()=>feedback.style.display='none',2500);
form.reset();
loadResponses();
});


function loadResponses(){
const arr = JSON.parse(localStorage.getItem('rsvps')||'[]');
if(arr.length===0){ listaDiv.innerHTML='<p class="small">No hay respuestas aún.</p>'; return; }
listaDiv.innerHTML='';
arr.slice().reverse().forEach(r=>{
const el = document.createElement('div');
el.style.padding='8px'; el.style.borderBottom='1px solid #f1f1f6';
el.innerHTML = `<strong>${escapeHtml(r.nombre)}</strong> — ${escapeHtml(r.asiste)} — <span style='color:var(--muted)'>${new Date(r.fecha).toLocaleString()}</span><br><small>${escapeHtml(r.email)} • Acompañantes: ${escapeHtml(r.invitados)}</small><div style='margin-top:6px'>${escapeHtml(r.mensaje)}</div>`;
listaDiv.appendChild(el);
});
}


// Descargar CSV
document.getElementById('descargarRSVP').addEventListener('click',()=>{
const arr = JSON.parse(localStorage.getItem('rsvps')||'[]');
if(arr.length===0){ alert('No hay respuestas para descargar.'); return; }
const header = ['nombre','email','asiste','invitados','mensaje','fecha'];
const csv = [header.join(',')].concat(arr.map(r=>header.map(h=>`"${(r[h]||'').toString().replace(/"/g,'""')}"`).join(','))).join('\n');
const blob = new Blob([csv],{type:'text/csv'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a'); a.href=url; a.download='rsvps_karin_luis.csv'; a.click(); URL.revokeObjectURL(url);
});


// --- Modal de galería ---
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
let currentImgSrc = '';


document.getElementById('gallery').addEventListener('click', (e) => {
console.log('Se hizo clic en la galería');

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 0);
});
});