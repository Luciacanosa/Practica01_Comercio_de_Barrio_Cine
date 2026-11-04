// =====================================================
// BLOQUE COMÚN (igual en script.js, cartelera.js, socio.js y contacto.js)
// =====================================================

// ----- cursor personalizado (punto rojo) -----
$(document).mousemove(function (e) {
  $(".cursor-index").css({ left: e.clientX + "px", top: e.clientY + "px" });
});
// con "on" funciona también en botones creados desde JS
$(document).on(
  "mouseenter",
  "a, button, label, input, select, textarea, .burger > i",
  function () {
    $(".cursor-index")
      .addClass("scale-180 bg-transparent")
      .removeClass("bg-butaca");
  },
);
$(document).on(
  "mouseleave",
  "a, button, label, input, select, textarea, .burger > i",
  function () {
    $(".cursor-index")
      .removeClass("scale-180 bg-transparent")
      .addClass("bg-butaca");
  },
);

// menu hambuerguesa para el navbar
// lógica del menu (simplemente el clik en un icono)
// selección de elementos del html
let burger = document.querySelector(".burger > i");
let menu_opt = document.querySelector(".menu");
// definimos evneto click sobre le botón del menú
burger.addEventListener("click", function () {
  burger.classList.toggle("fa-bars");
  burger.classList.toggle("fa-times");
  menu_opt.classList.toggle("menu-show");
});

// extra: que el icono del menú también funcione con el teclado (Enter o espacio)
burger.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    burger.click();
  }
});

// ----- header: enlace de la página actual en rojo -----
const paginaActual = window.location.pathname.split("/").pop() || "index.html";
$(".menu a").each(function () {
  if ($(this).attr("href") === paginaActual) {
    $(this).addClass("text-butaca").attr("aria-current", "page");
  }
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

// arrancamos el carrusel de la sección "Nuestra historia"
iniciarCarrusel("#carrusel-historia");
