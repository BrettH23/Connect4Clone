//window.onload = function(){
/*
function generate(x,y) {
    var height = x;
    var width = y;

    var vh = 70;
    var vw = (vh*width)/height;

    var bod = document.querySelector('body');

    tabl = document.createElement('table');
    tabl.setAttribute('id','bigtable');
    tabl.style.height = vh + 'vh';
    tabl.style.width = vw + 'vh';
    
    tabr = document.createElement('tr');
    
    for(let i = 0;i<width;i++){
        column = document.createElement('td');
        contents = document.createElement('table');
        for(let j=0;j<height;j++){
            blockrow = document.createElement('tr');
            blockdata = document.createElement('td');
            
            blockdata.setAttribute('class','square');
            blockdata.innerHTML = j + (i*width);
            //blockdata.style.height = vh + "vw";
            //blockdata.style.width = vh + "vw";

            blockrow.appendChild(blockdata);
            contents.appendChild(blockrow);
        }
        column.appendChild(contents);
        tabr.appendChild(column);
    }
    tabl.appendChild(tabr);

    bod.appendChild(tabl);
}
*/
// if we want to still use a table if you want. This uses the canvas element instead
var boardW, boardH;
function getSize(x,y) {
    boardW = y;
    boardH = x;

}
let canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d')
let boardArray, squareSize, color, canvasSize, playerTurn, countTurn, endGame, inRow;

function setUp(){
    canvasSize = 800;
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
    boardArray = [];
    for(y = 0; y < boardH; y++){
        let row = [];
        for(x = 0; x < boardW; x++){
            row.push(0);
        }
        boardArray.push(row);
    }
}

function setUpCanvas(){;
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
            drawTile(x,y+1, boardArray[y][x]);
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
        let posX = Math.floor((e.clientX - canvas.offsetLeft)/squareSize);
        if(!endGame){
            clearTopRow();
            topText();
            drawTile(posX, 0, playerTurn);
        };
    })
    canvas.addEventListener("click",(e)=>{
        let clickX = Math.floor((e.clientX - canvas.offsetLeft)/squareSize)
        if(!endGame){
            for(y=boardH-1; y>=0; y--){
                if(boardArray[y][clickX] == 0){
                    playMove(clickX, y);
                    break;
                }
            }
        }
    })
}

function playMove(x,y){
    countTurn++
    boardArray[y][x] = playerTurn;
    if (checkWin()) {
        topText("win")
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

function winConditions(){
    for (y = 0; y<boardH; y++){ // horizontal
        for (x=0; x<boardW-3;x++){
            if(boardArray[y][x] == playerTurn && boardArray[y][x+1] == playerTurn && boardArray[y][x+2] == playerTurn && boardArray[y][x+3] == playerTurn) return true;
        }
    }
    for (y=0; y<boardH-3; y++){ // vertical
        for (x=0; x<boardW;x++){
            if(boardArray[y][x] == playerTurn && boardArray[y+1][x] == playerTurn && boardArray[y+2][x] == playerTurn && boardArray[y+3][x] == playerTurn) return true;
        }
    }
    
    for (y=0; y<boardH-3; y++){ // diagonal to left check
        for (x=0; x<boardW-3;x++){
            if(boardArray[y][x] == playerTurn && boardArray[y+1][x+1] == playerTurn && boardArray[y+2][x+2] == playerTurn && boardArray[y+3][x+3] == playerTurn) return true;
        
        }
    }
    for (y=3; y<boardH; y++){ // diagonal to right check
        for (x=0; x<boardW-3;x++){
            if(boardArray[y][x] == playerTurn && boardArray[y-1][x+1] == playerTurn && boardArray[y-2][x+2] == playerTurn && boardArray[y-3][x+3] == playerTurn) return true;
        }
    }
    return false
}


function startGame() {

    setUp();
    draw();
    addController();
}


