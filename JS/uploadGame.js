function uploadGame(gameTime, victor){
    //alert(gameTime +' '+victor)
    var gameFinalData ='victor=' + victor +'&time='+gameTime;
    
    
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "../php/uploadGame.php");
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send(gameFinalData);
}