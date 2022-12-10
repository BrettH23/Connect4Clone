<html>
<head>
    <link rel="stylesheet" href="../style/universal.css"> 
    <link rel="stylesheet" href="../style/index.css"> 
    <style>
        section{
            display: flex;
            flex-wrap:nowrap;
            
            justify-content: center;
        }
        div{
            width: 20%;
            margin: 0.5%;
            padding: 2%;
            text-align: center;
        }
    </style>
</head>
<body>
    <header><h1 class="center">YOUR STATS</h1></header>
    
    
        <?php
        require_once 'config.php';
        session_start();
        if(isset($_SESSION['username'])){
            $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
            $sql = "SELECT gamesWon, gamesPlayed, gamesLost, timePlayed FROM userdata WHERE username='" . $_SESSION['username'] . "'";
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error ."<br>");
            } 
            $row = $conn->query($sql)->fetch_assoc();
            
            echo "<h3 class='center'>".$_SESSION['username']. "'s stats:</h3>";
            echo "<section class='pop'>";
            
            echo "<div class='pop'>".$row['gamesWon'].' Wins</div>';
            echo "<div class='pop'>".$row['gamesLost'].' Losses</div>';
            echo "<div class='pop'>".$row['gamesPlayed'].' Times played</div>';
            echo "<div class='pop'>".$row['timePlayed'].' Seconds playing</div>';
            
            echo "</section>";

            $conn->close();
        }else{
            echo "<h3 class='center'>You aren't logged in</h3>";
        }

        ?>
    <p onClick="location.href='../html/index.html'">
        Main Menu
    </p>
</body>
</html>