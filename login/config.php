<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
 
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'admin02');
define('DB_PASSWORD', 'x2g)OUQiY7uu!x3-');
define('DB_NAME', 'connect4'); 


$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error ."<br>");
} 
//echo "Connected successfully <br>";
// Create database
$sql = "CREATE DATABASE IF NOT EXISTS ".DB_NAME;
if ($conn->query($sql) === TRUE) {
    //echo "Database ". DB_NAME ." created successfully<br>";
} else {
    echo "Error creating database: " . $conn->error ."<br>";
}
// close the connection
$conn->close();
// Create connection
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "CREATE TABLE IF NOT EXISTS admin (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
    )";
    
    if ($conn->query($sql) === TRUE) {
      //echo "table created successfully<br>";
  } else {
      echo "Error creating table: " . $conn->error ."<br>";
  }



/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
$conn->close();
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>