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
    this.l = 3 + ~~(Math.random() * 2); //polygon sides
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


$(document).ready(function(){
  $("#Title").click(function(){
    Musicplay();
  })
  Musicplay();
})
function Musicplay(){
  $("#music").muted = true;
  if($("#music")[0].paused){
    $("#music")[0].play();
  }
  else{
    $("#music")[0].pause();
  }
}