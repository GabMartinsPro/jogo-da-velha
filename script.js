const cells = document.querySelectorAll('.game button');
const currentPlayerDisplay = document.querySelector('.currentPlayer');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0 };

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const updateCurrentPlayerDisplay = () => {
    currentPlayerDisplay.textContent = `Vez do: ${currentPlayer}`;
};

const updateStatusDisplay = (message) => {
    statusDisplay.textContent = message;
};

const updateScoreboard = () => {
    document.getElementById('score-x').textContent = scores.X;
    document.getElementById('score-o').textContent = scores.O;
};

const checkGameResult = () => {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        updateStatusDisplay(`O jogador ${currentPlayer} VENCEU!`);
        scores[currentPlayer]++;
        updateScoreboard();
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        updateStatusDisplay('EMPATE!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerDisplay();
};

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-i')) - 1;

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.color = currentPlayer === 'X' ? '#2196F3' : '#F44336';
    
    checkGameResult();
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    updateCurrentPlayerDisplay();
    updateStatusDisplay('');

    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '';
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

updateCurrentPlayerDisplay();
updateScoreboard();