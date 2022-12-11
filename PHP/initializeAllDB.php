<html>
<head>
    <link rel="stylesheet" href="../style/universal.css"> 
    <link rel="stylesheet" href="../style/index.css"> 
    <link rel="icon" href="../favicon.ico" type="image/ico">
    <style>
        section{
            padding: 5px;
        }
    </style>
</head>
<body>

<section class="pop">
<?php
include_once "createDB.php";
include_once "../login/config.php";
include_once "populateDB.php";

?>
</section>
<p onClick="location.href='../html/index.html'">
        Main Menu
    </p>
</body>
</html>