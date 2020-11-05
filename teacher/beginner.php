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
		//storing all necessary data into the respective variables.
		$file = $_FILES['file'];
		$file_name = $file['name'];
		$file_type = $file ['type'];
		$file_size = $file ['size'];
		$file_path = $file ['tmp_name'];
		$ans = $_POST['ans'];

		//Restriction to the image. You can upload any types of file for example video file, mp3 file, .doc or .pdf just mention here in OR condition. 

		if($file_name!="" && ($file_type="image/jpeg"||$file_type="image/png"||$file_type="image/gif")&& $file_size<=614400)

		if(move_uploaded_file ($file_path,'images/'.$file_name))//"images" is just a folder name here we will load the file.
		$query=mysqli_query($con,"INSERT INTO beginner(image , answer) VALUES ('$file_name','$ans')");//mysql command to insert file name with extension into the table. Use TEXT datatype for a particular column in table.
		
		if($query==true)
		{
			echo "<script>
            alert('Question Uploaded Successfully.');
          </script>";
		}
	}

	//To retrieve uploaded file immediately or write code in separate .php file if you wanna later or by clicking.
	// $result=  mysqli_query($con,"SELECT image FROM beginner");
	// $row=  mysqli_fetch_array($result);
	// echo "<img src='images/".$row['image']."' height = '130px' width = '130px'>";

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
		<a class="navbar-brand" href="/landing"> DigiKids </a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item active disabled">
					<a class="nav-link" href="beginner.php"> Beginner <span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="intermediate.php"> Intermediate </a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="expert.php"> Expert </a>
				</li>

			</ul>

			<a href="logout.php" class="btn btn-outline-dark sign-out"> Sign out </a>

		</div>
	</nav>

	<div id="beginner">
		<form action="beginner.php" method="POST" enctype="multipart/form-data">
			<input type="file" name="file" class="file" required>
			<br><br>
			<div class="form-group">
				<label for="ans" ><h6> Enter the correct answer:</h6> </label>
				<input type="text" name="ans" id ="ans"  required autocomplete="off">
			</div>
			<button class="btn btn-danger" name="submit" type="submit"> Submit </button>
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