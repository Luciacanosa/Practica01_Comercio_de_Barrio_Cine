// ===== CURSOR =====
$(document).mousemove(function (e) {
  $(".cursor-index").css({ left: e.clientX + "px", top: e.clientY + "px" });
});

// (con "on" funciona también en los botones que se crean desde JS)
$(document).on("mouseenter", "a, button", function () {
  $(".cursor-index")
    .addClass("scale-180 bg-transparent")
    .removeClass("bg-[#6e0000]");
});
$(document).on("mouseleave", "a, button", function () {
  $(".cursor-index")
    .removeClass("scale-180 bg-transparent")
    .addClass("bg-[#6e0000]");
});

// ===== HEADER =====
const paginaActual = window.location.pathname.split("/").pop() || "index.html";
$(".nav-link").each(function () {
  if ($(this).attr("href") === paginaActual) {
    $(this).addClass("text-butaca").attr("aria-current", "page");
  }
});

$("#menu-movil").removeClass("hidden").hide();
$("#btn-menu").on("click", function () {
  $("#menu-movil").slideToggle(250);
  $(this).text($(this).text().trim() === "Menú +" ? "Cerrar –" : "Menú +");
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
    `<button data-dia="${dia}" class="dia-btn border border-papel/30 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-butaca hover:text-butaca">${dia}</button>`,
  );
});

// muestra las sesiones del día elegido
function mostrarDia(dia) {
  $(".dia-btn")
    .removeClass("bg-butaca border-butaca text-noche hover:text-butaca")
    .addClass("hover:text-butaca");
  $(`.dia-btn[data-dia="${dia}"]`)
    .addClass("bg-butaca border-butaca text-noche")
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
            `<a href="#" class="border border-papel/30 px-4 py-2 font-mono text-sm transition-colors hover:border-butaca hover:bg-butaca hover:text-noche">${h}</a>`,
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

// volver arriba suave
$("#arriba").on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 600);
});
