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
// ===== CONTACTO · El Gallinero =====

// AOS: animaciones al hacer scroll
AOS.init({ duration: 800, once: true, offset: 60 });

// Typed.js: el final del titular se escribe solo
new Typed("#typed", {
  strings: [
    "tienes una duda.",
    "quieres alquilar la sala.",
    "vienes con el cole.",
    "nos propones una peli.",
    "solo quieres saludar.",
  ],
  typeSpeed: 55,
  backSpeed: 30,
  backDelay: 1600,
  loop: true,
  cursorChar: "_",
});

// Swiper: cintas de texto infinitas (marquesina)
const opcionesCinta = {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 40,
  speed: 7000,
  allowTouchMove: false,
  autoplay: { delay: 0, disableOnInteraction: false },
};

new Swiper(".cinta", opcionesCinta);

new Swiper(".cinta-inversa", {
  ...opcionesCinta,
  speed: 9000,
  autoplay: { delay: 0, disableOnInteraction: false, reverseDirection: true },
});

// jQuery: preparar elementos plegables (jQuery controla si se ven o no)
$("#menu-movil, .faq-texto").removeClass("hidden").hide();

// jQuery: menú móvil
$("#btn-menu").on("click", function () {
  $("#menu-movil").slideToggle(250);
  $(this).text($(this).text().trim() === "Menú +" ? "Cerrar –" : "Menú +");
});

// jQuery: acordeón de dudas
$(".faq-btn").on("click", function () {
  const $faq = $(this).closest(".faq");
  $(".faq").not($faq).find(".faq-texto").slideUp(250);
  $(".faq").not($faq).find(".faq-icono").removeClass("rotate-45");
  $faq.find(".faq-texto").slideToggle(250);
  $faq.find(".faq-icono").toggleClass("rotate-45");
});

// jQuery: formulario (sin servidor, solo comprueba y da las gracias)
$("#form-contacto").on("submit", function (e) {
  e.preventDefault();

  const vacio = $(this)
    .find("[required]")
    .toArray()
    .some((campo) => !campo.value.trim());

  if (vacio) {
    $("#form-error").removeClass("hidden").hide().fadeIn(200);
    return;
  }

  $("#form-error").addClass("hidden");
  $(this)
    .find("label, button")
    .fadeOut(300)
    .promise()
    .done(() => $("#form-ok").removeClass("hidden").hide().fadeIn(400));
});

// jQuery: volver arriba suave
$("#arriba").on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 600);
});
