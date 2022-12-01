
// if we want to still use a table if you want. This uses the canvas element instead
var boardW, boardH;
function setSize(height_h,width_w) {
    boardW = width_w;
    boardH = height_h;

}
let canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d')
let  squareSize, color, canvasSize, playerTurn, countTurn, endGame, inRow;
let scale = 40;
//boardArray,
var Board = {
    xRecent:0,
    yRecent:0,
    boardArray:[],

    hintX:[],
    hintY:[]
};



function setUp(){
    canvasSize = 1000;
    inRow = 4;
    // change colors here
    color = {
        "board": document.getElementById("boardcolor").value,
        "player": {
            0: "white",
            1: document.getElementById("player1color").value, 
            2: document.getElementById("player2color").value
        },
        "tileShadow": "black",
        "textColor": "black"
    };
    playerTurn = 1;
    countTurn = 0;
    endGame = false;
    setUpBoard();
    setUpCanvas();
    topText();
}

function setUpBoard(){
    Board.boardArray = [];
    for(y = 0; y < boardH; y++){
        let row = [];
        for(x = 0; x < boardW; x++){
            row.push(0);
        }
        Board.boardArray.push(row);
    }
}

function setUpCanvas(){;
    canvas.style.width = scale+"%";  // does not change the resolution
    canvas.style.height = scale+"%";
    if(boardH+1 > boardW){
        canvas.height = canvasSize;
        squareSize = canvasSize / (boardH+1);
        canvas.width =  boardW * squareSize;
    } else {
        canvas.width = canvasSize;
        squareSize = canvasSize / boardW;
        canvas.height =  (boardH+1) * squareSize;
    }
    
}

function draw(){
    ctx.fillStyle = color.board;
    ctx.fillRect(0, 0+squareSize, boardW * squareSize, boardH * squareSize);
    for(y=0; y<boardH; y++){
        for(x=0; x<boardW; x++){
            drawTile(x,y+1, Board.boardArray[y][x]);
        }
    }
}

function drawTile(x, y,tileColor){
    let centerX = (x*squareSize) + (squareSize/2);
    let centerY = (y*squareSize) + (squareSize/2);
    let tileSize = (squareSize* 0.8) / 2;
    
    ctx.fillStyle = color.player[tileColor];
    ctx.beginPath();
    ctx.arc(centerX, centerY, tileSize, 0, 2 * Math.PI);
    ctx.fill();
}



function addController(){
    canvas.addEventListener("mousemove",(e)=>{
        let posX = Math.floor(((e.clientX - canvas.offsetLeft))/(canvas.offsetWidth/boardW));
        if(!endGame){
            clearTopRow();
            topText();
            drawTile(posX, 0, playerTurn);
        };
    })
    canvas.addEventListener("click",(e)=>{
        let clickX = Math.floor(((e.clientX - canvas.offsetLeft))/(canvas.offsetWidth/boardW))
        if(!endGame){
            for(y=boardH-1; y>=0; y--){
                if(Board.boardArray[y][clickX] == 0){
                    playMove(clickX, y);
                    break;
                }
            }
        }
    })
}

function playMove(x,y){
    countTurn++
    Board.boardArray[y][x] = playerTurn;
    Board.xRecent = x;
    Board.yRecent = y;
    if (checkWin()) {
        topText("win");
        
    } else if (checkTie()) {
        topText("tie")
    } else {
        switchPlayer();
        clearTopRow();
        topText("start");
        drawTile(x,0, playerTurn);
    }
    draw();
    
}

function clearTopRow(){
    ctx.clearRect(0,0,canvas.width, squareSize);
}

function checkWin(){
    if(winConditions()) {
        endGame = true
        document.getElementById("destroy").style.visibility = "visible";
        return true;   
    }
}

function checkTie() { // very easy way to check for a tie game. Full board and no win
    if(countTurn == boardW * boardH){
        endGame = true;
        return true;  
    }
}

