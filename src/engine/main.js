function start() {
  showGame()
  // if (document.getElementById("soundON").checked) {
  //   sound = true
  //   music = document.createElement("audio");
  //   music.setAttribute("src", "../assets/sounds/music.mp3");
  //   music.setAttribute("loop", true);
  //   music.volume = 0.05;
  //   music.play();
  // }
  return setInterval(main, speed);
}

// this functions receive the blockPlayer and the ball
function moving({ blockPlayer, ball }) {
  //move blockPlayer
  let blockNewxi = blockPlayer.xi + blockPlayer.velx;
  let blockNewyi = blockPlayer.yi + blockPlayer.vely;
  let blockNewxf = blockPlayer.xi + blockPlayer.velx + blockPlayer.size.width;
  let blockNewyf = blockPlayer.yi + blockPlayer.vely + blockPlayer.size.height;
  //move ball
  let ballNewxi = ball.xi + ball.velx;
  let ballNewyi = ball.yi + ball.vely;
  let ballNewxf = ball.xi + ball.velx + ball.size.width;
  let ballNewyf = ball.yi + ball.vely + ball.size.height;

  if (blockNewxi >= 0 && blockNewxi <= canvas.width - blockPlayer.size.width) {
    blockPlayer.setPos(blockNewxi, blockNewyi, blockNewxf, blockNewyf);
    if (!ball.launched) ball.setPos(ballNewxi, ballNewyi, ballNewxf, ballNewyf);
  }
  if (ball.launched) {
    ball.setPos(ballNewxi, ballNewyi, ballNewxf, ballNewyf);
  }
}

// Receive the objects that will detect collisions
function detectCollision(config,audio,ui){
  for (let i = 0; i < config.block.length; i++) {
    if (config.block[i] != undefined) {
      if (config.ball.collision(config.block[i], true)) {
        if (config.sound) {
          audio.playSound('../../assets/sounds/break.mp3',1,false)
          // break_sound();
        }
        config.block[i] = undefined;
        i++; //para no romper dos bloques si pega en el medio
        config.score += 10;
        ui.score.textContent=config.score;
      }
    }
  }
  if (config.ball.collision(config.blockPlayer, true))
   if (config.sound) 
    audio.playSound('../../assets/sounds/bounce.mp3');
  if (config.ball.collision(config.upWall, true))
   if (config.sound) 
    audio.playSound('../../assets/sounds/bounce.mp3');
  if (config.ball.collision(config.rightWall, true))
   if (config.sound) 
    audio.playSound('../../assets/sounds/bounce.mp3');
  if (config.ball.collision(config.leftWall, true))
   if (config.sound) 
    audio.playSound('../../assets/sounds/bounce.mp3');
}

function lose() {
  if (ball.yi > canvas.height + 50) {
    setTimeout(() => alert("Perdiste"), 0);
    ball = new Ball(200, 565, 20, 20, "red");
    blockPlayer = new Block(150, 575, 100, 25, "blue");
    block = new Array();
    createLevel(level);
    document.getElementById("score").textContent = "0";
    score = 0;
  }
}

function win(config,audio) {
  let blockCount = 0;
  for (let i = 0; i < config.block.length; i++) {
    if (config.block[i] != undefined) {
      blockCount++;
    }
  }
  if (blockCount === 0){
    config.plusLevel()
    audio.playSound('../../assets/sounds/bien-nene.mp3',1,false)
    //bienNeneSound();
    //initObjects(config.level)
    if (config.level == 3) {
      if (!config.winner) {
        setTimeout(alert("Ganaste"), 100);
        setTimeout(clearInterval(running), 100);
        config.winner = true;
      }
    }
  }
}

export {
  moving,
  detectCollision,
  lose,
  win
}