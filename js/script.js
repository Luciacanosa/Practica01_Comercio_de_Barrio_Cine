// =====================================================
// BLOQUE COMÚN (igual en script.js, cartelera.js, socio.js y contacto.js)
// =====================================================

// ventana modal ULTIMA OPORTUNIDAD JRPASS EN 10 SEGUNDOs

// Lógica abrir/cerrar de la ventana modal
let btnOpenModal = document.querySelector("#openModal");

btnOpenModal.addEventListener("click", openModalWindow);

// Función propia para abrir ventana modal
function openModalWindow() {
  let modalWindow = document.querySelector("#modalWindow");
  modalWindow.classList.add("show-modal");
}

let btnCloseModal = document.querySelector(
  "#modalWindow > .modal-content > .close",
);

btnCloseModal.addEventListener("click", closeModalWindow);

// Función para cerrar la ventana modal
function closeModalWindow() {
  let modalWindow = document.querySelector("#modalWindow");
  modalWindow.classList.remove("show-modal");
}

// Cerrar ventana modal cuando se detecta click fuera
window.addEventListener("click", function (event) {
  let modal = document.querySelector("#modalWindow");
  if (event.target == modal) {
    closeModalWindow();
  }
});

// Abrir modal automáticamente a los 10 segundos
setTimeout(openModalWindow, 10000);

// carrusel fotos parte historia pag principal
function iniciarCarrusel(selector) {
  const images = document.querySelectorAll(selector + " img");
  let index = 0;

  function showNextImage() {
    images.forEach((img) => img.classList.remove("active"));
    images[index].classList.add("active");
    index = (index + 1) % images.length;
  }

  showNextImage(); // mostrar la primera
  setInterval(showNextImage, 3000); // cambiar cada 3 segundos
}

// efectos para el cursor

// ----- cursor personalizado -----
$(document).mousemove(function (e) {
  $(".cursor-index").css({ left: e.clientX + "px", top: e.clientY + "px" });
});
// con "on" funciona también en botones creados desde JS
$(document).on(
  "mouseenter",
  "a, button, label, input, select, textarea",
  function () {
    $(".cursor-index")
      .addClass("scale-180 bg-transparent")
      .removeClass("bg-butaca");
  },
);

$(document).on(
  "mouseleave",
  "a, button, label, input, select, textarea",
  function () {
    $(".cursor-index")
      .removeClass("scale-180 bg-transparent")
      .addClass("bg-butaca");
  },
);

// ----- header: enlace de la página actual en rojo -----
const paginaActual = window.location.pathname.split("/").pop() || "index.html";
$(".nav-link").each(function () {
  if ($(this).attr("href") === paginaActual) {
    $(this).addClass("text-butaca").attr("aria-current", "page");
  }
});

// ----- header: menú móvil -----
$("#menu-movil").removeClass("hidden").hide();
$("#btn-menu").on("click", function () {
  const abierto = $(this).attr("aria-expanded") === "true";
  $("#menu-movil").slideToggle(250);
  $(this)
    .attr("aria-expanded", String(!abierto))
    .text(abierto ? "Menú +" : "Cerrar –");
});

// ----- modo claro / oscuro (se recuerda al cambiar de página) -----
$("#btn-tema").on("click", function () {
  const oscuro = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
  } catch (e) {}
});

// ----- footer: año actual y volver arriba -----
$(".anio").text(new Date().getFullYear());
$(".arriba").on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 600);
});

// =====================================================
// INICIO (index.html)
// =====================================================

// AOS: animaciones al hacer scroll
AOS.init({ duration: 800, once: true, offset: 60 });

// Typed.js: la frase de la portada se escribe sola
new Typed("#typed", {
  strings: [
    "en versión original.",
    "de autor.",
    "de barrio.",
    "a 4 € los miércoles.",
  ],
  typeSpeed: 55,
  backSpeed: 30,
  backDelay: 1800,
  loop: true,
  cursorChar: "_",
});

// Swiper: entradas de "Esta semana"
// se mueve con el trackpad (dos dedos a izquierda/derecha) y con el dedo en el móvil
new Swiper(".novedades", {
  loop: true,
  slidesPerView: 1.15,
  spaceBetween: 16,
  freeMode: { enabled: true, sticky: false, momentum: true },
  mousewheel: { forceToAxis: true, sensitivity: 1 },
  simulateTouch: false,
  breakpoints: {
    640: { slidesPerView: 2.2 },
    1024: { slidesPerView: 3.3, spaceBetween: 24 },
  },
});
