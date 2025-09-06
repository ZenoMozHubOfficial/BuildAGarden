const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

// Background music
const bgMusic = new Audio("settings/music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;

// Play music on first user interaction
document.addEventListener("click", () => {
    bgMusic.play();
}, { once: true });

// Particle setup
let stars = [];
let numStars = 150 * 3; // 3x more particles

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 3 + 2 // very fast
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00BFFF"; // blue particles
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Click sound for all buttons
const clickSound = new Audio("settings/click.mp3");

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });

  // Disable right-click / hold menu
  btn.addEventListener("contextmenu", e => e.preventDefault());
});