function switchPlayer(){
    playerTurn == 1 ? playerTurn = 2: playerTurn = 1;   
}

function topText(text){
    clearTopRow(); // clear the top row 
    let line;
    switch(text){
        case "win": line = `CONNECT 4 - Player ${playerTurn} wins!`; break;
        case "tie": line = `CONNECT 4 - Draw!`; break;
        default: line = `CONNECT 4`; break;
    };
    ctx.fillStyle = color.textColor;
    ctx.font = "bold 20px Arial";   // change font size and type here

    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle"; 
    ctx.fillText(line,canvas.width/2, squareSize/2);
}

function checkChain(xInc,yInc){
    total = 0;
    x = Board.xRecent;
    y = Board.yRecent;
    while(x+xInc<boardW && x+xInc>=0 && y+yInc<boardH && y+yInc>=0){
        x+=xInc;
        y+=yInc;
        if(Board.boardArray[y][x] == playerTurn){
            total++
        }else{
            return total;
        }
        
    }
    return total
}
function findHint(xInc,yInc){
    x = Board.xRecent;
    y = Board.yRecent;
    while(x+xInc<boardW && x+xInc>=0 && y+yInc<boardH && y+yInc>=0){
        x+=xInc;
        y+=yInc;
        if(Board.boardArray[y][x] == 0){
            Board.hintX.push(x);
            Board.hintY.push(y);
            return;
        }
        
    }
}

function winConditions(){
    
    diag130oclock = 1+checkChain(1,1)+checkChain(-1,-1);
    diag430oclock = 1+checkChain(-1,1)+checkChain(1,-1);

    horizontal = 1+checkChain(1,0)+checkChain(-1,0);
    vertical = 1+checkChain(0,1)+checkChain(0,-1);

    if(diag130oclock>3 || diag430oclock>3 || horizontal>3 || vertical>3){
        return true;
    }
    if(diag130oclock == 3){
        findHint(1,1);
        findHint(-1,-1);
    }
    if(diag430oclock == 3){
        findHint(-1,1);
        findHint(1,-1);
    }
    if(horizontal == 3){
        findHint(1,0);
        findHint(-1,0);
    }
    if(vertical == 3){
        findHint(0,1);
        findHint(0,-1);
    }
    
    /*
    for (y = 0; y<boardH; y++){ // horizontal
        for (x=0; x<boardW-3;x++){
            if(Board.boardArray[y][x] == playerTurn && Board.boardArray[y][x+1] == playerTurn && Board.boardArray[y][x+2] == playerTurn && Board.boardArray[y][x+3] == playerTurn) return true;
        }
    }
    for (y=0; y<boardH-3; y++){ // vertical
        for (x=0; x<boardW;x++){
            if(Board.boardArray[y][x] == playerTurn && Board.boardArray[y+1][x] == playerTurn && Board.boardArray[y+2][x] == playerTurn && Board.boardArray[y+3][x] == playerTurn) return true;
        }
    }
    
    for (y=0; y<boardH-3; y++){ // diagonal to left check
        for (x=0; x<boardW-3;x++){
            if(Board.boardArray[y][x] == playerTurn && Board.boardArray[y+1][x+1] == playerTurn && Board.boardArray[y+2][x+2] == playerTurn && Board.boardArray[y+3][x+3] == playerTurn) return true;
        
        }
    }
    for (y=3; y<boardH; y++){ // diagonal to right check
        for (x=0; x<boardW-3;x++){
            if(Board.boardArray[y][x] == playerTurn && Board.boardArray[y-1][x+1] == playerTurn && Board.boardArray[y-2][x+2] == playerTurn && Board.boardArray[y-3][x+3] == playerTurn) return true;
        }
    }
    */
    return false
}


function startGame() {

    setUp();
    draw();
    addController();
}

function destroyGame(){
    window.location.reload();
}


