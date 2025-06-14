const cells = document.querySelectorAll('.game button'); // Seleciona todos os botões que representam as células
const currentPlayerDisplay = document.querySelector('.currentPlayer'); // Onde exibimos o jogador atual
const statusDisplay = document.getElementById('status'); // Onde exibimos mensagens de status (vitória, empate)
const resetButton = document.getElementById('reset-button'); // Nosso botão de reiniciar

let board = ['', '', '', '', '', '', '', '', '']; // Representa o tabuleiro lógico (9 células)
let currentPlayer = 'X'; // Começa com o jogador 'X'
let gameActive = true; // Flag para saber se o jogo ainda está ativo

// Condições de vitória para o Jogo da Velha (índices das células)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

// --- Funções Auxiliares ---

// Atualiza a mensagem do jogador atual
const updateCurrentPlayerDisplay = () => {
    currentPlayerDisplay.textContent = `Vez do: ${currentPlayer}`;
};

// Atualiza a mensagem de status (vitória/empate)
const updateStatusDisplay = (message) => {
    statusDisplay.textContent = message;
};

// --- Lógica Principal do Jogo ---

// Função para verificar o resultado do jogo (vitória, empate ou continua)
const checkGameResult = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue; // Se alguma célula da condição está vazia, pula
        }
        if (a === b && b === c) {
            roundWon = true; // Encontramos um vencedor!
            break;
        }
    }

    if (roundWon) {
        updateStatusDisplay(`O jogador ${currentPlayer} VENCEU!`);
        gameActive = false; // Jogo acabou
        return;
    }

    // Se o tabuleiro não inclui mais espaços vazios e ninguém venceu, é um empate
    if (!board.includes('')) {
        updateStatusDisplay('EMPATE!');
        gameActive = false; // Jogo acabou
        return;
    }

    // Se o jogo continua, troca o jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerDisplay(); // Atualiza quem é o jogador da vez
};

// Função que lida com o clique em uma célula
const handleCellClick = (event) => {
    const clickedCell = event.target;
    // O 'data-i' no HTML começa de 1, mas arrays em JS começam de 0.
    // Subtraímos 1 para obter o índice correto do array 'board'.
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-i')) - 1; 

    // Se a célula já estiver preenchida ou o jogo não estiver ativo, não faz nada
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Atualiza o tabuleiro lógico e visual
    board[clickedCellIndex] = currentPlayer; // Marca no array
    clickedCell.textContent = currentPlayer; // Exibe 'X' ou 'O' no botão
    // Opcional: Adicionar uma classe para estilização específica de 'X' ou 'O'
    // clickedCell.classList.add(currentPlayer.toLowerCase()); 

    checkGameResult(); // Verifica o resultado após a jogada
};

// --- Função de Reiniciar o Jogo ---
const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', '']; // Limpa o tabuleiro lógico
    currentPlayer = 'X'; // Volta para 'X' como primeiro jogador
    gameActive = true; // Ativa o jogo novamente

    updateCurrentPlayerDisplay(); // Atualiza a mensagem para a vez do 'X'
    updateStatusDisplay(''); // Limpa a mensagem de status (vitória/empate)

    // Limpa o texto de todas as células visuais
    cells.forEach(cell => {
        cell.textContent = '';
        // Se você adicionou classes, remova-as aqui
        // cell.classList.remove('x', 'o'); 
    });

    console.log('Jogo Reiniciado!');
};

// --- Adicionar Event Listeners ---

// Adiciona um evento de clique a cada célula
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Adiciona o evento de clique ao botão de reiniciar
resetButton.addEventListener('click', resetGame);

// --- Inicialização ---

// Inicia o jogo quando a página é carregada
resetGame(); 