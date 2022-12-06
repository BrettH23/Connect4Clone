
// if we want to still use a table if you want. This uses the canvas element instead
var boardW, boardH;
function setSize(height_h,width_w) {
    boardW = width_w;
    boardH = height_h;

}
let canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d')
let  squareSize, color, canvasSize, playerTurn, countTurn, endGame, inRow;
let scale = 65;


//boardArray,
var Board = {
    xRecent:0,
    yRecent:0,
    boardArray:[],
    turnMoves:[],
    totalThrees : {
        1:0,
        2:0
    },
    hintColor:[],
    hintX:[],
    hintY:[]
};

var rawPiece = "00 00 00 00 00 00 00 00 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 00 00 00 00 00 00 00 00 00 00 00 00 60 00 00 ff c2 00 00 ff c2 00 00 ff b6 00 00 ff c2 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff c2 00 00 ff ba 00 00 ff 60 00 00 ff 00 00 00 00 60 00 00 ff c2 00 00 ff b0 00 00 ff b0 00 00 ff b8 00 00 ff b8 00 00 ff ad 00 00 ff ad 00 00 ff ad 00 00 ff a6 00 00 ff b8 00 00 ff b8 00 00 ff a8 00 00 ff a8 00 00 ff c2 00 00 ff 60 00 00 ff 60 00 00 ff af 00 00 ff b0 00 00 ff 9e 00 00 ff 95 00 00 ff 95 00 00 ff 95 00 00 ff 95 00 00 ff 8e 00 00 ff 9a 00 00 ff 95 00 00 ff 9e 00 00 ff 99 00 00 ff b0 00 00 ff b6 00 00 ff 60 00 00 ff 60 00 00 ff ba 00 00 ff a8 00 00 ff 97 00 00 ff ae 00 00 ff ba 00 00 ff ba 00 00 ff ba 00 00 ff ba 00 00 ff ba 00 00 ff ba 00 00 ff ae 00 00 ff 95 00 00 ff a8 00 00 ff b6 00 00 ff 60 00 00 ff 60 00 00 ff af 00 00 ff a8 00 00 ff 9e 00 00 ff ba 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff c2 00 00 ff 97 00 00 ff b0 00 00 ff b6 00 00 ff 60 00 00 ff 60 00 00 ff 9f 00 00 ff a8 00 00 ff 91 00 00 ff ba 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff c2 00 00 ff 8b 00 00 ff b0 00 00 ff b6 00 00 ff 60 00 00 ff 60 00 00 ff 9f 00 00 ff a8 00 00 ff 95 00 00 ff ba 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff c2 00 00 ff 8f 00 00 ff b0 00 00 ff b6 00 00 ff 60 00 00 ff 60 00 00 ff af 00 00 ff a8 00 00 ff 95 00 00 ff ba 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff c2 00 00 ff 95 00 00 ff b0 00 00 ff b6 00 00 ff 60 00 00 ff 60 00 00 ff af 00 00 ff a8 00 00 ff 89 00 00 ff ba 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff c2 00 00 ff 95 00 00 ff b0 00 00 ff b6 00 00 ff 60 00 00 ff 60 00 00 ff af 00 00 ff a8 00 00 ff 8f 00 00 ff b2 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff cb 00 00 ff c2 00 00 ff 9e 00 00 ff b0 00 00 ff b6 00 00 ff 60 00 00 ff 60 00 00 ff b6 00 00 ff a1 00 00 ff 8f 00 00 ff aa 00 00 ff c2 00 00 ff c2 00 00 ff c2 00 00 ff c2 00 00 ff c2 00 00 ff c2 00 00 ff ba 00 00 ff 9e 00 00 ff a8 00 00 ff b6 00 00 ff 60 00 00 ff 60 00 00 ff c2 00 00 ff a1 00 00 ff 8f 00 00 ff 8e 00 00 ff 95 00 00 ff 95 00 00 ff 95 00 00 ff 95 00 00 ff 95 00 00 ff 91 00 00 ff 9e 00 00 ff 99 00 00 ff a1 00 00 ff c2 00 00 ff 60 00 00 ff 60 00 00 ff c2 00 00 ff a8 00 00 ff b0 00 00 ff b0 00 00 ff b8 00 00 ff b8 00 00 ff b0 00 00 ff b0 00 00 ff b0 00 00 ff b0 00 00 ff b8 00 00 ff b8 00 00 ff b0 00 00 ff c2 00 00 ff 60 00 00 ff 00 00 00 00 60 00 00 ff ba 00 00 ff c2 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff b6 00 00 ff c2 00 00 ff 60 00 00 ff 00 00 00 00 00 00 00 00 00 00 00 00 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 60 00 00 ff 00 00 00 00 00 00 00 00  ";
var tokenPieces = rawPiece.split(' ');
var rawBoard = "00 00 75 ff 00 00 ac ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 ff ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 cc ff 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 cc ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ff ff 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ac ff 00 00 75 ff 00 00 75 ff 00 00 ac ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 cc ff 00 00 ff ff 00 00 ac ff 00 00 75 ff  ";
var tokenBoard = rawBoard.split(' ');
var tileType = [];

