<?php
    session_start();
    unset($_SESSION['student_id']);
    unset($_SESSION['student_email']);
    header("location:http://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/studentlogin.php");
?>