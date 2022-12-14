<?php
    $Json = file_get_contents("https://sheets.googleapis.com/v4/spreadsheets/1RbW03xLMpxMOJggZM5H-qkzQrEnGyCc_58S1VzxZRcA/values/sheet2?alt=json&key=AIzaSyDg9wmufN_RwFI9oRPRCA8HEKsqWPMXKgg");
    $myarray = json_decode($Json, true);
    // var_dump($myarray["values"]);
?>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Dots">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Paytone+One">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Secular+One">
        <link rel="stylesheet" href="CSS/ALLScore.css">
        <script src='//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'></script>
        
    </head>
    <body>
            <h1 id="Title">Scoreboard</h1>
            <img id="goback" src="img/back1.png" title="back to game">
            <canvas id="canvas"></canvas>
            <?php
                echo "<ol class='ScoreList'>";
                echo "<span class='t1'>Name</span><span class='t2'>Score</span>";
                // echo "< class='ALLPlayer'></thead>";
                for($j = 1; $j < count($myarray["values"] ) && $j <= 10; $j++){
                    
            ?>
                    <?php echo "<li><span class='c1'>".$myarray["values"][$j][1]."</span><span class='c2'>".$myarray["values"][$j][2]."</span></li>"?>
            <?php
                }
            ?>

            <!-- <?php
                echo "<table class='ScoreList'>";
                echo "<thead class='ALLPlayer'></thead>";
                for($j = 1; $j < count($myarray["values"] ); $j++){
            ?>
                    <?php echo "<tr><td class='c1'>".$myarray["values"][$j][1]."</td><td class='c2'>".$myarray["values"][$j][2]."</td></tr>"?>
            <?php
                }
            ?> -->

            
            <script src="js/ALLScore.js"></script>
    </body>
</html>