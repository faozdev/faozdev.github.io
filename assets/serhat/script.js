let canvas = document.getElementById("confettiCanvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


function checkBirthday() {
  const today = new Date();
  if (today.getDate() === 9 && today.getMonth() === 11) { // 9 Aralık
    happyBirthday();
  } else {
    startCountdown();
  }
}

function startCountdown() {
  const currentTime = new Date();
  const targetDate = new Date(currentTime.getFullYear(), 11, 9);

  if (currentTime > targetDate) {
    targetDate.setFullYear(currentTime.getFullYear() + 1);
  }

  updateCountdown(targetDate);
}

function updateCountdown(targetTime) {
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  function refreshCountdown() {
    const now = new Date();
    let timeLeft = targetTime - now;

    if (timeLeft <= 0) {
      daysElement.textContent = '0';
      hoursElement.textContent = '0';
      minutesElement.textContent = '0';
      secondsElement.textContent = '0';
      happyBirthday();
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

    setTimeout(refreshCountdown, 1000);
  }

  refreshCountdown();
}

function happyBirthday() {
  document.getElementById('birthday-message').style.display = 'block';
  document.getElementById('birthday-message').style.color = 'black';
  document.getElementById('countdown').style.display = 'none';
  createConfetti();
}

function createConfetti() {
  const particles = [];
  const colors = ['#FF0000', '#FFFF00', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF'];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 4 - 2,
      vy: Math.random() * 4 - 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 5 + 2,
    });
  }

  function drawConfetti() {
    
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fillStyle = particle.color;
      context.fill();
    });

    requestAnimationFrame(drawConfetti);
  }

  drawConfetti();
}

checkBirthday();
