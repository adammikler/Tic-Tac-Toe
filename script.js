//let board = Array.apply(null, Array(9));
const Board = () => {
    let board = Array.apply(null, Array(9)); //Creates the Array to store moves

    let checkWin = () => {
        /*used to measure if a row or collumn combined makes a win*/
        const xwin = 3;
        const owin = -3;
        /*checks for row wins*/
        for (let i = 0; i < 9; i+=3) {
            if(board[0 + i] + board [1 + i] + board[2 + i] == xwin) {
                displayWinner('X wins');
                delay(1000).then(() => clearBoard());
            } else if (board[0 + i] + board [1 + i] + board[2 + i] == owin) {
                displayWinner('O wins');
                delay(1000).then(() => clearBoard());
            };
        };

        /*checks for collumn wins*/
        for (let i = 0; i < 3; i++) {
            if(board[0 + i] + board [3 + i] + board[6 + i] == xwin) {
                displayWinner('X wins');
                delay(1000).then(() => clearBoard());
            } else if (board[0 + i] + board [3 + i] + board[6 + i] == owin) {
                displayWinner('O wins');
                delay(1000).then(() => clearBoard());
            };
        };

        /*checks for diagonal wins*/
        if (board[0] + board[4 ] + board[8] == xwin) {
            displayWinner('X wins');
            delay(1000).then(() => clearBoard());
        } else if (board[0] + board[4 ] + board[8] == owin) {
            displayWinner('O wins');
            delay(1000).then(() => clearBoard());
        } else if (board[2] + board[4 ] + board[6] == xwin) {
            displayWinner('X wins');
            delay(1000).then(() => clearBoard());
        } else if (board[2] + board[4 ] + board[6] == owin) {
            displayWinner('O wins');
            delay(1000).then(() => clearBoard());
        };
    };

    /*displays who the winner is*/
    let displayWinner = (winner) => {
        document.getElementById('winner').innerText = winner;
    }

    //waits before reseting game after a win
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    /*Clears the board and array*/
    let clearBoard = () => {
        //clears winner tag
        document.getElementById('winner').innerHTML = '';
        let button = document.getElementById(0);
        //clears ticTacToe grid
        for (let i = 0; i < 9; i++) {
            button = document.getElementById(i);
            button.innerHTML = '';
        };
        //resets the turn highlighter
        const active = document.querySelector('.active');
        const notActive = document.querySelector('.not-active');

        active.classList.replace('active', 'not-active');
        notActive.classList.replace('not-active', 'active');
        //resets the board
        board.length = 0;
    };
    return {board, checkWin, displayWinner, delay, clearBoard};
}

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
    const makeMove = (move, board) => {
        if (piece == 'x') {
            board.board[move] = 1;
        } else {
            board.board[move] = -1;
        };
    };
    return {piece, turn, updateTurn, makeMove};/*Object created*/
};

function playMove(x, o, i, board) {
    button = document.getElementById(i);
    if (x.turn == 1) {
        x.makeMove(i, board);
        x.updateTurn(x);
        o.updateTurn(o);
        button.innerHTML = "X";
        board.checkWin();
    } else {
        o.makeMove(i, board);
        x.updateTurn(x);
        o.updateTurn(o);
        button.innerHTML = "O";
        board.checkWin();
    }; 
};

function Game() {
    const board = Board();

    const x = Player('x', 1);/*Creates both players */
    const o = Player('o', 0);
    
    let button = document.getElementById(0);
    for (let i = 0; i < 9; i++) {
        button = document.getElementById(i);
        button.addEventListener('click', () => {
            playMove(x, o, i, board);
        }); 
    };
};

Game();
