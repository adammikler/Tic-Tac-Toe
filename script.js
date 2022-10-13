//let board = Array.apply(null, Array(9));

let board = Array.apply(null, Array(9)); //Creates the Array to store moves

function checkWin(ai) {
    /*used to measure if a row or collumn combined makes a win*/
    const xwin = 3;
    const owin = -3;
    /*checks for row wins*/
    for (let i = 0; i < 9; i+=3) {
        if(board[0 + i] + board [1 + i] + board[2 + i] == xwin) {
            if(ai) {
                return xwin;
            } else {
                displayWinner('X wins');
                delay(1000).then(() => clearBoard());
            }
        } else if (board[0 + i] + board [1 + i] + board[2 + i] == owin) {
            if (ai) {
                return owin;
            } else {
                displayWinner('O wins');
                delay(1000).then(() => clearBoard());
            }           
        };
    };

    /*checks for collumn wins*/
    for (let i = 0; i < 3; i++) {
        if(board[0 + i] + board [3 + i] + board[6 + i] == xwin) {
            if(ai) {
                return xwin;
            } else {
                displayWinner('X wins');
                delay(1000).then(() => clearBoard());
            };
        } else if (board[0 + i] + board [3 + i] + board[6 + i] == owin) {
            if (ai) {
                return owin;
            } else {
                displayWinner('O wins');
                delay(1000).then(() => clearBoard());
            }
        };
    };

    /*checks for diagonal wins*/
    if (board[0] + board[4 ] + board[8] == xwin) {
        if(ai) {
            return xwin;
        } else {
            displayWinner('X wins');
            delay(1000).then(() => clearBoard());
        };
    } else if (board[0] + board[4 ] + board[8] == owin) {
        if (ai) {
            return owin;
        } else {
            displayWinner('O wins');
            delay(1000).then(() => clearBoard());
        }
    } else if (board[2] + board[4 ] + board[6] == xwin) {
        if(ai) {
            return xwin;
        } else {
            displayWinner('X wins');
            delay(1000).then(() => clearBoard());
        };
    } else if (board[2] + board[4 ] + board[6] == owin) {
        if (ai) {
            return owin;
        } else {
            displayWinner('O wins');
            delay(1000).then(() => clearBoard());
        };
    };
    let openSpots = 0;
    for (let i = 0; i < 9; i++) {
        if (board[i] == undefined) {
            openSpots++;
        };
    }
    if (openSpots == 0){
        if (ai) {
            return 0;
        } else {
            displayWinner('Tie');
            delay(1000).then(() => clearBoard());
        };
    } else if (openSpots !== 0) {
        openSpots = 0;
    }
        
    return null;
    
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
function clearBoard () {
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

function bestMove() {
// AI to make its turn
    let bestScore = Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        // Is the spot available?
        if (board[i] == undefined) {
            board[i] = -1;
            let score = minimax(board, false);
            board[i] = undefined;
            if (score < bestScore) {
                bestScore = score;
                move = i;
            }
        }
        
    }
    board[move] = -1;
    document.getElementById(move).innerHTML = 'O';
}
function minimax(board, isMaximizing) {
    let result = checkWin(true);
    if (result !== null) {
        return result;
    }
  
    if (isMaximizing) {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            // Is the spot available?
            if (board[i] == undefined) {
                board[i] = -1;
                let score = minimax(board, false);
                board[i] = undefined;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            // Is the spot available?
            if (board[i] == undefined) {
                board[i] = 1;
                let score = minimax(board, true);
                board[i] = undefined;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
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
    bestMove();
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
