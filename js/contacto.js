// efectos para el cursor

// el circulito sigue al ratón
$(document).mousemove(function (e) {
  $(".cursor-index").css({
    left: e.clientX + "px",
    top: e.clientY + "px",
  });
});

// al pasar por enlaces y botones: se agranda y queda solo el borde
$("a, button").hover(
  function () {
    $(".cursor-index")
      .addClass("scale-180 bg-transparent")
      .removeClass("bg-[#6e0000]");
  },
  function () {
    $(".cursor-index")
      .removeClass("scale-180 bg-transparent")
      .addClass("bg-[#6e0000]");
  },
);
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
