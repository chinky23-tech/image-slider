// Array of images for the slider
const images = [
  "https://picsum.photos/id/1018/800/400",
  "https://picsum.photos/id/1015/800/400",
  "https://picsum.photos/id/1019/800/400",
  "https://picsum.photos/id/1020/800/400",
  "https://picsum.photos/id/1021/800/400"
];

// Current index of the image being displayed
let currentIndex = 0;

// Select DOM elements
const sliderImage = document.getElementById("slider-image");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dotsContainer = document.getElementById("dots-container");

// Display the image at the given index
function showImage(index) {
  // Loop back if out of bounds
  if (index < 0) {
    currentIndex = images.length - 1;
  } else if (index >= images.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // Update image source
  sliderImage.style.opacity = 0; // fade-out
  setTimeout(() => {
    sliderImage.src = images[currentIndex];
    sliderImage.style.opacity = 1; // fade-in
  }, 200);

  // Update dots
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// Create dots dynamically
function createDots() {
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => showImage(i));
    dotsContainer.appendChild(dot);
  });
}

// Next and Previous button functionality
prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

// Auto Slide every 3 seconds
let autoSlide = setInterval(() => {
  showImage(currentIndex + 1);
}, 3000);

// Pause auto-slide on hover
document.querySelector(".slider-container").addEventListener("mouseover", () => {
  clearInterval(autoSlide);
});
document.querySelector(".slider-container").addEventListener("mouseout", () => {
  autoSlide = setInterval(() => {
    showImage(currentIndex + 1);
  }, 3000);
});

// Initialize Slider
createDots();
showImage(0);
