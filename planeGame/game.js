var Score = 0
var BulletNum = 0;
var RockW = {};
var RockX = {};
var RockY = [-700, -100, -300, -500, -800];
var BulletX = {};
var BulletY = {};
var PlaneX = 250;
var PlaneW = 60;
var Key = 0;
var Retry = 1;
var MainW = 800;
var tmpKey = 0;

function SetGame(){
    Score = 0;
    BulletNum = 0;
    RockW = {};
    RockX = {};
    RockY = [-700, -100, -300, -500, -800];
    BulletX = {};
    BulletY = {};
    PlaneX = 250;
    for(var i = 0; i < 5; i++){
        RockW[i] = Math.floor(Math.random()*20+50);
    }
    for(var i = 0; i < 5; i++){
        RockX[i] = Math.floor(Math.random()*(MainW-(PlaneW*2))+PlaneW);
    }
    RockY[0] = -700;
    RockY[1] = -100;
    RockY[2] = -300;
    RockY[3] = -500;
    RockY[4] = -800;

    for(var i = 1; i < 6; i++){
        $(".r"+i).css({
            'width':RockW[i-1]+'px',
            'height':RockW[i-1]+'px',
            'left':+RockX[i-1]+'px',
            'top':+RockY[i-1]+'px'
        });
    }
}

function setStar(){
    for(var i = 0; i < 250; i++){
        var starx = Math.floor(Math.random()*MainW);
        var stary = Math.floor(Math.random()*MainW);
        var scale = Math.random() * 4;
        var flashtime = Math.random() * 5+2;
        var dtime = Math.random() * 10;
        var star = "<img class='star s"+i+"' src='img/star.png'>"  
        $("#MainBackground").append(star);
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
            'animation-direction': 'reverse'
        })
        // $(".s"+i).addClass("starflash");
    }
}

$(document).ready(function(){
    $("#start").hide();
    $("#GameOver").hide();
    $("#start").css({'opacity':1})
    $("#again").hide();
    $("#again").css({'opacity':1})
    SetGame();
    setStar();
    $("#start").click(function(){
        if(Retry == 1){
            Key = (Key+1)%2;
            if(Key){
                // $("#start").text("Pause");
                $("#start").attr('title', "Pause");
                $("#start").attr('src', "img/pause4.png");
            }
            else{
                // $("#start").text("Start");
                $("#start").attr('title', "Start");
                $("#start").attr('src', "img/play2.png");
            }
        }
        else{
            tmpKey++;
            if(tmpKey%2 == 0){
                // $("#start").text("Pause");
                $("#start").attr('title', "Pause");
                $("#start").attr('src', "img/pause4.png");
            }
            else{
                // $("#start").text("Start");
                $("#start").attr('title', "Start");
                $("#start").attr('src', "img/play2.png");
            }
            if(tmpKey > 10){
                alert('Please click "Restart"');
                tmpKey = 1;
            }
        }
        // console.log(Key);
    });
    $("#OK").click(function(){
        $("#MainBackground").animate({
            left: 23+'%',
            width:800+"px"
        }, 500, 'linear');
        $("#intro").animate({
            left:150+'%'
        }, 1500, 'linear');
        ShowScore();
        $("#start").show();
        $("#again").show();
        Key = (Key+1)%2;
        if(Key){
            // $("#start").text("Pause");
            $("#start").attr('title', "Pause");
            $("#start").attr('src', "img/pause4.png");
        }
        else{
            // $("#start").text("Start");
            $("#start").attr('title', "Start");
            $("#start").attr('src', "img/play2.png");
        }
    })

    $("#again").click(function(){
        Score = 0;
        Retry = 1;
        Key = 1
        // $("#start").text("Pause");
        $("#start").attr('title', "Pause");
        $("#start").attr('src', "img/pause4.png");
        ShowScore();
        SetGame();
    })
    // ShowScore();
    $("#Yes").click(function(){
        
    })
    $("#No").click(function(){
        $("#GameOver").hide();
        console.log(1);
    })
    setInterval("MoveRock()",20);
    setInterval("MoveBullet()",1);
});

$(document).keydown(function(event){
    if(Key == 1 && Retry == 1){
        var tmpleft = $("#plane").position().left;
        var tmptop = $("#plane").position().top;
        if(event.keyCode == 37){
            tmpleft-=10;
            PlaneX-=10;
        }
        if(event.keyCode == 38){
            CreateBullet(tmpleft, tmptop);
            // var t = ".B"+BulletNum;
            // $(t).remove();
            // tmptop-=10 
        }
        if(event.keyCode == 39){
            tmpleft+=10;
        }
        // if(event.keyCode == 40){
        //     tmptop+=10   
        // }
        // var Mainleft = $("#MainBackground").position().left;
        var Mainleft =$("#MainBackground").offset().left;    
        var Maintop = $("#MainBackground").position().top;
        if(tmpleft > -10 && tmpleft < $("#MainBackground").width() - $("#plane").width()){
            if(tmptop > Maintop && tmptop < (Maintop+$("#MainBackground").height()-$("#plane").height())){
                $("#plane").css({
                    'left': tmpleft+'px',
                    'top': tmptop+'px'
                }) 
            }  
        }
        // console.log(tmpleft);
        // console.log(Mainleft);
        // var t = ".B"+BulletNum;
        // $(t).remove();
    }
});

