<?php

include_once 'preference_config.php';

$conn = new mysqli($servername, $username, $password, $dbname);

$sql = "INSERT INTO userdata (username, gamesWon, gamesPlayed, timePlayed) VALUES ('Matt', 0, 0,0);";
$sql.= "INSERT INTO userdata (username, gamesWon, gamesPlayed, timePlayed) VALUES ('Brett', 0, 0,0);";


if ($conn->multi_query($sql) === TRUE) {
    echo "Users created successfully";

} else {
echo "Error adding users: " . $conn2->error;
}


$conn->close();

$conn = new mysqli($servername, $username, $password, $dbname);

$x = password_hash("gaming", PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO admin (login, password) VALUES (?,?)");
if ($stmt==FALSE) {
	echo "There is a problem with prepare <br>";
	echo $conn->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
}
$stmt->bind_param("ss", $login, $credentials);

$login = 'Matt';
$credentials = $x;
$stmt->execute();
$login = 'Brett';
$stmt->execute();

//$sql = "INSERT INTO admin (login, password) VALUES ('Matt', $x);";
//$sql.= "INSERT INTO admin (login, password) VALUES ('Brett',  $x);";




$conn->close()




  
?>

