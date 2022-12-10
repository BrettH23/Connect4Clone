<?php
require_once 'preference_config.php';
session_start();
if(isset($_POST['victor']) && isset($_POST['time']) && isset($_SESSION['username'])){
    
    $win = 0;
    $loss = 0;
    if($_POST['victor']==1){
        $win++;
    }else{
        $loss++;
    }
    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "UPDATE userdata SET gamesWon = gamesWon + ".$win.", gamesLost = gamesLost + ".$loss.", gamesPlayed = gamesPlayed + 1, timePlayed = timePlayed + ". $_POST['time']. " WHERE username='".$_SESSION['username']."'";
 
    if ($conn->query($sql) === TRUE) {
        echo "Data saved successfully.";
    
    } else {
        echo "Error saving: " . $conn->error;
    }
    $conn->close();
    echo $_POST['victor'];
    echo '<br>';
    echo $_POST['time'];
    echo '<br>';
    echo $_SESSION['username'];
}
?>