var startTime;
const timer = document.getElementById('timer');
var timerAlive = true;
var elapsedTime;
function startTimer(){
    startTime = new Date();
    tickTimer();  
}

function tickTimer(){
    elapsedTime = new Date();
    let x = (elapsedTime-startTime)/1000;
    
    
    minutes = Math.floor(x/60);
    seconds = Math.floor(x%60);
    sec0 = '';
    if(seconds<10){
        sec0 = '0';
    }

    if(timerAlive){
        timer.innerHTML = "Time Elapsed: "+minutes+':'+sec0 + seconds;
        window.setTimeout(function() { tickTimer() }, 1000);
    }
}


function setUp(){
    canvasSize = boardW*16*8;//aka resolution of canvas, boardwidth*pixel amount of tile*scale factor
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
    
    tileType.push(storeTile(document.getElementById("boardcolor").value,tokenBoard));
    tileType.push(storeTile(document.getElementById("player1color").value,tokenPieces));
    tileType.push(storeTile(document.getElementById("player2color").value,tokenPieces));

    document.getElementById("p1-info").style.color = document.getElementById("player1color").value;
    document.getElementById("p2-info").style.color = document.getElementById("player2color").value;
    updateHints();
}

function storeTile(color, tokenArray){
    let colorR = parseInt(color.substring(1,3),16);
    let colorG = parseInt(color.substring(3,5),16);
    let colorB = parseInt(color.substring(5,7),16);
    let selectedHSV = rgbTOhsv(colorR, colorG, colorB);

    tile = [];
    for(i=0;i<16;i++){
        for(j=0;j<16;j++){
            pos = i*4+j*16*4;
            
            let defaultHSV = rgbTOhsv (parseInt(tokenArray[pos],16),parseInt(tokenArray[pos+1],16),parseInt(tokenArray[pos+2],16));
            
            
            let newV = (defaultHSV.v/100)*selectedHSV.v;
            
            thisRGB = hsvTOrgb(selectedHSV.h,selectedHSV.s,newV);
            //console.log(thisRGB);
            
            
            x = {
                r:thisRGB.substring(1,3),
                g:thisRGB.substring(3,5),
                b:thisRGB.substring(5,7),
                a:tokenArray[pos+3]
            }
            tile.push(x);
            //console.log(x);
        }
    }
    return {pixels:tile};
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
    Board.turnMoves = [];
    for(y = 0; y < boardH; y++){
        let row = [];
        for(x = 0; x < boardW; x++){
            row.push(0);
        }
        Board.turnMoves.push(row);
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
//rgbTOhsv(49,47,66);
function rgbTOhsv(r,g,b){
    r/=255;g/=255;b/=255;
    max = Math.max(r,g,b);
    min = Math.min(r,g,b);
    delta = max-min;
    let hue;
    let sat;
    let val;
    if(delta == 0){
        hue=0;
    }else if(max == r){
        hue = 360+60*((g-b)/delta);
    }
    else if(max == g){
        hue = 120+60*((b-r)/delta);
    }
    else if(max == b){
        hue = 240+60*((r-g)/delta);
    }
    hue = hue %360;

    if(max == 0){
        sat = 0;
    }else{
        sat = (delta/max)*100;
    }

    val = max*100;
    let hsv = {h:hue,s:sat,v:val};
    return hsv;
}
function hsvTOrgb(h,s,v){
    s/=100;
    v/=100;
    
    let c = v*s;
    let x = c*(1-Math.abs(((h/60)%2)-1))
    let m = v-c;
    //console.log(c + ', '+ x + ', '+m + ', ')
    let rgb = {};
    //console.log(h);
    if(h<60){
        rgb = {r:c,g:x,b:0};
    }else if(60<=h && h<120){
        rgb = {r:x,g:c,b:0};
    }else if(120<=h && h<180){
        rgb = {r:0,g:c,b:x};
    }else if(180<=h && h<240){
        rgb = {r:0,g:x,b:c};
    }else if(240<=h && h<300){
        rgb = {r:x,g:0,b:c};
        
    }else if(300<=h && h<360){
        rgb = {r:c,g:0,b:x};
    }
    let red = (Math.round(255*(rgb.r+m))).toString(16);
    let green = (Math.round(255*(rgb.g+m))).toString(16);
    let blue = (Math.round(255*(rgb.b+m))).toString(16);
    
    if(red.length<2){
        red = '0'+red;
    }
    if(green.length<2){
        green = '0'+green;
    }
    if(blue.length<2){
        blue = '0'+blue;
    }
    
    let finalrgb = '#'+ red + green + blue;
    //console.log(finalrgb);
    return finalrgb;
}

function draw(){
    //ctx.fillStyle = color.board;
    //ctx.fillRect(0, 0+squareSize, boardW * squareSize, boardH * squareSize);
    for(y=0; y<boardH; y++){
        for(x=0; x<boardW; x++){
            drawTile(x,y+1, Board.boardArray[y][x]);
            //console.log(Board.boardArray[y][x]);
        }
    }
}

function drawTile(x, y,playerID){
    
        for(i=0;i<16;i++){
            for(j=0;j<16;j++){
                pos = i+j*16;
                //console.log(playerID);
                if(tileType[playerID].pixels[pos].a == 'ff' &&playerID>0){
                    ctx.fillStyle  = "#"+ tileType[playerID].pixels[pos].r +tileType[playerID].pixels[pos].g +tileType[playerID].pixels[pos].b;
                    ctx.fillRect(x*squareSize + squareSize*j/16,y*squareSize + squareSize*i/16,squareSize/16,squareSize/16);
                }
                if(tileType[0].pixels[pos].a == 'ff' && y>0){
                    ctx.fillStyle  = "#"+ tileType[0].pixels[pos].r +tileType[0].pixels[pos].g +tileType[0].pixels[pos].b;
                    ctx.fillRect(x*squareSize + squareSize*j/16,y*squareSize + squareSize*i/16,squareSize/16,squareSize/16);
                }
                
            }
        
        }
        if(y>0){
            if(Board.turnMoves[y-1][x]>0){
                ctx.fillStyle = '#000';
                ctx.font = "bold 50px RORsquare";   // change font size and type here

                ctx.textAlign = "center"; 
                ctx.textBaseline = "middle"; 
                ctx.fillText(Board.turnMoves[y-1][x],x*squareSize+squareSize/2, y*squareSize+squareSize/2);
            }
            
        }
        
    
    /*
    let centerX = (x*squareSize) + (squareSize/2);
    let centerY = (y*squareSize) + (squareSize/2);
    let tileSize = (squareSize* 0.8) / 2;
    
    ctx.fillStyle = color.player[tileColor];
    ctx.beginPath();
    ctx.arc(centerX, centerY, tileSize, 0, 2 * Math.PI);
    ctx.fill();*/
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
                    playMove(clickX, y,countTurn);
                    break;
                }
            }
        }
    })
}

