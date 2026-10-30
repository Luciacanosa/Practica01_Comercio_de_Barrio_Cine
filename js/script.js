 luciabranch
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
=======
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
 main
