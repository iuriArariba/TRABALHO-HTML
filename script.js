// Letras e variáveis de controle do jogo
const letters = ['A', 'B', 'C', 'D', 'E'];
let selectedLetters = [];
let revealedCards = [];

// Inicia uma nova partida
function startGame() {
    selectedLetters = generateRandomLetters();
    const memoryGameDiv = document.getElementById("memoryGame");
    memoryGameDiv.innerHTML = ''; // Limpa o jogo anterior

    // Duplica e embaralha as letras para formar pares, com uma letra sobrando
    const gameLetters = [...selectedLetters, ...selectedLetters].slice(0, 9);
    gameLetters.sort(() => Math.random() - 0.5); // Embaralha as letras

    gameLetters.forEach((letter) => {
        const card = document.createElement('button');
        card.className = 'memory-card';
        card.setAttribute('data-letter', letter);
        card.onclick = () => revealCard(card);
        memoryGameDiv.appendChild(card);
    });
}

// Gera uma lista aleatória de letras para a partida com 4 pares e 1 extra
function generateRandomLetters() {
    const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
    return shuffledLetters.slice(0, 5); // Seleciona 5 letras
}

// Revela uma carta e verifica o estado do jogo
function revealCard(card) {
    const letter = card.getAttribute('data-letter');
    if (!card.classList.contains('revealed') && revealedCards.length < 2) {
        card.classList.add('revealed');
        card.textContent = letter;
        revealedCards.push(card);

        if (revealedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Verifica se as cartas reveladas são um par
function checkMatch() {
    const [card1, card2] = revealedCards;

    if (card1.getAttribute('data-letter') === card2.getAttribute('data-letter')) {
        card1.disabled = true;
        card2.disabled = true;
    } else {
        card1.classList.remove('revealed');
        card2.classList.remove('revealed');
        card1.textContent = '';
        card2.textContent = '';
    }
    revealedCards = [];
}

// Animação do Balão e Bomba
let balloonSize = 50;
let isPopped = false;

function inflateBalloon() {
    if (isPopped) return; // Se o balão já estourou, não faz nada

    const balloon = document.getElementById("balloon");
    balloonSize += 10; // Aumenta o tamanho do balão
    balloon.style.width = `${balloonSize}px`;
    balloon.style.height = `${balloonSize + 20}px`;

    // Estoura o balão se atingir um certo tamanho
    if (balloonSize >= 150) {
        balloon.style.backgroundColor = "transparent";
        balloon.style.border = "none";
        document.getElementById("message").innerText = "O balão estourou!";
        isPopped = true;
    }
}

// Reinicia o estado do balão para uma nova interação
function resetBalloon() {
    balloonSize = 50;
    isPopped = false;
    const balloon = document.getElementById("balloon");
    balloon.style.width = `${balloonSize}px`;
    balloon.style.height = `${balloonSize + 20}px`;
    balloon.style.backgroundColor = "red";
    document.getElementById("message").innerText = "";
    document.getElementById("errorMessage").innerText = ""; // Limpa mensagem de erro
}

// Função para verificar sucesso ou erro
function checkSuccess(event) {
    const messageElement = document.getElementById("errorMessage");

    // Verifica se o clique foi no botão azul
    if (event.target.id === 'checkButton') {
        messageElement.innerText = "Sucesso!";
    } else {
        messageElement.innerText = "Erro! Tente novamente.";
    }
}

// Gera mensagem de erro ao clicar no botão invisível
function generateError() {
    document.getElementById("errorMessage").innerText = "Erro! Tente novamente.";
}

// Função que verifica se uma palavra é um palíndromo
function isPalindrome(word) {
    // Remove espaços e converte para minúsculas
    const cleanedWord = word.replace(/\s+/g, '').toLowerCase();
    // Inverte a palavra e compara
    const reversedWord = cleanedWord.split('').reverse().join('');
    return cleanedWord === reversedWord;
}

// Função para verificar se a palavra de entrada é um palíndromo
function checkPalindrome() {
    const input = document.getElementById("palindromeInput").value;
    const result = isPalindrome(input);
    document.getElementById("palindromeResult").innerText = result ? "É um palíndromo!" : "Não é um palíndromo.";
}
