<?php
include "preference_config.php";
$conn = new mysqli($servername, $username, $password, $dbname);
	$order = 0;
	if (isset($_POST['order'])) {
		$order = $_POST['order'];
	}
	
	$sql = "";
	switch($order) {
		case "0":
			$sql = "SELECT username, gamesWon, gamesPlayed, gamesLost, timePlayed FROM userdata ORDER BY username ASC";
			break;
		case "1":
			$sql = "SELECT username, gamesWon, gamesPlayed, gamesLost, timePlayed FROM userdata ORDER BY gamesWon DESC";
			break;
        case "2":
            $sql = "SELECT username, gamesWon, gamesPlayed, gamesLost, timePlayed FROM userdata ORDER BY gamesWon ASC";
            break;
		case "3":
			$sql = "SELECT username, gamesWon, gamesPlayed, gamesLost, timePlayed FROM userdata ORDER BY timePlayed DESC";
			break;
        case "4":
            $sql = "SELECT username, gamesWon, gamesPlayed, gamesLost, timePlayed FROM userdata ORDER BY timePlayed ASC";
            break;
		case "5":
			$sql = "SELECT username, gamesWon, gamesPlayed, gamesLost, timePlayed FROM userdata ORDER BY gamesPlayed DESC";
			break;
        case "6":
            $sql = "SELECT username, gamesWon, gamesPlayed, gamesLost, timePlayed FROM userdata ORDER BY gamesPlayed ASC";
            break;
        case "7":
            $sql = "SELECT username, gamesWon, gamesPlayed, gamesLost, timePlayed FROM userdata ORDER BY gamesLost DESC";
            break;
        case "8":
            $sql = "SELECT username, gamesWon, gamesPlayed, gamesLost, timePlayed FROM userdata ORDER BY gamesLost ASC";
            break;
	}
	
	if ($result = $conn->query($sql)) {
		$newArray = Array();
		while ($row = $result->fetch_assoc()) {
			array_push($newArray, $row);
		}
		$jsonResult = json_encode($newArray);
		echo $jsonResult;
	}
	else {
		echo "Oops! Something went wrong. Please try again later.";
	}
	
    // Close connection
    mysqli_close($conn);
?>