// Configuração do Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Elemento de seleção de cor
const colorPicker = document.getElementById('colorPicker');

// Função para gerar um número aleatório
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Converte HEX para RGB para podermos manipular a intensidade (alpha)
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

// DESAFIO EXTRA 1: Retorna a cor escolhida pelo usuário com uma intensidade (opacidade) aleatória
function getThemeColor() {
  const rgb = hexToRgb(colorPicker.value);
  const intensity = (Math.random() * 0.7 + 0.3).toFixed(2); // Intensidade entre 0.3 e 1.0
  return `rgba(${rgb}, ${intensity})`;
}

// Atualiza todas as partículas quando o usuário muda a cor no painel
colorPicker.addEventListener('input', () => {
  for (const particle of particles) {
    particle.color = getThemeColor();
  }
});

// Classe Partícula
class Particle {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  // DESAFIO EXTRA 2: Desenhar outras formas geométricas (Losango)
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x, this.y - this.size); // Topo
    ctx.lineTo(this.x + this.size, this.y); // Direita
    ctx.lineTo(this.x, this.y + this.size); // Baixo
    ctx.lineTo(this.x - this.size, this.y); // Esquerda
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const particle of particles) {
      if (this !== particle) {
        const dx = this.x - particle.x;
        const dy = this.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + particle.size) {
          particle.color = this.color = getThemeColor();
        }
      }
    }
  }
}

// Array para armazenar as partículas
const particles = [];

while (particles.length < 35) {
  const size = random(10, 20);
  const particle = new Particle(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-5, 5) || 1, // Garante que a velocidade não seja zero
    random(-5, 5) || 1,
    getThemeColor(),
    size
  );
  particles.push(particle);
}

// Loop de animação
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const particle of particles) {
    particle.draw();
    particle.update();
    particle.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();