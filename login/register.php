<?php
// Include config file
require_once 'config.php';
 
// Define variables and initialize with empty values
$username = $password = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate username
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter a username.";
    } else{
        // Prepare a select statement
        $sql = "SELECT id FROM admin WHERE login = ?";
        
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);       
            // Set parameters
            $param_username = trim($_POST["username"]);          
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);   
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "This username is already taken.";
                } else{
                    $username = trim($_POST["username"]);
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        // Close statement
        mysqli_stmt_close($stmt);
    }
    // Validate password
    if(empty(trim($_POST['password']))){
        $password_err = "Please enter a password.";     
    } elseif(strlen(trim($_POST['password'])) < 6){
        $password_err = "Password must have atleast 6 characters.";
    } else{
        $password = trim($_POST['password']);
    }
    
    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = 'Please confirm password.';     
    } else{
        $confirm_password = trim($_POST['confirm_password']);
        if($password != $confirm_password){
            $confirm_password_err = 'Password did not match.';
        }
    }
    
    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err)){
        
        // Prepare an insert statement
        $sql = "INSERT INTO admin (login, password) VALUES (?, ?)";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_password);
            
            // Set parameters
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Redirect to login page
                $conn2 = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
                
                
                $stmt2 = $conn2->prepare("INSERT INTO userdata (username, gamesWon, gamesPlayed, gamesLost, timePlayed) VALUES (?,?,?,?,?)");
                if ($stmt==FALSE) {
                    echo "There is a problem with prepare <br>";
                    echo $conn2->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
                }
                $stmt2->bind_param("siiid", $u2, $gw2,$gp2,$gl2,$tp2);
                
                $u2 = $username;
                $gw2 = 0;
                $gp2 = 0;
                $gl2 = 0;
                $tp2 = 0;
                $stmt2->execute();


                header("location: login.php");
            } else{
                echo "Something went wrong. Please try again later.";
            }


        }
        // Close statement
        mysqli_stmt_close($stmt);
    }
    // Close connection
    mysqli_close($link);


    
}


?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
    <link rel="stylesheet" href="../style/universal.css"> 
    <link rel="stylesheet" href="../style/index.css">
    <link rel="icon" href="../favicon.ico" type="image/ico"> 
</head>
<body>
    <div>
        <h2 class="center">Sign Up</h2>
        <p>Please fill this form to create an account.</p>
        <form id="thisform" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <p <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username:<sup>*</sup></label>
                <input type="text" name="username" value="<?php echo $username; ?>">
                <span><?php echo $username_err; ?></span>
            </p>    
            <p <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password:<sup>*</sup></label>
                <input type="password" name="password" value="<?php echo $password; ?>">
                <span><?php echo $password_err; ?></span>
            </p>
            <p <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                <label>Confirm Password:<sup>*</sup></label>
                <input type="password" name="confirm_password" value="<?php echo $confirm_password; ?>">
                <span><?php echo $confirm_password_err; ?></span>
            </p>
            <p onclick="document.querySelector('#thisform').submit()" >
                Submit
                <input type="submit" hidden>
            </p>
            <p onclick="document.querySelector('#thisreset').click()">
                Reset
                <input id="thisreset" type="reset"  value="Reset" hidden>
            </p>
            <p onClick="location.href='../login/login.php'">Have an account? Log in here</p>
            <p onClick="location.href='../html/index.html'">Main Menu</p><br>
        </form>
    </div>    
</body>
</html>