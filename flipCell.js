function flipCellUp(x,y,currentPlayer){ //上

    let fc;
    
    if(y == 0 || board[y-1][x] === currentPlayer || board[y-1][x] === 0){
        return;
    }
    for(let i = 2; y-i >= 0; i++){
        if(board[y-i][x] === currentPlayer){
            fc = y-i;
            break;
        }else if(board[y-i][x] === 0){
            break;
        }
    }
    for(y-1; fc <= y-1; y--){
        board[y-1][x] = currentPlayer;
        drawBoard();
    }
}

function flipCellDown(x,y,currentPlayer){ //下

    let fc;
    
    if(y == 7 || board[y+1][x] === currentPlayer || board[y+1][x] === 0){
        return;
    }
    for(let i = 2; y+i <= 7; i++){
        if(board[y+i][x] === currentPlayer){
            fc = y+i;
            break;
        }else if(board[y+i][x] === 0){
            break;
        }
    }
    for(y+1; fc >= y+1; y++){
        board[y+1][x] = currentPlayer;
        drawBoard();
    }
}

function flipCellLeft(x,y,currentPlayer){ //左

    let fc;
    
    if(x == 0 || board[y][x-1] === currentPlayer || board[y][x-1] === 0){
        return;
    }
    for(let j = 2; x-j >= 0; j++){
        if(board[y][x-j] === currentPlayer){
            fc = x-j;
            break;
        }else if(board[y][x-j] === 0){
            break;
        }
    }
    for(x-1; fc <= x-1; x--){
        board[y][x-1] = currentPlayer;
        drawBoard();
    }
}

function flipCellRight(x,y,currentPlayer){ //右

    let fc;

    if(x == 7 || board[y][x+1] === currentPlayer || board[y][x+1] === 0){
        return;
    }
    for(let j = 2; x+j <= 7; j++){
        if(board[y][x+j] === currentPlayer){
            fc = x+j;
            break;
        }else if(board[y][x+j] === 0){
            break;
        }
    }
    for(x+1; fc >= x+1; x++){
        board[y][x+1] = currentPlayer;
        drawBoard();
    }
}

function flipCellLeftUp(x,y,currentPlayer){ //左上
    let fcc,fcr;

    if((y == 0 || x == 0) || board[y-1][x-1] === currentPlayer || board[y-1][x-1] === 0){
        return;
    }
    for(let i = 2, j = 2; y-i >= 0 && x-j >= 0; i++, j++){
        if(board[y-i][x-j] === currentPlayer){
            fcc = y-i;
            fcr = x-j;
            break;
        }else if(board[y-i][x-j] === 0 ){
            break;
        }
    }

    for(y-1, x-1; fcc <= y-1, fcr <= x-1; y--, x--){
        board[y-1][x-1] = currentPlayer;
        drawBoard();
    }
}

function flipCellRightDown(x,y,currentPlayer){ //右下

    let fcc,fcr;
    
    if((y == 7 || x == 7) || board[y+1][x+1] === currentPlayer || board[y+1][x+1] === 0){
        return;
    }
    for(let i = 2, j = 2; y+i <= 7 && x+j >= 0; i++, j++){
        if(board[y+i][x+j] === currentPlayer){
            fcc = y+i;
            fcr = x+j;
            break;
        }else if(board[y+i][x+j] === 0){
            break;
        }
    }
    for(y+1, x+1; fcc >= y+1, fcr >= x+1; y++, x++){
        board[y+1][x+1] = currentPlayer;
        drawBoard();
    }
}

function flipCellRightUp(x,y,currentPlayer){ //右上
    
    let fcc,fcr;

    if((y == 0 || x == 7) || board[y-1][x+1] === currentPlayer || board[y-1][x+1] === 0){
        return;
    }
    for(let i = 2, j = 2; y-i >= 0 && x+j <= 7; i++, j++){
        if(board[y-i][x+j] === currentPlayer){
            fcc = y-i;
            fcr = x+j;
            break;
        }else if(board[y-i][x+j] === 0 || y-i < 0 || x+j > 7){
            break;
        }
    }
    for(y-1, x+1; fcc <= y-1, fcr >= x+1; y--, x++){
        board[y-1][x+1] = currentPlayer;
        drawBoard();
    }
}

function flipCellLeftDown(x,y,currentPlayer){ //左下
    
    let fcc,fcr;

    if((y == 7 || x == 0) || board[y+1][x-1] === currentPlayer || board[y+1][x-1] === 0){
        return;
    }
    for(let i = 2, j = 2; y+i <= 7 && x-j >= 0; i++, j++){
        if(board[y+i][x-j] === currentPlayer){
            fcc = y+i;
            fcr = x-j;
            break;
        }else if(board[y+i][x-j] === 0){
            break;
        }
    }
    for(y+1, x-1; fcc >= y+1, fcr <= x-1; y++, x--){
        board[y+1][x-1] = currentPlayer;
        drawBoard();
    }
}