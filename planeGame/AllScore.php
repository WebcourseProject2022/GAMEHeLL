<?php
    $Json = file_get_contents("https://sheets.googleapis.com/v4/spreadsheets/1RbW03xLMpxMOJggZM5H-qkzQrEnGyCc_58S1VzxZRcA/values/sheet2?alt=json&key=AIzaSyDg9wmufN_RwFI9oRPRCA8HEKsqWPMXKgg");
    $myarray = json_decode($Json, true);
    // var_dump($myarray["values"]);
?>
<html>
    <head>
        <link rel="stylesheet" href="CSS/ALLScore.css">
        <script src='//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'></script>
    </head>
    <body>
            <h1>Score</h1>

            <?php
                echo "<table class='ScoreList'>";
                echo "<thead class='ALLPlayer'></thead>";
                for($j = 1; $j < count($myarray["values"] ); $j++){
            ?>
                    <?php echo "<tr><td class='c1'>".$myarray["values"][$j][1]."</td><td class='c2'>".$myarray["values"][$j][2]."</td></tr>"?>
            <?php
                }
            ?>

            <button>返回遊戲</button>
    </body>
</html>