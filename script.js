let currentLevel = 1;

const messages = {
  incorrect1: "Creo que eso no es muy acertado Dudu 😡",
  incorrect2: "¿Es en serio que no te acuerdas? pero bueno, te perdono 😡",
  incorrect3: "Vuelve a leer la pregunta 😡",
  incorrect4: "No es solo una cosa 🐱",
  incorrect5: "Si no pones la A, me enojaré por siempre contigo 🐱💢",
  correct1: "Este amor no necesita tutorial ♥️",
  correct2: "Tú me das +1000 de vida 🎮",
  correct3: "¡SÍ! Este jugador sabe reconocer lo bueno 💖",
  correct4: "Respuesta correcta... y directa al corazón 💖",
  correct6: "A veces el soporte técnico también barre… y casi siempre sale un conejo de Canelita 🐶🧹💕",
  correct7: "¡SÍ! ERES MI SAN VALENTÍN 💖"
};

function goToSystem() {
  document.querySelector('.screen.active').classList.remove('active');
  document.getElementById('system').classList.add('active');
}

function startGame() {
  document.getElementById('bgMusic').volume = 0.5;
  document.getElementById('bgMusic').play();
  document.getElementById('startSound').play();
  showScreen('q1');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goToFinalQuestion() {
  showScreen('q7');
}

function spawnParticles(type) {
  const container = document.getElementById('particles-container');
  const icons = type === 'love' ? ['💖', '👑', '✨', '🥰', '💋', '💝'] : ['😡', '💢', '💩', '👾', '🫤'];
  for(let i=0; i<30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-50px';
    p.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    container.appendChild(p);
    setTimeout(() => p.remove(), 3000);
  }
}

function processAnswer(isCorrect, msgKey) {
  const feedbackText = document.getElementById('feedback-text');
  const btnProceed = document.getElementById('btn-proceed');
  const catDiv = document.getElementById('gatito-pixel');
  
  feedbackText.innerText = messages[msgKey];
  catDiv.innerHTML = isCorrect ? '🤭' : '😖💢';

  if (isCorrect) {
    document.getElementById('plop').play();
    spawnParticles('love');
    btnProceed.innerText = "CONTINUAR";
    btnProceed.onclick = () => {
      currentLevel++;
      if (currentLevel === 7) {
        showScreen('final-warning');
        }
      else if (currentLevel > 7) {
        document.getElementById('winSound').play();
        showScreen('final');
        spawnParticles('love'); // Lluvia extra final
      } else {
        showScreen('q' + currentLevel);
      }
    };
  } else {
    document.getElementById('errorSound').play();
    spawnParticles('angry');
    btnProceed.innerText = "REINTENTAR";
    btnProceed.onclick = () => showScreen('q' + currentLevel);
  }
  showScreen('message-screen');
}
