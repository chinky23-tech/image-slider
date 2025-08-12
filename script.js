const images = [
  { url: "https://cdn.pixabay.com/photo/2024/02/12/16/05/siguniang-mountain-8568913_960_720.jpg", caption: "Beautiful Landscape 1" },
  { url: "https://cdn.pixabay.com/photo/2014/09/21/17/56/mountaineering-455338_960_720.jpg", caption: "Mountain Adventure" },
  { url: "https://cdn.pixabay.com/photo/2017/12/27/14/02/happy-holidays-3042751_960_720.jpg", caption: "Peaceful Lake" },
  { url: "https://cdn.pixabay.com/photo/2017/08/02/09/40/sunset-2570443_960_720.jpg", caption: "Sunset View" },
  { url: "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_960_720.jpg", caption: "Forest Path" }
];

let currentIndex = 0;
let autoSlide;

const sliderImage = document.getElementById("slider-image");
const caption = document.getElementById("caption");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dotsContainer = document.getElementById("dots-container");

// Show Image Function
function showImage(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  currentIndex = index;
  
  sliderImage.style.opacity = 0; // fade out
  setTimeout(() => {
    sliderImage.src = images[currentIndex].url;
    caption.textContent = images[currentIndex].caption;
    sliderImage.style.opacity = 1; // fade in
  }, 300);

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// Create Dots
function createDots() {
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      showImage(i);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

// Auto Slide
function startAutoSlide() {
  autoSlide = setInterval(() => {
    showImage(currentIndex + 1);
  }, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// Event Listeners
prevBtn.addEventListener("click", () => { showImage(currentIndex - 1); resetAutoSlide(); });
nextBtn.addEventListener("click", () => { showImage(currentIndex + 1); resetAutoSlide(); });

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") { showImage(currentIndex - 1); resetAutoSlide(); }
  if (e.key === "ArrowRight") { showImage(currentIndex + 1); resetAutoSlide(); }
});

// Swipe Support
let touchStartX = 0;
sliderImage.addEventListener("touchstart", (e) => touchStartX = e.touches[0].clientX);
sliderImage.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  if (touchStartX - touchEndX > 50) { showImage(currentIndex + 1); resetAutoSlide(); }
  else if (touchEndX - touchStartX > 50) { showImage(currentIndex - 1); resetAutoSlide(); }
});

// Init
createDots();
showImage(0);
startAutoSlide();
