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
        this.data = new DataManager()
        this.ui = new Ui()
        this.ui.setup()
        this.audio = new Audio()
        this.render = new Render(this.ui)
        this.player = new Player()

        this.ballMaxVelX = this.ui.gameHeight * 0.008

        // para asignar una funcion a un evento no podemos hacer lo siguiente:
        // this.ui.effectsIcon.addEventListener('click',this.soundEffectsHandler)
        // para ello llame a la funcion dentro de una arrow funtion ya que,
        // dentro de addEventListener this hace referencia a la fuente del evento
        // usando () => {} this hara referencia al contexto de la arrow function
        // o sea el objeto instanciado
        this.ui.effectsIcon.addEventListener('click',() => this.soundEffectsHandler())
        this.ui.musicIcon.addEventListener('click', () => this.musicHandler())
        this.ui.playButton.addEventListener('click',() => this.init())
        this.ui.playAgainButton.addEventListener('click', () => this.playAgain())
        this.ui.nextLevelButton.addEventListener('click', () => this.nextLevel())
        this.ui.gameOverButton.addEventListener('click', () => this.gameOver())
        addEventListener('keydown',e => this.enterHandler(e))
        this.map = new Map(this.ui,Objects.Block)
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
                this.init()
            }
            if(this.ui.playAgainMenu.style.display === 'flex'){
                this.playAgain()
            } 
            if(this.ui.nextLevelMenu.style.display === 'flex'){
                this.nextLevel()
            } 
            if(this.ui.gameOverMenu.style.display === 'flex'){
                this.gameOver()
            } 
        }
    }

    initControls(){
        if(!this.initializedControls){
            this.ui.leftArrow.addEventListener('touchstart',e => this.player.touchStart(e))
            this.ui.upArrow.addEventListener('touchstart',e => this.player.touchStart(e))
            this.ui.rightArrow.addEventListener('touchstart',e => this.player.touchStart(e))
            this.ui.leftArrow.addEventListener('touchend',e => this.player.touchEnd(e))
            this.ui.rightArrow.addEventListener('touchend',e => this.player.touchEnd(e))
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
                if(this.map.ball.collision(this.map.blocks[i],true,this.ballMaxVelX)){
                    if(this.data.soundEffects){
                        this.audio.playSound(this.audio.breakSrc,1,false)
                    }
                    this.map.blocks[i] = undefined
                    i = this.map.blocks.length //para no romper dos bloques
                    this.data.plusScore(10)
                    this.ui.updateScore(this.data)
                }
            }
        }
        // player collision
        if(this.map.ball.collision(this.map.blockPlayer,true,this.ballMaxVelX)){
            if(this.data.soundEffects){
                this.audio.playSound(this.audio.bounceSrc,0.75,false)
            }
        }
        //walls collision
        if(this.map.ball.collision(this.map.leftWall,true,this.ballMaxVelX)){
            if(this.data.soundEffects) {
                this.audio.playSound(this.audio.bounceSrc,0.75,false)
            }
        }
        if(this.map.ball.collision(this.map.upWall,true,this.ballMaxVelX)){
            if(this.data.soundEffects){
                this.audio.playSound(this.audio.bounceSrc,0.75,false)
            }
        }
        if(this.map.ball.collision(this.map.rightWall,true,this.ballMaxVelX)){
            if(this.data.soundEffects){
                this.audio.playSound(this.audio.bounceSrc,0.75,false)
            }
        }
    }

    //recibe un booleano, si es true muestra la ui de nextLevel
    nextLevel(){
        this.data.level++
        this.ui.hideNextLevel()
        this.init()
    }

    //recibe un booleano, si es true, muestra la ui de playAgain
    playAgain(){
        this.ui.hidePlayAgain()
        this.data.score = 0
        this.ui.updateScore(this.data)
        this.init()
    }

    gameOver(){
        this.ui.hideGameOver()
        this.data.level = 0
        this.data.score = 0
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
            if(this.data.level === this.map.maps.length-1){
                clearInterval(this.running)
                this.ui.showGameOver()
                return
            }
            clearInterval(this.running)
            this.ui.showNextLevel()
        }
    }

    checkIfLose(){
        let lose = false
        if(this.map.ball.yi > this.ui.gameHeight + 100){// +100 para que tarde mas en mostrar el menu
            lose = true
        }
        if(lose){
            clearInterval(this.running)
            this.ui.showPlayAgain()
        }
    }

    init(){
        this.ui.showGame()
        // this.audio.music.load()
        this.audio.music.play()
        this.map.createLevel(this.map.maps[this.data.level],this.data,Objects.Block,Objects.Ball,this.ui)
        this.player = new Player(this.map.blockPlayer,this.map.ball,this.ui.gameHeight)
        this.initControls()
        this.running = setInterval(() => this.game(),this.data.speed)
    }

    game(){
        this.update()
        this.collisions()
        this.render.draw(this.map,this.ui)
        this.checkIfWin()
        this.checkIfLose()
    }
}

let game = new GameManager()