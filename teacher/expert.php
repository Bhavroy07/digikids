<?php

include "connectdb.php";
session_start();
if(isset($_SESSION['teacher_id']))
{
	$id=$_SESSION['teacher_id'];
	$user=$_SESSION['teacher_email'];
}
else
{
	header("location:http://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/login.php");
	exit();
}

if(isset($_POST['submit']))
{
	$question = $_POST['question'];
	$answer = $_POST['ans'];
	$query=mysqli_query($con,"INSERT INTO expert(question,answer) VALUES ('$question','$answer')");
	if($query==true)
	{
		echo "<script>
		alert('Question Uploaded Successfully.');
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
	<link rel="stylesheet" type="text/css" href="assets/css/landing.css">
	<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500&display=swap" rel="stylesheet">

	<title>DigiKids - Teacher</title>
</head>
<body>

	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="#"> DigiKids </a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="intermediate.php"> MCQ </a>
				</li>
				<li class="nav-item active disabled">
					<a class="nav-link" href="expert.php"> One Word <span class="sr-only">(current)</span></a>
				</li>

			</ul>

			<a href="logout.php" class="btn btn-outline-dark" style="margin-left: 55%; border-radius: 0.75em; width: 105px;"> Sign out </a>

		</div>
	</nav>

	<div id="expert">
		<form action="expert.php" method="POST">
			<label for="question"><h6>Enter the question:</h6></label> 
			<textarea type="text" cols="25" id="question" name="question" required></textarea>
			<br>
			<div class="form-group">
				<label for="ans" ><h6> Enter the correct answer:</h6> </label>
				<input type="text" name="ans" id ="ans"  required autocomplete="off">
			</div>
			<button type="submit" name ="submit" class="btn btn-danger"> Submit </button>
		</form>
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