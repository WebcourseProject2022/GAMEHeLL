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

var MainW = 2000;
var downStarId = 0;
function setStar(){
    for(var i = 0; i < 800; i++){
        var starx = Math.floor(Math.random()*MainW);
        var stary = Math.floor(Math.random()*MainW);
        var scale = Math.random() * 5+1;
        var flashtime = Math.random() * 5+2;
        var dtime = Math.random() * 10;
        var star = "<img class='star s"+i+"' src='img/star.png'>"  
        $("body").append(star);
        $(".s"+i).css({
            'opacity': Math.random(),
            'left':starx+'px',
            'top':stary+'px',
            'transform': 'scale('+ scale + ', ' + scale + ')',
            'animation-name': 'flash',
            'animation-duration': flashtime+'s',
            'animation-delay': dtime+'s',
            'animation-iteration-count': 'infinite',
            'animation-timing-function': 'linear', 
            'animation-direction': 'reverse',
            'z-index':'-1'
        })
        // $(".s"+i).addClass("starflash");
    }
}
function downstar(){
    // downStarId= downStarId%30;
    for(var i = 0; i < 25; i++){
        var starx = Math.floor(Math.random()*MainW);
        var stary = Math.floor(Math.random()*MainW);
        var scale = Math.random() * 5+5;
        var flashtime = Math.random() * 5+2;
        var dtime = Math.random() * 5000+500;
        $(".s"+i).css({
            'opacity': Math.random(),
            'left':starx+'px',
            'top':-1*stary+'px',
            'transform': 'scale('+ scale + ', ' + scale + ')',
            'animation-name': 'flash',
            'animation-duration': flashtime+'s',
            'animation-delay': dtime+'s',
            'animation-iteration-count': 'infinite',
            'animation-timing-function': 'linear', 
            'animation-direction': 'reverse'
        })
        $(".s"+i).delay(dtime).animate({top:"150%", left:"-=30%"},6000)
        // $(".s"+i).addClass("starflash");
    }
}
// function RemoveDstar(){
//     for(var i = 0; i < 10; i++){
        
//     }
// }

$(document).ready(function(){
    setStar();
    downstar();
    setInterval("downstar()",2000);
    
})