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
// HAZTE SOCIO (socio.html)
// =====================================================

// AOS: animaciones al hacer scroll
AOS.init({ duration: 800, once: true, offset: 60 });

// Typed.js: frase de la portada
new Typed("#typed", {
  strings: [
    "pagar 3,5 € la entrada.",
    "votar la peli del mes.",
    "ir a los preestrenos.",
    "cuidar tu cine de barrio.",
  ],
  typeSpeed: 55,
  backSpeed: 30,
  backDelay: 1800,
  loop: true,
  cursorChar: "_",
});

// ----- interruptor mensual / anual -----
let pago = "mes";

function actualizarPrecios() {
  $(".precio").each(function () {
    $(this).text($(this).data(pago));
  });
  $(".periodo").text(pago === "mes" ? "€ / mes" : "€ / año");
  actualizarResumen();
}

function actualizarResumen() {
  const plan = $("#plan").val();
  const precio = $(`.plan[data-plan="${plan}"] .precio`).data(pago);
  $("#resumen").text(`${precio} € / ${pago === "mes" ? "mes" : "año"}`);
}

$(".btn-pago").on("click", function () {
  pago = $(this).data("pago");
  $(".btn-pago")
    .removeClass("bg-butaca text-papel dark:text-noche")
    .attr("aria-pressed", "false");
  $(this)
    .addClass("bg-butaca text-papel dark:text-noche")
    .attr("aria-pressed", "true");
  actualizarPrecios();
});

// ----- elegir plan: rellena el formulario y baja hasta él -----
$(".elegir").on("click", function () {
  const plan = $(this).closest(".plan").data("plan");
  $("#plan").val(plan);
  actualizarResumen();
  $("html, body").animate({ scrollTop: $("#alta").offset().top - 70 }, 700);
});

$("#plan").on("change", actualizarResumen);

// ----- formulario de alta -----
$("#form-socio").on("submit", function (e) {
  e.preventDefault();
  const nombre = $(this).find('[name="nombre"]').val().trim();
  const email = $(this).find('[name="email"]').val().trim();
  const normas = $(this).find('[name="normas"]').is(":checked");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!nombre || !emailOk || !normas) {
    $("#form-error").removeClass("hidden").hide().fadeIn(200);
    return;
  }

  // carnet con los datos del formulario y un número de socio al azar
  $("#carnet-nombre").text(nombre);
  $("#carnet-plan").text($("#plan").val());
  $("#carnet-num").text(String(Math.floor(Math.random() * 9000) + 1000));

  $(this).fadeOut(300, function () {
    $("#carnet").removeClass("hidden");
  });
});

actualizarPrecios();

// ----- si vienes desde la ventana modal del inicio, el correo ya viene escrito -----
const emailDesdeInicio = new URLSearchParams(window.location.search).get(
  "email",
);
if (emailDesdeInicio) {
  $('#form-socio [name="email"]').val(emailDesdeInicio);
  $(window).on("load", function () {
    $("html, body").animate({ scrollTop: $("#alta").offset().top - 70 }, 700);
  });
}
