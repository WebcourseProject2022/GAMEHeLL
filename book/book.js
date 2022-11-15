
$(document).ready(function(){
    $("#sendMessage").click(function(){
    var arr = ["放手去做", "相信自己", "再等等", "時候未到", "努力爭取", "堅持", "適時斷捨離","夢想成真","見好就收","適可而止",
    "再試試看","及時行樂","給自己一個機會","休息一下","看起來很有把握","就是現在","可能有意外","跟隨他人的步伐","有把握的事再做",
    "等待更好的時機","列出否定的理由","它仍是不可預測的","懷疑","可能有反對意見","賭一把","試一次","保持原狀","改變現狀","放下",
    "藏起來","它會引起轟動","你希望得到肯定的答案","需要付出加倍的努力","尊重他人的意見","遵守承諾","享受體驗","會成功的","對此深信不疑",
    "未來也許","你不會忘記的","要有耐心","參考他人的意見","立即行動"]
    var Index = Math.floor((Math.random()*arr.length));
    var text = arr[Index];
        var N = $("#sign").val();
        $("#boo").text(text);
    })

})
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('sendMessage').onclick = function(){

        const userName = document.getElementById('name').value;
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201){
                const serverResponse = JSON.parse(xhr.response);
                document.getElementsByClassName('message')[0].textContent = serverResponse.userName + serverResponse.suffix;
            }
        };
        const body = JSON.stringify({ userName: userName, suffix: ', 你好!' });
        xhr.send(body);

    };
});

function ShowTime(){
    document.getElementById('showbox').innerHTML = new Date();
    setTimeout('ShowTime()',1000);
}