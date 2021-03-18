//Creado a partir de lo aprendido del tutorial de Snake de GioCode

//controles - keycodes: 37:left, 38:up, 39:right, 40:down,32:space

//variables globales
var winner = false;
var level = 1;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var speed = 10;
var score = parseInt(document.getElementById("score").textContent);
//sonidos
var breaksound;
var bienNene;
var paez;
var bouncesound;
var music;

addEventListener("DOMContentLoaded",init,false);
var running;
function init(){
  document.getElementById("play").addEventListener("click",start,false);
}
function start(){
  document.getElementById("breakout").style.display="block";
  document.getElementById("menu").style.display="none";
  //console.log(document.getElementById("soundON"));
  if(document.getElementById("soundON").checked){
    music = document.createElement("audio");
    music.setAttribute("src","sounds/music.mp3");
    music.setAttribute("loop",true);
    music.volume = 0.05;
    music.play();
  }  
  running = setInterval(main,speed);
  console.log(running);
}

addEventListener("keydown",moveBlockPlayer,false);
addEventListener("keydown",throwBall,false);
addEventListener("keyup",stopMoveBlockPlayer,false);

function moveBlockPlayer(e){
  key = e.keyCode;
  if(key==37){
    blockPlayer.velx=-5;
    if(!ball.launched){
      ball.velx=-5;
    }
  }
  //if(key==38) blockPlayer.vely=-5;
  if(key==39){
    blockPlayer.velx=5;
    if(!ball.launched){
      ball.velx=5;
    }
  }
  //if(key==40) blockPlayer.vely=5;
}

function stopMoveBlockPlayer(e){
  blockPlayer.velx=0;
  blockPlayer.vely=0;
  if(!ball.launched){
    ball.velx=0;
    ball.vely=0;
  }
}

function moving(){
  //block
  var blockNewxi = blockPlayer.xi+blockPlayer.velx;
  var blockNewyi = blockPlayer.yi+blockPlayer.vely;
  var blockNewxf = blockPlayer.xi+blockPlayer.velx+blockPlayer.size.width;
  var blockNewyf = blockPlayer.yi+blockPlayer.vely+blockPlayer.size.height;
  //ball
    var ballNewxi = ball.xi+ball.velx;
    var ballNewyi = ball.yi+ball.vely;
    var ballNewxf = ball.xi+ball.velx+ball.size.width;
    var ballNewyf = ball.yi+ball.vely+ball.size.height;


  if(blockNewxi>=0 && blockNewxi<=canvas.width-blockPlayer.size.width){
    blockPlayer.setPos(blockNewxi,blockNewyi,blockNewxf,blockNewyf);
    if(!ball.launched)
    ball.setPos(ballNewxi,ballNewyi,ballNewxf,ballNewyf);
  }
  if(ball.launched){
    ball.setPos(ballNewxi,ballNewyi,ballNewxf,ballNewyf);
  }
}

function break_sound(){
  breaksound = document.createElement("audio");
  breaksound.setAttribute("src","sounds/break.mp3");
  breaksound.play();
}
function bounce_sound(){
  bouncesound = document.createElement("audio");
  bouncesound.setAttribute("src","sounds/bounce.mp3");
  bouncesound.play();
}

function bienNeneSound(){
  bienNene = document.createElement('audio')
  bienNene.setAttribute('src','sounds/bien-nene.mp3')
  bienNene.play()
}

function paezSound(){
  paez = document.createElement('audio')
  paez.setAttribute('src','sounds/paez.mp3')
  paez.play()
}

//bloques
var blockColor="#636e72";
var block = Array();

function Objects(x,y,width,height){
  this.xi=x;
  this.yi=y;
  this.xf = this.xi+width;
  this.yf = this.yi+height;
  this.size={
    width:width,
    height:height
  }
  this.velx=0;
  this.vely=0;

  this.collision = function(obj,bounce){//-->recibe de parametro un objeto con el cual evaluara si se produjo una collision
    if(this.yi<obj.yf && obj.yi < this.yf && obj.xi < this.xf && obj.xf > this.xi){//collision condition
      var up = Math.abs(this.yi - obj.yf);
      var left = Math.abs(this.xi - obj.xf);
      var right = Math.abs(this.xf - obj.xi);
      var down = Math.abs(this.yf - obj.yi);
      if(bounce){
        //add force of blockPlayer
        if(this.velx < 4 && this.velx > -4){
          if(obj.velx<0) this.velx-=1;
          if(obj.velx>0) this.velx+=1;
          //add small random force in x
          if(parseInt(Math.random()*2+1)==1) this.velx-=Math.random()/2;
          else this.velx+=Math.random()/2;
          //in y - the variations forces in 'y' are not good for the game
          //if(parseInt(Math.random()*2+1)==1) this.vely-=Math.random();
          //else this.vely+=Math.random();
        }

        //bounces
        //sistema por comparación de distancias
        if(up <= right && up <= down && up <=left) this.vely=Math.abs(this.vely);
        if(right <= down && right <= left && right <= up) this.velx=Math.abs(this.velx)*-1;
        if(down <= left && down <= up && down <= right) this.vely=Math.abs(this.vely)*-1;
        if(left <= up && left <= right && left <= down) this.velx=Math.abs(this.velx);     
      }
      return true;
    }
    else {
      return false;
    }
  }

  this.setPos = function(xi,yi,xf,yf){
    this.xi=xi;
    this.yi=yi;
    this.xf=xf;
    this.yf=yf;
  }
}

