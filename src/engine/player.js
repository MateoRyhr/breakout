export default class Player{
    constructor(blockPlayer,ball,data){
        this.blockPlayer = blockPlayer
        this.ball = ball
        this.ballMaxVelY = data.ballMaxVelY
        this.blockPlayerVel = data.blockPlayerVel
    }

    keyDown(e){
        let key = e.keyCode
        switch(key){
            case 32:
                this.throwBall()
                break
            case 37:
                this.moveLeft(e)
                break
            case 39:
                this.moveRight(e)
                break
            default:
        }        
    }

    keyUp(e){
        let key = e.keyCode
        switch(key){
            case 37:
                this.stopMoveLeft(e)
                break
            case 39:
                this.stopMoveRight(e)
                break
            default:
        }
    }

    throwBall(){
        if (!this.ball.launched) {
          this.ball.launched = true;
          this.ball.vely = - this.ballMaxVelY
          if (this.blockPlayer.velx != 0) {
            this.ball.velx = this.blockPlayer.velx / 2;
          }
        }
    }

    moveLeft(e){
        let v = this.blockPlayer.velx
        if (v >= 0) {//left
            this.blockPlayer.velx -= this.blockPlayerVel;
            if (!this.ball.launched) {
              this.ball.velx -= this.blockPlayerVel;
            }
        }
    }

    moveRight(e){
        let v = this.blockPlayer.velx
        if (v <= 0) {//right
            this.blockPlayer.velx += this.blockPlayerVel;
            if (!this.ball.launched) {
              this.ball.velx += this.blockPlayerVel;
            }
        }
    }

    stopMoveLeft(e){
        let v = this.blockPlayer.velx
        if (v <= 0) {//stop left
            this.blockPlayer.velx += this.blockPlayerVel;
            if (!this.ball.launched) {
              this.ball.velx += this.blockPlayerVel;
            }
        }
    }

    stopMoveRight(e){
        let v = this.blockPlayer.velx
        if (v >= 0) {//stop right
            this.blockPlayer.velx -= this.blockPlayerVel;
            if (!this.ball.launched) {
              this.ball.velx -= this.blockPlayerVel;
            }
        }
    }
}
