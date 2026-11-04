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

// ===== CARTELERA =====

// AOS: animaciones al hacer scroll
AOS.init({ duration: 800, once: true, offset: 60 });

// Swiper: cinta de texto infinita
new Swiper(".cinta", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 40,
  speed: 7000,
  allowTouchMove: false,
  autoplay: { delay: 0, disableOnInteraction: false },
});

// Swiper: carrusel de películas destacadas
// se mueve con el trackpad (dos dedos a izquierda/derecha) y con el dedo en el móvil
new Swiper(".destacadas", {
  slidesPerView: 1.2,
  spaceBetween: 16,
  freeMode: { enabled: true, sticky: false, momentum: true }, // deslizamiento suave, como un scroll
  mousewheel: {
    forceToAxis: true, // solo responde al gesto horizontal; el scroll vertical sigue bajando la página
    sensitivity: 1,
    releaseOnEdges: true,
  },
  simulateTouch: false, // no se arrastra pulsando con el ratón
  breakpoints: {
    640: { slidesPerView: 2.2 },
    1024: { slidesPerView: 3.5 },
  },
});

// Horarios: películas y sesiones de cada día (cámbialas aquí)
const peliculas = [
  {
    titulo: "El espíritu de la colmena",
    ficha: "Víctor Erice · 1973",
    version: "VOSE",
  },
  {
    titulo: "Mujeres al borde de un ataque de nervios",
    ficha: "Pedro Almodóvar · 1988",
    version: "VE",
  },
  {
    titulo: "Cinco lobitos",
    ficha: "Alauda Ruiz de Azúa · 2022",
    version: "VE",
  },
  { titulo: "As bestas", ficha: "Rodrigo Sorogoyen · 2022", version: "VOSE" },
  {
    titulo: "La sociedad de la nieve",
    ficha: "J. A. Bayona · 2023",
    version: "VE",
  },
  { titulo: "Perfect Days", ficha: "Wim Wenders · 2023", version: "VOSE" },
];

// número de la película en la lista de arriba (empieza en 0) -> horas de ese día
const sesiones = {
  martes: { 0: ["18:00"], 2: ["20:00"], 3: ["22:15"] },
  miércoles: { 1: ["17:30"], 5: ["19:30"], 4: ["21:45"] },
  jueves: { 3: ["18:00"], 0: ["20:15"], 2: ["22:00"] },
  viernes: { 4: ["17:00"], 1: ["20:00"], 5: ["22:30"] },
  sábado: { 2: ["12:00"], 5: ["17:30"], 4: ["19:45"], 3: ["22:30"] },
  domingo: { 1: ["12:00"], 0: ["18:00"], 5: ["20:00"] },
};

const dias = Object.keys(sesiones);

// botones de los días
dias.forEach(function (dia) {
  $("#dias").append(
    `<button data-dia="${dia}" class="dia-btn border border-noche/30 px-4 py-2 font-mono text-xs dark:border-papel/30 uppercase tracking-widest transition-colors hover:border-butaca hover:text-butaca">${dia}</button>`,
  );
});

// muestra las sesiones del día elegido
function mostrarDia(dia) {
  $(".dia-btn")
    .removeClass(
      "bg-butaca border-butaca text-papel dark:text-noche hover:text-butaca",
    )
    .addClass("hover:text-butaca");
  $(`.dia-btn[data-dia="${dia}"]`)
    .addClass("bg-butaca border-butaca text-papel dark:text-noche")
    .removeClass("hover:text-butaca");

  const $lista = $("#sesiones");
  $lista.fadeOut(150, function () {
    $lista.empty();
    // ordenadas por la hora de la primera sesión
    const orden = Object.entries(sesiones[dia]).sort((a, b) =>
      a[1][0].localeCompare(b[1][0]),
    );
    $.each(orden, function (_, [indice, horas]) {
      const p = peliculas[indice];
      const botones = horas
        .map(
          (h) =>
            `<a href="#" class="border border-noche/30 px-4 py-2 font-mono text-sm transition-colors hover:border-butaca hover:bg-butaca hover:text-papel dark:border-papel/30 dark:hover:text-noche">${h}</a>`,
        )
        .join("");
      $lista.append(`
        <li class="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-2xl font-bold md:text-3xl">${p.titulo}</p>
            <p class="mt-1 font-mono text-xs uppercase tracking-widest text-gris">${p.ficha} · <span class="text-butaca">${p.version}</span></p>
          </div>
          <div class="flex gap-2">${botones}</div>
        </li>`);
    });
    $lista.fadeIn(250);
  });
}

$("#dias").on("click", ".dia-btn", function () {
  mostrarDia($(this).data("dia"));
});

// al entrar se muestra el primer día
mostrarDia(dias[0]);
