<?php
    session_start();
    unset($_SESSION['teacher_id']);
    unset($_SESSION['teacher_email']);
    header("location:http://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/index.php");
?>