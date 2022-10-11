//let board = Array.apply(null, Array(9));

let board = Array.apply(null, Array(9)); //Creates the Array to store moves

function checkWin() {
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
   
    const tie = board.filter(board => 1);
    if (tie.length == 0) {
        console.log('tie')
    }
    console.log(tie);
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


function miniMax(aiBoard, depth, maximizingPlayer) {
    if (depth == 0) {
        return
    };
    if (maximizingPlayer == true) {
        let maxEval = -Infinity;
        for (let i = 0; i < 9; i++) {
            if(aiBoard[i] == undefined) {
                aiBoard[i] = -1;
                console.log(aiBoard)
                eval = miniMax(aiBoard, depth - 1, false)
                maxEval = Math.max(maxEval, eval);
            }
        }
        return maxEval;
    } else {
        console.log('test')
        let minEval = Infinity;
        for (let i = 0; i < 9; i++) {
            if(aiBoard[i] == 0) {
                aiBoard[i] = 1;
                console.log(aiBoard)
                eval = miniMax(aiBoard, depth - 1, true)
                if (aiWin(aiBoard) == 3) {
                    return Infinity;
                }
                minEval = Math.max(minEval, eval)
            };
        }
        return minEval;
    }
} 
function aiWin(aiBoard) {
    /*used to measure if a row or collumn combined makes a win*/
    const xwin = 3;
    const owin = -3;
    /*checks for row wins*/
    for (let i = 0; i < 9; i+=3) {
        if(aiBoard[0 + i] + aiBoard [1 + i] + aiBoard[2 + i] == xwin) {
            return(xwin);
        } else if (aiBoard[0 + i] + aiBoard [1 + i] + aiBoard[2 + i] == owin) {
            return(owin);
        };
    };

    /*checks for collumn wins*/
    for (let i = 0; i < 3; i++) {
        if(aiBoard[0 + i] + aiBoard [3 + i] + aiBoard[6 + i] == xwin) {
            return(xwin);
        } else if (aiBoard[0 + i] + aiBoard[3 + i] + aiBoard[6 + i] == owin) {
            return(owin);
        };
    };

    /*checks for diagonal wins*/
    if (aiBoard[0] + aiBoard[4 ] + aiBoard[8] == xwin) {
        return(xwin);
    } else if (aiBoard[0] + aiBoard[4 ] + aiBoard[8] == owin) {
        return(owin);
    } else if (aiBoard[2] + aiBoard[4 ] + aiBoard[6] == xwin) {
        return(xwin);
    } else if (aiBoard[2] + aiBoard[4 ] + aiBoard[6] == owin) {
        return(owin);
    };
};

function aiMove(move) {
    board[move] = -1;
    document.getElementById(move).innerHTML = "O";
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
    let depth = 9;
    miniMax(aiBoard, depth, true);
    depth - 1;
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
