const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// 1. Array com os nomes das imagens e seus textos alternativos
const images = [
  { file: 'arduino.webp', alt: 'Placa microcontroladora principal' },
  { file: 'ultrassonico.webp', alt: 'Módulo sensor ultrassônico' },
  { file: 'servomotor.png', alt: 'Micro servo motor' },
  { file: 'leitor.png', alt: 'Módulo leitor RFID' },
  { file: 'protoboard.png', alt: 'Protoboard com fiação e resistores' }
];

// 2. Laço de repetição para criar as miniaturas
for (const image of images) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${image.file}`);
  newImage.setAttribute('alt', image.alt);
  thumbBar.appendChild(newImage);

  // 3. Adicionando evento de clique em cada miniatura
  newImage.addEventListener('click', e => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });
}

// 4. Lógica do botão Escurecer/Clarear
btn.addEventListener('click', () => {
  const btnClass = btn.getAttribute('class');
  
  if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Clarear';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Escurecer';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});