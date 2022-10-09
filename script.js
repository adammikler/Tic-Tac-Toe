let board = Array.apply(null, Array(9));

const Player = (piece, turn) => {
    const updateTurn = (piece) => {
        if (piece.turn == 1) {
           piece.turn = 0;
        } else {
            piece.turn = 1;
        };
    };
    const makeMove = (move) => {
        if (piece == 'x') {
            board[move] = 1;
        } else {
            board[move] = -1;
        };
    };
    return {piece, turn, updateTurn, makeMove};
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
    if (board[0] == 1, board[1] == 1, board[2] == 1) {
        return(console.log('x wins'));
    } else if (board[0] == -1 && board[1] == -1 && board[2] == -1) {
        return(console.log('o wins'));
    } else if (board[3] == 1 && board[4] == 1 && board[5] == 1) {
        return(console.log('x wins'));
    } else if (board[3] == -1 && board[4] == -1 && board[5] == -1) {
        return(console.log('o wins'));
    } else if (board[6] == 1 && board[7] == 1 && board[8] == 1) {
        return(console.log('x wins'));
    } else if (board[6] == -1 && board[7] == -1 && board[8] == -1) {
        return(console.log('x wins'));
    } else if (board[0] == 1 && board[3] == 1 && board[6] == 1) {
        return(console.log('x wins'));
    } else if (board[0] == -1 && board[3] == -1 && board[6] == -1) {
        return(console.log('o wins'));
    } else if (board[1] == 1 && board[4] == 1 && board[7] == 1) {
        return(console.log('x wins'));
    } else if (board[1] == -1 && board[4] == -1 && board[7] == -1) {
        return(console.log('o wins'));
    } else if (board[2] == 1 && board[5] == 1 && board[8] == 1) {
        return(console.log('x wins'));
    } else if (board[2] == -1 && board[5] == -1 && board[8] == -1) {
        return(console.log('o wins'));
    } else if (board[0] == 1 && board[4] == 1 && board[8] == 1) {
        return(console.log('x wins'));
    } else if (board[0] == -1 && board[4] == -1 && board[8] == -1) {
        return(console.log('o wins'));
    } else if (board[2] == 1 && board[4] == 1 && board[6] == 1) {
        return(console.log('x wins'));
    } else if (board[2] == -1 && board[4] == -1 && board[6] == -1) {
        return(console.log('0 wins'));
    } else {
        return true;
    };
};
    
function Game() {
    const x = Player('x', 1);
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
