<?php
//Run this file before you start 
$servername = "localhost";
$username = "matt"; // change username and pass if you want Brett
$password = "matt";
$dbname = "connect4";

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
$sql = "CREATE TABLE IF NOT EXISTS users (
    playerIndex INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    gamesWon INT(11),
    gamesPlayed INT(11),
    timePlayed FLOAT(20)
    )";
    
    if ($conn->query($sql) === TRUE) {
      echo "table created successfully<br>";
  } else {
      echo "Error creating table: " . $conn->error ."<br>";
  }

$sql2 = "INSERT INTO users (username, pass, gamesWon, gamesPlayed, timePlayed) VALUES ('Matt', 1, 0, 0,0)";
$sql3 = "INSERT INTO users (username, pass, gamesWon, gamesPlayed, timePlayed) VALUES ('Brett', 1, 0, 0,0)";
if ($conn->query($sql2) === TRUE) {
    $conn->query($sql3);
    echo "User created successfully";
    
  } else {
    echo "Error creating database: " . $conn2->error;
  }

$conn->close();
?>