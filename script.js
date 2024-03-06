let currentIndex = 0;
let slideIndex = 0;
let currentIndexFones = 0;
const slidesFones = document.querySelectorAll(".listall .list-fones");
const totalSlidesFones = slidesFones.length;
const slideWidthFones = slidesFones[0].clientWidth;

showSlides();
const slides = document.querySelectorAll(".list-acess");
const totalSlides = slides.length;
const slideWidth = slides[0].clientWidth;

function moveSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 2;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  const newPosition = -(currentIndex * slideWidth) + "px";
  document.querySelector(
    ".carousel"
  ).style.transform = `translateX(${newPosition})`;
}

const carousel = document.querySelector(".carousel");
const slidesArray = Array.from(slides);

slidesArray.forEach((slide) => {
  const clone = slide.cloneNode(true);
  carousel.appendChild(clone);
});

function moveSlideFones(direction) {
  currentIndexFones += direction;

  if (currentIndexFones < 0) {
    currentIndexFones = totalSlidesFones - 1;
  } else if (currentIndexFones >= totalSlidesFones) {
    currentIndexFones = 0;
  }

  const newPosition = -(currentIndexFones * slideWidthFones) + "px";
  document.querySelector(
    ".fones-carousel"
  ).style.transform = `translateX(${newPosition})`;
}

function cloneSlidesFonesOnce() {
  const carouselFones = document.querySelector(".fones-carousel");
  const slidesArrayFones = Array.from(slidesFones);

  slidesArrayFones.forEach((slide) => {
    const clone = slide.cloneNode(true);
    carouselFones.appendChild(clone);
  });
}

window.onload = function () {
  cloneSlidesFonesOnce();
};

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
  setTimeout(showSlides, 1500); 
}


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
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var targetId = this.getAttribute('href');
    scrollToTarget(targetId, 1000); 
  });
});