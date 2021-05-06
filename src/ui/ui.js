export default class Ui{

    // static #instance = undefined

    // que solo haya una instancia de Ui   
    constructor(){
        this.widthScreen = window.screen.width
        this.heightScreen = window.screen.height
        console.log(this.heightScreen)
        console.log(this.widthScreen)
        this.body = document.querySelector('body')

        this.playMenu = document.getElementById('playMenu')
        this.musicIcon = document.getElementById('musicIcon')
        this.score = document.getElementById('score')
        this.lifes = document.getElementById('lifes')
        this.effectsIcon = document.getElementById('effectsIcon')

        this.menu = document.getElementById('menu')
        this.playButton = document.getElementById('play')

        this.footer = document.getElementById('footer')

        this.difficultyMenu = document.getElementById('difficultyMenu')
        this.veryEasyButton = document.getElementById('veryEasyButton')
        this.easyButton = document.getElementById('easyButton')
        this.normalButton = document.getElementById('normalButton')
        this.hardButton = document.getElementById('hardButton')

        this.canvas = document.getElementById('canvas')

        this.tactilControls = document.getElementById('tactilControls')
        this.leftArrow = document.getElementById('left-arrow')
        this.upArrow = document.getElementById('up-arrow')
        this.rightArrow = document.getElementById('right-arrow')

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
            this.effectsIcon.style.backgroundImage = 'url(../../assets/icons/effects-neon.svg)'
        }else{
            this.effectsIcon.style.backgroundImage = 'url(../../assets/icons/effects-mute-neon.svg)'
        }
    }

    setMusic(music){
        if(music){
            this.musicIcon.style.backgroundImage = 'url(../../assets/icons/music-neon.svg)'
        }else{
            this.musicIcon.style.backgroundImage = 'url(../../assets/icons/music-mute-neon.svg)'
        }
    }

    setup(){
        this.gameHeight = 400
        this.gameWidth = this.gameHeight * 0.8
        // 992px ya es un display de pc
        if(this.widthScreen >= 992){
            this.gameHeight = 580
            this.gameWidth = this.gameHeight * 0.8
        }
        if(this.widthScreen >= 1440){
            this.gameHeight = 760
            this.gameWidth = this.gameHeight * 0.8
        }
        if(this.widthScreen >= 1920){
            this.gameHeight = 900
            this.gameWidth = this.gameHeight * 0.8
        }
    }

    changeBackgroundColor(color){
        this.body.style.backgroundColor = color
    }

    showGame(){
        this.widthScreen < 992 ? this.showTactilControls() : this.hideTactilControls()
        this.hideFooter()
        this.canvas.style.display = 'block'
        this.canvas.width = this.gameWidth
        this.canvas.height = this.gameHeight
        this.canvas.style.width = `${this.gameWidth}px`
        this.canvas.style.minHeight = `${this.gameHeight}px`
        this.canvas.style.height = `${this.gameHeight}px`
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

    updateLifes(data){
        this.lifes.style.color = '#e23e57'
        this.lifes.style.fontWeight = '200'
        this.lifes.textContent = data.lifes
        setTimeout(() => {
            this.lifes.style.color = '#ffffff'
            this.lifes.style.fontWeight = 'normal'
        },125)
    }

    //recibe un booleano y segun su valor muestra o no el menu

    showFooter(){
        this.footer.style.display = 'flex'
    }

    hideFooter(){
        this.footer.style.display = 'none'
    }

    showTactilControls(){
        this.tactilControls.style.display = 'flex'
    }

    hideTactilControls(){
        this.tactilControls.style.display = 'none'
    }

    showMenu(){
        this.menu.style.display = 'flex'
    }

    hideMenu(){
        this.menu.style.display = 'none'
    }

    showDifficultyMenu(){
        this.hideMenu()
        this.difficultyMenu.style.display = 'flex'
    }

    hideDifficultyMenu(){
        this.difficultyMenu.style.display = 'none'
    }

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