function Ball(x,y,width,height,color){
  Objects.call(this,x,y,width,height);
  this.radius=width/2;
  this.xi=x-this.radius;
  this.yi=y-this.radius;
  this.xf=x+this.radius;
  this.yf=y+this.radius;
  this.size.width = width;
  this.size.height = height;
  this.color=color;
  this.launched=false;

  this.draw = function(ctx){
    ctx.beginPath();
    ctx.arc(this.xi+this.radius,this.yi+this.radius, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

function Block(x,y,width,height,color){
  Objects.call(this,x,y,width,height);
  this.color = color;

  this.draw = function(ctx){
    ctx.fillStyle= color;
    ctx.lineWidth=2;
    ctx.strokeStyle = "black";
    ctx.fillRect(this.xi,this.yi,this.size.width,this.size.height);
    ctx.strokeRect(this.xi,this.yi,this.size.width,this.size.height);
  }
}

function throwBall(e){
  if(e.keyCode==32){
    if(!ball.launched){
      ball.launched=true;
      ball.vely=-5;
      if(blockPlayer.velx!=0){
        ball.velx=blockPlayer.velx/2;
      }
    }
  }
}

//objects
var ball = new Ball(200,565,20,20,"red");
var blockPlayer = new Block(150,575,100,200,"blue");
var rightWall = new Block(canvas.width,0,0,canvas.height);
var upWall = new Block(0,0,canvas.width,0);
var leftWall = new Block(0,0,0,canvas.height);

//create the blocks
function createLevel(level){
  var blockNum=0;
  switch(level){
    case 1://rows
      for(var j = 0; j < 3;j++){
        for (var i = 0; i < canvas.width/50; i++) {
          block[blockNum] = new Block(i*50,50+j*25,50,25,blockColor);
          blockNum++;
        }
      }
    break;
    case 2:
      //bloque de 4 bloques
      for(var j = 0; j < 2;j++){
        for(var i = 0;i<2;i++){
          block[blockNum] = new Block(i*50,j*25,50,25,blockColor);
          blockNum++;
        }
      }
      for(var j = 0; j < 2;j++){
        for (var i = 0; i < canvas.width/50; i++) {
          block[blockNum] = new Block(i*50,50+j*25,50,25,blockColor);
          blockNum++;
        }
      }
      for(var j = 0; j < 2;j++){
        for(var i = 0;i<2;i++){
          block[blockNum] = new Block(canvas.width-100+i*50,j*25,50,25,blockColor);
          blockNum++;
        }
      }
      for(var j = 0; j < 2;j++){
        for(var i = 0;i<2;i++){
          block[blockNum] = new Block(150+i*50,100+j*25,50,25,blockColor);
          blockNum++;
        }
      }
    break;



  }
}
createLevel(level);


//función renderizadora de graficos
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < block.length; i++) {
      if(block[i]!=undefined)
      block[i].draw(ctx);
    }
    blockPlayer.draw(ctx);
    ball.draw(ctx);
}

function lose(){
  if(ball.yi>canvas.height+50){
    setTimeout(() => alert("Perdiste"),0)
    ball = new Ball(200,565,20,20,"red");
    blockPlayer = new Block(150,575,100,25,"blue");
    block = new Array();
    createLevel(level);
    document.getElementById("score").textContent="0";
    score=0;
  }
}

function win(){
  var blockCount = 0;
  for(var i = 0;i < block.length;i++){
    if(block[i] != undefined){
      blockCount++;
    }
  }
  if(blockCount == 0) return true;
  else return false;
}


//función de animación y principal donde se llamaran todas las funciones
function main() {
  moving();
  for (var i = 0; i < block.length; i++) {
    if(block[i]!=undefined){
      if(ball.collision(block[i],true)){
        if(music!=undefined){
          break_sound();
        }
        block[i] = undefined;
        i++;//para no romper dos bloques si pega en el medio
        score+=10;
        document.getElementById("score").textContent=score; 
      }
    }
  }
  draw();
  if(win()){

    level++;
    ball = new Ball(200,565,20,20,"red");
    blockPlayer = new Block(150,575,100,200,"blue");
    block = new Array();
    bienNeneSound()
    createLevel(level);
    if(level == 3){
      if(!winner){
        setTimeout(alert("Ganaste"),100);
        setTimeout(clearInterval(running),100);
        winner = true;
      }
    }
  }
  lose();

  if(ball.collision(blockPlayer,true)) if(music!=undefined) bounce_sound();
  if(ball.collision(upWall,true)) if(music!=undefined) bounce_sound();
  if(ball.collision(rightWall,true)) if(music!=undefined) bounce_sound();
  if(ball.collision(leftWall,true)) if(music!=undefined) bounce_sound();
}
