// 1. CAPTURANDO OS ELEMENTOS DO HTML
const customName = document.getElementById('customname');
const randomize = document.querySelector('.generate');
const story = document.querySelector('.story');

// Função para pegar um valor aleatório de um array
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// 2. TEXTOS E ARRAYS DA HISTÓRIA (Tema: Mistério/Arcano)
const storyText = "Estava fazendo 94 Fahrenheit lá fora, um calor anormal para a meia-noite. Então, :insertx: saiu das sombras para investigar. Quando chegou :inserty:, parou em choque por alguns instantes e, em seguida, :insertz:. Bob observou tudo escondido, mas não se surpreendeu — afinal, :insertx: possui 300 pounds de pura energia sombria, e coisas estranhas sempre acontecem quando a lua está cheia.";

const insertX = [
  "o Cultista das Sombras", 
  "o espírito de um alquimista", 
  "o Guardião do Grimório"
];

const insertY = [
  "nas ruínas de um templo esquecido", 
  "no porão abandonado da universidade", 
  "no centro de um círculo de pedras rúnicas"
];

const insertZ = [
  "invocou uma entidade abissal", 
  "desapareceu misteriosamente em uma nuvem de fumaça negra", 
  "começou a levitar enquanto recitava feitiços proibidos"
];

// 3. ADICIONANDO O EVENTO DE CLIQUE AO BOTÃO
randomize.addEventListener('click', result);

// 4. A FUNÇÃO PRINCIPAL QUE GERA A HISTÓRIA
function result() {
  // Cria uma nova string baseada no texto original para podermos modificá-la
  let newStory = storyText;

  // Sorteia os itens
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  // Substitui os marcadores pelos itens sorteados
  // Usamos replaceAll no :insertx: porque ele aparece duas vezes no texto
  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  // Se o usuário digitou um nome, substitui o padrão "Bob"
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  // Conversão de medidas se o botão "UK" estiver marcado
  if (document.getElementById("uk").checked) {
    // Converte de libras para stones (1 libra = 0.0714286 stone)
    const weight = Math.round(300 * 0.0714286) + ' stone';
    // Converte de Fahrenheit para Celsius
    const temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade';
    
    // Substitui os valores na história
    newStory = newStory.replace('94 Fahrenheit', temperature);
    newStory = newStory.replace('300 pounds', weight);
  }

  // Exibe a história final na tela e torna o parágrafo visível
  story.textContent = newStory;
  story.style.visibility = 'visible';
}