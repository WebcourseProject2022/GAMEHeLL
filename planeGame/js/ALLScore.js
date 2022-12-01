// var MainW = 2000;
// var downStarId = 0;
// function setStar(){
//     for(var i = 0; i < 800; i++){
//         var starx = Math.floor(Math.random()*MainW);
//         var stary = Math.floor(Math.random()*MainW);
//         var scale = Math.random() * 5+1;
//         var flashtime = Math.random() * 5+2;
//         var dtime = Math.random() * 10;
//         var star = "<img class='star s"+i+"' src='img/star.png'>"  
//         $("body").append(star);
//         $(".s"+i).css({
//             'opacity': Math.random(),
//             'left':starx+'px',
//             'top':stary+'px',
//             'transform': 'scale('+ scale + ', ' + scale + ')',
//             'animation-name': 'flash',
//             'animation-duration': flashtime+'s',
//             'animation-delay': dtime+'s',
//             'animation-iteration-count': 'infinite',
//             'animation-timing-function': 'linear', 
//             'animation-direction': 'reverse',
//             'z-index':'-1'
//         })
//         // $(".s"+i).addClass("starflash");
//     }
// }
// function downstar(){
//     // downStarId= downStarId%30;
//     for(var i = 0; i < 25; i++){
//         var starx = Math.floor(Math.random()*MainW);
//         var stary = Math.floor(Math.random()*MainW);
//         var scale = Math.random() * 5+5;
//         var flashtime = Math.random() * 5+2;
//         var dtime = Math.random() * 5000+500;
//         $(".s"+i).css({
//             'opacity': Math.random(),
//             'left':starx+'px',
//             'top':-1*stary+'px',
//             'transform': 'scale('+ scale + ', ' + scale + ')',
//             'animation-name': 'flash',
//             'animation-duration': flashtime+'s',
//             'animation-delay': dtime+'s',
//             'animation-iteration-count': 'infinite',
//             'animation-timing-function': 'linear', 
//             'animation-direction': 'reverse'
//         })
//         $(".s"+i).delay(dtime).animate({top:"150%", left:"-=30%"},6000)
//         // $(".s"+i).addClass("starflash");
//     }
// }
// // function RemoveDstar(){
// //     for(var i = 0; i < 10; i++){
        
// //     }
// // }

// $(document).ready(function(){
//     setStar();
//     downstar();
//     setInterval("downstar()",2000);
    
// })


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let cw = canvas.width = window.innerWidth,
cx = cw / 2;
let ch = canvas.height = window.innerHeight,
cy = ch / 2;

let requestId = null;

const colors = ["#9ac785", "#FFC8BA", "#E3AAD6", "#9bb9e8", "#FFBDD8", "#dbd093", "#B5D8EB"];

class Particle {
  constructor() {
    this.x = Math.random() * cw;
    this.y = Math.random() * ch;
    this.r = 15 + ~~(Math.random() * 20); //radius of the circumcircle
    this.l = 4 + ~~(Math.random() * 2); //polygon sides
    this.a = 2 * Math.PI / this.l; // angle between polygon vertices
    this.rot = Math.random() * Math.PI; // polygon rotation
    this.speed = 0.6 + Math.random() / 2;
    this.rotSpeed = 0.008 + Math.random() * .005;
    this.color = colors[~~(Math.random() * colors.length)];
  }
  update() {
    if (this.y < -this.r) {
      this.y = ch + this.r;
      this.x = Math.random() * cw;
    }
    this.y -= this.speed;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.beginPath();
    for (let i = 0; i < this.l; i++) {
      let x = this.r * Math.cos(this.a * i);
      let y = this.r * Math.sin(this.a * i);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.color;
    ctx.stroke();

    ctx.restore();
  }}



let particles = [];
for (let i = 0; i < 40; i++) {
  let p = new Particle();
  particles.push(p);
}



function Draw() {
  requestId = window.requestAnimationFrame(Draw);
  //ctx.globalAlpha=0.65;
  ctx.clearRect(0, 0, cw, ch);
  particles.map(p => {
    p.rot += p.rotSpeed;
    p.update();
    p.draw();
  });

}


function Init() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = null;
  }


  cw = canvas.width = window.innerWidth, cx = cw / 2;
  ch = canvas.height = window.innerHeight, cy = ch / 2;

  //particles.map((p) => p.update());
  Draw();
};

setTimeout(function () {
  Init();
  window.addEventListener('resize', Init, false);
}, 15);