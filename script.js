// Declaração de variáveis globais
let currentIndex = 0;
let slideIndex = 0;
let currentIndexFones = 0;
const slidesFones = document.querySelectorAll(".listall .list-fones");
const totalSlidesFones = slidesFones.length;
const slideWidthFones = slidesFones[0].clientWidth;

// Função para exibir os slides automaticamente
function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 1500); // Define o intervalo de tempo para troca de slides (1500 milissegundos = 1.5 segundos)
}

// Função para mover os slides no carrossel principal
function moveSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  const newPosition = -(currentIndex * slideWidth) / 0.91 + "px";
  document.querySelector(".carousel").style.transform = `translateX(${newPosition})`;
}

// Função para clonar os slides de telefones no carrossel
function cloneSlidesFonesOnce() {
  const carouselFones = document.querySelector(".fones-carousel");
  const slidesArrayFones = Array.from(slidesFones);

  slidesArrayFones.forEach((slide) => {
    const clone = slide.cloneNode(true);
    carouselFones.appendChild(clone);
  });
}

// Função para mover os slides de telefones no carrossel
function moveSlideFones(direction) {
  currentIndexFones += direction;

  if (currentIndexFones < 0) {
    currentIndexFones = totalSlidesFones - 1;
  } else if (currentIndexFones >= totalSlidesFones) {
    currentIndexFones = 0;
  }

  const newPosition = -(currentIndexFones * slideWidthFones) / 0.91 + "px";
  document.querySelector(".fones-carousel").style.transform = `translateX(${newPosition})`;
}

// Função para animar o scroll até um elemento específico na página
function scrollToTarget(element, duration) {
  var target = document.querySelector(element);
  var targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Adiciona evento de clique para links internos na página para animar o scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    var targetId = this.getAttribute("href");
    scrollToTarget(targetId, 1000); // Define a duração da animação de scroll (1000 milissegundos = 1 segundo)
  });
});

// Adiciona evento de clique para detalhes (summary) para fechar outros detalhes quando um é aberto
document.addEventListener("DOMContentLoaded", function () {
  const detailsElements = document.querySelectorAll("details");

  detailsElements.forEach(function (details) {
    details.addEventListener("click", function () {
      detailsElements.forEach(function (element) {
        if (element !== details && element.hasAttribute("open")) {
          element.removeAttribute("open");
        }
      });
    });
  });
});

// Clona os slides de telefones uma vez após o carregamento da página
window.onload = function () {
  cloneSlidesFonesOnce();
};

// Inicia a função para exibir os slides automaticamente
showSlides();
