const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        
        const cellSize = 50;
        ctx.lineWidth = 2;
        for(let i = 0; i < 8; i++){  // 列
            for(let j = 0; j < 8; j++){  // 行
                const x = cellSize * j;
                const y = cellSize * i;
                ctx.fillStyle = "rgb(0,255,0)";
                ctx.strokeRect(x,y,cellSize,cellSize)
            }
        }

        let currentPlayer = 1;
        let empty = 1;
        let cp;
        let cpno = [];
        let cc = 0;
        let passCount = 0;

        const board = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,2,1,0,0,0],
            [0,0,0,1,2,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
        ];

        const checkBoard = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
        ];

        drawBoard();
        currentPlayerColor();
        checkCell(currentPlayer);

        canvas.addEventListener("click",(event) =>{
            const x = Math.floor(event.offsetX / cellSize);
            const y = Math.floor(event.offsetY / cellSize);

            if(checkBoard[y][x] != 0 && board[y][x] == 0){
                    drawMark(x,y,currentPlayer);
                    board[y][x] = currentPlayer;
                    flipCell(x,y,currentPlayer);
                    drawBoard();
                    checkWinner();
                    currentPlayer = currentPlayer === 1 ? 2 : 1;
                    checkCell(currentPlayer);
                    checkPass();
                    currentPlayerColor();
            }
        })

        function checkPass(){
            let pass = 0;
            for(let y = 0; y < 8; y++){
                for(let x = 0; x < 8; x++){
                    if(checkBoard[y][x] == 1){
                        pass ++;
                    }
                }
            }
            if(pass == 0){
                passCount ++;
                alert("打てるマスがありません。\nパス!")
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                return;
            }
            if(passCount == 2){
                checkWinner(pc2);
            }
        }

        function flipCell(x,y,currentPlayer){ //反転判定
            flipCellUp(x,y,currentPlayer); //上
            flipCellDown(x,y,currentPlayer); //下
            flipCellLeft(x,y,currentPlayer); //左
            flipCellRight(x,y,currentPlayer);  //右
            flipCellLeftUp(x,y,currentPlayer); //左上
            flipCellRightDown(x,y,currentPlayer); //右下
            flipCellRightUp(x,y,currentPlayer); //右上
            flipCellLeftDown(x,y,currentPlayer); //左下
        }

        function checkCell(currentPlayer){ //挟む判定
            for(let y = 0; y < 8; y++){
                for(let x = 0; x < 8; x++){
                    checkBoard[y][x] = 0;
                }
            }
            checkCellUp(currentPlayer); //上
            checkCellDown(currentPlayer); //下
            checkCellLeft(currentPlayer); //左
            checkCellRight(currentPlayer); //右
            checkCellLeftUp(currentPlayer); //左上
            checkCellRightDown(currentPlayer); //右下
            checkCellRightUp(currentPlayer); //右上
            checkCellLeftDown(currentPlayer); //左下
        }

        function checkCellUp(currentPlayer){ //上
            for(let y = 0; y < 8; y++){
                loop: for(let x = 0; x < 8; x++){
                    if(y == 0 || board[y-1][x] === currentPlayer || board[y-1][x] === 0){
                        continue;
                    }
                    for(let i = 2; y-i >= 0; i++){
                        if(board[y-i][x] === currentPlayer){
                            checkBoard[y][x] = 1;
                            continue loop;
                        }else if(board[y-i][x] === 0){
                            continue;
                        }
                    }
                }
            }
        }

        function checkCellDown(currentPlayer){ //下
            for(let y = 0; y < 8; y++){
                loop: for(let x = 0; x < 8; x++){
                    if(y == 7 || board[y+1][x] === currentPlayer || board[y+1][x] === 0){
                        continue;
                    }
                    for(let i = 2; y+i <= 7; i++){
                        if(board[y+i][x] === currentPlayer){
                            checkBoard[y][x] = 1;
                            continue loop;
                        }else if(board[y+i][x] === 0){
                            continue;
                        }
                    }
                }
            }
        }

        function checkCellLeft(currentPlayer){ //左
            for(let y = 0; y < 8; y++){
                loop: for(let x = 0; x < 8; x++){
                    if(x == 0 || board[y][x-1] === currentPlayer || board[y][x-1] === 0){
                        continue;
                    }
                    for(let j = 2; x-j >= 0; j++){
                        if(board[y][x-j] === currentPlayer){
                            checkBoard[y][x] = 1;
                            continue loop;
                        }else if(board[y][x-j] === 0){
                            continue;
                        }
                    }
                }
            }
        }

        function checkCellRight(currentPlayer){ //右
            for(let y = 0; y < 8; y++){
                loop: for(let x = 0; x < 8; x++){
                    if(x == 7 || board[y][x+1] === currentPlayer || board[y][x+1] === 0){
                        continue;
                    }
                    for(let j = 2; x+j <= 7; j++){
                        if(board[y][x+j] === currentPlayer){
                            checkBoard[y][x] = 1;
                            continue loop;
                        }else if(board[y][x+j] === 0){
                            continue;
                        }
                    }
                }
            }
        }

        function checkCellLeftUp(currentPlayer){ //左上
            for(let y = 0; y < 8; y++){
                loop: for(let x = 0; x < 8; x++){
                    if(y == 0 || x == 0 || board[y-1][x-1] === currentPlayer || board[y-1][x-1] === 0){
                        continue;
                    }
                    for(let i = 2, j = 2; y-i >= 0 && x-j >= 0; i++, j++){
                        if(board[y-i][x-j] === currentPlayer){
                            checkBoard[y][x] = 1;
                            continue loop;
                        }else if(board[y-i][x-j] === 0){
                            continue;
                        }
                    }
                }
            }
        }

        function checkCellRightDown(currentPlayer){ //右下
            for(let y = 0; y < 8; y++){
                loop: for(let x = 0; x < 8; x++){
                    if(y == 7 || x == 7 || board[y+1][x+1] === currentPlayer || board[y+1][x+1] === 0){
                        continue;
                    }
                    for(let i = 2, j = 2; y+i <= 7 && x+j <= 7; i++, j++){
                        if(board[y+i][x+j] === currentPlayer){
                            checkBoard[y][x] = 1;
                            continue loop;
                        }else if(board[y+i][x+j] === 0){
                            continue;
                        }
                    }
                }
            }
        }

        function checkCellRightUp(currentPlayer){ //右上
            for(let y = 0; y < 8; y++){
                loop: for(let x = 0; x < 8; x++){
                    if(y == 0 || x == 7 || board[y-1][x+1] === currentPlayer || board[y-1][x+1] === 0){
                        continue;
                    }
                    for(let i = 2, j = 2; y-i >= 0 && x+j <= 7; i++, j++){
                        if(board[y-i][x+j] === currentPlayer){
                            checkBoard[y][x] = 1;
                            continue loop;
                        }else if(board[y-i][x+j] === 0){
                            continue;
                        }
                    }
                }
            }
        }

        function checkCellLeftDown(currentPlayer){ //左下
            for(let y = 0; y < 8; y++){
                loop: for(let x = 0; x < 8; x++){
                    if(y == 7 || x == 0 || board[y+1][x-1] === currentPlayer || board[y+1][x-1] === 0){
                        continue;
                    }
                    for(let i = 2, j = 2; y+i <= 7 && x-j >= 0; i++, j++){
                        if(board[y+i][x-j] === currentPlayer){
                            checkBoard[y][x] = 1;
                            continue loop;
                        }else if(board[y+i][x-j] === 0){
                            continue;
                        }
                    }
                }
            }
        }

        function drawMark(x,y,currentPlayer){
            ctx.beginPath();
            const centerX = x * cellSize + cellSize / 2;
            const centerY = y * cellSize + cellSize / 2;
            const radius = cellSize / 3;
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            if(currentPlayer == 1){
                ctx.fillStyle = "black";
                ctx.fill();
            }else if(currentPlayer == 2){          
                ctx.fillStyle = "white";
                ctx.fill();
            }
            // ctx.stroke();
        }

        function drawBoard(){
            let black = 0;
            let white = 0;

            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    const centerX = j * cellSize + cellSize / 2;
                    const centerY = i * cellSize + cellSize / 2;
                    const radius = cellSize / 3;
                    if(board[i][j] === 1){
                        ctx.beginPath();
                        ctx.fillStyle = "black";
                        ctx.arc(centerX,centerY,radius,0,2 * Math.PI);
                        ctx.fill();
                        black ++;
                    }else if(board[i][j] === 2){
                        ctx.beginPath();
                        ctx.fillStyle = "white";
                        ctx.arc(centerX,centerY,radius,0,2 * Math.PI);
                        ctx.fill();
                        white ++;
                    }
                }
            }
            const count = document.getElementById("count");
            count.innerHTML = `黒 ${black} : ${white} 白`;
        }

        function currentPlayerColor(){
            let cpc;
            if(currentPlayer === 1){
                cpc = "黒";
            }else if(currentPlayer === 2){
                cpc = "白";
            }
            cp = document.getElementById("cp");
            cp.innerHTML = `${cpc}の番`;
        }

        function checkWinner(pc2){
            let black = 0;
            let white = 0;
            let empty = 1;
            let a;
            let result;
            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    a = board[j][i];
                    empty = empty * a;
                    if(board[i][j] === 1){
                    black += 1;
                    }else if(board[i][j] === 2){
                        white += 1;
                    }
                }
            }
            if(empty !== 0 || pc2){
                setTimeout(function(){
                    if(black > white){
                        result = "プレイヤー1の勝利";
                    }else if(black < white){
                        result = "プレイヤー2の勝利";
                    }else if(black == white){
                        result = "引き分け";
                    }
                    alert(black+":"+white+"\n"+result);
                },200);
            }
        }

        function resetBoard(){
            window.location.reload();
        }