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
        <script>
            var tmp = "https://cors-anywhere.herokuapp.com/";
            var API = tmp+"https://script.google.com/macros/s/AKfycbz_TVAp9ygsMj4iBspKQmnn1Umgh7twRrRDPRACsr8grwX6QsYXM-m5_CJn21IGjTBbcA/exec";

            function login(){
                var Name = $("#username").val();
                if(Name){
                    $("#username").val("");
                    var Score = "<?php echo $Score ?>";
                    var NowScore = 0;
                    var Find = 0;
                    if("<?php echo $Score ?>" != "Error"){
                        $.ajax({
                            type: "post",
                            data: {
                                "method": "read",
                                "name": Name,
                                "query": Name,
                                "score": Score,
                            },
                            url: API ,
                            success:function(res){
                                NowScore = res;
                                console.log(Score);
                                if(NowScore == 'Error'){
                                    $.ajax({
                                        type: "post",
                                        data: {
                                            "method": "write",
                                            "name": Name,
                                            "score": Score,
                                            "query": Name,
                                        },
                                        url: API ,
                                        success:function(res){
                                            console.log(Score);
                                        },
                                        error:function(res){
                                            console.log(res);
                                        }
                                    });
                                    console.log(Score);
                                    NowScore = Score;
                                }
                                else if(NowScore < Score){
                                    $.ajax({
                                        type: "post",
                                        data: {
                                            "method": "WriteAgain",
                                            "name": Name,
                                            "query": Name,
                                            "score": Score
                                        },
                                        url: API,
                                        success:function(res){
                                            console.log(Score);
                                        }
                                    });
                                    NowScore = Score;
                                }
                                $("#result").html(Name+"的最高分數是"+NowScore+",成績已上傳!");
                                setTimeout('location.href="AllScore.php"', 1000);
                                // console.log(NowScore == 'Error');
                            }
                        });
                    
                    }
                    else $("#result").html("Score Error")
                }
                else{
                    $("#result").html("Player name can't be empty");
                }
                
            }
        </script>
        <script src="js/login.js"></script>
    </body>
</html>