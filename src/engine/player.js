export default class Player{
    constructor(blockPlayer,ball,gameHeight){
        this.blockPlayer = blockPlayer
        this.ball = ball
        this.gameHeight = gameHeight
        this.ballMaxVelY = this.gameHeight * 0.009
        this.blockPlayerVel = this.gameHeight * 0.009
    }

    uiButton(e){

    }

    keyDown(e){
        let key = e.keyCode
        let v = this.blockPlayer.velx
        switch(key){
            case 32:
                this.throwBall()
                break
            case 37:
                this.moveLeft(e,v)
                break
            case 39:
                this.moveRight(e,v)
                break
            default:
        }        
    }

    touchStart(e){
        let key = e.path[1].id
        let v = this.blockPlayer.velx
        switch(key){
            case 'left-arrow':
                this.moveLeft(e,v)
                break
            case 'up-arrow':
                this.throwBall()
                break
            case 'right-arrow':
                this.moveRight(e,v)
                break
            default:
        }
    }

    keyUp(e){
        let key = e.keyCode
        let v = this.blockPlayer.velx
        switch(key){
            case 37:
                this.stopMoveLeft(e,v)
                break
            case 39:
                this.stopMoveRight(e,v)
                break
            case 13:
                this.uiButton(e)
            default:
        }
    }

    touchEnd(e){
        let key = e.path[1].id
        let v = this.blockPlayer.velx
        switch(key){
            case 'left-arrow':
                this.stopMoveLeft(e,v)
                break
            case 'right-arrow':
                this.stopMoveRight(e,v)
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

    moveLeft(e,v){
        if (v >= 0) {//left
            this.blockPlayer.velx -= this.blockPlayerVel;
            if (!this.ball.launched) {
              this.ball.velx -= this.blockPlayerVel;
            }
        }
    }

    moveRight(e,v){
        if (v <= 0) {//right
            this.blockPlayer.velx += this.blockPlayerVel;
            if (!this.ball.launched) {
              this.ball.velx += this.blockPlayerVel;
            }
        }
    }

    stopMoveLeft(e,v){
        if (v <= 0) {//stop left
            this.blockPlayer.velx += this.blockPlayerVel;
            if (!this.ball.launched) {
              this.ball.velx += this.blockPlayerVel;
            }
        }
    }

    stopMoveRight(e,v){       
        if (v >= 0) {//stop right
            this.blockPlayer.velx -= this.blockPlayerVel;
            if (!this.ball.launched) {
              this.ball.velx -= this.blockPlayerVel;
            }
        }
    }
}
