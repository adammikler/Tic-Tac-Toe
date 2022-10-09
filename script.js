let board = Array.apply(null, Array(9)); /*Creates the Array to store moves*/

const state = {
    currentPlayer: 'x',
}
const buttons = document.querySelector('.board');

const makeMove = (currentPlayer, move) => {
    if (currentPlayer == 'x') {
        board[move] = 1;
    } else {
        board[move] = -1;
    };
};

const updateTurn = (currentPlayer, grid) => {
    const active = document.querySelector('.active');
    const notActive = document.querySelector('.not-active');
    const button = document.getElementById(grid);

    if (currentPlayer === 'x') {
        active.classList.replace('active', 'not-active');
        notActive.classList.replace('not-active', 'active');
        state.currentPlayer = 'o';
        // makeMove(grid);
        checkWin();
        button.innerHTML = "X";
    } else {
        active.classList.replace('active', 'not-active');
        notActive.classList.replace('not-active', 'active');
        state.currentPlayer = 'x';
        
        checkWin();
        button.innerHTML = "O";

    };
};

function checkWin() {
    /*used to measure if a row or collumn combined makes a win*/
    xwin = 3;
    owin = -3;
    /*checks for row wins*/
    for (let i = 0; i < 9; i+=3) {
        if(board[0 + i] + board [1 + i] + board[2 + i] == xwin) {
            displayWinner('X wins');
            clearBoard();
        } else if (board[0 + i] + board [1 + i] + board[2 + i] == owin) {
            displayWinner('O wins');
            clearBoard();
        };
    };
    /*checks for collumn wins*/
    for (let i = 0; i < 3; i++) {
        if(board[0 + i] + board [3 + i] + board[6 + i] == xwin) {
            displayWinner('X wins');
            clearBoard();
        } else if (board[0 + i] + board [3 + i] + board[6 + i] == owin) {
            displayWinner('O wins');
            clearBoard();
        };
    };
    /*checks for diagonal wins*/
    if (board[0] + board[4 ] + board[8] == xwin) {
        displayWinner('X wins');
        clearBoard();
    } else if (board[0] + board[4 ] + board[8] == owin) {
        displayWinner('O wins');
        clearBoard();
    } else if (board[2] + board[4 ] + board[6] == xwin) {
        displayWinner('X wins');
        clearBoard();
    } else if (board[2] + board[4 ] + board[6] == owin) {
        displayWinner('O wins');
        clearBoard();
    };
};
/*displays who the winner is*/
function displayWinner(winner) {
    document.getElementById('winner').innerText = winner;
}

/*Clears the board and array*/
function clearBoard() {
    let button = document.getElementById(0);
    board.forEach((item, index) => {
        button = document.getElementById(index);
        button.innerHTML = '';
    });
    board = Array.apply(null, Array(9));
}

function Game() {
    let button = document.getElementById(0);

    board.forEach((item, index) => {
        button = document.getElementById(index);
        button.addEventListener('click', () => {
            makeMove(state.currentPlayer, index);
            updateTurn(state.currentPlayer, index);
        }); 
    });
};

Game();
