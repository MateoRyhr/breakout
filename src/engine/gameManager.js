"use strict"

import DataManager from './dataManager.js'
import Ui from '../ui/ui.js'
import Audio from '../audio/audio.js'
import Objects from './objects.js'
import Render from './render.js'
import Map from '../maps/map.js'
import Player from './player.js'

class GameManager{

    constructor(){
        this.running = false
        this.initializedControls = false
        this.levelSelected = false
        this.data = new DataManager()
        this.ui = new Ui()
        this.ui.setup()
        this.audio = new Audio()
        this.render = new Render(this.ui)

        // para asignar una funcion a un evento no podemos hacer lo siguiente:
        // this.ui.effectsIcon.addEventListener('click',this.soundEffectsHandler)
        // para ello llame a la funcion dentro de una arrow funtion ya que,
        // dentro de addEventListener this hace referencia a la fuente del evento
        // usando () => {} this hara referencia al contexto de la arrow function
        // o sea el objeto instanciado
        this.ui.effectsIcon.addEventListener('click',() => this.soundEffectsHandler())
        this.ui.musicIcon.addEventListener('click', () => this.musicHandler())
        this.ui.playButton.addEventListener('click',() => this.ui.showDifficultyMenu())
        this.ui.selectLevelButton.addEventListener('click',() => this.ui.showMenuLevels())
        this.ui.addLevelButtonEvents(e => this.initSelectedLevel(e))
        this.ui.veryEasyButton.addEventListener('click',() => this.setVeryEasy())
        this.ui.easyButton.addEventListener('click',() => this.setEasy())
        this.ui.normalButton.addEventListener('click',() => this.setNormal())
        this.ui.hardButton.addEventListener('click',() => this.setHard())
        this.ui.winLevelPlayAgainButton.addEventListener('click', () => this.finishLevel())
        this.ui.playAgainButton.addEventListener('click', () => this.playAgain())
        this.ui.nextLevelButton.addEventListener('click', () => this.nextLevel())
        this.ui.gameOverButton.addEventListener('click', () => this.finishLevel())
        addEventListener('keydown',e => this.enterHandler(e))
        this.map = new Map(this.ui,Objects.Block)
    }

    initSelectedLevel(e){
        this.data.level = parseInt(e.srcElement.innerHTML) -1
        this.levelSelected = true
        this.ui.showDifficultyMenu()
    }

    finishLevel(){
        this.levelSelected = false
        this.ui.canvas.style.display = 'none'
        this.ui.hideGameOver()
        this.ui.hideWinLevelMenu()
        this.audio.music.load()
        this.data.score = 0
        this.data.lifes = 0
        this.data.level = 0
        this.ui.updateScore(this.data)
        this.ui.updateLifes(this.data)
        this.ui.showMenu()
    }

    setVeryEasy(){
        this.data.difficulty = 'veryeasy'
        this.data.ballMaxVelX = this.ui.gameHeight * 0.008
        this.data.ballMaxVelY = this.ui.gameHeight * 0.008
        this.data.blockPlayerVel = this.ui.gameHeight * 0.016
        this.data.lifes = 5
        this.ui.hideDifficultyMenu()
        this.init()
    }

    setEasy(){
        this.data.difficulty = 'easy'
        this.data.ballMaxVelX = this.ui.gameHeight * 0.01
        this.data.ballMaxVelY = this.ui.gameHeight * 0.01
        this.data.blockPlayerVel = this.ui.gameHeight * 0.016
        this.data.lifes = 5
        this.ui.hideDifficultyMenu()
        this.init()
    }

    setNormal(){
        this.data.difficulty = 'normal'
        this.data.ballMaxVelX = this.ui.gameHeight * 0.013
        this.data.ballMaxVelY = this.ui.gameHeight * 0.013
        this.data.blockPlayerVel = this.ui.gameHeight * 0.016
        this.data.lifes = 5
        this.ui.hideDifficultyMenu()
        this.init()
    }

    setHard(){
        this.data.difficulty = 'hard'
        this.data.ballMaxVelX = this.ui.gameHeight * 0.016
        this.data.ballMaxVelY = this.ui.gameHeight * 0.016
        this.data.blockPlayerVel = this.ui.gameHeight * 0.016
        this.data.lifes = 3
        this.ui.hideDifficultyMenu()
        this.init()
    }

    soundEffectsHandler(){
        this.data.soundEffects = !this.data.soundEffects
        this.ui.setEffectsSound(this.data.soundEffects)
        //this.audio.effectsMuteUnmute(this.data.soundEffects)
    }

    musicHandler(){
        this.data.music = !this.data.music
        this.ui.setMusic(this.data.music)
        this.audio.musicMuteUnmute(this.data.music)     
    }

    enterHandler(e){
        if(e.keyCode === 13){
            if(this.ui.menu.style.display === 'flex'){
                this.ui.showDifficultyMenu()
            }
            if(this.ui.winLevelMenu.style.display === 'flex'){
                this.finishLevel()
            }
            if(this.ui.playAgainMenu.style.display === 'flex'){
                this.playAgain()
            } 
            if(this.ui.nextLevelMenu.style.display === 'flex'){
                this.nextLevel()
            } 
            if(this.ui.gameOverMenu.style.display === 'flex'){
                this.finishLevel()
            } 
        }
    }

