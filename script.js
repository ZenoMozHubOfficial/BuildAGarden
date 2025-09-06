const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

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

// Button click sound + teleport
function playClick(url) {
  const audio = new Audio("settings/click.mp3");
  audio.play();
  if (url) window.open(url, "_blank"); // teleport to link
}

// Assign buttons to links
document.querySelector(".btn.discord").addEventListener("click", () => playClick("https://discord.gg/YOUR_LINK"));
document.querySelector(".btn.youtube").addEventListener("click", () => playClick("https://www.youtube.com/"));
document.querySelector(".btn.tiktok").addEventListener("click", () => playClick("https://www.tiktok.com/"));
document.querySelector(".btn.blog").addEventListener("click", () => playClick("https://YOUR_BLOG_LINK"));
