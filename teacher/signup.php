<?php
    include "connectdb.php";

    $emailErr="";
    $passErr="";
    if(isset($_POST['signup']))
    {
      $err = false;
      $name = $_POST['name'];
      $gender = $_POST['gender'];
      $email = $_POST['email'];
      $password = $_POST['password'];
      $confirm = $_POST['confirmPassword'];

      // echo $name , $gender , $email , $confirm , $password;

      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
      {
        $emailErr = "Invalid email format";
        $err = true;
      }
      if(strcmp($password,$confirm)!=0)
      {
        $passErr = "Passwords do not match.";
        $err = true;
      }

      if($err == false)
      {
          $sql = "INSERT INTO `user`(`name`, `gender`, `email`, `password`) VALUES ('$name', '$gender' , '$email' , '$password')";
          mysqli_query($con,$sql);
          
          echo "<script>
            alert('Successfully signed up . Please login to continue');
          </script>";
          
      }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="assets/css/login.css">
  <link rel="stylesheet" type="text/css" href="assets/css/signup.css">
  <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500&display=swap" rel="stylesheet">

  <title>DigiKids - Teacher Sign up</title>
  <style>
.error {color: #FF0000;}
</style>
</head>
<body>
  <div id="sign">
    <h1 class="logo"><strong> DigiKids </strong></h1>
    <div class="container">

      <h1><strong> TEACHER  SIGN UP </strong></h1>
      <form action="signup.php"  method="POST" >

        <div class="form-group input-group mb-3">
          <label for="Name"></label>
          <div class="input-group-prepend">
            <span style="color:black;"><i class="fa fa-user" aria-hidden="true"></i></span>
          </div>
          <input type="text" class="form-control" id="Name" name="name" placeholder="Your name" required>
        </div>

        <div class="form-group">
          <span class="gen">Gender</span> 
          <span class="gen">
            <label for="Male">Male </label>
            <input type="radio" name="gender" id="Male" value="Male">
          </span>
          <span class="gen">
            <label for="Female">Female </label>
            <input type="radio" name="gender" id="Female" value="female">
          </span>
        </div>

        <span class="error"><?php echo $emailErr;?></span>
        <div class="form-group input-group mb-3">
          <label for="Email"></label>
          <div class="input-group-prepend">
            <span style="color:black;"><i class="fa fa-envelope" aria-hidden="true"></i></span>
          </div>
          <input type="email" class="form-control" id="Email" name="email" placeholder="Email Address" required>
        </div>

        <span class="error"><?php echo $passErr;?></span>
        <div class="form-group input-group mb-3">
          <label for="Password"></label>
          <div class="input-group-prepend">
            <span style="color:black;"><i class="fa fa-lock" aria-hidden="true"></i></i></span>
          </div>
          <input type="password" class="form-control" name="password" id="Password" placeholder="Password" required>
        </div>
        <div class="form-group input-group mb-3">
          <label for="ConfirmPassword"></label>
          <div class="input-group-prepend">
            <span style="color:black;"><i class="fa fa-lock" aria-hidden="true"></i></i></span>
          </div>
          <input type="password" class="form-control" name="confirmPassword" id="ConfirmPassword" placeholder="Confirm Password" required>
        </div>

        <button type="submit" name="signup" class="btn btn-primary">Sign Up</button>
        <hr>
        <p>Already have an account? <a href="index.php"> Login </a></p>
        <p>Are you a student? <a href="studentlogin.php"> Click here</a></p>
      </form>
    </div>
  </div>

   <!-- prevents the form from resubmission -->
   <script>
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
    </script>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>
</html>