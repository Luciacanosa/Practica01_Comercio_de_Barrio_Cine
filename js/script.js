$(document).ready(function () {
  // Inicialización de la librería adicional AOS
  AOS.init({
    duration: 800,
    once: true,
  });

  // Toggle del menú hamburguesa responsive
  $("#menu-btn").on("click", function () {
    $("#mobile-menu").slideToggle(300);
  });

  // Toggle de Modo Claro / Oscuro
  $("#theme-toggle").on("click", function () {
    $("html").toggleClass("dark");
    if ($("html").hasClass("dark")) {
      $("#theme-toggle-icon").text("🌙");
    } else {
      $("#theme-toggle-icon").text("☀️");
    }
  });
});