    initControls(){
        if(!this.initializedControls){
            this.ui.leftArrow.addEventListener('touchstart',e => this.player.moveLeft(e))
            this.ui.upArrow.addEventListener('touchstart',e => this.player.throwBall(e))
            this.ui.rightArrow.addEventListener('touchstart',e => this.player.moveRight(e))
            this.ui.leftArrow.addEventListener('touchend',e => this.player.stopMoveLeft(e))
            this.ui.rightArrow.addEventListener('touchend',e => this.player.stopMoveRight(e))
            addEventListener('keydown',e => this.player.keyDown(e))
            addEventListener('keyup',e => this.player.keyUp(e))
            this.initializedControls = true
        }
    }

    update(){
        // si el jugador no colisionara con las paredes se efectua el movimiento
        if(this.map.blockPlayer.setNewPos([this.map.leftWall,this.map.rightWall])){
            //si la pelota no fue lanzada se mueve junto a la barra
            if(!this.map.ball.launched){
                this.map.ball.setNewPos([])
            }
        }
        //actualizamos el movimiento de la pelota
        if(this.map.ball.launched){
            this.map.ball.setNewPos([])
        }
    }

    collisions(){
        // map blocks collision
        for (let i = 0; i < this.map.blocks.length; i++) {
            if(this.map.blocks[i]){
                if(this.map.ball.collision(this.map.blocks[i],true,this.data.ballMaxVelX)){
                    if(this.data.soundEffects){
                        this.audio.playSound(this.audio.breakSrc,1,false)
                    }
                    this.map.blocks[i] = undefined
                    i = this.map.blocks.length //para no romper dos bloques
                    this.data.score += 10
                    this.ui.updateScore(this.data)
                }
            }
        }
        // player collision
        if(this.map.ball.collision(this.map.blockPlayer,true,this.data.ballMaxVelX)){
            if(this.data.soundEffects){
                this.audio.playSound(this.audio.bounceSrc,1,false)
            }
        }
        //walls collision
        if(this.map.ball.collision(this.map.leftWall,true,this.data.ballMaxVelX)){
            if(this.data.soundEffects) {
                this.audio.playSound(this.audio.bounceSrc,1,false)
            }
        }
        if(this.map.ball.collision(this.map.upWall,true,this.data.ballMaxVelX)){
            if(this.data.soundEffects){
                this.audio.playSound(this.audio.bounceSrc,1,false)
            }
        }
        if(this.map.ball.collision(this.map.rightWall,true,this.data.ballMaxVelX)){
            if(this.data.soundEffects){
                this.audio.playSound(this.audio.bounceSrc,1,false)
            }
        }
    }

    nextLevel(){
        this.data.level++
        this.ui.hideNextLevel()
        this.init()
    }

    playAgain(){
        this.ui.hidePlayAgain()
        this.data.difficulty === 'hard' ? this.data.lifes = 3 : this.data.lifes = 5
        this.data.score = 0
        if(!this.levelSelected){
            this.data.level = 0
        }
        this.ui.updateScore(this.data)
        this.init()
    }

    checkIfWin(){
        let blockExist = false
        for (let i = 0; i < this.map.blocks.length; i++) {
            if(this.map.blocks[i]){
                blockExist = true
            }
        }
        if(!blockExist){
            if(this.levelSelected){
                this.running = false
                this.ui.showWinLevelMenu()
                return
            }
            if(this.data.level === this.map.maps.length-1){
                this.running = false
                this.ui.showGameOver()
                return
            }
            this.running = false
            this.ui.showNextLevel()
        }
    }

    checkIfLose(){
        let lose = false
        if(this.map.ball.yi > this.ui.gameHeight + 100){// +100 para que tarde mas en mostrar el menu
            lose = true
        }
        if(lose){
            this.data.lifes--
            if(this.data.lifes === 0){
                this.ui.updateLifes(this.data)
                this.running = false
                this.ui.showPlayAgain()
            }else{
                this.running = false
                if(this.data.score > 0){
                    if(this.data.score <= 500) this.data.score = 0
                    else this.data.score -= 500
                }
                this.ui.updateLifes(this.data)
                this.ui.updateScore(this.data)
                setTimeout(() => this.init(),500)
            }
        }
    }

    init(){
        this.ui.lifes.textContent = this.data.lifes
        this.ui.showGame()
        this.audio.music.play()
        this.map.createLevel(this.map.maps[this.data.level],this.data,Objects.Block,Objects.Ball,this.ui)
        this.player = new Player(this.map.blockPlayer,this.map.ball,this.data)
        this.initControls()
        this.running = true
        window.requestAnimationFrame(() => this.game())
    }

    game(){
        this.update()
        this.collisions()
        this.render.draw(this.map,this.ui)
        this.checkIfWin()
        this.checkIfLose()
        if(this.running){
            window.requestAnimationFrame(() => this.game())
        }
    }
}

let game = new GameManager()