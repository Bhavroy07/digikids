<?php
    include "connectdb.php";
    error_reporting(E_ERROR | E_PARSE);

    if(isset($_POST['login']))
    {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $result=mysqli_query($con ,"SELECT teacher_id FROM user WHERE email='$email' AND password='$password'");
        $row=mysqli_fetch_array($result);
        if($row>0)
        {
            session_start();
            $_SESSION['teacher_id'] = $row[0];
            $_SESSION['teacher_email'] = $email;
            header("location:http://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/intermediate.php");
        }
        else
        {
            echo "<script>
            alert('Invalid Login details.Please try again.');
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
	<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500&display=swap" rel="stylesheet">

	<title>DigiKids - Teacher Login</title>
</head>
<body>
	<div id="log">

		<h1 class="logo"><strong> DigiKids </strong></h1>
		<div class="container">
			<h1 style="padding-top: 3%;"><strong> TEACHER  LOGIN </strong></h1>
			<form  action="index.php" method="POST">
				<div class="form-group input-group mb-3">
					<label for="Email"></label>
					<div class="input-group-prepend">
						<span><i class="fa fa-user" aria-hidden="true"></i></span>
					</div>
					<input type="email" class="form-control" id="Email" name="email" placeholder="Email Address" required>
				</div>

				<div class="form-group input-group mb-3">
					<label for="Password"></label>
					<div class="input-group-prepend">
						<span><i class="fa fa-lock" aria-hidden="true"></i></span>
					</div>
					<input type="password" class="form-control" id="Password" name="password" placeholder="Password" required>
				</div>

				<button type="submit" name='login' class="btn btn-primary">Login</button>
				<hr>
				
				<p>Do not have an account? <a href="signup.php">Sign Up</a></p>
				<p>Are you a student? <a href="studentlogin.php">Click here</a></p>
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