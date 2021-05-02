//controles - keycodes: 37:left, 38:up, 39:right, 40:down,32:space
function setupControls(){
  addEventListener("keydown", moveBlockPlayer, false);
  addEventListener("keydown", throwBall, false);
  addEventListener("keyup", stopMoveBlockPlayer, false);
}

function moveBlockPlayer(e) {
  let key = e.keyCode;
  //move to left - 37 = LEFT ARROW
  if (key == 37) {
    blockPlayer.velx = -5;
    if (!ball.launched) {
      ball.velx = -5;
    }
  }
  //move to right - 39 = RIGHT ARROW
  if (key == 39) {
    blockPlayer.velx = 5;
    if (!ball.launched) {
      ball.velx = 5;
    }
  }
}

function stopMoveBlockPlayer(e) {
  blockPlayer.velx = 0;
  blockPlayer.vely = 0;
  if (!ball.launched) {
    ball.velx = 0;
    ball.vely = 0;
  }
}

function throwBall(e) {
    if (e.keyCode == 32) {
      if (!ball.launched) {
        ball.launched = true;
        ball.vely = -5;
        if (blockPlayer.velx != 0) {
          ball.velx = blockPlayer.velx / 2;
        }
      }
    }
}

export {
  setupControls,
  moveBlockPlayer,
  stopMoveBlockPlayer,
  throwBall
}