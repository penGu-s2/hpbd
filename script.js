/**
 * =========================================================
 * CẤU HÌNH TÙY CHỈNH DÀNH CHO DÂN IT (CUSTOM SETTINGS)
 * Bạn có thể đổi tên crush và lời chúc ngay tại đây hoặc qua URL:
 * Ví dụ mở trang: index.html?name=Mai+Anh
 * =========================================================
 */
const CONFIG = {
  // Tên mặc định của Crush (nếu không truyền qua URL ?name=...)
  crushName: "bạn nhé",

  // Lời chúc sinh nhật hiển thị sau khi thổi nến
  wishMessage: `Chúc bạn một ngày sinh nhật thật ấm áp, vui vẻ và nhiều tiếng cười! ✨<br><br>Bước sang tuổi mới, chúc bạn luôn giữ được năng lượng tích cực, gặp nhiều may mắn, mọi công việc đều suôn sẻ và sớm đạt được những mục tiêu mà mình ấp ủ. Mong bạn luôn có những ngày bình yên và hạnh phúc! 🌸`
};

// --- Khởi tạo các phần tử DOM ---
const introScreen = document.getElementById('introScreen');
const mainContent = document.getElementById('mainContent');
const startBtn = document.getElementById('startBtn');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const cake = document.getElementById('cake');
const candleFlame = document.getElementById('candleFlame');
const smokeTrail = document.getElementById('smokeTrail');
const cakeHint = document.getElementById('cakeHint');
const wishCard = document.getElementById('wishCard');
const reBlowBtn = document.getElementById('reBlowBtn');
const crushNameSpan = document.getElementById('crushName');
const typewriterText = document.getElementById('typewriterText');
const confettiCanvas = document.getElementById('confettiCanvas');

let isBlown = false;
let isMusicPlaying = false;

// Đọc tên từ URL parameter
function setupCrushName() {
  const urlParams = new URLSearchParams(window.location.search);
  const nameFromParam = urlParams.get('name');
  if (nameFromParam && nameFromParam.trim() !== '') {
    crushNameSpan.textContent = nameFromParam.trim();
  } else {
    crushNameSpan.textContent = CONFIG.crushName;
  }

  if (CONFIG.wishMessage) {
    typewriterText.innerHTML = CONFIG.wishMessage;
  }
}

// Tạo sao nền
function createStars() {
  const starsContainer = document.getElementById('stars');
  const starCount = 45;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
  }
}

// Bật/tắt nhạc
function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
    isMusicPlaying = false;
  } else {
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
      isMusicPlaying = true;
    }).catch(err => {
      console.log("Audio error:", err);
    });
  }
}

startBtn.addEventListener('click', () => {
  introScreen.classList.add('hide');
  mainContent.classList.remove('hidden');

  bgMusic.volume = 0.6;
  bgMusic.play().then(() => {
    isMusicPlaying = true;
    musicToggle.classList.add('playing');
  }).catch(() => {
    isMusicPlaying = false;
  });
});

musicToggle.addEventListener('click', toggleMusic);

// Thổi nến
function blowCandle() {
  if (isBlown) return;
  isBlown = true;

  candleFlame.style.display = 'none';
  smokeTrail.classList.remove('hidden');

  cakeHint.innerHTML = "<span>✨ Mong điều ước của bạn sẽ sớm thành hiện thực! 🥕✨</span>";
  cakeHint.style.color = "#fed7aa";
  cakeHint.style.borderColor = "rgba(251, 146, 60, 0.4)";
  cakeHint.style.background = "rgba(251, 146, 60, 0.12)";

  // Bắn pháo hoa giấy kèm các hạt cà rốt
  fireConfetti();

  setTimeout(() => {
    wishCard.classList.remove('hidden');
    reBlowBtn.classList.remove('hidden');
  }, 700);
}

// Thắp lại nến
function reLightCandle() {
  isBlown = false;
  candleFlame.style.display = 'block';
  smokeTrail.classList.add('hidden');
  cakeHint.innerHTML = "<span>👇 Nhớ ước một điều ước trước khi chạm vào ngọn nến để thổi bạn nhé! ✨</span>";
  cakeHint.style.color = "";
  cakeHint.style.borderColor = "";
  cakeHint.style.background = "";
  wishCard.classList.add('hidden');
  reBlowBtn.classList.add('hidden');
}

cake.addEventListener('click', blowCandle);
reBlowBtn.addEventListener('click', reLightCandle);

// --- Canvas Confetti kèm hạt Cà Rốt 🥕 ---
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiAnimationId = null;

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const CONFETTI_COLORS = ['#fb923c', '#f97316', '#38bdf8', '#facc15', '#4ade80', '#ec4899'];

class ConfettiParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const rand = Math.random();
    if (rand < 0.12) {
      this.icon = '🥕';
    } else if (rand < 0.22) {
      this.icon = '🐰';
    } else {
      this.icon = null;
    }
    this.size = this.icon ? (Math.random() * 6 + 15) : (Math.random() * 8 + 5);
    this.color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    this.vx = (Math.random() - 0.5) * 17;
    this.vy = -(Math.random() * 13 + 10);
    this.gravity = 0.36;
    this.drag = 0.98;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 8;
    this.opacity = 1;
  }

  update() {
    this.vx *= this.drag;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    if (this.y > window.innerHeight * 0.72) {
      this.opacity -= 0.015;
    }
  }

  draw(context) {
    if (this.opacity <= 0) return;
    context.save();
    context.translate(this.x, this.y);
    context.rotate((this.rotation * Math.PI) / 180);
    context.globalAlpha = Math.max(0, this.opacity);

    if (this.icon) {
      context.font = `${this.size}px sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(this.icon, 0, 0);
    } else {
      context.fillStyle = this.color;
      context.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    }
    context.restore();
  }
}

function fireConfetti() {
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight * 0.5;

  for (let i = 0; i < 115; i++) {
    confettiParticles.push(new ConfettiParticle(originX, originY));
  }

  if (!confettiAnimationId) {
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.update();
    p.draw(ctx);

    if (p.opacity <= 0 || p.y > confettiCanvas.height + 25) {
      confettiParticles.splice(i, 1);
    }
  }

  if (confettiParticles.length > 0) {
    confettiAnimationId = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimationId = null;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

// Silent execution: Chạy ngầm function carrot_os trong Console DevTools
const carrot_os = {
  exec: function() {
    console.log(
      "%c🥕 carrot_os.exec()%c \n// Status: RUNNING | Happy Birthday! ✨",
      "color: #f97316; font-size: 15px; font-weight: bold; background: #1e1e38; padding: 4px 10px; border-radius: 4px;",
      "color: #fdba74; font-size: 12px; font-family: monospace;"
    );
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setupCrushName();
  createStars();
  carrot_os.exec();
});
