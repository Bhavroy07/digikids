<?php
    $servername = 'localhost';
    $username = 'root';
    $password = '';

    // Create Connection
    $con = mysqli_connect($servername,$username,$password ,'teacher');

    // Check Connection
    if(!$con)
    {
        die('Connection Failed : '.mysqli_connect_error());
    }
?>