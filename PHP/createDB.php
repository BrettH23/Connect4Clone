<?php

include_once 'preference_config.php';
// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error ."<br>");
} 
echo "Connected successfully <br>";
// Create database
$sql = "CREATE DATABASE IF NOT EXISTS ".$dbname;
if ($conn->query($sql) === TRUE) {
    echo "Database ". $dbname ." created successfully<br>";
} else {
    echo "Error creating database: " . $conn->error ."<br>";
}
// close the connection
$conn->close();
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "CREATE TABLE IF NOT EXISTS userdata (
    playerIndex INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    gamesWon INT(11),
    gamesPlayed INT(11),
    gamesLost INT(11),
    timePlayed FLOAT(20)
    )";
    
    if ($conn->query($sql) === TRUE) {
      echo "table created successfully<br>";
  } else {
      echo "Error creating table: " . $conn->error ."<br>";
  }

$conn->close();
//header("Location: ../index.php")
?>