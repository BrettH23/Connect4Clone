<?php
// Include config file
require_once 'config.php';
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = 'Please enter username.';
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if password is empty
    if(empty(trim($_POST['password']))){
        $password_err = 'Please enter your password.';
    } else{
        $password = trim($_POST['password']);
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT login, password FROM admin WHERE login = ?";
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            // Set parameters
            $param_username = $username;
			// echo $param_username;
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);  
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
					mysqli_stmt_bind_result($stmt, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
						//echo $password ."<br>";
						//echo $hashed_password ."<br>";
                        if(password_verify($password, $hashed_password)){
                            /* Password is correct, so start a new session and
                            save the username to the session */
                            session_start();
                            $_SESSION['username'] = $username;      
                            header("location: ../html/index.html");
                        } else{
                            // Display an error message if password is not valid
                            $password_err = 'The password you entered was not valid.';
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = 'No account found with that username.';
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
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
    <title>Login</title>
    <link rel="stylesheet" href="../style/universal.css"> 
    <link rel="stylesheet" href="../style/index.css"> 
    <link rel="icon" href="../favicon.ico" type="image/ico">
</head>
<body>
    <div>
        <header><h2 class="center">Login</h2></header>
        <p>Please fill in your credentials to login.</p>
        
        <form id="thisform" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            
            <p  <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>>
                <label>Username:<sup>*</sup></label>
                <input type="text" name="username" value="<?php echo $username; ?>">
                <span><?php echo $username_err; ?></span>
            </p>

            
            <p <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>>
                <label>Password:<sup>*</sup></label>
                <input type="password" name="password">
                <span><?php echo $password_err; ?></span>
            </p>
            
            <p onclick="document.querySelector('#thisform').submit()">
                Submit<input type="submit" hidden>
            </p>
            <p onClick="location.href='../login/register.php'">No account? Click here to sign up.</p>
            <p onClick="location.href='../html/index.html'">Main Menu</p><br>
        </form>
    </div>    
</body>
</html>