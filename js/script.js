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
