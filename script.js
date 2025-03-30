const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.3) {
      entry.target.classList.add("visible");
    } else if (entry.intersectionRatio < 0.1) {
      entry.target.classList.remove("visible");
    }
  });
}, { threshold: [0, 0.1, 0.3, 0.5, 0.7, 1] });

document.querySelectorAll("main section").forEach(section =>
  observer.observe(section)
);


const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array(200).fill().map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
  }
  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawStars();

document.querySelector('.btn[href="#vision"]')?.addEventListener("click", function (e) {
  e.preventDefault();
  const target = document.querySelector("#vision");
  const offset = 100;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
});

const carousel = document.getElementById("carousel");
const scrollStep = 400;

document.getElementById("prevBtn").addEventListener("click", () => {
  if (carousel.scrollLeft <= 0) {
    carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
  } else {
    carousel.scrollBy({ left: -scrollStep, behavior: "smooth" });
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  if (carousel.scrollLeft >= maxScroll - 5) {
    carousel.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    carousel.scrollBy({ left: scrollStep, behavior: "smooth" });
  }
});

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const images = Array.from(document.querySelectorAll(".carousel img"));
let currentIndex = 0;

images.forEach((img, i) => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
    currentIndex = i;
  });
});

function updateModal() {
  const total = images.length;
  modalImg.src = images[(currentIndex + total) % total].src;
}

function nextImage() {
  currentIndex++;
  updateModal();
}

function prevImage() {
  currentIndex--;
  updateModal();
}

document.querySelector(".modal").addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
