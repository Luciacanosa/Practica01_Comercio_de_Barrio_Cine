// efectos para el cursor

$(document).mousemove(function (e) {
  $(".cursor-index").css({
    left: e.clientX + "px", // 👈 usa clientX/clientY
    top: e.clientY + "px",
  });
});

document.addEventListener("mousemove", (e) => {
  const el = document.querySelector(".cursor-index");
  if (!el) return;
  el.style.left = e.clientX + "px";
  el.style.top = e.clientY + "px";
});

// opcional: efecto al pasar por enlaces
$("a").hover(
  function () {
    $(".cursor-index").addClass("cursor-grow");
  },
  function () {
    $(".cursor-index").removeClass("cursor-grow");
  },
);
