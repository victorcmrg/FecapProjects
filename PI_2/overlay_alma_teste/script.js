// Calcula distância entre dois pontos
function distancia(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

// Cria imagem asterisco aleatoriamente
function criarAsterisco(container) {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const posicoes = [];
  
  // Máximo de 2 por vez (ou 1 se a area for pequena)
  const quantidade = Math.min(2, Math.floor(containerWidth / 100) || 1);

  for (let i = 0; i < quantidade; i++) {
    const a = document.createElement("img");
    a.src = "assets/asterisco.png";
    a.classList.add("asterisco-img");

    // tamanho aleatório da imagem (asterisco)
    const size = 30 + Math.random() * 170;
    a.style.width = size + "px";
    a.style.height = size + "px";

    let x, y, safe = false;
    let tentativas = 0;

    while(!safe && tentativas < 50){
      x = Math.random() * (containerWidth - size);
      y = Math.random() * (containerHeight - size);
      safe = true;
      for(const p of posicoes){
        if(distancia(x, y, p.x, p.y) < size) { 
          safe = false;
          break;
        }
      }
      tentativas++;
    }
    posicoes.push({x, y});

    a.style.left = x + "px";
    a.style.top = y + "px";

    // rotação aleatória quando imagem aparece
    const rot = Math.random() * 360;
    a.style.transform = `rotate(${rot}deg)`;

    container.appendChild(a);

    // remove apos 10s
    setTimeout(() => a.remove(), 10000);
  }
}

// Loop contínuo: só cria asteriscos se não houver nenhum na tela
function loopAsteriscos(container) {
  setInterval(() => {
    const existentes = container.querySelectorAll(".asterisco-img");
    if(existentes.length === 0){
      criarAsterisco(container);
    }
  }, 1000); // verifica a cada 1s
}

// Inicializa para todos os elementos
document.querySelectorAll(".quadrado, section").forEach(el => {
  loopAsteriscos(el);
});