function checkBullet(bi){
    for(var i = 0; i < 5; i++){
        if(BulletX[bi]>=RockX[i] && BulletX[bi]<=RockX[i]+RockW[i]){
            if(BulletY[bi] >= RockY[i] && BulletY[bi] <= RockY[i]+RockW[i] && BulletY[bi] >0){
                Score+=5;
                ShowScore();
                $(".r"+i+1).remove();
                SetRock(i+1);
            }
        }
    }

}
function CreateBullet(Left, Top){
    if(Key == 1){
        var Bullet = "<img class='B"+BulletNum+"' src='img/bullet.png'>"
        BulletY[BulletNum] = Top;
        BulletX[BulletNum] = Left+$("#plane").width()/2;
        var tmpclass = ".B"+BulletNum;
        BulletNum = (BulletNum+1)%80;
        // console.log(Top+','+Left);
        $("#MainBackground").append(Bullet);
        $(tmpclass).css({
            'width': 20+'px',
            'height': 20+'px',
            'position': 'absolute',
            'left': +Left+Math.floor($("#plane").width()/2)-10+'px',
            'top': +Top+'px'
        })
    }
    // $(tmpclass).animate({top:'-=500px'}, 1000);
}

function MoveBullet(){
    if(Key == 1){
        for(var i = 0; i < 80; i++){
            if($(".B"+i).length){
                $(".B"+i).css({
                    'top':'-=5px'
                })
                BulletY[i]-=5;
                checkBullet(i);
                if(BulletY[i] < -10){
                    $(".B"+i).remove();
                }
            }
        }
    }
}

function SetRock(i){
    RockX[i-1] = Math.floor(Math.random()*(MainW-120))+50;
    RockW[i-1] = Math.floor(Math.random()*20)+50;
    RockY[i-1] = Math.floor(Math.random()*300)-400;
    $(".r"+i).css({
        'width':RockW[i-1]+'px',
        'height':RockW[i-1]+'px',
        'left':+RockX[i-1]+'px',
        'top': RockY[i-1]+'px'
    })
}

function MoveRock(){
    if(Key == 1 && Retry == 1){
        var tmpleft = $("#plane").position().left;
        var tmpTop = $("#plane").position().top;
        var tmpW = $("#plane").width();
        for(var i = 1; i < 6; i++){
            var tmptop = $(".r"+i).position().top;
            $(".r"+i).css({
                'top': '+=1px'
            })
            RockY[i-1]=tmptop+1;
            if(RockY[i-1] > 500){
                // checkRock(i-1);
                Score-=5;
                ShowScore();
                SetRock(i);
            }
            // || (RockX[i-1]+RockW[i-1] < tmpleft+$("#plane").width() && RockX[i-1]+RockW[i-1] > tmpleft)
            if((RockX[i-1] < tmpleft+70 && RockX[i-1] > tmpleft )|| 
                (RockX[i-1]+RockW[i-1] < tmpleft+70 && RockX[i-1]+RockW[i-1] > tmpleft+10) ||
                (RockX[i-1] < tmpleft && tmpleft+70 < RockX[i-1]+RockW[i-1])){
                // (RockX[i-1] > tmpleft && tmpleft+70 < RockX[i-1]+RockW[i-1])
                if(RockY[i-1]+RockW[i-1] > tmpTop+10 && RockY[i-1]+RockW[i-1] < tmpTop+80 ){
                    //alert("Game Over");
                    $("#GameOver").show();
                    // SetRock(i+1);
                    Retry = 0;
                    ShowScore();
                    SetGame(i);
                    // Key = 0;
                    // window.location.reload();
                } 
            }
        }
        checkBullet();
    }
}
function checkRock(i){
    var tmpleft = $("#plane").position().left;
    var tmpTop = $("#plane").position().top;
    console.log("PX"+tmpleft+" PY"+tmpTop+"PW"+$("#plane").width());
    console.log("X:"+RockX[i]+" Y:"+RockY[i]+" W:"+RockW[i]);
}
function ShowScore(){
    if(Retry == 0){
        $("#Score").html("Your Score : "+Score);
        // $("#Score").css({
        //     'font-size':40+'px',
        //     'top':33+"%",
        //     'left':40+"%"
        // })
    }
    else{
        $("#Score").text("Your Score : "+Score);
        $("#Score").css({
            'font-size':50+'px',
            'top':10+"%",
            'left':42+"%"
        })
    }
}