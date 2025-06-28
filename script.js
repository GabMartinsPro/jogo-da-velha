const cells = document.querySelectorAll('.game button');
const currentPlayerText = document.querySelector('.currentPlayer');
const statusText = document.getElementById('status'); // Você já pode ter isso ou usar para mensagens gerais
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');
const resetButton = document.getElementById('reset-button'); // Botão de reset do placar

// Elementos do Modal
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const restartGameButton = document.getElementById('restart-game-button');
const exitGameButton = document.getElementById('exit-game-button');
const closeButton = document.querySelector('.close-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

// Condições de vitória
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
  [0, 4, 8], [2, 4, 6]             // Diagonais
];

// Função para iniciar ou reiniciar o jogo
function initializeGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayerText.textContent = `É a vez do Jogador ${currentPlayer}`;
  statusText.textContent = ''; // Limpa qualquer mensagem de status anterior
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o'); // Remove classes de estilo
    cell.removeAttribute('disabled'); // Reabilita os botões
  });
  modal.style.display = 'none'; // Garante que o modal esteja escondido
}

// Atualiza o placar no HTML
function updateScoreboard() {
  scoreXElement.textContent = scoreX;
  scoreOElement.textContent = scoreO;
  
}

// Lida com o clique em uma célula
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.dataset.i) - 1; // Ajusta para índice 0-8
  
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
    return; // Se a célula já estiver preenchida ou o jogo não estiver ativo, sai
  }

  clickedCell.style.color = currentPlayer === 'X' ? '#2196F3' : '#F44336';

  gameBoard[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkResult();
}

// Verifica o resultado do jogo
function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameBoard[winCondition[0]];
    let b = gameBoard[winCondition[1]];
    let c = gameBoard[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    modalMessage.textContent = `O Jogador ${currentPlayer} venceu!`;
    if (currentPlayer === 'X') {
      scoreX++;
    } else {
      scoreO++;
    }
    updateScoreboard();
    showModal();
    return;
  }

  let roundDraw = !gameBoard.includes(''); // Se não houver células vazias, é um empate
  if (roundDraw) {
    gameActive = false;
    modalMessage.textContent = `Empate!`;
    showModal();
    return;
  }

  // Se ninguém venceu e não é empate, troca o jogador
  changePlayer();
}

// Troca o jogador atual
function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerText.textContent = `Vez do Jogador ${currentPlayer}`;
}

// Exibe o modal
function showModal() {
  modal.style.display = 'flex'; // Altera para 'flex' para exibir e centralizar
}

// Esconde o modal
function hideModal() {
  modal.style.display = 'none';
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', () => {
  scoreX = 0;
  scoreO = 0;
  updateScoreboard();
  initializeGame();
});

// Event listeners para os botões do modal
restartGameButton.addEventListener('click', initializeGame);
exitGameButton.addEventListener('click', () => {
  // Você pode redirecionar para outra página ou fechar a aba
  alert("Obrigado por jogar! A janela será fechada.");
  window.close(); // Tenta fechar a janela (pode não funcionar em todos os navegadores devido a restrições de segurança)
  // Ou, para um jogo mais complexo, você pode apenas esconder o modal e resetar o jogo sem limpar o placar geral
});
closeButton.addEventListener('click', hideModal); // Botão 'x' para fechar o modal sem reiniciar

// Inicializa o jogo ao carregar a página
initializeGame();
updateScoreboard(); // Garante que o placar seja 0-0 no início