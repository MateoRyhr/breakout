export default class Ui{

    // static #instance = undefined

    // que solo haya una instancia de Ui   
    constructor(){
        this.widthScreen = window.screen.width
        this.heightScreen = window.screen.height

        this.menu = document.getElementById('menu')
        this.playButton = document.getElementById('play')
        this.canvas = document.getElementById('canvas')

        this.playMenu = document.getElementById('playMenu')
        this.tactilControls = document.getElementById('tactilControls')
        this.leftArrow = document.getElementById('left-arrow')
        this.upArrow = document.getElementById('up-arrow')
        this.rightArrow = document.getElementById('right-arrow')
        this.score = document.getElementById('score')
        this.effectsIcon = document.getElementById('effectsIcon')
        this.musicIcon = document.getElementById('musicIcon')

        this.submenu = document.getElementById('submenu')
        this.nextLevelMenu = document.getElementById('nextLevelMenu')
        this.nextLevelButton = document.getElementById('nextLevelButton')
        this.playAgainMenu = document.getElementById('playAgainMenu')
        this.playAgainButton = document.getElementById('playAgainButton')
        this.gameOverMenu = document.getElementById('gameOverMenu')
        this.gameOverButton = document.getElementById('gameOverButton')
    }

    //singleton --> no es bueno para el unit testing, lo hace más dificil
    // static initUi(){
    //     if(!Ui.instance){
    //         Ui.instance = new this()
    //     }
    //     return Ui.instance
    // }

    setEffectsSound(sound){
        if(sound){
            this.effectsIcon.style.backgroundImage = 'url(../../assets/icons/effects.svg)'
        }else{
            this.effectsIcon.style.backgroundImage = 'url(../../assets/icons/effects-mute.svg)'
        }
    }

    setMusic(music){
        if(music){
            this.musicIcon.style.backgroundImage = 'url(../../assets/icons/music.svg)'
        }else{
            this.musicIcon.style.backgroundImage = 'url(../../assets/icons/music-mute.svg)'
        }
    }

    setup(){
        this.gameHeight = 400
        this.gameWidth = this.gameHeight * 0.8
        // 992px ya es un display de pc
        if(this.widthScreen >= 992){
            this.tactilControls.style.display = 'none'
            this.gameHeight = 580
            this.gameWidth = this.gameHeight * 0.8
        }
        if(this.widthScreen >= 1440){
            this.gameHeight = 760
            this.gameWidth = this.gameHeight * 0.8
        }
        if(this.widthScreen >= 1920){
            this.gameHeight = 940
            this.gameWidth = this.gameHeight * 0.8
        }
    }

    showGame(){
        this.menu.style.display = 'none'
        this.canvas.style.display = 'block'
        this.canvas.width = this.gameWidth
        this.canvas.height = this.gameHeight
        this.canvas.style.width = `${this.gameWidth}px`
        this.canvas.style.minHeight = `${this.gameHeight}px`
    }

    updateScore(data){
        this.score.textContent = data.score
        this.score.style.color = '#e23e57'
        this.score.style.fontWeight = 'bold'
        setTimeout(() => {
            this.score.style.color = '#ffffff'
            this.score.style.fontWeight = 'normal'
        },125)
    }

    //recibe un booleano y segun su valor muestra o no el menu

    showNextLevel(){
        this.submenu.style.display = 'flex'
        this.nextLevelMenu.style.display = 'flex'
    }

    hideNextLevel(){
        this.submenu.style.display = 'none'
        this.nextLevelMenu.style.display = 'none'
    }

    showPlayAgain(){
        this.submenu.style.display = 'flex'
        this.playAgainMenu.style.display = 'flex'
    }

    hidePlayAgain(){
        this.submenu.style.display = 'none'
        this.playAgainMenu.style.display = 'none'
    }

    showGameOver(){
        this.submenu.style.display = 'flex'
        this.gameOverMenu.style.display = 'flex'
    }

    hideGameOver(){
        this.submenu.style.display = 'none'
        this.gameOverMenu.style.display = 'none'
    }
}