function playMove(x,y,turnInsidePieceNumber){
    countTurn++
    Board.boardArray[y][x] = playerTurn;
    Board.turnMoves[y][x] = turnInsidePieceNumber+1;//neccesary to prevent super power from breaking turn piece order
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
    updateHints();
}

function clearTopRow(){
    ctx.clearRect(0,0,canvas.width, squareSize);
}

function checkWin(){
    if(winConditions()) {
        endGame = true
        document.getElementById("destroy").style.visibility = "visible";
        document.getElementById("menuButton").style.visibility = "visible";
        timerAlive=false;
        return true;   
    }
}

function checkTie() { // very easy way to check for a tie game. Full board and no win
    if(countTurn == boardW * boardH){
        endGame = true;
        document.getElementById("destroy").style.visibility = "visible";
        document.getElementById("menuButton").style.visibility = "visible";
        timerAlive=false;
        return true;  
    }
}

function switchPlayer(){
    playerTurn == 1 ? playerTurn = 2: playerTurn = 1;   
}

function topText(text){
    clearTopRow(); // clear the top row 
    let line;
    let topTextColor = color.textColor;
    switch(text){
        case "win": line = `CONNECT 4 - Player ${playerTurn} wins!`; topTextColor = color.player[playerTurn]; break;
        case "tie": line = `CONNECT 4 - Draw!`; break;
        default: line = `CONNECT 4`; break;
    };
    ctx.fillStyle = topTextColor;
    ctx.font = "bold 50px RORsquare";   // change font size and type here

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
            
            Board.hintColor.push(playerTurn);
            Board.hintX.push(x);
            Board.hintY.push(y);
            return true;
        }
        
    }
    return false
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
        if(findHint(1,1) || findHint(-1,-1)){
            Board.totalThrees[playerTurn]++;
        }
    }
    if(diag430oclock == 3){
        if(findHint(-1,1) || findHint(1,-1)){
            Board.totalThrees[playerTurn]++;
        }
    }
    if(horizontal == 3){
        if(findHint(1,0) || findHint(-1,0)){
            Board.totalThrees[playerTurn]++;
        }
    }
    if(vertical == 3){
        if(findHint(0,1) || findHint(0,-1)){
            Board.totalThrees[playerTurn]++;
        }
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

function updateHints(){
    let p1threes = document.querySelector("#p1-total-threes");
    let p2threes = document.querySelector("#p2-total-threes");
    let p1hints = document.querySelector("#p1-hints");
    let p2hints = document.querySelector("#p2-hints");
    p1threes.innerHTML = "Has " + Board.totalThrees[1] + " connect-threes.";
    p2threes.innerHTML = "Has " + Board.totalThrees[2] + " connect-threes.";

    hintStr = {
        1 : "Should target spaces: ",
        2 : "Should target spaces: "
    };
    for(i in Board.hintColor){
        if(Board.boardArray[Board.hintY[i]][Board.hintX[i]]==[0]){
            hintStr[Board.hintColor[i]] += '('+(1+Board.hintX[i])+','+ (boardH- Board.hintY[i])+')';
        }
    }
    p1hints.innerHTML = hintStr[1];
    p2hints.innerHTML = hintStr[2];
}


function startGame() {
    
    setUp();
    draw();
    addController();
    startTimer();
}

function destroyGame(){
    window.location.reload();
}

function superPower(){

}

