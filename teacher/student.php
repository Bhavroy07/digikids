<?php

include "connectdb.php";
session_start();
if(isset($_SESSION['student_id']))
{
    $id=$_SESSION['student_id'];
    $user=$_SESSION['student_email'];
    $name = $_SESSION['name'];
}
else
{
    header("location:http://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/studentlogin.php");
    exit();
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
    <style>
        body
        {
            font-size: 25px;
        }
        input[type="radio"]
        {
            font-size: 30px;
        }
        </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"> DigiKids </a>

        <a href="logout2.php" class="btn btn-outline-dark sign-out" style="margin-left: 1200px;"> Sign out </a>

    </div>
</nav>
<video style="width: 200px; height:150px; border:3px red solid; position: fixed; border-radius: 5px;"></video>
<div class="container">

    <?php

    $i = 1;
    $arr = array();

    echo'<form method="POST" action="student.php">';


    // Displaying Expert Level questions
    $sql = "SELECT * FROM expert";
    $result = mysqli_query($con,$sql);
    while($row = mysqli_fetch_array($result))
    {
        array_push($arr,$row['answer']);
            // print_r($arr);
        echo '
        <div id="student">
        <p>'.$row['question'].'</p>
        <input type="text" name="question'.$i.'" autocomplete="off">
        </div>
        ';
        $i++;
    }

        // Displaying Intermediate level questions
    $sql = "SELECT * FROM intermediate";
    $result = mysqli_query($con,$sql);
    while($row = mysqli_fetch_array($result))
    {
        array_push($arr,$row['answer']);
            // print_r($arr);
        echo '
        <div class="row" id="student">

        <div class="col-md-6 col-sm-12">
        <div class="image">
        <img src="images/'.$row['image'].'" class="img-thumbnail" height="200px" width="200px">
        </div>
        </div>

        <div class="col-md-6 col-sm-12" style="font-size:30px; text-align:left">
        <input type="radio" name="question'.$i.'"  value="'.$row['option1'].'"> '.$row['option1'].'
        <br>
        <input type="radio" name="question'.$i.'" value="'.$row['option2'].'"> '.$row['option2'].'
        <br>
        <input type="radio" name="question'.$i.'" value="'.$row['option3'].'"> '.$row['option3'].'
        <br>
        <input type="radio" name="question'.$i.'" value="'.$row['option4'].'"> '.$row['option4'].'
        </div>
        </div>
        ';
        $i++;
    }
    echo '<button type="submit" name="submit" class="btn btn-danger" style="width:250px; margin-bottom:30px;font-size:35px">Submit</button>
    </form>';
    ?>

    <?php
    if(isset($_POST['submit']))
    {
            // // $question1 = $_POST['question1'];
            // // $question2 = $_POST['question2'];
            // $question3 = $_POST['question3'];
            // $question4 = $_POST['question4'];
            // $question5 = $_POST['question5'];

            // echo $question3 , $question4 , $question5;
            // echo sizeof($arr);
            // print_r($arr);

        $answers = array();
        for($j = 1 ; $j < $i;$j++)
        {
            $str = 'question'.$j;
            array_push($answers,$_POST[$str]);
        }

            // echo "ANswers:";
            // print_r($answers);
            // echo "true";
            // print_r($arr);

        $score = 0;
        $total = $i-1;
        for($j=0;$j<$i-1;$j++)
        {
            if(strcmp(strtolower($answers[$j]),strtolower($arr[$j]))==0)
                $score++;
        }

            // echo $score;


        $date = date('Y-m-d');
        $to_email = $user;
        $subject = "Digikids : Test Result";
        $body = "<html><body>Dear Parents, This is to inform you regarding the weekly assignment of your ward<b> ".$name."</b> on the <b>Digikids platform.</b><br> 
        <b><br>Date : ".$date." </b><br><b> Score : ".$score." / ".$total."</b><br>Thank You</body></html>";
        $headers = "From: Digikids";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

        mail($to_email, $subject, $body, $headers);

        echo '<script type="text/javascript">
        window.location = "submit.php";
        </script> ';
    }
    ?>
</div>
<!-- prevents the form from resubmission -->
<script>
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
</script>
<script>
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
     console.log("getUserMedia() not supported.");

 }

 navigator.mediaDevices.getUserMedia({ audio: false, video: true })
 .then(function(stream) {
     var video = document.querySelector('video');
     if ("srcObject" in video) {
         video.srcObject = stream;
     } else {
         video.src = window.URL.createObjectURL(stream);
     }
     video.onloadedmetadata = function(e) {
         video.play();
     };
 })
 .catch(function(err) {
   console.log(err.name + ": " + err.message);
});

</script> 


<script type="text/javascript" src="editdistance.js"></script>

<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>
</html>