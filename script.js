//let board = Array.apply(null, Array(9));

let board = Array.apply(null, Array(9)); //Creates the Array to store moves

function checkWin() {
    /*used to measure if a row or collumn combined makes a win*/
    const xwin = 3;
    const owin = -3;
    /*checks for row wins*/
    for (let i = 0; i < 9; i+=3) {
        if(board[0 + i] + board [1 + i] + board[2 + i] == xwin) {
            return 3;
            displayWinner('X wins');
            delay(1000).then(() => clearBoard());
        } else if (board[0 + i] + board [1 + i] + board[2 + i] == owin) {
            return -3;
            displayWinner('O wins');
            delay(1000).then(() => clearBoard());
        };
    };

    /*checks for collumn wins*/
    for (let i = 0; i < 3; i++) {
        if(board[0 + i] + board [3 + i] + board[6 + i] == xwin) {
            return 3;
            displayWinner('X wins');
            delay(1000).then(() => clearBoard());
        } else if (board[0 + i] + board [3 + i] + board[6 + i] == owin) {
            return -3;
            displayWinner('O wins');
            delay(1000).then(() => clearBoard());
        };
    };

    /*checks for diagonal wins*/
    if (board[0] + board[4 ] + board[8] == xwin) {
        return 3;
        displayWinner('X wins');
        delay(1000).then(() => clearBoard());
    } else if (board[0] + board[4 ] + board[8] == owin) {
        return -3;
        displayWinner('O wins');
        delay(1000).then(() => clearBoard());
    } else if (board[2] + board[4 ] + board[6] == xwin) {
        return 3;
        displayWinner('X wins');
        delay(1000).then(() => clearBoard());
    } else if (board[2] + board[4 ] + board[6] == owin) {
        return -3;
        displayWinner('O wins');
        delay(1000).then(() => clearBoard());
    };
    let test = [];
    for (let i = 0; i < 9; i++) {
        test.push(i);
    };
    if (test.length ==  9) {
        return 0
    } else {
       return null
    }
    
};

/*displays who the winner is*/
function displayWinner(winner) {
    document.getElementById('winner').innerText = winner;
}

//waits before reseting game after a win
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

/*Clears the board and array*/
function clearBoard (board) {
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


/*Creates the player objects with there abilites*/
const Player = (piece, turn) => {
    /*Takes in themove and updates it with a 1 for X or -1 for O*/
    const makeMove = (move) => {
        if (piece == 'x') {
            board[move] = 1;
        } else {
            board[move] = -1;
        };
    };
    return {piece, turn, makeMove};/*Object created*/
};

/*updates the current player and highlights whos move it is*/
function updateTurn (piece) {
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

function aiBestMove(aiBoard) {
    let BestScore = -Infinity;
    let BestMove;
    let depth = 0;
    for (let i = 0; i < 9; i++) {
        if(aiBoard[i] == undefined) {
            let score = miniMax(aiBoard, depth, true);
            if (score > BestScore) {
                BestScore = score;
                BestMove = [i];
            }
        };
    }
    document.getElementById(BestMove).innerHTML = "O";
    board[BestMove] = -1
}

function miniMax(aiBoard, depth, maximizingPlayer) {
    
    if (checkWin() !== null) {
        let score = checkWin();
        return score;
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (let i = 0; i < 9; i++) {
            if(aiBoard[i] == undefined) {
                aiBoard[i] = -1;
                eval = miniMax(aiBoard, depth + 1, false)
                maxEval = Math.max(maxEval, eval);
                aiBoard[i] = undefined;
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < 9; i++) {
            if(aiBoard[i] == undefined) {
                aiBoard[i] = 1;
                eval = miniMax(aiBoard, depth + 1, true)
                minEval = Math.min(minEval, eval);
                aiBoard[i] = undefined;
            }
        }
        return minEval;
    }
    
}

function playMove(x, i) {
    button = document.getElementById(i);
    x.makeMove(i, board);
    updateTurn(x);
    button.innerHTML = "X";
    checkWin();
    aiTurn(x);
};

function aiTurn(x) {
    let aiBoard = [...board];
    aiBestMove(aiBoard);
    checkWin();
    updateTurn(x);
}

function Game() {
    const x = Player('x', 1);/*Creates human players */
    
    let button = document.getElementById(0);
    for (let i = 0; i < 9; i++) {
        button = document.getElementById(i);
        button.addEventListener('click', () => {
            playMove(x, i, board);
        }); 
    };
};

Game();
