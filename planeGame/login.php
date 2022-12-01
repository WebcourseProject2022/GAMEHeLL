<?php 
    $Score = "Error";
    if(isset($_POST['Score'])){
        $Score = $_POST['Score'];
    }
    // echo $Score;
?>
<html>
    <head>
    <link rel="stylesheet" href="CSS/login.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mali">
    <script src='//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'></script>
    

    </head>
    <body>
        <canvas id="c"></canvas>
        <div id="EnterName">
            <h1>Please Enter<br> Your Player Name</h1>
            <input id="username"  placeholder="PalyerName">
            <button onclick="login()">Send</button>
            <div id="result"></div>
        </div>
        <script src="js/login.js"></script>
    </body>
</html>