let board = Array.apply(null, Array(9)); /*Creates the Array to store moves*/

/*Creates the player objects with there abilites*/
const Player = (piece, turn) => {
    /*updates the current player and highlights whos move it is*/
    const updateTurn = (piece) => {
        if (piece.turn == 1) {

           piece.turn = 0;

           const active = document.querySelector('.active');
           const notActive = document.querySelector('.not-active');

           active.classList.replace('active', 'not-active');
           notActive.classList.replace('not-active', 'active');
        } else {
            piece.turn = 1;
        };
    };
    /*Takes in themove and updates it with a 1 for X or -1 for O*/
    const makeMove = (move) => {
        if (piece == 'x') {
            board[move] = 1;
        } else {
            board[move] = -1;
        };
    };
    return {piece, turn, updateTurn, makeMove};/*Object created*/
};

function playMove(x, o, i) {
    button = document.getElementById(i);
    if (x.turn == 1) {
        x.makeMove(i)
        x.updateTurn(x);
        o.updateTurn(o);
        button.innerHTML = "X";
        checkWin();
        console.log(board);
    } else {
        o.makeMove(i);
        x.updateTurn(x);
        o.updateTurn(o);
        checkWin();
        console.log(board);
        button.innerHTML = "O";
    }; 
};

function checkWin() {
    /*used to measure if a row or collumn combined makes a win*/
    xwin = 3;
    owin = -3;
    /*checks for row wins*/
    for (let i = 0; i < 9; i+=3) {
        console.log(i);
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
    for (let i = 0; i < 9; i++) {
        button = document.getElementById(i);
        button.innerHTML = '';
    };
    board.length = 0;
    board = Array.apply(null, Array(9));
}

function Game() {
    const x = Player('x', 1);/*Creates both players */
    const o = Player('o', 0);

    let button = document.getElementById(0);
    for (let i = 0; i < 9; i++) {
        button = document.getElementById(i);
        button.addEventListener('click', () => {
            playMove(x, o, i);
        }); 
    };
};

Game();
